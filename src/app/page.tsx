import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ИИ Боты 2025: Лучшие AI инструменты и руководства',
  description: 'Подробные обзоры, рейтинги и руководства по использованию ИИ ботов в 2025 году. ChatGPT, Claude, Midjourney и другие AI инструменты.',
  keywords: 'ИИ бот, искусственный интеллект, AI помощник, ChatGPT, Claude, Midjourney, 2025',
  openGraph: {
    title: 'ИИ Боты 2025: Лучшие AI инструменты и руководства',
    description: 'Подробные обзоры, рейтинги и руководства по использованию ИИ ботов в 2025 году.',
    type: 'website',
    url: 'https://aibotsguide.com',
  },
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              ИИ Боты 2025
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Подробные обзоры, рейтинги и руководства по использованию искусственного интеллекта
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/guides" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Начать изучение
              </Link>
              <Link 
                href="/ratings" 
                className="bg-white hover:bg-gray-50 text-blue-600 border border-blue-600 px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Смотреть рейтинги
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Популярные ИИ инструменты</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'ChatGPT', icon: '🤖', href: '/guides/chatgpt' },
              { name: 'Claude', icon: '🧠', href: '/guides/claude' },
              { name: 'Midjourney', icon: '🎨', href: '/guides/midjourney' },
              { name: 'GitHub Copilot', icon: '💻', href: '/guides/github-copilot' },
            ].map((tool) => (
              <Link 
                key={tool.name}
                href={tool.href}
                className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl hover:shadow-lg transition-all duration-300 border border-blue-100"
              >
                <div className="text-4xl mb-4">{tool.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900">{tool.name}</h3>
                <p className="text-gray-600 mt-2">Подробное руководство</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Guides Section */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="text-3xl mr-4">📚</div>
                <h3 className="text-2xl font-bold">Руководства</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Пошаговые инструкции по использованию популярных ИИ инструментов
              </p>
              <div className="space-y-3">
                {[
                  'Как использовать ChatGPT эффективно',
                  'Руководство по Midjourney',
                  'Работа с Claude AI',
                  'GitHub Copilot для разработчиков'
                ].map((guide) => (
                  <Link 
                    key={guide}
                    href="/guides"
                    className="block text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    → {guide}
                  </Link>
                ))}
              </div>
              <Link 
                href="/guides"
                className="inline-block mt-6 text-blue-600 hover:text-blue-800 font-semibold"
              >
                Все руководства →
              </Link>
            </div>

            {/* Ratings Section */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="text-3xl mr-4">🏆</div>
                <h3 className="text-2xl font-bold">Рейтинги</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Объективные рейтинги лучших ИИ инструментов по категориям
              </p>
              <div className="space-y-3">
                {[
                  'Топ-10 ИИ чат-ботов',
                  'Лучшие генераторы изображений',
                  'ИИ инструменты для продуктивности',
                  'AI помощники для программирования'
                ].map((rating) => (
                  <Link 
                    key={rating}
                    href="/ratings"
                    className="block text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    → {rating}
                  </Link>
                ))}
              </div>
              <Link 
                href="/ratings"
                className="inline-block mt-6 text-blue-600 hover:text-blue-800 font-semibold"
              >
                Все рейтинги →
              </Link>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="text-3xl mr-4">👥</div>
                <h3 className="text-2xl font-bold">Отзывы</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Реальные отзывы пользователей о популярных ИИ инструментах
              </p>
              <div className="space-y-3">
                {[
                  'Отзыв о ChatGPT от маркетолога',
                  'Claude AI глазами разработчика',
                  'Midjourney в работе дизайнера',
                  'GitHub Copilot для программистов'
                ].map((review) => (
                  <Link 
                    key={review}
                    href="/reviews"
                    className="block text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    → {review}
                  </Link>
                ))}
              </div>
              <Link 
                href="/reviews"
                className="inline-block mt-6 text-blue-600 hover:text-blue-800 font-semibold"
              >
                Все отзывы →
              </Link>
            </div>

            {/* News Section */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="text-3xl mr-4">📰</div>
                <h3 className="text-2xl font-bold">Новости</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Последние новости и тренды в мире искусственного интеллекта
              </p>
              <div className="space-y-3">
                {[
                  'Революция AI в программировании',
                  'Новые возможности ChatGPT',
                  'ИИ в бизнесе и автоматизация',
                  'Тренды AI в 2025 году'
                ].map((news) => (
                  <Link 
                    key={news}
                    href="/news"
                    className="block text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    → {news}
                  </Link>
                ))}
              </div>
              <Link 
                href="/news"
                className="inline-block mt-6 text-blue-600 hover:text-blue-800 font-semibold"
              >
                Все новости →
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Начните использовать ИИ уже сегодня
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Выберите подходящий инструмент и следуйте нашим подробным руководствам
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/guides"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Изучить руководства
            </Link>
            <Link 
              href="/ratings"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Смотреть рейтинги
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">ИИ Боты 2025</h3>
              <p className="text-gray-400">
                Подробные обзоры и руководства по использованию искусственного интеллекта
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Разделы</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/guides" className="hover:text-white transition-colors">Руководства</Link></li>
                <li><Link href="/ratings" className="hover:text-white transition-colors">Рейтинги</Link></li>
                <li><Link href="/reviews" className="hover:text-white transition-colors">Отзывы</Link></li>
                <li><Link href="/news" className="hover:text-white transition-colors">Новости</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Инструменты</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/guides/chatgpt" className="hover:text-white transition-colors">ChatGPT</Link></li>
                <li><Link href="/guides/claude" className="hover:text-white transition-colors">Claude</Link></li>
                <li><Link href="/guides/midjourney" className="hover:text-white transition-colors">Midjourney</Link></li>
                <li><Link href="/guides/github-copilot" className="hover:text-white transition-colors">GitHub Copilot</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Информация</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">О проекте</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Контакты</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Политика конфиденциальности</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 ИИ Боты. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
