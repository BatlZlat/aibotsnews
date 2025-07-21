import asyncio
from db import db

async def add_source(name, url, type_, language='en'):
    await db.connect()
    await db.execute(
        'INSERT INTO sources (name, url, type, language) VALUES ($1, $2, $3, $4) ON CONFLICT (url) DO NOTHING',
        name, url, type_, language
    )
    await db.close()

if __name__ == '__main__':
    import sys
    if len(sys.argv) < 4:
        print('Usage: python fetch_sources.py <name> <url> <type> [language]')
        exit(1)
    name, url, type_ = sys.argv[1:4]
    language = sys.argv[4] if len(sys.argv) > 4 else 'en'
    asyncio.run(add_source(name, url, type_, language)) 