#!/usr/bin/env python3
"""
Скрипт для получения Telegram ID пользователя
"""

import requests
import json

def get_telegram_id(bot_token):
    """Получает информацию о боте и показывает как получить ID пользователя"""
    try:
        # Получаем информацию о боте
        url = f"https://api.telegram.org/bot{bot_token}/getMe"
        response = requests.get(url)
        
        if response.status_code == 200:
            bot_info = response.json()
            print("✅ Бот найден:")
            print(f"   Имя: {bot_info['result']['first_name']}")
            print(f"   Username: @{bot_info['result']['username']}")
            print(f"   ID бота: {bot_info['result']['id']}")
            print()
            print("📋 Как получить ваш Telegram ID:")
            print("1. Найдите бота @userinfobot в Telegram")
            print("2. Отправьте ему команду /start")
            print("3. Он покажет ваш ID (например: 123456789)")
            print("4. Добавьте этот ID в секрет ADMIN_IDS в GitHub")
            print()
            print("🔗 Или используйте этот бот для получения ID:")
            print("   https://t.me/userinfobot")
            
        else:
            print(f"❌ Ошибка получения информации о боте: {response.status_code}")
            print("Проверьте правильность TELEGRAM_TOKEN")
            
    except Exception as e:
        print(f"❌ Ошибка: {e}")

def test_bot_connection(bot_token, chat_id):
    """Тестирует подключение к боту"""
    try:
        url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
        data = {
            "chat_id": chat_id,
            "text": "🧪 Тестовое сообщение от скрипта"
        }
        
        response = requests.post(url, json=data)
        
        if response.status_code == 200:
            print("✅ Сообщение отправлено успешно!")
            print("Проверьте Telegram - должно прийти тестовое сообщение")
        else:
            result = response.json()
            print(f"❌ Ошибка отправки: {response.status_code}")
            print(f"Описание: {result.get('description', 'Неизвестная ошибка')}")
            
            if response.status_code == 400:
                print("Возможные причины:")
                print("- Неверный chat_id")
                print("- Бот заблокирован пользователем")
                print("- Бот не добавлен в чат")
                
    except Exception as e:
        print(f"❌ Ошибка: {e}")

def main():
    print("🔍 ПРОВЕРКА TELEGRAM БОТА")
    print("=" * 40)
    
    # Запрашиваем токен бота
    bot_token = input("Введите TELEGRAM_TOKEN: ").strip()
    
    if not bot_token:
        print("❌ Токен не введен")
        return
    
    print()
    get_telegram_id(bot_token)
    
    print()
    print("🧪 ТЕСТИРОВАНИЕ ОТПРАВКИ")
    print("=" * 40)
    
    # Запрашиваем chat_id для тестирования
    chat_id = input("Введите ваш Telegram ID для тестирования (или Enter для пропуска): ").strip()
    
    if chat_id:
        test_bot_connection(bot_token, chat_id)
    else:
        print("⏭️  Тестирование пропущено")

if __name__ == "__main__":
    main() 