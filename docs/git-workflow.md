# Git Workflow для проекта "ИИ Боты"

## Обзор системы веток

### Основные ветки
- **master** - Продакшн версия, стабильный код
- **develop** - Основная ветка разработки, интеграция фич

### Вспомогательные ветки
- **feature/*** - Ветки для разработки новых функций
- **hotfix/*** - Ветки для срочных исправлений
- **release/*** - Ветки для подготовки релизов

## Процесс разработки

### 1. Начало работы над новой функцией

```bash
# Переключение на develop
git checkout develop

# Обновление develop
git pull origin develop

# Создание feature ветки
git checkout -b feature/new-feature-name

# Разработка...
```

### 2. Коммиты в feature ветке

```bash
# Добавление изменений
git add .

# Коммит с правильным префиксом
git commit -m "feat: добавить новый компонент Header"

# Push feature ветки
git push origin feature/new-feature-name
```

### 3. Завершение feature

```bash
# Переключение на develop
git checkout develop

# Обновление develop
git pull origin develop

# Merge feature ветки
git merge feature/new-feature-name

# Удаление feature ветки
git branch -d feature/new-feature-name
git push origin --delete feature/new-feature-name
```

### 4. Подготовка релиза

```bash
# Создание release ветки
git checkout -b release/v1.0.0

# Финальные исправления и тестирование
# Обновление версии в package.json
# Обновление CHANGELOG.md

# Merge в master
git checkout master
git merge release/v1.0.0

# Создание тега
git tag -a v1.0.0 -m "Release version 1.0.0"

# Merge в develop
git checkout develop
git merge release/v1.0.0

# Удаление release ветки
git branch -d release/v1.0.0
```

### 5. Срочные исправления (hotfix)

```bash
# Создание hotfix ветки от master
git checkout master
git checkout -b hotfix/critical-bug-fix

# Исправление бага
# Коммит
git commit -m "fix: исправить критическую ошибку в авторизации"

# Merge в master
git checkout master
git merge hotfix/critical-bug-fix

# Создание тега
git tag -a v1.0.1 -m "Hotfix version 1.0.1"

# Merge в develop
git checkout develop
git merge hotfix/critical-bug-fix

# Удаление hotfix ветки
git branch -d hotfix/critical-bug-fix
```

## Конвенции коммитов

### Структура сообщения коммита
```
<тип>(<область>): <краткое описание>

[тело коммита]

[примечание]
```

### Типы коммитов
- **feat:** - Новая функциональность
- **fix:** - Исправление бага
- **docs:** - Изменения в документации
- **style:** - Изменения в форматировании кода
- **refactor:** - Рефакторинг кода
- **test:** - Добавление или изменение тестов
- **chore:** - Изменения в конфигурации, зависимостях

### Области
- **ui:** - Пользовательский интерфейс
- **api:** - API и бэкенд
- **seo:** - SEO оптимизация
- **content:** - Контент сайта
- **ads:** - Рекламные блоки
- **analytics:** - Аналитика

### Примеры коммитов
```bash
git commit -m "feat(ui): добавить компонент Header с навигацией"
git commit -m "fix(api): исправить ошибку в получении данных"
git commit -m "docs(content): обновить README с новыми инструкциями"
git commit -m "style(ui): улучшить отзывчивость мобильной версии"
git commit -m "refactor(ads): оптимизировать загрузку рекламных блоков"
git commit -m "test(api): добавить тесты для функции авторизации"
git commit -m "chore(deps): обновить Next.js до версии 14"
```

## GitHub Releases

### Создание релиза
1. Перейти в раздел Releases на GitHub
2. Нажать "Create a new release"
3. Выбрать тег (например, v1.0.0)
4. Заполнить заголовок и описание
5. Добавить файлы (если нужно)
6. Опубликовать релиз

### Структура описания релиза
```markdown
## 🎉 Новые функции
- Добавлен компонент Header
- Реализована система навигации
- Добавлены рекламные блоки РСЯ

## 🐛 Исправления
- Исправлена ошибка в мобильной версии
- Оптимизирована загрузка страниц

## 📝 Документация
- Обновлен README.md
- Добавлены инструкции по развертыванию

## 🔧 Технические изменения
- Обновлен Next.js до версии 14
- Добавлены новые зависимости
```

## Правила и рекомендации

### Общие правила
1. **Никогда не коммитить напрямую в master**
2. **Всегда создавать feature ветки от develop**
3. **Регулярно обновлять develop**
4. **Использовать понятные названия веток**
5. **Писать подробные сообщения коммитов**

### Названия веток
- **feature/*** - для новых функций
- **hotfix/*** - для срочных исправлений
- **release/*** - для подготовки релизов
- **docs/*** - для документации

### Примеры названий веток
```
feature/header-component
feature/seo-optimization
feature/ads-integration
hotfix/login-bug
release/v1.0.0
docs/api-documentation
```

### Работа с конфликтами
1. **При merge конфликтах:**
   ```bash
   git status  # посмотреть конфликтующие файлы
   # Решить конфликты вручную
   git add .   # добавить разрешенные файлы
   git commit  # завершить merge
   ```

2. **При rebase конфликтах:**
   ```bash
   git rebase --continue  # после разрешения конфликтов
   # или
   git rebase --abort     # отменить rebase
   ```

## Инструменты и настройки

### Git hooks
Создать файл `.git/hooks/pre-commit`:
```bash
#!/bin/sh
# Проверка линтера
npm run lint
# Проверка типов
npm run type-check
```

### Алиасы Git
Добавить в `~/.gitconfig`:
```ini
[alias]
    st = status
    co = checkout
    br = branch
    ci = commit
    lg = log --oneline --graph
    unstage = reset HEAD --
    last = log -1 HEAD
```

### Настройка .gitignore
Убедиться, что в `.gitignore` включены:
- `node_modules/`
- `.env*`
- `.next/`
- `build/`
- `dist/`
- `*.log`

## Мониторинг и аналитика

### Метрики для отслеживания
- Количество коммитов в день/неделю
- Время от создания feature до merge
- Количество конфликтов при merge
- Время от merge до релиза

### Инструменты
- **GitHub Insights** - аналитика репозитория
- **GitKraken** - визуальный Git клиент
- **SourceTree** - альтернативный GUI клиент
- **GitHub Desktop** - простой GUI клиент

## Troubleshooting

### Частые проблемы и решения

#### 1. Случайный коммит в master
```bash
# Создать новую ветку с коммитом
git checkout -b feature/save-commit
git checkout master
git reset --hard HEAD~1
```

#### 2. Потеря изменений
```bash
# Поиск потерянных коммитов
git reflog
# Восстановление
git checkout -b recovery <commit-hash>
```

#### 3. Неправильный merge
```bash
# Отмена последнего merge
git reset --hard HEAD~1
# Или отмена конкретного merge
git revert <merge-commit-hash>
```

#### 4. Большой файл в истории
```bash
# Удаление файла из истории
git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch path/to/file' \
  --prune-empty --tag-name-filter cat -- --all
```

## Заключение

Следование этому workflow обеспечит:
- ✅ Стабильную разработку
- ✅ Четкую историю изменений
- ✅ Простое отслеживание багов
- ✅ Эффективную командную работу
- ✅ Качественные релизы 