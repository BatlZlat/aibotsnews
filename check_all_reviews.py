#!/usr/bin/env python3
import json
import re
import os
from pathlib import Path

def extract_json_from_script(content):
    """Извлекает JSON из script тегов"""
    pattern = r'<script type="application/ld\+json">(.*?)</script>'
    matches = re.findall(pattern, content, re.DOTALL)
    return matches

def validate_json(json_str):
    """Проверяет валидность JSON"""
    try:
        json.loads(json_str)
        return True, None
    except json.JSONDecodeError as e:
        return False, str(e)

def check_review_schema(json_data):
    """Проверяет обязательные поля для Review schema"""
    required_fields = ['@type', 'headline', 'reviewBody', 'itemReviewed']
    missing_fields = []
    
    for field in required_fields:
        if field not in json_data:
            missing_fields.append(field)
    
    return missing_fields

def check_item_reviewed_schema(json_data):
    """Проверяет структуру itemReviewed"""
    if 'itemReviewed' not in json_data:
        return ["itemReviewed отсутствует"]
    
    item = json_data['itemReviewed']
    required_fields = ['@type', 'name', 'url']
    missing_fields = []
    
    for field in required_fields:
        if field not in item:
            missing_fields.append(f"itemReviewed.{field}")
    
    return missing_fields

def check_review_rating_schema(json_data):
    """Проверяет структуру reviewRating"""
    if 'reviewRating' not in json_data:
        return ["reviewRating отсутствует"]
    
    rating = json_data['reviewRating']
    required_fields = ['@type', 'ratingValue', 'bestRating', 'worstRating']
    missing_fields = []
    
    for field in required_fields:
        if field not in rating:
            missing_fields.append(f"reviewRating.{field}")
    
    return missing_fields

def check_file(file_path):
    """Проверяет один файл на ошибки в структурированных данных"""
    print(f"\n🔍 Проверяю файл: {file_path}")
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"  ❌ Ошибка чтения файла: {e}")
        return False
    
    json_blocks = extract_json_from_script(content)
    
    if not json_blocks:
        print("  ❌ Не найдены блоки application/ld+json")
        return False
    
    file_has_errors = False
    
    for i, json_str in enumerate(json_blocks):
        print(f"  📄 Блок {i+1}:")
        
        # Проверяем валидность JSON
        is_valid, error = validate_json(json_str)
        if not is_valid:
            print(f"    ❌ Ошибка JSON: {error}")
            file_has_errors = True
            continue
        
        # Парсим JSON
        try:
            data = json.loads(json_str)
        except Exception as e:
            print(f"    ❌ Ошибка парсинга JSON: {e}")
            file_has_errors = True
            continue
        
        # Проверяем тип
        if '@type' in data:
            print(f"    ✅ Тип: {data['@type']}")
            
            # Проверяем Review schema
            if data['@type'] == 'Review':
                print("    📋 Проверяю Review schema...")
                
                # Проверяем обязательные поля
                missing_fields = check_review_schema(data)
                if missing_fields:
                    print(f"    ❌ Отсутствуют обязательные поля: {', '.join(missing_fields)}")
                    file_has_errors = True
                else:
                    print("    ✅ Все обязательные поля присутствуют")
                
                # Проверяем itemReviewed
                item_errors = check_item_reviewed_schema(data)
                if item_errors:
                    print(f"    ❌ Ошибки в itemReviewed: {', '.join(item_errors)}")
                    file_has_errors = True
                else:
                    print("    ✅ itemReviewed корректно")
                
                # Проверяем reviewRating
                rating_errors = check_review_rating_schema(data)
                if rating_errors:
                    print(f"    ❌ Ошибки в reviewRating: {', '.join(rating_errors)}")
                    file_has_errors = True
                else:
                    print("    ✅ reviewRating корректно")
                
                # Проверяем дублирование полей
                item_reviewed_count = json_str.count('"itemReviewed"')
                if item_reviewed_count > 1:
                    print(f"    ❌ Дублирование itemReviewed: найдено {item_reviewed_count} вхождений")
                    file_has_errors = True
                else:
                    print("    ✅ Дублирования не найдено")
                
                if not file_has_errors:
                    print("    🎉 Review schema полностью корректна!")
            
            elif data['@type'] == 'BreadcrumbList':
                print("    ✅ BreadcrumbList корректна")
            else:
                print(f"    ⚠️  Неизвестный тип: {data['@type']}")
        else:
            print("    ⚠️  Отсутствует поле @type")
            file_has_errors = True
    
    return not file_has_errors

def main():
    """Основная функция"""
    print("🔍 ПОЛНАЯ ПРОВЕРКА СТРУКТУРИРОВАННЫХ ДАННЫХ")
    print("=" * 60)
    
    # Пути к файлам обзоров
    review_paths = [
        "content/articles/reviews/",
        "content/reviews/"
    ]
    
    all_files = []
    for path in review_paths:
        if os.path.exists(path):
            for file in os.listdir(path):
                if file.endswith('.md'):
                    all_files.append(os.path.join(path, file))
    
    print(f"📁 Найдено {len(all_files)} файлов обзоров")
    print("=" * 60)
    
    correct_files = 0
    total_files = 0
    
    for file_path in all_files:
        total_files += 1
        if check_file(file_path):
            correct_files += 1
    
    print("\n" + "=" * 60)
    print("📊 ИТОГИ ПРОВЕРКИ:")
    print(f"✅ Корректных файлов: {correct_files}")
    print(f"❌ Файлов с ошибками: {total_files - correct_files}")
    print(f"📈 Процент корректных: {(correct_files/total_files*100):.1f}%")
    
    if correct_files == total_files:
        print("\n🎉 ВСЕ ФАЙЛЫ КОРРЕКТНЫ! Структурированные данные готовы для Google.")
    else:
        print(f"\n⚠️  Нужно исправить {total_files - correct_files} файлов.")
    
    print("\n" + "=" * 60)

if __name__ == "__main__":
    main() 