import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Руководства по ИИ инструментам 2025',
  description: 'Подробные руководства по использованию популярных ИИ инструментов: ChatGPT, Claude, Midjourney, GitHub Copilot и других.',
  keywords: 'руководства, инструкции, как использовать, ChatGPT, Claude, Midjourney, GitHub Copilot, 2025',
}

const guides = [
  {
    title: 'Как эффективно использовать ChatGPT в 2025 году',
    description: 'Полное руководство по использованию ChatGPT для различных задач',
    icon: '🤖',
    href: '/guides/chatgpt',
    category: 'Чат-боты'
  },
  {
    title: 'Руководство по Claude AI: Анализ и создание контента',
    description: 'Подробная инструкция по работе с Claude для аналитических задач',
    icon: '🧠',
    href: '/guides/claude',
    category: 'Чат-боты'
  },
  {
    title: 'Как использовать Midjourney для создания изображений',
    description: 'Пошаговое руководство по генерации изображений с помощью Midjourney',
    icon: '🎨',
    href: '/guides/midjourney',
    category: 'Генерация изображений'
  },
  {
    title: 'GitHub Copilot для разработчиков: Полное руководство',
    description: 'Как эффективно использовать GitHub Copilot в программировании',
    icon: '💻',
    href: '/guides/github-copilot',
    category: 'Программирование'
  },
  {
    title: 'Jasper AI: Руководство по созданию контента',
    description: 'Как использовать Jasper для маркетингового контента',
    icon: '✍️',
    href: '/guides/jasper',
    category: 'Контент'
  },
  {
    title: 'Notion AI: Управление проектами и документацией',
    description: 'Руководство по использованию Notion AI для продуктивности',
    icon: '📋',
    href: '/guides/notion-ai',
    category: 'Продуктивность'
  },
  {
    title: 'Grammarly AI: Улучшение качества текстов',
    description: 'Как использовать Grammarly AI для редактирования и корректуры',
    icon: '📝',
    href: '/guides/grammarly-ai',
    category: 'Контент'
  },
  {
    title: 'Microsoft Copilot: Работа с Office документами',
    description: 'Руководство по использованию Microsoft Copilot в Office',
    icon: '📊',
    href: '/guides/microsoft-copilot',
    category: 'Офисные задачи'
  },
  {
    title: 'Google Bard: Поиск и анализ информации',
    description: 'Как эффективно использовать Google Bard для исследований',
    icon: '🔍',
    href: '/guides/google-bard',
    category: 'Поиск'
  },
  {
    title: 'Perplexity AI: Анализ данных и прогнозирование',
    description: 'Руководство по использованию Perplexity для аналитики',
    icon: '📈',
    href: '/guides/perplexity-ai',
    category: 'Аналитика'
  }
]

const categories = ['Все', 'Чат-боты', 'Генерация изображений', 'Программирование', 'Контент', 'Продуктивность', 'Офисные задачи', 'Поиск', 'Аналитика']

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Руководства по ИИ инструментам
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Подробные инструкции по использованию популярных ИИ инструментов в 2025 году
            </p>
          </div>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.map((guide) => (
              <Link 
                key={guide.href}
                href={guide.href}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">{guide.icon}</div>
                  <div className="flex-1">
                    <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mb-3">
                      {guide.category}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {guide.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {guide.description}
                    </p>
                    <div className="text-blue-600 font-semibold">
                      Читать руководство →
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Не нашли нужное руководство?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Мы постоянно добавляем новые руководства. Следите за обновлениями!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/ratings"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Смотреть рейтинги
            </Link>
            <Link 
              href="/reviews"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Читать отзывы
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 