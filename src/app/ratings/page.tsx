import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Рейтинги ИИ инструментов 2025: Топ лучших AI ботов',
  description: 'Объективные рейтинги лучших ИИ инструментов в 2025 году. Сравнение функций, цен и возможностей.',
  keywords: 'рейтинги, топ, лучшие, ИИ инструменты, AI боты, сравнение, 2025',
}

const ratings = [
  {
    title: 'Топ-10 лучших ИИ чат-ботов в 2025 году',
    description: 'Подробный рейтинг лучших чат-ботов с искусственным интеллектом',
    icon: '🤖',
    href: '/ratings/chatbots',
    category: 'Чат-боты',
    count: '10 инструментов'
  },
  {
    title: 'Топ-5 лучших ИИ генераторов изображений',
    description: 'Рейтинг лучших инструментов для создания изображений с помощью ИИ',
    icon: '🎨',
    href: '/ratings/image-generators',
    category: 'Генерация изображений',
    count: '5 инструментов'
  },
  {
    title: 'Топ-8 ИИ инструментов для продуктивности',
    description: 'Лучшие AI помощники для повышения эффективности работы',
    icon: '⚡',
    href: '/ratings/productivity-tools',
    category: 'Продуктивность',
    count: '8 инструментов'
  },
  {
    title: 'Топ-6 ИИ инструментов для программирования',
    description: 'Рейтинг лучших AI помощников для разработчиков',
    icon: '💻',
    href: '/ratings/programming-tools',
    category: 'Программирование',
    count: '6 инструментов'
  }
]

export default function RatingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Рейтинги ИИ инструментов
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Объективные рейтинги лучших ИИ инструментов в 2025 году. Сравнение функций, цен и возможностей.
            </p>
          </div>
        </div>
      </section>

      {/* Ratings Grid */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ratings.map((rating) => (
              <Link 
                key={rating.href}
                href={rating.href}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">{rating.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                        {rating.category}
                      </div>
                      <div className="text-sm text-gray-500">
                        {rating.count}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {rating.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {rating.description}
                    </p>
                    <div className="text-blue-600 font-semibold">
                      Смотреть рейтинг →
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Методология оценки</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Критерии оценки</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Качество и точность работы
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Функциональность и возможности
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Удобство использования
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Соотношение цена/качество
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Поддержка русского языка
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Как мы тестируем</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Практическое использование
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Сравнение с конкурентами
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Анализ отзывов пользователей
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Оценка обновлений и развития
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Тестирование в реальных задачах
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Выберите лучший инструмент для ваших задач
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Наши рейтинги помогут вам найти идеальный ИИ инструмент
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/guides"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Изучить руководства
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