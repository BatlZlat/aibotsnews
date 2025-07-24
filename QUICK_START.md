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

## Настройка продакшн-сервера и деплой (Nginx, SSL, systemd)

### 1. Конфигурация Nginx для aibotsnews.ru

- Создайте конфиг-файл:
  ```bash
  nano /etc/nginx/sites-available/aibotsnews.ru
  ```
- Пример конфига (замените порт, если нужно):
  ```nginx
  server {
      listen 80;
      server_name aibotsnews.ru www.aibotsnews.ru;

      location / {
          proxy_pass http://127.0.0.1:3000;
          proxy_set_header Host $host;
          proxy_set_header X-Real-IP $remote_addr;
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
          proxy_set_header X-Forwarded-Proto $scheme;
      }
  }
  ```
- Активируйте сайт:
  ```bash
  ln -s /etc/nginx/sites-available/aibotsnews.ru /etc/nginx/sites-enabled/
  nginx -t
  systemctl reload nginx
  ```

### 2. Получение и включение бесплатного SSL-сертификата (Let's Encrypt)

- Установите certbot:
  ```bash
  apt update
  apt install certbot python3-certbot-nginx
  ```
- Получите сертификат и включите HTTPS:
  ```bash
  certbot --nginx -d aibotsnews.ru -d www.aibotsnews.ru
  ```
- Certbot автоматически добавит SSL-конфиг и перезапустит Nginx.

### 3. Автоматическое продление SSL

- Certbot настраивает автоматическое продление через systemd timer или cron.
- Проверить статус можно так:
  ```bash
  systemctl list-timers | grep certbot
  certbot renew --dry-run
  ```

### 4. Автозапуск Next.js приложения (systemd)

- Создайте unit-файл systemd:
  ```bash
  nano /etc/systemd/system/aibotsnews.service
  ```
- Пример содержимого:
  ```ini
  [Unit]
  Description=AI Bots News Next.js App
  After=network.target

  [Service]
  Type=simple
  User=root
  WorkingDirectory=/root/project/Landing/AI-bots
  Environment=NODE_ENV=production
  Environment=PORT=3000
  ExecStart=/usr/bin/npm run start
  Restart=always
  RestartSec=10

  [Install]
  WantedBy=multi-user.target
  ```
- Включите и запустите сервис:
  ```bash
  systemctl daemon-reload
  systemctl enable aibotsnews.service
  systemctl start aibotsnews.service
  systemctl status aibotsnews.service
  ```

---

**Результат:**
- Сайт aibotsnews.ru доступен по HTTPS с валидным SSL-сертификатом.
- Next.js приложение автоматически запускается после перезагрузки сервера.
- Nginx проксирует запросы к приложению и завершает SSL.
- Сертификаты SSL продлеваются автоматически.

Если нужно добавить ещё проекты — повторите шаги с новыми конфигами и портами.

---
**Полная документация:** `docs/project-setup.md` 