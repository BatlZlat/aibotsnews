import asyncio
import feedparser
from db import db
from utils import slugify, now_yekaterinburg

async def parse_rss_source(source_id, url, category='news'):
    await db.connect()
    feed = feedparser.parse(url)
    for entry in feed.entries:
        title = entry.title
        slug = slugify(title)
        content = entry.get('summary', '')
        published_at = now_yekaterinburg()
        await db.execute(
            'INSERT INTO publications (source_id, title, slug, content, category, status, published_at) VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT (slug) DO NOTHING',
            source_id, title, slug, content, category, 'draft', published_at
        )
    await db.close()

# Пример запуска: python rss_parser.py <source_id> <url> [category]
if __name__ == '__main__':
    import sys
    if len(sys.argv) < 3:
        print('Usage: python rss_parser.py <source_id> <url> [category]')
        exit(1)
    source_id = int(sys.argv[1])
    url = sys.argv[2]
    category = sys.argv[3] if len(sys.argv) > 3 else 'news'
    asyncio.run(parse_rss_source(source_id, url, category)) 