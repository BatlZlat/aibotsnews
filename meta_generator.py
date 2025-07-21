#!/usr/bin/env python3
"""
Meta Generator Script for AI Bots Content
Создает мета-описания и заголовки для всех статей
"""

import os
import re
from pathlib import Path

class MetaGenerator:
    def __init__(self):
        self.meta_templates = {
            'guides': {
                'title_template': 'Как использовать {tool} в 2025 году: Полное руководство',
                'description_template': 'Подробное руководство по использованию {tool} в 2025 году. Пошаговые инструкции, советы экспертов и практические примеры для максимальной эффективности.',
                'keywords': ['{tool}', 'руководство', 'инструкция', 'как использовать', '2025', 'AI', 'искусственный интеллект']
            },
            'ratings': {
                'title_template': 'Топ-{number} лучших {category} в 2025 году: Полный рейтинг',
                'description_template': 'Подробный рейтинг лучших {category} в 2025 году. Сравнение функций, цен и возможностей. Выберите идеальный инструмент для ваших задач.',
                'keywords': ['рейтинг', 'топ', 'лучшие', '{category}', 'сравнение', '2025', 'AI']
            },
            'reviews': {
                'title_template': 'Отзыв о {tool} 2025: Реальный опыт использования',
                'description_template': 'Подробный отзыв о {tool} от реального пользователя. Практический опыт, кейсы использования, плюсы и минусы. Узнайте правду о популярном AI инструменте.',
                'keywords': ['отзыв', '{tool}', 'реальный опыт', 'обзор', 'тестирование', '2025']
            },
            'news': {
                'title_template': '{topic}: Новости и тренды 2025 года',
                'description_template': 'Актуальные новости о {topic} в 2025 году. Последние разработки, тренды и инновации в мире искусственного интеллекта.',
                'keywords': ['новости', '{topic}', 'тренды', '2025', 'AI', 'инновации']
            },
            'comparisons': {
                'title_template': '{tool1} vs {tool2}: Подробное сравнение 2025',
                'description_template': 'Детальное сравнение {tool1} и {tool2} в 2025 году. Функции, цены, плюсы и минусы. Выберите лучший инструмент для ваших задач.',
                'keywords': ['сравнение', '{tool1}', '{tool2}', 'vs', '2025', 'AI']
            }
        }
    
    def extract_tool_name(self, filename):
        """Извлекает название инструмента из имени файла"""
        # Удаляем расширение и путь
        name = os.path.basename(filename).replace('.md', '').replace('-seo', '')
        
        # Извлекаем название инструмента
        tool_patterns = {
            'chatgpt': 'ChatGPT',
            'claude': 'Claude',
            'gemini': 'Google Gemini',
            'copilot': 'Microsoft Copilot',
            'github-copilot': 'GitHub Copilot',
            'midjourney': 'Midjourney',
            'jasper': 'Jasper',
            'notion': 'Notion AI',
            'grammarly': 'Grammarly AI',
            'perplexity': 'Perplexity AI',
            'bard': 'Google Bard',
            'gigachat': 'GigaChat',
            'yandex-alice': 'Yandex.Alice',
            'dall-e': 'DALL-E',
            'stable-diffusion': 'Stable Diffusion'
        }
        
        for pattern, tool_name in tool_patterns.items():
            if pattern in name.lower():
                return tool_name
        
        return 'AI инструмент'
    
    def extract_category(self, filename):
        """Извлекает категорию из имени файла"""
        if 'chatbot' in filename.lower():
            return 'ИИ чат-ботов'
        elif 'image' in filename.lower():
            return 'ИИ генераторов изображений'
        elif 'productivity' in filename.lower():
            return 'ИИ инструментов для продуктивности'
        elif 'programming' in filename.lower():
            return 'ИИ инструментов для программирования'
        else:
            return 'ИИ инструментов'
    
    def extract_number(self, filename):
        """Извлекает число из имени файла"""
        import re
        numbers = re.findall(r'top-(\d+)', filename.lower())
        if numbers:
            return numbers[0]
        return '10'
    
    def extract_topic(self, filename):
        """Извлекает тему из имени файла"""
        # Удаляем расширение и путь
        name = os.path.basename(filename).replace('.md', '').replace('-seo', '')
        
        topic_patterns = {
            'ai-programming': 'AI в программировании',
            'ai-copywriting': 'AI в копирайтинге',
            'ai-business': 'AI в бизнесе',
            'ai-security': 'AI в безопасности',
            'ai-agriculture': 'AI в сельском хозяйстве',
            'ai-creativity': 'AI в творчестве',
            'ai-retail': 'AI в розничной торговле',
            'ai-finance': 'AI в финансах',
            'ai-education': 'AI в образовании',
            'ai-transportation': 'AI в транспорте',
            'ai-entertainment': 'AI в развлечениях',
            'ai-medicine': 'AI в медицине',
            'ai-scientific': 'AI в научных исследованиях'
        }
        
        for pattern, topic in topic_patterns.items():
            if pattern in name.lower():
                return topic
        
        return 'AI технологии'
    
    def generate_meta_for_file(self, file_path):
        """Генерирует мета-данные для файла"""
        filename = os.path.basename(file_path)
        
        # Определяем тип контента
        content_type = 'guides'  # по умолчанию
        if 'rating' in file_path.lower() or 'top-' in filename.lower():
            content_type = 'ratings'
        elif 'review' in file_path.lower():
            content_type = 'reviews'
        elif 'news' in file_path.lower():
            content_type = 'news'
        elif 'comparison' in file_path.lower() or 'vs' in filename.lower():
            content_type = 'comparisons'
        
        template = self.meta_templates[content_type]
        
        # Извлекаем данные
        tool = self.extract_tool_name(filename)
        category = self.extract_category(filename)
        number = self.extract_number(filename)
        topic = self.extract_topic(filename)
        
        # Генерируем заголовок
        if content_type == 'ratings':
            title = template['title_template'].format(number=number, category=category)
        elif content_type == 'comparisons':
            # Для сравнений нужно извлечь два инструмента
            tools = filename.split('-vs-')
            if len(tools) >= 2:
                tool1 = self.extract_tool_name(tools[0])
                tool2 = self.extract_tool_name(tools[1])
                title = template['title_template'].format(tool1=tool1, tool2=tool2)
            else:
                title = template['title_template'].format(tool1=tool, tool2='другие инструменты')
        else:
            title = template['title_template'].format(tool=tool, topic=topic)
        
        # Генерируем описание
        if content_type == 'ratings':
            description = template['description_template'].format(category=category)
        elif content_type == 'comparisons':
            tools = filename.split('-vs-')
            if len(tools) >= 2:
                tool1 = self.extract_tool_name(tools[0])
                tool2 = self.extract_tool_name(tools[1])
                description = template['description_template'].format(tool1=tool1, tool2=tool2)
            else:
                description = template['description_template'].format(tool1=tool, tool2='другие инструменты')
        else:
            description = template['description_template'].format(tool=tool, topic=topic)
        
        # Генерируем ключевые слова
        keywords = []
        for keyword in template['keywords']:
            if '{tool}' in keyword:
                keywords.append(keyword.format(tool=tool))
            elif '{category}' in keyword:
                keywords.append(keyword.format(category=category))
            elif '{topic}' in keyword:
                keywords.append(keyword.format(topic=topic))
            else:
                keywords.append(keyword)
        
        return {
            'title': title,
            'description': description,
            'keywords': ', '.join(keywords),
            'content_type': content_type
        }
    
    def create_meta_file(self, file_path, meta_data):
        """Создает файл с мета-данными"""
        meta_file_path = file_path.replace('.md', '.meta')
        
        meta_content = f"""# Мета-данные для SEO

## Заголовок страницы
{meta_data['title']}

## Мета-описание
{meta_data['description']}

## Ключевые слова
{meta_data['keywords']}

## Тип контента
{meta_data['content_type']}

## Open Graph теги
og:title = {meta_data['title']}
og:description = {meta_data['description']}
og:type = article
og:url = https://aibotsguide.com/{file_path.replace('content/', '').replace('.md', '.html')}

## Twitter Card теги
twitter:card = summary_large_image
twitter:title = {meta_data['title']}
twitter:description = {meta_data['description']}

## Дополнительные SEO теги
robots = index, follow
author = AI Bots Guide
language = Russian
revisit-after = 7 days
"""
        
        with open(meta_file_path, 'w', encoding='utf-8') as f:
            f.write(meta_content)
        
        print(f"✅ Создан файл мета-данных: {meta_file_path}")
    
    def process_all_files(self, content_dir="content"):
        """Обрабатывает все файлы и создает мета-данные"""
        print("🚀 Начинаем создание мета-описаний и заголовков...")
        
        # Находим все SEO-оптимизированные файлы
        seo_files = []
        for root, dirs, files in os.walk(content_dir):
            for file in files:
                if file.endswith('-seo.md'):
                    seo_files.append(os.path.join(root, file))
        
        print(f"📁 Найдено {len(seo_files)} SEO-оптимизированных файлов")
        
        # Создаем мета-данные для каждого файла
        for file_path in seo_files:
            try:
                meta_data = self.generate_meta_for_file(file_path)
                self.create_meta_file(file_path, meta_data)
            except Exception as e:
                print(f"❌ Ошибка при обработке {file_path}: {e}")
        
        print(f"✅ Создание мета-данных завершено! Обработано {len(seo_files)} файлов")
    
    def create_meta_summary(self, content_dir="content"):
        """Создает сводку всех мета-данных"""
        print("📊 Создаем сводку мета-данных...")
        
        summary_content = """# Сводка мета-данных для всех статей

## Статистика по типам контента
"""
        
        content_types = {}
        seo_files = []
        for root, dirs, files in os.walk(content_dir):
            for file in files:
                if file.endswith('-seo.md'):
                    seo_files.append(os.path.join(root, file))
        
        for file_path in seo_files:
            try:
                meta_data = self.generate_meta_for_file(file_path)
                content_type = meta_data['content_type']
                content_types[content_type] = content_types.get(content_type, 0) + 1
                
                summary_content += f"""
### {meta_data['title']}
- **Файл**: {file_path}
- **Тип**: {content_type}
- **Описание**: {meta_data['description'][:100]}...
- **Ключевые слова**: {meta_data['keywords'][:50]}...
"""
            except Exception as e:
                print(f"❌ Ошибка при анализе {file_path}: {e}")
        
        summary_content += f"""
## Общая статистика
- **Всего статей**: {len(seo_files)}
- **Руководства**: {content_types.get('guides', 0)}
- **Рейтинги**: {content_types.get('ratings', 0)}
- **Отзывы**: {content_types.get('reviews', 0)}
- **Новости**: {content_types.get('news', 0)}
- **Сравнения**: {content_types.get('comparisons', 0)}
"""
        
        with open('meta_summary.md', 'w', encoding='utf-8') as f:
            f.write(summary_content)
        
        print("✅ Сводка мета-данных создана: meta_summary.md")

def main():
    """Основная функция"""
    generator = MetaGenerator()
    
    # Создаем мета-данные для всех файлов
    generator.process_all_files()
    
    # Создаем сводку
    generator.create_meta_summary()
    
    print("\n🎉 Создание мета-описаний и заголовков завершено!")
    print("📊 Результаты:")
    print("- Созданы мета-описания для всех статей")
    print("- Сгенерированы заголовки страниц")
    print("- Добавлены ключевые слова")
    print("- Создана сводка мета-данных")

if __name__ == "__main__":
    main() 