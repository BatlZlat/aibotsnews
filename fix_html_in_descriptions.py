#!/usr/bin/env python3
"""
Скрипт для очистки HTML тегов из описаний в структурированных данных
"""

import os
import re
import glob

def clean_html_from_description(content):
    """Очищает HTML теги из описаний в JSON-LD"""
    # Ищем все description поля в JSON-LD
    pattern = r'("description":\s*")([^"]*<[^>]*>[^"]*)"'
    
    def replace_html(match):
        prefix = match.group(1)
        description = match.group(2)
        # Удаляем HTML теги
        clean_description = re.sub(r'<[^>]*>', '', description)
        # Удаляем лишние пробелы
        clean_description = re.sub(r'\s+', ' ', clean_description).strip()
        return f'{prefix}{clean_description}"'
    
    return re.sub(pattern, replace_html, content)

def fix_html_in_descriptions(file_path):
    """Исправляет HTML в описаниях файла"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Очищаем HTML из описаний
        content = clean_html_from_description(content)
        
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        
        return False
        
    except Exception as e:
        print(f"❌ Ошибка при обработке {file_path}: {e}")
        return False

def main():
    """Основная функция"""
    print("🧹 ОЧИСТКА HTML ИЗ ОПИСАНИЙ")
    print("=" * 40)
    
    # Находим все файлы обзоров
    review_files = []
    review_files.extend(glob.glob("content/articles/reviews/*.md"))
    review_files.extend(glob.glob("content/reviews/*.md"))
    
    print(f"📁 Найдено {len(review_files)} файлов обзоров")
    print()
    
    fixed_count = 0
    
    for file_path in review_files:
        print(f"🔍 Проверяю: {file_path}")
        
        if fix_html_in_descriptions(file_path):
            print(f"  ✅ Исправлен: {file_path}")
            fixed_count += 1
        else:
            print(f"  ⏭️  Без изменений: {file_path}")
    
    print()
    print("=" * 40)
    print(f"📊 ИТОГИ:")
    print(f"✅ Исправлено файлов: {fixed_count}")
    print(f"📁 Всего проверено: {len(review_files)}")

if __name__ == "__main__":
    main() 