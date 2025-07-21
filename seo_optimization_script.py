#!/usr/bin/env python3
"""
SEO Optimization Script for AI Bots Content
Добавляет серые схемы, скрытые ключевые слова и SEO-оптимизацию
"""

import os
import re
import glob
from pathlib import Path

class SEOOptimizer:
    def __init__(self):
        self.seo_keywords = {
            'ai_bots': [
                'ИИ бот', 'искусственный интеллект', 'AI помощник', 'чат бот',
                'нейросеть', 'машинное обучение', 'глубокое обучение',
                'автоматизация', 'продуктивность', 'эффективность'
            ],
            'tools': [
                'ChatGPT', 'Claude', 'Google Gemini', 'Microsoft Copilot',
                'Jasper', 'Notion AI', 'Grammarly AI', 'GitHub Copilot',
                'Midjourney', 'Perplexity AI', 'Google Bard'
            ],
            'use_cases': [
                'программирование', 'создание контента', 'анализ данных',
                'маркетинг', 'дизайн', 'исследования', 'обучение',
                'автоматизация задач', 'повышение продуктивности'
            ],
            'benefits': [
                'экономия времени', 'улучшение качества', 'автоматизация',
                'ROI', 'эффективность', 'результаты', 'кейсы', 'примеры'
            ]
        }
        
    def add_gray_schemas(self, content):
        """Добавляет серые схемы и скрытые ключевые слова"""
        
        # Создаем скрытые ключевые слова в конце статьи
        hidden_keywords = self._generate_hidden_keywords()
        
        # Добавляем серые схемы в начало
        gray_schemas = self._generate_gray_schemas()
        
        # Добавляем микроразметку
        microdata = self._generate_microdata()
        
        # Объединяем все элементы
        optimized_content = f"""{gray_schemas}

{content}

{microdata}

{hidden_keywords}"""
        
        return optimized_content
    
    def _generate_hidden_keywords(self):
        """Генерирует скрытые ключевые слова в конце статьи"""
        all_keywords = []
        for category, keywords in self.seo_keywords.items():
            all_keywords.extend(keywords)
        
        # Перемешиваем ключевые слова для естественности
        import random
        random.shuffle(all_keywords)
        
        hidden_section = f"""
<!-- SEO Keywords: {', '.join(all_keywords[:20])} -->
"""
        return hidden_section
    
    def _generate_gray_schemas(self):
        """Генерирует серые схемы для поисковых систем"""
        schemas = """
<!-- Schema.org structured data -->
<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "AI Tools Guide 2025",
  "description": "Complete guide to AI tools and bots in 2025",
  "author": {{
    "@type": "Organization",
    "name": "AI Bots Guide"
  }},
  "publisher": {{
    "@type": "Organization",
    "name": "AI Bots Guide",
    "logo": {{
      "@type": "ImageObject",
      "url": "https://aibotsguide.com/logo.png"
    }}
  }},
  "datePublished": "2025-02-01",
  "dateModified": "2025-02-01",
  "mainEntityOfPage": {{
    "@type": "WebPage",
    "@id": "https://aibotsguide.com"
  }}
}}
</script>

<!-- Open Graph meta tags -->
<meta property="og:title" content="AI Tools Guide 2025" />
<meta property="og:description" content="Complete guide to AI tools and bots in 2025" />
<meta property="og:type" content="article" />
<meta property="og:url" content="https://aibotsguide.com" />
<meta property="og:image" content="https://aibotsguide.com/og-image.png" />

<!-- Twitter Card meta tags -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="AI Tools Guide 2025" />
<meta name="twitter:description" content="Complete guide to AI tools and bots in 2025" />
<meta name="twitter:image" content="https://aibotsguide.com/twitter-image.png" />

<!-- Additional SEO meta tags -->
<meta name="keywords" content="AI tools, artificial intelligence, chatbots, productivity, automation" />
<meta name="robots" content="index, follow" />
<meta name="author" content="AI Bots Guide" />
<meta name="language" content="Russian" />
<meta name="revisit-after" content="7 days" />
"""
        return schemas
    
    def _generate_microdata(self):
        """Генерирует микроразметку для лучшего понимания контента"""
        microdata = """
<!-- FAQ Schema -->
<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {{
      "@type": "Question",
      "name": "What are the best AI tools in 2025?",
      "acceptedAnswer": {{
        "@type": "Answer",
        "text": "The best AI tools in 2025 include ChatGPT, Claude, Google Gemini, and Microsoft Copilot."
      }}
    }},
    {{
      "@type": "Question", 
      "name": "How to use AI tools effectively?",
      "acceptedAnswer": {{
        "@type": "Answer",
        "text": "To use AI tools effectively, create clear prompts, iterate on results, and integrate with your workflow."
      }}
    }}
  ]
}}
</script>

<!-- Breadcrumb Schema -->
<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {{
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://aibotsguide.com"
    }},
    {{
      "@type": "ListItem", 
      "position": 2,
      "name": "AI Tools",
      "item": "https://aibotsguide.com/tools"
    }},
    {{
      "@type": "ListItem",
      "position": 3, 
      "name": "Guides",
      "item": "https://aibotsguide.com/guides"
    }}
  ]
}}
</script>
"""
        return microdata
    
    def optimize_file(self, file_path):
        """Оптимизирует отдельный файл"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Проверяем, не оптимизирован ли уже файл
            if '<!-- SEO Keywords:' in content:
                print(f"Файл {file_path} уже оптимизирован, пропускаем")
                return
            
            # Оптимизируем контент
            optimized_content = self.add_gray_schemas(content)
            
            # Создаем SEO версию файла
            seo_file_path = file_path.replace('.md', '-seo.md')
            
            with open(seo_file_path, 'w', encoding='utf-8') as f:
                f.write(optimized_content)
            
            print(f"✅ Оптимизирован файл: {seo_file_path}")
            
        except Exception as e:
            print(f"❌ Ошибка при оптимизации {file_path}: {e}")
    
    def optimize_all_files(self, content_dir="content"):
        """Оптимизирует все файлы в директории"""
        print("🚀 Начинаем SEO-оптимизацию всех файлов...")
        
        # Находим все markdown файлы
        md_files = []
        for root, dirs, files in os.walk(content_dir):
            for file in files:
                if file.endswith('.md') and not file.endswith('-seo.md'):
                    md_files.append(os.path.join(root, file))
        
        print(f"📁 Найдено {len(md_files)} файлов для оптимизации")
        
        # Оптимизируем каждый файл
        for file_path in md_files:
            self.optimize_file(file_path)
        
        print(f"✅ SEO-оптимизация завершена! Обработано {len(md_files)} файлов")
    
    def create_sitemap(self, content_dir="content"):
        """Создает sitemap.xml для всех статей"""
        print("🗺️ Создаем sitemap.xml...")
        
        md_files = []
        for root, dirs, files in os.walk(content_dir):
            for file in files:
                if file.endswith('-seo.md'):
                    md_files.append(os.path.join(root, file))
        
        sitemap_content = """<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
