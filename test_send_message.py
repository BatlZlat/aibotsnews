#!/usr/bin/env python3
"""
Тест отправки сообщения через Telegram бота
"""

import requests

def test_send_message():
    bot_token = "7773852709:AAHVkjcwHri8FHdGiB1fI74gSB9xJejjQ-k"
    chat_id = "546668421"  # Ваш ID
    
    print("🧪 ТЕСТ ОТПРАВКИ СООБЩЕНИЯ")
    print("=" * 40)
    
    url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
    data = {
        "chat_id": chat_id,
        "text": "🎉 Тест: Сообщение от GitHub Actions работает!"
    }
    
    print(f"📤 Отправляем сообщение в чат {chat_id}...")
    
    response = requests.post(url, json=data)
    
    if response.status_code == 200:
        result = response.json()
        print("✅ Сообщение отправлено успешно!")
        print(f"📨 ID сообщения: {result['result']['message_id']}")
        print("📱 Проверьте Telegram - должно прийти сообщение")
    else:
        result = response.json()
        print(f"❌ Ошибка отправки: {response.status_code}")
        print(f"Описание: {result.get('description', 'Неизвестная ошибка')}")

if __name__ == "__main__":
    test_send_message() 