#!/usr/bin/env python3
"""
Простой тест Telegram бота
"""

import requests

def test_telegram():
    bot_token = "7773852709:AAHVkjcwHri8FHdGiB1fI74gSB9xJejjQ-k"
    
    print("🔍 ТЕСТ TELEGRAM БОТА")
    print("=" * 30)
    
    # 1. Проверяем информацию о боте
    print("1. Проверяем информацию о боте...")
    url = f"https://api.telegram.org/bot{bot_token}/getMe"
    response = requests.get(url)
    
    if response.status_code == 200:
        bot_info = response.json()['result']
        print(f"✅ Бот: {bot_info['first_name']} (@{bot_info['username']})")
    else:
        print(f"❌ Ошибка: {response.status_code}")
        return
    
    # 2. Проверяем обновления
    print("\n2. Проверяем обновления...")
    url = f"https://api.telegram.org/bot{bot_token}/getUpdates"
    response = requests.get(url)
    
    if response.status_code == 200:
        updates = response.json()['result']
        print(f"📨 Найдено обновлений: {len(updates)}")
        
        if updates:
            for update in updates:
                if 'message' in update:
                    chat_id = update['message']['chat']['id']
                    user_name = update['message']['from'].get('first_name', 'Unknown')
                    print(f"   👤 {user_name} (ID: {chat_id})")
        else:
            print("   📝 Нет обновлений. Отправьте /start боту @AIbotsNews_bot")
    else:
        print(f"❌ Ошибка получения обновлений: {response.status_code}")
    
    # 3. Инструкции
    print("\n📋 ИНСТРУКЦИИ:")
    print("1. Найдите бота @AIbotsNews_bot в Telegram")
    print("2. Нажмите 'Start' или отправьте /start")
    print("3. Запустите этот скрипт снова для получения вашего ID")
    print("4. Добавьте ID в секрет ADMIN_IDS в GitHub")

if __name__ == "__main__":
    test_telegram() 