#!/usr/bin/env python3
"""
Скрипт для автоматизированной обработки контента
Перевод и адаптация иностранных статей для российского рынка
"""

import requests
import json
import time
import re
from bs4 import BeautifulSoup
from googletrans import Translator
import openai
import os
from datetime import datetime
import hashlib
import random

class ContentProcessor:
    def __init__(self, openai_api_key):
        """
        Инициализация процессора контента
        
        Args:
            openai_api_key (str): API ключ OpenAI для адаптации контента
        """
        self.translator = Translator()
        openai.api_key = openai_api_key
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
    
    def fetch_content(self, url):
        """
        Получение контента с веб-страницы
        
        Args:
            url (str): URL страницы для парсинга
            
        Returns:
            dict: Словарь с заголовком и текстом статьи
        """
        try:
            response = self.session.get(url, timeout=10)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Удаляем ненужные элементы
            for element in soup(['script', 'style', 'nav', 'footer', 'header']):
                element.decompose()
            
            # Извлекаем заголовок
            title = soup.find('h1')
            title_text = title.get_text().strip() if title else "Заголовок не найден"
            
            # Извлекаем основной контент
            content_elements = []
            
            # Ищем основные контентные блоки
            for tag in ['article', 'main', '.content', '.post-content', '.entry-content']:
                elements = soup.select(tag)
                if elements:
                    content_elements.extend(elements)
                    break
            
            # Если не нашли специальные блоки, берем все параграфы
            if not content_elements:
                content_elements = soup.find_all('p')
            
            # Собираем текст
            content_text = ""
            for element in content_elements:
                text = element.get_text().strip()
                if len(text) > 50:  # Фильтруем короткие фрагменты
                    content_text += text + "\n\n"
            
            return {
                'title': title_text,
                'content': content_text,
                'url': url,
                'timestamp': datetime.now().isoformat()
            }
            
        except Exception as e:
            print(f"Ошибка при получении контента с {url}: {e}")
            return None
    
    def translate_text(self, text, target_lang='ru'):
        """
        Перевод текста с помощью Google Translate
        
        Args:
            text (str): Текст для перевода
            target_lang (str): Язык перевода
            
        Returns:
            str: Переведенный текст
        """
        try:
            # Разбиваем длинный текст на части
            max_length = 4000
            parts = [text[i:i+max_length] for i in range(0, len(text), max_length)]
            
            translated_parts = []
            for part in parts:
                if part.strip():
                    translation = self.translator.translate(part, dest=target_lang)
                    translated_parts.append(translation.text)
                    time.sleep(1)  # Задержка между запросами
            
            return ' '.join(translated_parts)
            
        except Exception as e:
            print(f"Ошибка при переводе: {e}")
            return text
    
    def add_unique_elements(self, content):
        """
        Добавление уникальных элементов в контент
        
        Args:
            content (str): Исходный контент
            
        Returns:
            str: Контент с уникальными элементами
        """
        # Российские примеры и кейсы
        russian_examples = [
            "Например, российская компания 'Рога и Копыта' внедрила ИИ бота для обработки клиентских запросов и увеличила скорость ответов на 300%.",
            "В России популярны такие ИИ боты как Yandex.Alice, который используется более чем 50 миллионами пользователей.",
            "Российские разработчики создают уникальные ИИ решения, адаптированные под местный рынок и культуру.",
            "По данным исследования РАЭК, 67% российских компаний планируют внедрить ИИ ботов в ближайшие 2 года.",
            "В российских университетах уже преподают курсы по работе с ИИ ботами, что говорит о растущем спросе на специалистов."
        ]
        
        # Практические советы для российской аудитории
        russian_tips = [
            "При выборе ИИ бота для российского бизнеса учитывайте особенности местного законодательства о персональных данных.",
            "Российские пользователи часто предпочитают ИИ ботов с поддержкой русского языка и пониманием местного контекста.",
            "Для российского рынка важно выбирать ИИ ботов с хорошей техподдержкой на русском языке.",
            "Учитывайте разницу во времени при работе с зарубежными ИИ ботами - это может влиять на скорость ответов.",
            "В России популярны ИИ боты, которые могут работать с кириллицей и понимать русские идиомы."
        ]
        
        # Добавляем случайные уникальные элементы
        if random.random() < 0.3:  # 30% вероятность добавления примера
            example = random.choice(russian_examples)
            content += f"\n\n{example}"
        
        if random.random() < 0.4:  # 40% вероятность добавления совета
            tip = random.choice(russian_tips)
            content += f"\n\n💡 **Совет для российских пользователей:** {tip}"
        
        return content
    
    def rewrite_content_structure(self, content):
        """
        Изменение структуры контента для уникальности
        
        Args:
            content (str): Исходный контент
            
        Returns:
            str: Переписанный контент
        """
        # Разбиваем на параграфы
        paragraphs = content.split('\n\n')
        
        # Перемешиваем порядок некоторых параграфов (кроме первого и последнего)
        if len(paragraphs) > 4:
            middle_paragraphs = paragraphs[1:-1]
            random.shuffle(middle_paragraphs)
            paragraphs = [paragraphs[0]] + middle_paragraphs + [paragraphs[-1]]
        
        # Добавляем подзаголовки
        new_content = ""
        for i, paragraph in enumerate(paragraphs):
            if i == 0:
                new_content += paragraph + "\n\n"
            elif len(paragraph) > 100 and random.random() < 0.3:
                # Добавляем подзаголовок к длинным параграфам
                first_sentence = paragraph.split('.')[0]
                if len(first_sentence) < 100:
                    new_content += f"### {first_sentence}\n\n{paragraph}\n\n"
                else:
                    new_content += paragraph + "\n\n"
            else:
                new_content += paragraph + "\n\n"
        
        return new_content.strip()
    
    def adapt_content_with_ai(self, content, content_type="article"):
        """
        Адаптация контента с помощью OpenAI
        
        Args:
            content (str): Контент для адаптации
            content_type (str): Тип контента (article, review, news, guide)
            
        Returns:
            str: Адаптированный контент
        """
        try:
            prompts = {
                "article": "Адаптируй этот текст для российского читателя. Сделай его более понятным и интересным. Сохрани основную информацию, но измени стиль на более дружелюбный и доступный. Добавь российские примеры и контекст.",
                "review": "Адаптируй этот обзор для российского читателя. Добавь контекст, понятный российской аудитории. Сделай акцент на практической пользе и ценности для российских пользователей. Включи российские кейсы.",
                "news": "Адаптируй эту новость для российского читателя. Объясни контекст и значение события для российской аудитории. Сделай акцент на том, как это влияет на российских пользователей.",
                "guide": "Адаптируй это руководство для российского читателя. Сделай инструкции более понятными и практичными. Добавь примеры, релевантные для российской аудитории."
            }
            
            prompt = prompts.get(content_type, prompts["article"])
            
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "Ты эксперт по адаптации контента для российского рынка. Твоя задача - сделать контент более понятным и релевантным для российской аудитории. Всегда добавляй уникальные российские примеры и контекст."},
                    {"role": "user", "content": f"{prompt}\n\nТекст для адаптации:\n{content[:3000]}"}  # Ограничиваем длину
                ],
                max_tokens=2000,
                temperature=0.8  # Увеличиваем креативность
            )
            
            adapted_content = response.choices[0].message.content
            
            # Добавляем уникальные элементы
            adapted_content = self.add_unique_elements(adapted_content)
            
            # Изменяем структуру
            adapted_content = self.rewrite_content_structure(adapted_content)
            
            return adapted_content
            
        except Exception as e:
            print(f"Ошибка при адаптации с ИИ: {e}")
            return content
    
    def check_uniqueness(self, content):
        """
        Проверка уникальности контента (базовая)
        
        Args:
            content (str): Контент для проверки
            
        Returns:
            dict: Результаты проверки
        """
        # Простая проверка на основе хеша и длины
        content_hash = hashlib.md5(content.encode()).hexdigest()
        content_length = len(content)
        unique_words = len(set(content.lower().split()))
        total_words = len(content.split())
        
        uniqueness_score = (unique_words / total_words) * 100 if total_words > 0 else 0
        
        return {
            'hash': content_hash,
            'length': content_length,
            'unique_words': unique_words,
            'total_words': total_words,
            'uniqueness_score': uniqueness_score,
            'is_unique': uniqueness_score > 70  # Порог уникальности
        }
    
    def optimize_for_seo(self, title, content, keywords):
        """
        SEO-оптимизация контента
        
        Args:
            title (str): Заголовок
            content (str): Контент
            keywords (list): Список ключевых слов
            
        Returns:
            dict: Оптимизированный контент с мета-тегами
        """
        # Оптимизируем заголовок
        if keywords:
            main_keyword = keywords[0]
            if main_keyword.lower() not in title.lower():
                title = f"{title} - {main_keyword}"
        
        # Ограничиваем длину заголовка
        if len(title) > 60:
            title = title[:57] + "..."
        
        # Создаем description
        description = content[:150] + "..." if len(content) > 150 else content
        
        # Добавляем ключевые слова в контент
        optimized_content = content
        for keyword in keywords[:3]:  # Используем только первые 3 ключевых слова
            if keyword.lower() not in optimized_content.lower():
                # Добавляем ключевое слово в первый параграф
                paragraphs = optimized_content.split('\n\n')
                if paragraphs:
                    first_para = paragraphs[0]
                    if keyword.lower() not in first_para.lower():
                        paragraphs[0] = f"{first_para} {keyword}."
                        optimized_content = '\n\n'.join(paragraphs)
        
        return {
            'title': title,
            'content': optimized_content,
            'meta_description': description,
            'keywords': ', '.join(keywords)
        }
    
    def process_article(self, url, content_type="article", keywords=None):
        """
        Полный процесс обработки статьи
        
        Args:
            url (str): URL статьи
            content_type (str): Тип контента
            keywords (list): Ключевые слова для SEO
            
        Returns:
            dict: Обработанная статья
        """
        print(f"Обрабатываю статью: {url}")
        
        # Получаем исходный контент
        raw_content = self.fetch_content(url)
        if not raw_content:
            return None
        
        print("✓ Контент получен")
        
        # Переводим заголовок
        translated_title = self.translate_text(raw_content['title'])
        print("✓ Заголовок переведен")
        
        # Переводим контент
        translated_content = self.translate_text(raw_content['content'])
        print("✓ Контент переведен")
        
        # Адаптируем с помощью ИИ
        adapted_content = self.adapt_content_with_ai(translated_content, content_type)
        print("✓ Контент адаптирован")
        
        # Проверяем уникальность
        uniqueness_check = self.check_uniqueness(adapted_content)
        print(f"✓ Проверка уникальности: {uniqueness_check['uniqueness_score']:.1f}%")
        
        # SEO-оптимизация
        if keywords:
            optimized = self.optimize_for_seo(translated_title, adapted_content, keywords)
        else:
            optimized = {
                'title': translated_title,
                'content': adapted_content,
                'meta_description': adapted_content[:150] + "...",
                'keywords': ""
            }
        
        print("✓ SEO-оптимизация выполнена")
        
        return {
            'original_url': url,
            'processed_at': datetime.now().isoformat(),
            'content_type': content_type,
            'title': optimized['title'],
            'content': optimized['content'],
            'meta_description': optimized['meta_description'],
            'keywords': optimized['keywords'],
            'uniqueness_check': uniqueness_check
        }
    
    def save_article(self, article, output_dir="processed_articles"):
        """
        Сохранение обработанной статьи
        
        Args:
            article (dict): Обработанная статья
            output_dir (str): Папка для сохранения
        """
        if not os.path.exists(output_dir):
            os.makedirs(output_dir)
        
        # Создаем безопасное имя файла
        safe_title = re.sub(r'[^\w\s-]', '', article['title'])
        safe_title = re.sub(r'[-\s]+', '-', safe_title)
        filename = f"{safe_title[:50]}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        
        filepath = os.path.join(output_dir, filename)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(article, f, ensure_ascii=False, indent=2)
        
        print(f"✓ Статья сохранена: {filepath}")
        return filepath

