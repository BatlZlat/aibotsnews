import re

BLACKLIST = [
    'http', 'https', 'www', 'casino', 'porn', 'viagra', 'кредит', 'заработок', 'деньги',
    # Добавьте свои слова/фразы
]

MIN_LENGTH = 5
MAX_LINKS = 2


def is_spam(text):
    # Проверка на минимальную длину
    if len(text.strip()) < MIN_LENGTH:
        return True
    # Проверка на количество ссылок
    if len(re.findall(r'https?://', text)) > MAX_LINKS:
        return True
    # Проверка на запрещённые слова
    for word in BLACKLIST:
        if word in text.lower():
            return True
    return False 