import Link from 'next/link'
import { Metadata } from 'next'
import { AdZone } from '@/components/ads/AdZone'
import { PartnerLink } from '@/components/ads/PartnerLink'
import fs from 'fs'
import path from 'path'

export const metadata: Metadata = {
  title: 'Новости ИИ ботов | ИИ Боты 2025',
  description: 'Последние новости и обновления в мире ИИ ботов: ChatGPT, Claude, Midjourney, GitHub Copilot и других AI инструментов.',
  keywords: 'новости ИИ боты, новости ChatGPT, новости Claude, новости AI, последние обновления',
}

export default function NewsPage() {
  const newsDir = path.join(process.cwd(), 'content/articles/news')
  const news: Array<{title: string, slug: string, description: string, date: string}> = []
  
  if (fs.existsSync(newsDir)) {
    const files = fs.readdirSync(newsDir)
    const mdFiles = files.filter(file => file.endsWith('.md'))
    
    mdFiles.forEach(file => {
      const slug = file.replace('.md', '')
      const content = fs.readFileSync(path.join(newsDir, file), 'utf-8')
      
      // Извлекаем заголовок и описание
      const titleMatch = content.match(/^#\s+(.+)$/m)
      const title = titleMatch ? titleMatch[1] : slug
      
      // Ищем описание в первых параграфах
      const paragraphs = content.split('\n\n').slice(1, 3).join(' ')
      const description = paragraphs.length > 150 ? paragraphs.substring(0, 150) + '...' : paragraphs
      
      // Извлекаем дату из контента или используем дату файла
      const dateMatch = content.match(/Дата:\s*(.+)/i)
      const date = dateMatch ? dateMatch[1] : new Date().toLocaleDateString('ru-RU')
      
      news.push({ title, slug, description, date })
    })
  }

  // Сортируем новости по дате (новые сначала)
  news.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-indigo-100">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Новости ИИ ботов
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Последние новости, обновления и тренды в мире искусственного интеллекта. Будьте в курсе всех событий, связанных с ChatGPT, Claude, Midjourney и другими AI инструментами.
          </p>
        </div>
      </section>

      {/* Top Ad Zone */}
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <AdZone zoneId="news-top-banner" className="mb-6" />
        </div>
      </div>

      {/* News Grid */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {news.map((article) => (
              <Link 
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="mb-4">
                  {/* Date */}
                  <div className="text-sm text-purple-600 font-medium mb-3">
                    {article.date}
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
                    {article.description}
                  </p>
                </div>
                <div className="flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base">
                  Читать новость →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Middle Ad Zone */}
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <AdZone zoneId="news-middle-banner" className="mb-6" />
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
          <AdZone zoneId="news-bottom-banner" className="mb-6" />
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-indigo-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
            Будьте в курсе событий
          </h2>
          <p className="text-lg sm:text-xl text-purple-100 mb-6 sm:mb-8">
            Подписывайтесь на обновления и получайте последние новости из мира ИИ
          </p>
          <Link 
            href="/ratings"
            className="bg-white text-purple-600 px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-sm sm:text-base"
          >
            Смотреть рейтинги
          </Link>
        </div>
      </section>
    </div>
  )
} 