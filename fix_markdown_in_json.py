#!/usr/bin/env python3
"""
Исправляет markdown разметку в JSON structured data
"""

import os
import re
import glob

def fix_markdown_in_json():
    """Исправляет markdown разметку в JSON structured data"""
    
    # Находим все .md файлы
    md_files = []
    md_files.extend(glob.glob("content/**/*.md", recursive=True))
    
    print(f"🔍 Найдено {len(md_files)} файлов для проверки")
    
    fixed_files = 0
    
    for file_path in md_files:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            file_modified = False
            
            # Исправляем звездочки в JSON description
            pattern1 = r'("description":\s*)"\*([^*]+)\*"'
            if re.search(pattern1, content):
                content = re.sub(pattern1, r'\1"\2"', content)
                file_modified = True
                print(f"  ✅ Исправлен description в JSON: {file_path}")
            
            # Исправляем звездочки в og:description
            pattern2 = r'(<meta property="og:description" content=")\*([^*]+)\*(" />)'
            if re.search(pattern2, content):
                content = re.sub(pattern2, r'\1\2\3', content)
                file_modified = True
                print(f"  ✅ Исправлен og:description: {file_path}")
            
            # Исправляем звездочки в twitter:description
            pattern3 = r'(<meta name="twitter:description" content=")\*([^*]+)\*(" />)'
            if re.search(pattern3, content):
                content = re.sub(pattern3, r'\1\2\3', content)
                file_modified = True
                print(f"  ✅ Исправлен twitter:description: {file_path}")
            
            # Исправляем звездочки в markdown заголовках (но не в JSON)
            # Ищем строки, которые начинаются с *Обновлено: и не находятся внутри JSON блоков
            pattern4 = r'^(\s*)\*Обновлено:([^*]+)\*(\s*)$'
            if re.search(pattern4, content, re.MULTILINE):
                content = re.sub(pattern4, r'\1Обновлено:\2\3', content, flags=re.MULTILINE)
                file_modified = True
                print(f"  ✅ Исправлен markdown заголовок: {file_path}")
            
            if file_modified:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                fixed_files += 1
                
        except Exception as e:
            print(f"  ❌ Ошибка при обработке {file_path}: {e}")
    
    print(f"\n📊 ИТОГИ:")
    print(f"✅ Исправлено файлов: {fixed_files}")
    print(f"📁 Всего проверено: {len(md_files)}")
    
    return fixed_files

if __name__ == "__main__":
    print("🔧 ИСПРАВЛЕНИЕ MARKDOWN В JSON STRUCTURED DATA")
    print("=" * 60)
    
    fixed = fix_markdown_in_json()
    
    if fixed > 0:
        print(f"\n🎉 Исправлено {fixed} файлов!")
        print("Теперь можно коммитить изменения и создавать новый тег.")
    else:
        print("\n✅ Все файлы уже корректны!")
    
    print("=" * 60) 