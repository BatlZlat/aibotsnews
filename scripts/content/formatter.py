import re

def auto_format(text):
    # Пример автоформатирования: заголовки, абзацы, выделение жирным/курсивом
    # Заголовки (простая эвристика)
    text = re.sub(r'(^|\n)([A-ZА-Я][^\n]{10,80})\n', r'\1\n<h2>\2</h2>\n', text)
    # Абзацы
    text = re.sub(r'(?<!</h2>)(\n{2,})', r'</p><p>', text)
    text = f'<p>{text}</p>'
    # Жирный (простая эвристика)
    text = re.sub(r'\*\*(.*?)\*\*', r'<b>\1</b>', text)
    # Курсив
    text = re.sub(r'\*(.*?)\*', r'<i>\1</i>', text)
    return text 