#!/usr/bin/env python3
"""
Скрипт для проверки уникальности контента
Проверяет контент на плагиат и дублирование
"""

import re
import hashlib
import difflib
from collections import Counter
import requests
from bs4 import BeautifulSoup
import time
import json

class UniquenessChecker:
    def __init__(self):
        """
        Инициализация проверщика уникальности
        """
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
    
    def calculate_text_similarity(self, text1, text2):
        """
        Вычисление схожести двух текстов
        
        Args:
            text1 (str): Первый текст
            text2 (str): Второй текст
            
        Returns:
            float: Коэффициент схожести (0-1)
        """
        # Нормализуем тексты
        text1_clean = re.sub(r'[^\w\s]', '', text1.lower())
        text2_clean = re.sub(r'[^\w\s]', '', text2.lower())
        
        # Используем SequenceMatcher для вычисления схожести
        similarity = difflib.SequenceMatcher(None, text1_clean, text2_clean).ratio()
        
        return similarity
    
    def extract_key_phrases(self, text, min_length=3, max_length=6):
        """
        Извлечение ключевых фраз из текста
        
        Args:
            text (str): Текст для анализа
            min_length (int): Минимальная длина фразы
            max_length (int): Максимальная длина фразы
            
        Returns:
            list: Список ключевых фраз
        """
        words = re.findall(r'\b\w+\b', text.lower())
        phrases = []
        
        for length in range(min_length, max_length + 1):
            for i in range(len(words) - length + 1):
                phrase = ' '.join(words[i:i + length])
                if len(phrase) > 10:  # Минимальная длина фразы
                    phrases.append(phrase)
        
        return phrases
    
    def check_phrase_uniqueness(self, text, reference_texts):
        """
        Проверка уникальности фраз в тексте
        
        Args:
            text (str): Проверяемый текст
            reference_texts (list): Список референсных текстов
            
        Returns:
            dict: Результаты проверки
        """
        text_phrases = self.extract_key_phrases(text)
        total_phrases = len(text_phrases)
        unique_phrases = 0
        duplicate_phrases = []
        
        for phrase in text_phrases:
            is_unique = True
            for ref_text in reference_texts:
                if phrase in ref_text.lower():
                    is_unique = False
                    duplicate_phrases.append(phrase)
                    break
            
            if is_unique:
                unique_phrases += 1
        
        uniqueness_score = (unique_phrases / total_phrases) * 100 if total_phrases > 0 else 100
        
        return {
            'total_phrases': total_phrases,
            'unique_phrases': unique_phrases,
            'duplicate_phrases': duplicate_phrases,
            'uniqueness_score': uniqueness_score
        }
    
    def check_word_frequency(self, text):
        """
        Анализ частоты слов в тексте
        
        Args:
            text (str): Текст для анализа
            
        Returns:
            dict: Статистика по словам
        """
        words = re.findall(r'\b\w+\b', text.lower())
        word_freq = Counter(words)
        
        # Находим повторяющиеся слова
        repeated_words = {word: count for word, count in word_freq.items() if count > 3}
        
        # Вычисляем разнообразие лексики
        unique_words = len(word_freq)
        total_words = len(words)
        vocabulary_diversity = (unique_words / total_words) * 100 if total_words > 0 else 0
        
        return {
            'total_words': total_words,
            'unique_words': unique_words,
            'vocabulary_diversity': vocabulary_diversity,
            'repeated_words': repeated_words
        }
    
    def check_sentence_structure(self, text):
        """
        Анализ структуры предложений
        
        Args:
            text (str): Текст для анализа
            
        Returns:
            dict: Статистика по предложениям
        """
        sentences = re.split(r'[.!?]+', text)
        sentences = [s.strip() for s in sentences if s.strip()]
        
        sentence_lengths = [len(s.split()) for s in sentences]
        avg_sentence_length = sum(sentence_lengths) / len(sentence_lengths) if sentence_lengths else 0
        
        # Проверяем разнообразие длин предложений
        length_variety = len(set(sentence_lengths)) / len(sentence_lengths) * 100 if sentence_lengths else 0
        
        return {
            'total_sentences': len(sentences),
            'avg_sentence_length': avg_sentence_length,
            'length_variety': length_variety,
            'sentence_lengths': sentence_lengths
        }
    
    def check_online_sources(self, text, max_sources=5):
        """
        Проверка текста на соответствие онлайн источникам
        
        Args:
            text (str): Текст для проверки
            max_sources (int): Максимальное количество источников для проверки
            
        Returns:
            dict: Результаты проверки
        """
        # Извлекаем ключевые фразы для поиска
        key_phrases = self.extract_key_phrases(text, min_length=4, max_length=5)
        
        if not key_phrases:
            return {'online_check': False, 'message': 'Не удалось извлечь ключевые фразы'}
        
        # Берем первые несколько фраз для проверки
        search_phrases = key_phrases[:3]
        
        results = []
        for phrase in search_phrases:
            try:
                # Ищем в Google (симуляция)
                search_query = f'"{phrase}"'
                print(f"Проверяю фразу: {phrase}")
                
                # Здесь можно добавить реальный поиск через API
                # Пока возвращаем заглушку
                results.append({
                    'phrase': phrase,
                    'found_sources': 0,
                    'similarity': 0.0
                })
                
                time.sleep(1)  # Задержка между запросами
                
            except Exception as e:
                print(f"Ошибка при проверке фразы {phrase}: {e}")
        
        return {
            'online_check': True,
            'checked_phrases': len(search_phrases),
            'results': results
        }
    
    def comprehensive_check(self, text, reference_texts=None):
        """
        Комплексная проверка уникальности текста
        
        Args:
            text (str): Текст для проверки
            reference_texts (list): Список референсных текстов
            
        Returns:
            dict: Полные результаты проверки
        """
        print("🔍 Начинаю комплексную проверку уникальности...")
        
        # Базовая статистика
        text_hash = hashlib.md5(text.encode()).hexdigest()
        text_length = len(text)
        
        # Анализ частоты слов
        word_stats = self.check_word_frequency(text)
        print(f"✓ Анализ слов: {word_stats['vocabulary_diversity']:.1f}% уникальности лексики")
        
        # Анализ структуры предложений
        sentence_stats = self.check_sentence_structure(text)
        print(f"✓ Анализ предложений: {sentence_stats['length_variety']:.1f}% разнообразия")
        
        # Проверка уникальности фраз
        if reference_texts:
            phrase_stats = self.check_phrase_uniqueness(text, reference_texts)
            print(f"✓ Анализ фраз: {phrase_stats['uniqueness_score']:.1f}% уникальности фраз")
        else:
            phrase_stats = {'uniqueness_score': 100, 'duplicate_phrases': []}
        
        # Общий показатель уникальности
        overall_uniqueness = (
            word_stats['vocabulary_diversity'] * 0.4 +
            sentence_stats['length_variety'] * 0.2 +
            phrase_stats['uniqueness_score'] * 0.4
        )
        
        # Оценка качества
        if overall_uniqueness >= 85:
            quality_grade = "Отлично"
        elif overall_uniqueness >= 70:
            quality_grade = "Хорошо"
        elif overall_uniqueness >= 50:
            quality_grade = "Удовлетворительно"
        else:
            quality_grade = "Требует доработки"
        
        results = {
            'text_hash': text_hash,
            'text_length': text_length,
            'overall_uniqueness': overall_uniqueness,
            'quality_grade': quality_grade,
            'word_stats': word_stats,
            'sentence_stats': sentence_stats,
            'phrase_stats': phrase_stats,
            'recommendations': self.generate_recommendations(overall_uniqueness, word_stats, sentence_stats)
        }
        
        print(f"✅ Проверка завершена: {overall_uniqueness:.1f}% уникальности ({quality_grade})")
        
        return results
    
    def generate_recommendations(self, uniqueness_score, word_stats, sentence_stats):
        """
        Генерация рекомендаций по улучшению уникальности
        
        Args:
            uniqueness_score (float): Общий показатель уникальности
            word_stats (dict): Статистика по словам
            sentence_stats (dict): Статистика по предложениям
            
        Returns:
            list: Список рекомендаций
        """
        recommendations = []
        
        if uniqueness_score < 70:
            recommendations.append("⚠️ Низкая уникальность. Рекомендуется переписать контент с использованием собственных примеров и кейсов.")
        
        if word_stats['vocabulary_diversity'] < 60:
            recommendations.append("📝 Ограниченный словарный запас. Добавьте синонимы и разнообразьте лексику.")
        
        if sentence_stats['length_variety'] < 50:
            recommendations.append("📏 Однообразная структура предложений. Чередуйте длинные и короткие предложения.")
        
        if word_stats['repeated_words']:
            top_repeated = sorted(word_stats['repeated_words'].items(), key=lambda x: x[1], reverse=True)[:3]
            recommendations.append(f"🔄 Часто повторяющиеся слова: {', '.join([word for word, count in top_repeated])}. Замените синонимами.")
        
        if not recommendations:
            recommendations.append("✅ Контент имеет хорошую уникальность. Можно публиковать.")
        
        return recommendations