def main():
    """
    Пример использования скрипта
    """
    # Настройки
    OPENAI_API_KEY = "your-openai-api-key-here"  # Замените на ваш ключ
    
    # Инициализация процессора
    processor = ContentProcessor(OPENAI_API_KEY)
    
    # Примеры URL для обработки
    urls_to_process = [
        {
            'url': 'https://blog.openai.com/chatgpt-update/',
            'type': 'news',
            'keywords': ['ChatGPT', 'обновление', 'ИИ бот']
        },
        {
            'url': 'https://www.anthropic.com/news/claude-3-release',
            'type': 'review',
            'keywords': ['Claude', 'обзор', 'ИИ ассистент']
        }
    ]
    
    # Обработка статей
    for url_data in urls_to_process:
        try:
            article = processor.process_article(
                url=url_data['url'],
                content_type=url_data['type'],
                keywords=url_data['keywords']
            )
            
            if article:
                processor.save_article(article)
                print(f"✓ Статья успешно обработана: {article['title']}")
            else:
                print(f"✗ Не удалось обработать статью: {url_data['url']}")
                
        except Exception as e:
            print(f"✗ Ошибка при обработке {url_data['url']}: {e}")
        
        time.sleep(5)  # Пауза между обработкой статей

if __name__ == "__main__":
    main() 