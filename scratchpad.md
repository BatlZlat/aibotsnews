# Scratchpad: Ход разработки проекта "ИИ Боты"

## 1. Проектирование и планирование
- Составлен подробный план архитектуры и структуры каталогов.
- Определены основные модули: парсеры (RSS, HTML, API), обработка контента (AI-перевод, уникальность, SEO, автоформат), модерация (Telegram-бот, VK-постер, защита от спама), планировщик задач, работа с PostgreSQL.

## 2. База данных
- Создан файл `schema.sql` с таблицами: sources, publications, logs, external_links.
- Реализован триггер для автоматического обновления поля `updated_at` в публикациях.
- Схема применена к базе PostgreSQL `aibotsnews`.

## 3. Базовые модули Python
- `db.py` — асинхронная работа с PostgreSQL, логирование событий.
- `config.py` — загрузка и валидация настроек из `.env`.
- `utils.py` — генерация slug, работа с датой/временем, обработка ошибок.

## 4. Парсеры
- `fetch_sources.py` — добавление источников в базу через CLI.
- `parser/rss_parser.py` — асинхронный парсер RSS, сохраняет черновики публикаций.
- `parser/html_parser.py` — асинхронный парсер HTML-страниц (BeautifulSoup, aiohttp).
- `parser/api_parser.py` — асинхронный парсер API-источников (aiohttp).

## 5. Обработка контента
- `content/ai_translate.py` — заготовка для AI-перевода (интерфейс).
- `content/uniqueness.py` — заготовка для проверки уникальности текста (интерфейс).
- `content/seo_adapt.py` — заготовка для SEO-адаптации текста (интерфейс).
- `content/formatter.py` — автоформатирование текста: заголовки, абзацы, жирный, курсив (эвристики).

## 6. Модерация и публикация
- `moderation/telegram_bot.py` — асинхронный Telegram-бот для модерации публикаций, авторизация по admin_ids.
- `moderation/vk_poster.py` — заготовка для публикации статей в VK.
- `moderation/spam_protect.py` — модуль защиты от спама в комментариях (эвристики: длина, ссылки, чёрный список).

## 7. Планировщик задач
- `scheduler.py` — планировщик на APScheduler для периодического запуска парсеров и других задач.

## 8. Frontend
- Исправлена ошибка в `src/app/page.tsx` (удалён несуществующий вывод `g.icon`).

## 9. Документация
- Подготовлен README.md с инструкциями по запуску и описанием структуры проекта.

## 10. Сбор и добавление источников
- Проведён ручной и автоматизированный поиск живых AI-ресурсов по всему миру (Европа, США, Азия, Латинская Америка, Ближний Восток, Австралия, Африка, Восточная Европа и др.).
- В базу добавлено 50+ уникальных источников: блоги, каталоги, новостные порталы, рейтинги, обзоры (с указанием языка и региона).
- Источники охватывают англоязычные, испанские, португальские, китайские, японские, корейские, арабские, польские, украинские, русские и другие сегменты.

---

**Следующие шаги (хронология релиза и развития):**
1. Создать и оформить репозиторий на GitHub
2. Настроить деплой на продакшен-сервер
3. Прописать домен и настроить SSL
4. Настроить Яндекс.Метрику и Google Analytics
5. Подключить рекламные блоки (РСЯ, партнерки)
6. Проверить robots.txt, sitemap.xml, базовые SEO-настройки
7. Зафиксировать релиз (отметить в документации)
8. Параллельно:
   - Интеграция AI-перевода, антиплагиата, SEO-адаптации
   - Расширение Telegram-бота (модерация, публикация, редактирование)
   - Тестирование пайплайна и автоматизация публикаций
   - Улучшение автоформатирования и SEO-адаптации
   - (Опционально) улучшения фронтенда, комментарии, динамический год, защита от копирования 