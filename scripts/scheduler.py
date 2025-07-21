import asyncio
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from parser.rss_parser import parse_rss_source
from parser.html_parser import parse_html_source
from parser.api_parser import parse_api_source

# Пример расписания: список источников (id, url, тип, категория)
SOURCES = [
    # (source_id, url, 'rss'/'html'/'api', category)
    #(1, 'https://example.com/rss', 'rss', 'news'),
    #(2, 'https://example.com/page', 'html', 'review'),
    #(3, 'https://api.example.com/posts', 'api', 'news'),
]

async def run_parsers():
    for source_id, url, type_, category in SOURCES:
        if type_ == 'rss':
            await parse_rss_source(source_id, url, category)
        elif type_ == 'html':
            await parse_html_source(source_id, url, category)
        elif type_ == 'api':
            await parse_api_source(source_id, url, category)

if __name__ == '__main__':
    scheduler = AsyncIOScheduler()
    scheduler.add_job(lambda: asyncio.create_task(run_parsers()), 'interval', hours=12)
    scheduler.start()
    print('Scheduler started. Press Ctrl+C to exit.')
    try:
        asyncio.get_event_loop().run_forever()
    except (KeyboardInterrupt, SystemExit):
        pass 