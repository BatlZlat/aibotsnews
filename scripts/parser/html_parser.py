import asyncio
import aiohttp
from bs4 import BeautifulSoup
from db import db
from utils import slugify, now_yekaterinburg

async def fetch_html(url):
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as resp:
            return await resp.text()

async def parse_html_source(source_id, url, category='news', selector_title='h1', selector_content='article'):
    await db.connect()
    html = await fetch_html(url)
    soup = BeautifulSoup(html, 'html.parser')
    title = soup.select_one(selector_title).get_text(strip=True) if soup.select_one(selector_title) else 'No title'
    content = soup.select_one(selector_content).get_text(strip=True) if soup.select_one(selector_content) else ''
    slug = slugify(title)
    published_at = now_yekaterinburg()
    await db.execute(
        'INSERT INTO publications (source_id, title, slug, content, category, status, published_at) VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT (slug) DO NOTHING',
        source_id, title, slug, content, category, 'draft', published_at
    )
    await db.close()

# Пример запуска: python html_parser.py <source_id> <url> [category] [selector_title] [selector_content]
if __name__ == '__main__':
    import sys
    if len(sys.argv) < 3:
        print('Usage: python html_parser.py <source_id> <url> [category] [selector_title] [selector_content]')
        exit(1)
    source_id = int(sys.argv[1])
    url = sys.argv[2]
    category = sys.argv[3] if len(sys.argv) > 3 else 'news'
    selector_title = sys.argv[4] if len(sys.argv) > 4 else 'h1'
    selector_content = sys.argv[5] if len(sys.argv) > 5 else 'article'
    asyncio.run(parse_html_source(source_id, url, category, selector_title, selector_content)) 