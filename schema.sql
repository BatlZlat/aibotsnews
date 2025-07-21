-- Схема базы данных для проекта "ИИ Боты" (aibotsnews)
-- Создание таблиц и триггеров

-- 1. Источники для парсинга статей
CREATE TABLE IF NOT EXISTS sources (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    url TEXT NOT NULL UNIQUE,
    type TEXT NOT NULL, -- rss, api, html
    language TEXT DEFAULT 'en',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Публикации
CREATE TABLE IF NOT EXISTS publications (
    id SERIAL PRIMARY KEY,
    source_id INTEGER REFERENCES sources(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    content TEXT NOT NULL,
    category TEXT NOT NULL, -- news, review, comparison, guide, rating
    status TEXT NOT NULL DEFAULT 'draft', -- draft, published, rejected
    published_at TIMESTAMP,
    moderated_by BIGINT, -- Telegram ID админа
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Логи
CREATE TABLE IF NOT EXISTS logs (
    id SERIAL PRIMARY KEY,
    event_type TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Внешние ссылки (на изучаемые/парсимые ресурсы)
CREATE TABLE IF NOT EXISTS external_links (
    id SERIAL PRIMARY KEY,
    url TEXT NOT NULL UNIQUE,
    status TEXT NOT NULL DEFAULT 'new', -- new, checked, ignored
    last_checked TIMESTAMP
);

-- Триггер: обновление updated_at при изменении публикации
CREATE OR REPLACE FUNCTION update_publication_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_publication_updated_at
BEFORE UPDATE ON publications
FOR EACH ROW
EXECUTE FUNCTION update_publication_updated_at(); 