#!/usr/bin/env python3
"""
Комплексная проверка структурированных данных в проекте
"""

import os
import re
import json
import glob
from typing import List, Dict, Any

def extract_json_ld_blocks(content: str) -> List[Dict[str, Any]]:
    """Извлекает все JSON-LD блоки из контента"""
    blocks = []
    
    # Ищем все <script type="application/ld+json"> блоки
    pattern = r'<script\s+type="application/ld\+json">\s*(\{.*?\})\s*</script>'
    matches = re.findall(pattern, content, re.DOTALL)
    
    for match in matches:
        try:
            # Очищаем от лишних пробелов и переносов
            cleaned = re.sub(r'\s+', ' ', match.strip())
            data = json.loads(cleaned)
            blocks.append(data)
        except json.JSONDecodeError as e:
            print(f"  ❌ Ошибка JSON: {e}")
            # Попробуем найти проблему
            try:
                # Ищем незакрытые скобки
                brace_count = 0
                for i, char in enumerate(cleaned):
                    if char == '{':
                        brace_count += 1
                    elif char == '}':
                        brace_count -= 1
                        if brace_count == 0:
                            # Проверим, есть ли лишние символы после закрывающей скобки
                            remaining = cleaned[i+1:].strip()
                            if remaining:
                                print(f"    🔍 Найдены лишние символы после JSON: '{remaining[:50]}...'")
                            break
            except Exception:
                pass
    
    return blocks

def validate_review_schema(data: Dict[str, Any]) -> Dict[str, Any]:
    """Проверяет Review schema на корректность"""
    errors = []
    warnings = []
    
    # Проверяем обязательные поля
    required_fields = ['@type', 'headline', 'reviewBody', 'itemReviewed']
    for field in required_fields:
        if field not in data:
            errors.append(f"Отсутствует обязательное поле: {field}")
    
    # Проверяем тип
    if data.get('@type') != 'Review':
        errors.append("Неверный тип: должен быть 'Review'")
    
    # Проверяем itemReviewed
    if 'itemReviewed' in data:
        item = data['itemReviewed']
        if not isinstance(item, dict):
            errors.append("itemReviewed должен быть объектом")
        elif item.get('@type') != 'SoftwareApplication':
            errors.append("itemReviewed должен иметь тип 'SoftwareApplication'")
        elif 'name' not in item:
            errors.append("itemReviewed должен содержать поле 'name'")
    
    # Проверяем reviewRating
    if 'reviewRating' in data:
        rating = data['reviewRating']
        if not isinstance(rating, dict):
            errors.append("reviewRating должен быть объектом")
        elif rating.get('@type') != 'Rating':
            errors.append("reviewRating должен иметь тип 'Rating'")
        elif 'ratingValue' not in rating:
            errors.append("reviewRating должен содержать 'ratingValue'")
    
    # Проверяем дублирования
    fields_count = {}
    for key in data.keys():
        if key in fields_count:
            errors.append(f"Дублирование поля: {key}")
        fields_count[key] = fields_count.get(key, 0) + 1
    
    return {
        'errors': errors,
        'warnings': warnings,
        'is_valid': len(errors) == 0
    }

def validate_breadcrumb_schema(data: Dict[str, Any]) -> Dict[str, Any]:
    """Проверяет BreadcrumbList schema на корректность"""
    errors = []
    warnings = []
    
    if data.get('@type') != 'BreadcrumbList':
        errors.append("Неверный тип: должен быть 'BreadcrumbList'")
    
    if 'itemListElement' not in data:
        errors.append("Отсутствует обязательное поле: itemListElement")
    else:
        items = data['itemListElement']
        if not isinstance(items, list):
            errors.append("itemListElement должен быть массивом")
        else:
            for i, item in enumerate(items):
                if not isinstance(item, dict):
                    errors.append(f"Элемент {i+1} должен быть объектом")
                elif item.get('@type') != 'ListItem':
                    errors.append(f"Элемент {i+1} должен иметь тип 'ListItem'")
                elif 'position' not in item:
                    errors.append(f"Элемент {i+1} должен содержать 'position'")
                elif 'name' not in item:
                    errors.append(f"Элемент {i+1} должен содержать 'name'")
    
    return {
        'errors': errors,
        'warnings': warnings,
        'is_valid': len(errors) == 0
    }

