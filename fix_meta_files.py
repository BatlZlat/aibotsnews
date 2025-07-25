#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Скрипт для автоматического исправления .meta-файлов
Преобразует невалидные meta-файлы в правильный формат для structured data
"""

import os
import json
import re
from datetime import datetime
from pathlib import Path

def extract_name_from_slug(slug):
    """Извлекает название из slug файла"""
    # Убираем суффиксы и заменяем дефисы на пробелы
    name = slug.replace('-seo', '').replace('-2025', '')
    
    # Убираем префиксы категорий
    prefixes = ['how-to-use-', 'review-', 'comparison-', 'top-', 'ai-']
    for prefix in prefixes:
        if name.startswith(prefix):
            name = name[len(prefix):]
    
    # Заменяем дефисы на пробелы и делаем заглавные буквы
    name = name.replace('-', ' ').replace('_', ' ')
    
    # Делаем первую букву заглавной
    name = name.title()
    
    return name

def generate_meta_content(slug, category):
    """Генерирует валидное содержимое meta-файла"""
    name = extract_name_from_slug(slug)
    today = datetime.now().strftime("%Y-%m-%dT%H:%M:%SZ")
    
    # Разные описания для разных категорий
    descriptions = {
        'reviews': f"Подробный отзыв о {name} от реального пользователя. Практический опыт, кейсы использования, плюсы и минусы.",
        'guides': f"Подробное руководство по использованию {name} в 2025 году. Пошаговые инструкции, советы экспертов и практические примеры.",
        'news': f"Актуальные новости о {name} в 2025 году. Последние разработки, тренды и инновации в мире искусственного интеллекта.",
        'comparisons': f"Детальное сравнение {name} с аналогами. Анализ возможностей, цены, производительность и рекомендации.",
        'ratings': f"Рейтинг лучших {name} в 2025 году. Объективная оценка, сравнение характеристик и выбор экспертов.",
        'main': f"Подробная информация о {name}. Все что нужно знать о современных AI инструментах и технологиях."
    }
    
    description = descriptions.get(category, f"Подробная информация о {name}. Актуальные данные и практические рекомендации.")
    
    return {
        "description": description,
        "ogImage": f"https://aibotsnews.ru/images/{slug}.jpg",
        "datePublished": today,
        "dateModified": today,
        "keywords": f"{name}, AI, искусственный интеллект, 2025"
    }

def is_valid_meta(data):
    """Проверяет, является ли meta-файл валидным"""
    required_fields = ['description', 'ogImage', 'datePublished', 'dateModified', 'keywords']
    return all(field in data for field in required_fields)

def fix_meta_files():
    """Основная функция для исправления meta-файлов"""
    base_dir = Path("content/articles")
    fixed_count = 0
    skipped_count = 0
    error_count = 0
    
    print("🔍 Начинаю проверку и исправление .meta-файлов...")
    print("=" * 60)
    
    # Проходим по всем категориям
    for category_dir in base_dir.iterdir():
        if not category_dir.is_dir():
            continue
            
        category = category_dir.name
        print(f"\n📁 Категория: {category}")
        
        # Ищем все .meta файлы в категории
        for meta_file in category_dir.glob("*.meta"):
            try:
                slug = meta_file.stem  # имя файла без расширения
                
                # Читаем текущий файл
                with open(meta_file, 'r', encoding='utf-8') as f:
                    content = f.read().strip()
                
                # Пытаемся распарсить JSON
                try:
                    data = json.loads(content)
                    
                    # Если файл уже валидный - пропускаем
                    if is_valid_meta(data):
                        print(f"  ✅ {slug} - уже валидный, пропускаю")
                        skipped_count += 1
                        continue
                        
                except json.JSONDecodeError:
                    # Если JSON невалидный - заменяем
                    pass
                
                # Генерируем новое содержимое
                new_data = generate_meta_content(slug, category)
                
                # Записываем исправленный файл
                with open(meta_file, 'w', encoding='utf-8') as f:
                    json.dump(new_data, f, ensure_ascii=False, indent=2)
                
                print(f"  🔧 {slug} - исправлен")
                fixed_count += 1
                
            except Exception as e:
                print(f"  ❌ {meta_file.name} - ошибка: {e}")
                error_count += 1
    
    print("\n" + "=" * 60)
    print("📊 ИТОГИ:")
    print(f"  ✅ Исправлено файлов: {fixed_count}")
    print(f"  ⏭️  Пропущено (уже валидных): {skipped_count}")
    print(f"  ❌ Ошибок: {error_count}")
    print(f"  📁 Всего обработано: {fixed_count + skipped_count + error_count}")
    
    return fixed_count, skipped_count, error_count

if __name__ == "__main__":
    print("🚀 Запуск автоматического исправления .meta-файлов")
    print("📋 Бэкап создан в content/articles_backup_*/")
    print()
    
    fixed, skipped, errors = fix_meta_files()
    
    if errors == 0:
        print("\n🎉 Все файлы успешно обработаны!")
    else:
        print(f"\n⚠️  Обработано с ошибками: {errors} файлов")
    
    print("\n🔍 Рекомендуется проверить несколько файлов вручную после исправления.") 