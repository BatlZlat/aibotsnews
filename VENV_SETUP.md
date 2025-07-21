# Настройка виртуальной среды Python

## Создание виртуальной среды

Виртуальная среда уже создана в папке `venv-landing/` внутри проекта.

## Активация виртуальной среды

### Linux/macOS:
```bash
source venv-landing/bin/activate
```

### Windows:
```bash
venv-landing\Scripts\activate
```

## Деактивация виртуальной среды

```bash
deactivate
```

## Установка зависимостей

После активации виртуальной среды установите зависимости:

```bash
pip install -r requirements.txt
```

## Проверка активации

Убедитесь, что виртуальная среда активирована:

```bash
which python
# Должно показать: /home/dan/Project/Landing/AI bots/venv-landing/bin/python

echo $VIRTUAL_ENV
# Должно показать: /home/dan/Project/Landing/AI bots/venv-landing
```

## Запуск Python скриптов

Все Python скрипты проекта должны запускаться в активированной виртуальной среде:

```bash
# Активируйте среду
source venv-landing/bin/activate

# Запустите скрипт
python content_processing_script.py
python seo_optimization_script.py
python meta_generator.py
```

## Удаление виртуальной среды

Если нужно пересоздать виртуальную среду:

```bash
# Деактивируйте среду
deactivate

# Удалите папку
rm -rf venv-landing/

# Создайте заново
python3 -m venv venv-landing
source venv-landing/bin/activate
pip install -r requirements.txt
```

## Важно!

- Всегда активируйте виртуальную среду перед работой с Python скриптами
- Виртуальная среда исключена из Git (добавлена в .gitignore)
- Каждый разработчик должен создать свою виртуальную среду локально 