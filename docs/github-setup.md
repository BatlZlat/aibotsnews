# Настройка GitHub репозитория

## Шаг 1: Авторизация в GitHub CLI

```bash
# Авторизация в GitHub
gh auth login

# Выберите:
# 1. GitHub.com
# 2. HTTPS
# 3. Yes (authenticate Git with your GitHub credentials)
# 4. Login with a web browser
```

## Шаг 2: Создание репозитория

### Вариант A: Через GitHub CLI (рекомендуется)
```bash
# Создание приватного репозитория
gh repo create ai-bots-landing --private --description "Современный сайт-блог для обзоров ИИ ботов" --source=. --remote=origin --push

# Или создание публичного репозитория
gh repo create ai-bots-landing --public --description "Современный сайт-блог для обзоров ИИ ботов" --source=. --remote=origin --push
```

### Вариант B: Через веб-интерфейс GitHub
1. Перейти на https://github.com/new
2. Заполнить форму:
   - **Repository name:** `ai-bots-landing`
   - **Description:** `Современный сайт-блог для обзоров ИИ ботов`
   - **Visibility:** Private (рекомендуется)
   - **Initialize this repository with:** НЕ отмечать (у нас уже есть файлы)
3. Нажать "Create repository"
4. Следовать инструкциям для подключения существующего репозитория

## Шаг 3: Подключение к удаленному репозиторию

```bash
# Добавление удаленного репозитория
git remote add origin https://github.com/YOUR_USERNAME/ai-bots-landing.git

# Проверка удаленных репозиториев
git remote -v

# Push в develop ветку
git push -u origin develop

# Push в master ветку
git checkout master
git push -u origin master

# Возврат в develop
git checkout develop
```

## Шаг 4: Настройка защиты веток

### В GitHub репозитории:
1. Перейти в Settings → Branches
2. Нажать "Add rule"
3. Настроить правила для `master`:
   - ✅ Require a pull request before merging
   - ✅ Require approvals: 1
   - ✅ Dismiss stale PR approvals when new commits are pushed
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging
4. Настроить правила для `develop`:
   - ✅ Require a pull request before merging
   - ✅ Require approvals: 1

## Шаг 5: Настройка GitHub Actions (опционально)

Создать файл `.github/workflows/ci.yml`:

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ develop, master ]
  pull_request:
    branches: [ develop, master ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run linter
      run: npm run lint
    
    - name: Run type check
      run: npm run type-check
    
    - name: Build project
      run: npm run build
    
    - name: Run tests
      run: npm test
```

## Шаг 6: Настройка GitHub Pages (для демо)

### В настройках репозитория:
1. Settings → Pages
2. Source: Deploy from a branch
3. Branch: `gh-pages` (создать отдельную ветку)
4. Folder: `/ (root)`

### Создание gh-pages ветки:
```bash
# Создание ветки для GitHub Pages
git checkout -b gh-pages
git push -u origin gh-pages

# Возврат в develop
git checkout develop
```

## Шаг 7: Настройка релизов

### Создание первого релиза:
1. Перейти в раздел Releases
2. Нажать "Create a new release"
3. Заполнить:
   - **Tag version:** `v0.1.0`
   - **Release title:** `Initial Project Setup`
   - **Description:**
   ```markdown
   ## 🎉 Первый релиз
   
   ### Что добавлено:
   - Базовая структура проекта
   - Git workflow документация
   - README с описанием проекта
   - Настройка .gitignore
   
   ### Технические детали:
   - Инициализирован Git репозиторий
   - Настроены ветки master/develop
   - Добавлена документация проекта
   ```

## Шаг 8: Настройка уведомлений

### В настройках репозитория:
1. Settings → Notifications
2. Настроить уведомления для:
   - Pull requests
   - Issues
   - Releases
   - Security alerts

## Шаг 9: Добавление участников (если нужно)

### В настройках репозитория:
1. Settings → Collaborators
2. Нажать "Add people"
3. Ввести username или email
4. Выбрать роль (Admin, Maintain, Write, Triage, Read)

## Проверка настройки

```bash
# Проверка статуса
git status

# Проверка удаленных репозиториев
git remote -v

# Проверка веток
git branch -a

# Проверка последних коммитов
git log --oneline -5
```

## Возможные проблемы и решения

### Проблема: "Permission denied"
```bash
# Проверка SSH ключей
ssh -T git@github.com

# Если нет SSH ключа, создать:
ssh-keygen -t ed25519 -C "your_email@example.com"
# Добавить ключ в GitHub Settings → SSH and GPG keys
```

### Проблема: "Repository not found"
- Проверить правильность URL репозитория
- Убедиться, что репозиторий создан
- Проверить права доступа

### Проблема: "Branch protection rules"
- Убедиться, что правила защиты настроены правильно
- Проверить права доступа к репозиторию

## Следующие шаги

После настройки GitHub репозитория:
1. ✅ Перейти к настройке Next.js проекта
2. ✅ Создать базовую структуру компонентов
3. ✅ Настроить SEO оптимизацию
4. ✅ Подготовить к деплою

---

**Статус:** Готово к выполнению  
**Сложность:** Низкая  
**Время:** 15-30 минут 