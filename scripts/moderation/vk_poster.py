import aiohttp
from config import config

VK_API_URL = 'https://api.vk.com/method/'
VK_TOKEN = config.VK_TOKEN
VK_API_VERSION = '5.131'

async def post_to_vk(group_id, message, attachments=None):
    url = VK_API_URL + 'wall.post'
    params = {
        'access_token': VK_TOKEN,
        'v': VK_API_VERSION,
        'owner_id': f'-{group_id}',
        'message': message,
    }
    if attachments:
        params['attachments'] = ','.join(attachments)
    async with aiohttp.ClientSession() as session:
        async with session.post(url, data=params) as resp:
            return await resp.json()

# TODO: Добавить выбор и утверждение изображения, обработку ошибок, логирование 