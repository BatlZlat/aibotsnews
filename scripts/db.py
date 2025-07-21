import os
import asyncpg
from dotenv import load_dotenv

load_dotenv()

DB_CONFIG = {
    'user': os.getenv('PGUSER'),
    'password': os.getenv('PGPASSWORD'),
    'database': os.getenv('PGDATABASE'),
    'host': os.getenv('PGHOST'),
    'port': os.getenv('PGPORT', 5432)
}

class Database:
    def __init__(self):
        self.pool = None

    async def connect(self):
        self.pool = await asyncpg.create_pool(**DB_CONFIG)

    async def close(self):
        if self.pool:
            await self.pool.close()

    async def fetch(self, query, *args):
        async with self.pool.acquire() as conn:
            return await conn.fetch(query, *args)

    async def execute(self, query, *args):
        async with self.pool.acquire() as conn:
            return await conn.execute(query, *args)

    async def log_event(self, event_type, message):
        await self.execute(
            'INSERT INTO logs (event_type, message) VALUES ($1, $2)',
            event_type, message
        )

db = Database() 