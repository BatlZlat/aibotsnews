import Link from 'next/link'
import { Metadata } from 'next'
import { AdZone } from '@/components/ads/AdZone'
import { PartnerLink } from '@/components/ads/PartnerLink'
import fs from 'fs'
import path from 'path'

export const metadata: Metadata = {
  title: 'Отзывы пользователей об ИИ ботах | ИИ Боты 2025',
  description: 'Реальные отзывы пользователей о популярных ИИ ботах: ChatGPT, Claude, Midjourney, GitHub Copilot и других AI инструментах.',
  keywords: 'отзывы ИИ боты, отзывы ChatGPT, отзывы Claude, отзывы Midjourney, пользовательские отзывы',
}

export default function ReviewsPage() {
  const reviewsDir = path.join(process.cwd(), 'content/articles/reviews')
  const reviews: Array<{title: string, slug: string, description: string, author: string, rating: number}> = []
  
  if (fs.existsSync(reviewsDir)) {
    const files = fs.readdirSync(reviewsDir)
    const mdFiles = files.filter(file => file.endsWith('.md'))
    
    mdFiles.forEach(file => {
      const slug = file.replace('.md', '')
      const content = fs.readFileSync(path.join(reviewsDir, file), 'utf-8')
      
      // Извлекаем заголовок и описание
      const titleMatch = content.match(/^#\s+(.+)$/m)
      const title = titleMatch ? titleMatch[1] : slug
      
      // Ищем описание в первых параграфах
      const paragraphs = content.split('\n\n').slice(1, 3).join(' ')
      const description = paragraphs.length > 150 ? paragraphs.substring(0, 150) + '...' : paragraphs
      
      // Извлекаем автора и рейтинг из контента
      const authorMatch = content.match(/Автор:\s*(.+)/i)
      const author = authorMatch ? authorMatch[1] : 'Пользователь'
      
      const ratingMatch = content.match(/Рейтинг:\s*(\d+)/i)
      const rating = ratingMatch ? parseInt(ratingMatch[1]) : 5
      
      reviews.push({ title, slug, description, author, rating })
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Отзывы пользователей об ИИ ботах
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Реальные отзывы от пользователей, которые уже используют ИИ боты в работе и повседневной жизни. Узнайте, что думают о ChatGPT, Claude, Midjourney и других AI инструментах.
          </p>
        </div>
      </section>

      {/* Top Ad Zone */}
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <AdZone zoneId="reviews-top-banner" className="mb-6" />
        </div>
      </div>

      {/* Reviews Grid */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {reviews.map((review) => (
              <Link 
                key={review.slug}
                href={`/articles/${review.slug}`}
                className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="mb-4">
                  {/* Rating Stars */}
                  <div className="flex items-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-lg ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                        ★
                      </span>
                    ))}
                    <span className="ml-2 text-sm text-gray-500">({review.rating}/5)</span>
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                    {review.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
                    {review.description}
                  </p>
                  
                  {/* Author */}
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="font-medium">{review.author}</span>
                  </div>
                </div>
                <div className="flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base">
                  Читать отзыв →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Middle Ad Zone */}
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <AdZone zoneId="reviews-middle-banner" className="mb-6" />
        </div>
      </div>

      {/* Featured Tools */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">
            Популярные ИИ инструменты
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <PartnerLink
              title="ChatGPT Plus"
              description="Премиум подписка с расширенными возможностями"
              href="https://chat.openai.com/chat"
              icon="🤖"
            />
            <PartnerLink
              title="Claude Pro"
              description="Мощный ИИ помощник для работы с текстом"
              href="https://claude.ai"
              icon="🧠"
            />
            <PartnerLink
              title="Midjourney"
              description="Лучший ИИ для создания изображений"
              href="https://www.midjourney.com"
              icon="🎨"
            />
            <PartnerLink
              title="GitHub Copilot"
              description="ИИ помощник для программистов"
              href="https://github.com/features/copilot"
              icon="💻"
            />
          </div>
        </div>
      </section>

      {/* Bottom Ad Zone */}
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <AdZone zoneId="reviews-bottom-banner" className="mb-6" />
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-emerald-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
            Оставьте свой отзыв
          </h2>
          <p className="text-lg sm:text-xl text-green-100 mb-6 sm:mb-8">
            Поделитесь своим опытом использования ИИ ботов с другими пользователями
          </p>
          <Link 
            href="/guides"
            className="bg-white text-green-600 px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-sm sm:text-base"
          >
            Смотреть руководства
          </Link>
        </div>
      </section>
    </div>
  )
} 