"""
        
        for file_path in md_files:
            # Преобразуем путь файла в URL
            url_path = file_path.replace('content/', '').replace('-seo.md', '.html')
            url = f"https://aibotsguide.com/{url_path}"
            
            sitemap_content += f"""  <url>
    <loc>{url}</loc>
    <lastmod>2025-02-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
"""
        
        sitemap_content += """</urlset>"""
        
        with open('public/sitemap.xml', 'w', encoding='utf-8') as f:
            f.write(sitemap_content)
        
        print("✅ Sitemap.xml создан!")
    
    def create_robots_txt(self):
        """Создает robots.txt файл"""
        robots_content = """User-agent: *
Allow: /

# Sitemap
Sitemap: https://aibotsguide.com/sitemap.xml

# Disallow admin areas
Disallow: /admin/
Disallow: /private/

# Allow important directories
Allow: /content/
Allow: /public/
"""
        
        with open('public/robots.txt', 'w', encoding='utf-8') as f:
            f.write(robots_content)
        
        print("✅ Robots.txt создан!")

def main():
    """Основная функция"""
    optimizer = SEOOptimizer()
    
    # Оптимизируем все файлы
    optimizer.optimize_all_files()
    
    # Создаем sitemap
    optimizer.create_sitemap()
    
    # Создаем robots.txt
    optimizer.create_robots_txt()
    
    print("\n🎉 SEO-оптимизация полностью завершена!")
    print("📊 Статистика:")
    print("- Добавлены серые схемы и микроразметка")
    print("- Созданы скрытые ключевые слова")
    print("- Оптимизированы все статьи")
    print("- Создан sitemap.xml")
    print("- Создан robots.txt")

if __name__ == "__main__":
    main() 