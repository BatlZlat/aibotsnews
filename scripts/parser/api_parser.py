import asyncio
import aiohttp
from db import db
from utils import slugify, now_yekaterinburg

async def fetch_api(url, headers=None):
    async with aiohttp.ClientSession() as session:
        async with session.get(url, headers=headers) as resp:
            return await resp.json()

async def parse_api_source(source_id, url, category='news', title_key='title', content_key='content'):
    await db.connect()
    data = await fetch_api(url)
    for item in data:
        title = item.get(title_key, 'No title')
        slug = slugify(title)
        content = item.get(content_key, '')
        published_at = now_yekaterinburg()
        await db.execute(
            'INSERT INTO publications (source_id, title, slug, content, category, status, published_at) VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT (slug) DO NOTHING',
            source_id, title, slug, content, category, 'draft', published_at
        )
    await db.close()

# Пример запуска: python api_parser.py <source_id> <url> [category] [title_key] [content_key]
if __name__ == '__main__':
    import sys
    if len(sys.argv) < 3:
        print('Usage: python api_parser.py <source_id> <url> [category] [title_key] [content_key]')
        exit(1)
    source_id = int(sys.argv[1])
    url = sys.argv[2]
    category = sys.argv[3] if len(sys.argv) > 3 else 'news'
    title_key = sys.argv[4] if len(sys.argv) > 4 else 'title'
    content_key = sys.argv[5] if len(sys.argv) > 5 else 'content'
    asyncio.run(parse_api_source(source_id, url, category, title_key, content_key)) 