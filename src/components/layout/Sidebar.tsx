import React from 'react';
import Link from 'next/link';
import { AdZone } from '../ads/AdZone';

export function Sidebar() {
  return (
    <aside className="space-y-6">
      {/* Реклама в сайдбаре */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <AdZone zoneId="sidebar-top" />
      </div>

      {/* Популярные статьи */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Популярные статьи</h3>
        <div className="space-y-4">
          <Link href="/reviews/chatgpt-review" className="block group">
            <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
              Обзор ChatGPT: возможности и ограничения
            </h4>
            <p className="text-sm text-gray-500 mt-1">
              Подробный анализ самого популярного ИИ чат-бота
            </p>
          </Link>
          
          <Link href="/comparisons/chatgpt-vs-claude" className="block group">
            <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
              ChatGPT vs Claude: что выбрать?
            </h4>
            <p className="text-sm text-gray-500 mt-1">
              Сравнение двух ведущих ИИ ассистентов
            </p>
          </Link>
          
          <Link href="/guides/how-to-use-ai-bots" className="block group">
            <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
              Как эффективно использовать ИИ ботов
            </h4>
            <p className="text-sm text-gray-500 mt-1">
              Практическое руководство для начинающих
            </p>
          </Link>
        </div>
      </div>

      {/* Категории */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Категории</h3>
        <div className="space-y-2">
          <Link href="/category/chatbots" className="flex items-center justify-between text-gray-600 hover:text-blue-600 transition-colors">
            <span>Чат-боты</span>
            <span className="text-sm text-gray-400">(15)</span>
          </Link>
          <Link href="/category/assistants" className="flex items-center justify-between text-gray-600 hover:text-blue-600 transition-colors">
            <span>Ассистенты</span>
            <span className="text-sm text-gray-400">(12)</span>
          </Link>
          <Link href="/category/creative" className="flex items-center justify-between text-gray-600 hover:text-blue-600 transition-colors">
            <span>Креативные ИИ</span>
            <span className="text-sm text-gray-400">(8)</span>
          </Link>
          <Link href="/category/productivity" className="flex items-center justify-between text-gray-600 hover:text-blue-600 transition-colors">
            <span>Продуктивность</span>
            <span className="text-sm text-gray-400">(10)</span>
          </Link>
        </div>
      </div>

      {/* Подписка */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <h3 className="text-lg font-semibold mb-2">Подпишитесь на обновления</h3>
        <p className="text-blue-100 mb-4">
          Получайте свежие обзоры и новости ИИ ботов
        </p>
        <form className="space-y-3">
          <input
            type="email"
            placeholder="Ваш email"
            className="w-full px-3 py-2 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button
            type="submit"
            className="w-full bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Подписаться
          </button>
        </form>
      </div>

      {/* Реклама внизу сайдбара */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <AdZone zoneId="sidebar-bottom" />
      </div>
    </aside>
  );
} 