import asyncio
from aiogram import Bot, Dispatcher, types
from aiogram.filters import Command
from config import config
from db import db

bot = Bot(token=config.TELEGRAM_TOKEN)
dp = Dispatcher()

ADMIN_IDS = set(config.ADMIN_IDS)

@dp.message(Command('start'))
async def cmd_start(message: types.Message):
    if message.from_user.id not in ADMIN_IDS:
        await message.answer('Доступ запрещён.')
        return
    await message.answer('Добро пожаловать в админ-бота!')

# TODO: Добавить команды для модерации, просмотра и публикации статей

async def main():
    await db.connect()
    await dp.start_polling(bot)
    await db.close()

if __name__ == '__main__':
    asyncio.run(main()) 