def check_file(file_path: str) -> Dict[str, Any]:
    """Проверяет файл на корректность structured data"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        blocks = extract_json_ld_blocks(content)
        
        if not blocks:
            return {
                'file': file_path,
                'blocks': 0,
                'errors': ['Не найдены JSON-LD блоки'],
                'warnings': [],
                'is_valid': False
            }
        
        all_errors = []
        all_warnings = []
        valid_blocks = 0
        
        for i, block in enumerate(blocks):
            block_type = block.get('@type', 'Unknown')
            
            if block_type == 'Review':
                result = validate_review_schema(block)
                if result['errors']:
                    all_errors.extend([f"Блок {i+1} (Review): {error}" for error in result['errors']])
                if result['warnings']:
                    all_warnings.extend([f"Блок {i+1} (Review): {warning}" for warning in result['warnings']])
                if result['is_valid']:
                    valid_blocks += 1
                    
            elif block_type == 'BreadcrumbList':
                result = validate_breadcrumb_schema(block)
                if result['errors']:
                    all_errors.extend([f"Блок {i+1} (BreadcrumbList): {error}" for error in result['errors']])
                if result['warnings']:
                    all_warnings.extend([f"Блок {i+1} (BreadcrumbList): {warning}" for warning in result['warnings']])
                if result['is_valid']:
                    valid_blocks += 1
                    
            else:
                all_warnings.append(f"Блок {i+1}: Неизвестный тип '{block_type}'")
        
        return {
            'file': file_path,
            'blocks': len(blocks),
            'valid_blocks': valid_blocks,
            'errors': all_errors,
            'warnings': all_warnings,
            'is_valid': len(all_errors) == 0 and valid_blocks > 0
        }
        
    except Exception as e:
        return {
            'file': file_path,
            'blocks': 0,
            'errors': [f'Ошибка чтения файла: {e}'],
            'warnings': [],
            'is_valid': False
        }

def check_component_generated_data():
    """Проверяет structured data, генерируемые компонентами"""
    print("🔍 ПРОВЕРКА КОМПОНЕНТОВ")
    print("=" * 50)
    
    # Проверяем основные компоненты
    component_files = [
        'src/app/articles/[slug]/page.tsx',
        'src/app/page.tsx',
        'src/app/reviews/page.tsx',
        'src/app/guides/page.tsx',
        'src/app/news/page.tsx',
        'src/app/ratings/page.tsx',
        'src/app/comparisons/page.tsx'
    ]
    
    component_errors = []
    
    for file_path in component_files:
        if os.path.exists(file_path):
            print(f"🔍 Проверяю компонент: {file_path}")
            
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Проверяем импорты structured data функций
                if 'generateBreadcrumbStructuredData' in content:
                    print(f"  ✅ BreadcrumbList: используется")
                else:
                    print(f"  ⚠️  BreadcrumbList: не найден")
                
                # Проверяем использование dangerouslySetInnerHTML
                if 'dangerouslySetInnerHTML' in content:
                    print(f"  ✅ Structured data: встраивается")
                else:
                    print(f"  ⚠️  Structured data: не встраивается")
                    
            except Exception as e:
                print(f"  ❌ Ошибка: {e}")
                component_errors.append(f"{file_path}: {e}")
    
    return component_errors

def main():
    """Основная функция"""
    print("🔍 КОМПЛЕКСНАЯ ПРОВЕРКА СТРУКТУРИРОВАННЫХ ДАННЫХ")
    print("=" * 60)
    
    # Находим все файлы обзоров
    review_files = []
    review_files.extend(glob.glob("content/articles/reviews/*.md"))
    review_files.extend(glob.glob("content/reviews/*.md"))
    
    print(f"📁 Найдено {len(review_files)} файлов обзоров")
    print()
    
    results = []
    total_errors = 0
    total_warnings = 0
    
    for file_path in review_files:
        print(f"🔍 Проверяю файл: {file_path}")
        result = check_file(file_path)
        results.append(result)
        
        if result['errors']:
            for error in result['errors']:
                print(f"  ❌ {error}")
                total_errors += 1
        
        if result['warnings']:
            for warning in result['warnings']:
                print(f"  ⚠️  {warning}")
                total_warnings += 1
        
        if result['is_valid']:
            print(f"  ✅ Файл корректный ({result['valid_blocks']}/{result['blocks']} блоков)")
        else:
            print(f"  ❌ Файл содержит ошибки")
        
        print()
    
    # Проверяем компоненты
    component_errors = check_component_generated_data()
    
    print("=" * 60)
    print("📊 ИТОГИ ПРОВЕРКИ:")
    
    valid_files = sum(1 for r in results if r['is_valid'])
    total_files = len(results)
    
    print(f"✅ Корректных файлов: {valid_files}/{total_files}")
    print(f"❌ Файлов с ошибками: {total_files - valid_files}")
    print(f"�� Процент корректных: {(valid_files/total_files*100):.1f}%")
    print(f"🚨 Всего ошибок: {total_errors}")
    print(f"⚠️  Всего предупреждений: {total_warnings}")
    
    if component_errors:
        print(f"🔧 Ошибки в компонентах: {len(component_errors)}")
    
    if total_errors == 0 and len(component_errors) == 0:
        print("\n🎉 ВСЕ СТРУКТУРИРОВАННЫЕ ДАННЫЕ КОРРЕКТНЫ!")
    else:
        print("\n⚠️  Нужно исправить ошибки в structured data")
    
    print("=" * 60)

if __name__ == "__main__":
    main() 