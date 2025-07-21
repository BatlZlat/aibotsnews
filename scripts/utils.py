import re
import unicodedata
from datetime import datetime, timezone, timedelta

# Генерация slug из строки

def slugify(value):
    value = str(value)
    value = unicodedata.normalize('NFKD', value).encode('ascii', 'ignore').decode('ascii')
    value = re.sub(r'[^\w\s-]', '', value).strip().lower()
    return re.sub(r'[-\s]+', '-', value)

# Получить текущее время в Asia/Yekaterinburg

def now_yekaterinburg():
    tz = timezone(timedelta(hours=5))
    return datetime.now(tz)

# Обработка ошибок

def log_exception(db, event_type, exc):
    import traceback
    msg = f"{exc}\n{traceback.format_exc()}"
    return db.log_event(event_type, msg) 