def main():
    """
    Пример использования проверщика уникальности
    """
    checker = UniquenessChecker()
    
    # Тестовый текст
    test_text = """
    ИИ боты стали незаменимыми инструментами в современном мире. Они помогают автоматизировать процессы, 
    улучшить обслуживание клиентов и повысить эффективность работы. В России популярны такие ИИ боты как 
    Yandex.Alice, который используется более чем 50 миллионами пользователей.
    
    Российские разработчики создают уникальные ИИ решения, адаптированные под местный рынок и культуру. 
    По данным исследования РАЭК, 67% российских компаний планируют внедрить ИИ ботов в ближайшие 2 года.
    
    При выборе ИИ бота для российского бизнеса учитывайте особенности местного законодательства о 
    персональных данных. Российские пользователи часто предпочитают ИИ ботов с поддержкой русского языка 
    и пониманием местного контекста.
    """
    
    # Проверяем уникальность
    results = checker.comprehensive_check(test_text)
    
    # Выводим результаты
    print("\n📊 РЕЗУЛЬТАТЫ ПРОВЕРКИ:")
    print(f"Общая уникальность: {results['overall_uniqueness']:.1f}%")
    print(f"Оценка качества: {results['quality_grade']}")
    print(f"Длина текста: {results['text_length']} символов")
    
    print("\n📈 ДЕТАЛЬНАЯ СТАТИСТИКА:")
    print(f"Словарное разнообразие: {results['word_stats']['vocabulary_diversity']:.1f}%")
    print(f"Разнообразие предложений: {results['sentence_stats']['length_variety']:.1f}%")
    print(f"Уникальность фраз: {results['phrase_stats']['uniqueness_score']:.1f}%")
    
    print("\n💡 РЕКОМЕНДАЦИИ:")
    for rec in results['recommendations']:
        print(f"• {rec}")

if __name__ == "__main__":
    main() 