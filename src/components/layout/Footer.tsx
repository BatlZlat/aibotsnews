import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* О сайте */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">ИИ Боты - Обзоры и Сравнения</h3>
            <p className="text-gray-300 mb-4">
              Современный сайт-блог для обзоров и сравнений ИИ ботов. 
              Мы помогаем выбрать лучшие ИИ инструменты для ваших задач.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <span className="sr-only">Telegram</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <span className="sr-only">VK</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15.07 8.93v-2.93h-3.93v2.93h3.93zm0 0v2.93h-3.93v-2.93h3.93zm-3.93 5.86v-2.93h3.93v2.93h-3.93zm-3.93-5.86v-2.93h3.93v2.93h-3.93zm0 0v2.93h3.93v-2.93h-3.93zm-3.93 5.86v-2.93h3.93v2.93h-3.93zm-3.93-5.86v-2.93h3.93v2.93h-3.93zm0 0v2.93h3.93v-2.93h-3.93zm-3.93 5.86v-2.93h3.93v2.93h-3.93z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Разделы */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Разделы</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/reviews" className="text-gray-300 hover:text-white">
                  Обзоры
                </Link>
              </li>
              <li>
                <Link href="/comparisons" className="text-gray-300 hover:text-white">
                  Сравнения
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-gray-300 hover:text-white">
                  Новости
                </Link>
              </li>
              <li>
                <Link href="/guides" className="text-gray-300 hover:text-white">
                  Инструкции
                </Link>
              </li>
              <li>
                <Link href="/ratings" className="text-gray-300 hover:text-white">
                  Рейтинги
                </Link>
              </li>
            </ul>
          </div>

          {/* Информация */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Информация</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white">
                  О нас
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white">
                  Контакты
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white">
                  Политика конфиденциальности
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-white">
                  Условия использования
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Нижняя часть */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            © 2024 ИИ Боты. Все права защищены.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/sitemap" className="text-gray-300 hover:text-white text-sm">
              Карта сайта
            </Link>
            <Link href="/rss" className="text-gray-300 hover:text-white text-sm">
              RSS
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 