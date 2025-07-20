# Инструкции по работе с проектом

## 📁 Структура проекта

```
AI bots/
├── .cursor/                 # Документация проекта
├── docs/                    # Документация
├── src/                     # Исходный код
│   ├── app/                 # Next.js App Router
│   ├── components/          # React компоненты
│   ├── types/              # TypeScript типы
│   ├── utils/              # Утилиты
│   └── hooks/              # React хуки
├── content/                 # Контент сайта
├── public/                  # Статические файлы
├── package.json            # Зависимости проекта
├── README.md               # Описание проекта
└── .gitignore              # Исключения Git
```

## 🚀 Запуск проекта

### Требования
- Node.js 18+
- npm или yarn
- Git

### Установка и запуск

```bash
# 1. Перейти в директорию проекта
cd "/home/dan/Project/Landing /AI bots"

# 2. Установить зависимости (если еще не установлены)
npm install

# 3. Запустить проект в режиме разработки
npm run dev
```

### Доступ к проекту
После запуска проект будет доступен по адресу: **http://localhost:3000**

## 🔧 Команды для разработки

### Основные команды
```bash
# Запуск в режиме разработки
npm run dev

# Сборка для продакшена
npm run build

# Запуск продакшн сервера
npm run start

# Проверка кода линтером
npm run lint

# Проверка типов TypeScript
npm run type-check

# Форматирование кода
npm run format

# Проверка форматирования
npm run format:check
```

### Git команды
```bash
# Перейти в директорию проекта
cd "/home/dan/Project/Landing /AI bots"

# Проверить статус
git status

# Добавить все изменения
git add .

# Создать коммит
git commit -m "feat: описание изменений"

# Отправить изменения в репозиторий
git push origin develop

# Переключиться на другую ветку
git checkout master
git checkout develop
```

## 📝 Работа с Git

### Директория для коммитов
**Всегда создавайте коммиты из директории:**
```bash
/home/dan/Project/Landing /AI bots
```

### Правила коммитов
```bash
# Новые функции
git commit -m "feat: добавить новый компонент Header"

# Исправления багов
git commit -m "fix: исправить ошибку в навигации"

# Документация
git commit -m "docs: обновить README"

# Стили и форматирование
git commit -m "style: улучшить отзывчивость мобильной версии"

# Рефакторинг
git commit -m "refactor: оптимизировать загрузку компонентов"

# Тесты
git commit -m "test: добавить тесты для компонента Button"

# Зависимости
git commit -m "chore: обновить Next.js до версии 15"
```

### Workflow веток
```bash
# Основные ветки
master    # Продакшн версия
develop   # Основная ветка разработки

# Создание feature ветки
git checkout develop
git pull origin develop
git checkout -b feature/new-feature

# Завершение feature
git checkout develop
git merge feature/new-feature
git branch -d feature/new-feature
```

## 🛠️ Разработка

### Структура компонентов
```bash
src/components/
├── ui/           # Базовые UI компоненты
├── layout/       # Компоненты макета
├── content/      # Компоненты контента
└── ads/          # Рекламные компоненты
```

### Создание нового компонента
```bash
# 1. Создать файл компонента
touch src/components/ui/Button.tsx

# 2. Написать код компонента

# 3. Добавить в Git
git add src/components/ui/Button.tsx
git commit -m "feat(ui): добавить компонент Button"
```

### Добавление новых страниц
```bash
# 1. Создать файл страницы
touch src/app/reviews/page.tsx

# 2. Написать код страницы

# 3. Добавить в Git
git add src/app/reviews/page.tsx
git commit -m "feat(pages): добавить страницу обзоров"
```

## 🔍 Отладка

### Просмотр логов
```bash
# Логи Next.js
npm run dev

# Логи сборки
npm run build

# Проверка типов
npm run type-check
```

### Проверка кода
```bash
# ESLint
npm run lint

# Prettier
npm run format:check

# TypeScript
npm run type-check
```

## 📦 Управление зависимостями

### Установка новых пакетов
```bash
# Продакшн зависимости
npm install package-name

# Dev зависимости
npm install --save-dev package-name

# Глобальные зависимости
npm install -g package-name
```

### Обновление зависимостей
```bash
# Проверить устаревшие пакеты
npm outdated

# Обновить все пакеты
npm update

# Обновить конкретный пакет
npm install package-name@latest
```

## 🚀 Деплой

### Сборка для продакшена
```bash
# Создать продакшн сборку
npm run build

# Запустить продакшн сервер
npm run start
```

### Проверка сборки
```bash
# Проверить, что сборка работает
npm run build
npm run start

# Открыть http://localhost:3000
```

## 📊 Мониторинг

### Проверка производительности
```bash
# Анализ размера бандла
npm run build
# Посмотреть размер .next/static/chunks/

# Проверка Lighthouse
# Открыть Chrome DevTools → Lighthouse
```

### Аналитика
```bash
# Проверить, что аналитика работает
# Открыть консоль браузера
# Проверить gtag и ym события
```

## 🐛 Решение проблем

### Частые проблемы

#### 1. Порт 3000 занят
```bash
# Найти процесс
lsof -i :3000

# Убить процесс
kill -9 PID

# Или использовать другой порт
npm run dev -- -p 3001
```

#### 2. Ошибки TypeScript
```bash
# Проверить типы
npm run type-check

# Перезапустить TypeScript сервер
# В VS Code: Cmd+Shift+P → "TypeScript: Restart TS Server"
```

#### 3. Проблемы с зависимостями
```bash
# Удалить node_modules и переустановить
rm -rf node_modules package-lock.json
npm install
```

#### 4. Проблемы с кэшем Next.js
```bash
# Очистить кэш
rm -rf .next
npm run dev
```

## 📞 Поддержка

### Полезные ссылки
- **Next.js документация:** https://nextjs.org/docs
- **Tailwind CSS:** https://tailwindcss.com/docs
- **TypeScript:** https://www.typescriptlang.org/docs
- **React:** https://react.dev

### Контакты
Для вопросов по проекту обращайтесь к команде разработки.

---

**Последнее обновление:** 2024  
**Версия проекта:** 1.0.0 