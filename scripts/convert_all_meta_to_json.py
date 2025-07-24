import os
import json
import re
from pathlib import Path

CONTENT_ROOT = Path('content')
META_EXT = '.meta'

SEARCH_DIRS = [
    CONTENT_ROOT / 'articles',
    CONTENT_ROOT / 'guides',
    CONTENT_ROOT / 'news',
    CONTENT_ROOT / 'ratings',
    CONTENT_ROOT / 'reviews',
]

def is_json(text):
    try:
        json.loads(text)
        return True
    except Exception:
        return False

def parse_ini_like(text):
    result = {}
    for line in text.splitlines():
        line = line.strip()
        if not line or line.startswith('#'):
            continue
        match = re.match(r'([^:]+):\s*(.*)', line)
        if match:
            key, value = match.groups()
            result[key.strip()] = value.strip()
    return result

def process_meta_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    if is_json(content):
        return True, None
    try:
        data = parse_ini_like(content)
        if not data:
            raise ValueError('Не удалось распарсить как ini/markdown')
        with open(path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        return True, None
    except Exception as e:
        return False, str(e)

def main():
    total = 0
    fixed = 0
    errors = []
    for search_dir in SEARCH_DIRS:
        for root, _, files in os.walk(search_dir):
            for file in files:
                if file.endswith(META_EXT):
                    meta_path = Path(root) / file
                    total += 1
                    ok, err = process_meta_file(meta_path)
                    if ok:
                        fixed += 1
                    else:
                        errors.append((str(meta_path), err))
    print(f'Обработано файлов: {total}')
    print(f'Исправлено/валидных: {fixed}')
    if errors:
        print(f'Ошибки в {len(errors)} файлах:')
        for fname, err in errors:
            print(f'  {fname}: {err}')
    else:
        print('Все .meta-файлы успешно преобразованы!')

if __name__ == '__main__':
    main() 