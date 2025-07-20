# 🚀 Быстрый старт проекта

## 📁 Директория проекта
```bash
/home/dan/Project/Landing /AI bots
```

## ⚡ Быстрый запуск
```bash
# 1. Перейти в директорию
cd "/home/dan/Project/Landing /AI bots"

# 2. Запустить проект
npm run dev

# 3. Открыть в браузере
# http://localhost:3000
```

## 🔧 Основные команды
```bash
# Разработка
npm run dev          # Запуск dev сервера
npm run build        # Сборка для продакшена
npm run start        # Запуск продакшн сервера

# Проверка кода
npm run lint         # ESLint
npm run type-check   # TypeScript
npm run format       # Prettier

# Git (из директории проекта)
git status           # Статус
git add .            # Добавить изменения
git commit -m "feat: описание"  # Коммит
git push origin develop  # Отправить в репозиторий
```

## 📝 Правила коммитов
```bash
feat:     # Новая функциональность
fix:      # Исправление бага
docs:     # Документация
style:    # Стили и форматирование
refactor: # Рефакторинг
test:     # Тесты
chore:    # Зависимости и конфигурация
```

## 🛠️ Создание компонентов
```bash
# UI компонент
touch src/components/ui/Button.tsx

# Страница
touch src/app/reviews/page.tsx

# Утилита
touch src/utils/helpers.ts
```

## 🔍 Отладка
```bash
# Очистить кэш Next.js
rm -rf .next && npm run dev

# Проверить порт 3000
lsof -i :3000

# Переустановить зависимости
rm -rf node_modules package-lock.json && npm install
```

---
**Полная документация:** `docs/project-setup.md` 