import Link from 'next/link'
import { Metadata } from 'next'
import { AdZone } from '@/components/ads/AdZone'
import { PartnerLink } from '@/components/ads/PartnerLink'
import Layout from '@/components/layout/Layout';
import fs from 'fs'
import path from 'path'

function cleanText(text: string): string {
  let cleaned = text.replace(/<[^>]+>/g, ' ')
  cleaned = cleaned.replace(/[#*_`>\-]/g, '')
  cleaned = cleaned.replace(/<!--([\s\S]*?)-->/g, '')
  cleaned = cleaned.replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim()
  return cleaned
}

function getArticles(dir: string, max: number = 4) {
  const result: Array<{title: string, slug: string}> = []
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir)
    files.filter(f => f.endsWith('-seo.md')).forEach(file => {
      const slug = file.replace('.md', '')
      const content = fs.readFileSync(path.join(dir, file), 'utf-8')
      const titleMatch = content.match(/^#\s+(.+)$/m)
      const title = titleMatch ? cleanText(titleMatch[1]) : slug
      result.push({ title, slug })
    })
  }
  return result.slice(0, max)
}

export const metadata: Metadata = {
  title: 'ИИ Боты 2025: Лучшие AI инструменты и руководства',
  description: 'Подробные обзоры, рейтинги и руководства по использованию ИИ ботов в 2025 году. ChatGPT, Claude, Midjourney и другие AI инструменты.',
  keywords: 'ИИ бот, искусственный интеллект, AI помощник, ChatGPT, Claude, Midjourney, 2025',
  openGraph: {
    title: 'ИИ Боты 2025: Лучшие AI инструменты и руководства',
    description: 'Подробные обзоры, рейтинги и руководства по использованию ИИ ботов в 2025 году.',
    type: 'website',
    url: process.env.EXT_PUBLIC_SITE_URL || `https://${process.env.DOMEN_NAME}`,
  },
}

export default function HomePage() {
  const guidesDir = path.join(process.cwd(), 'content/articles/guides')
  const ratingsDir = path.join(process.cwd(), 'content/articles/ratings')
  const reviewsDir = path.join(process.cwd(), 'content/articles/reviews')
  const newsDir = path.join(process.cwd(), 'content/articles/news')

  const guides = getArticles(guidesDir, 4)
  const ratings = getArticles(ratingsDir, 4)
  const reviews = getArticles(reviewsDir, 4)
  const news = getArticles(newsDir, 4)

  return (
    <Layout showAds={true}>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4 sm:mb-6">
              <div className="text-4xl sm:text-5xl mr-3 sm:mr-4">🤖</div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">ИИ Боты 2025</h1>
            </div>
            <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto">
              Подробные обзоры, рейтинги и руководства по использованию искусственного интеллекта
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/guides" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Начать изучение
              </Link>
              <Link href="/ratings" className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Смотреть рейтинги
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Top Ad Zone */}
      <div className="px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-7xl mx-auto">
          <AdZone zoneId="top-banner" className="mb-6" />
        </div>
      </div>

      {/* Featured Tools */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 px-4">Популярные ИИ инструменты</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {guides.map(g => (
              <a
                key={g.slug}
                href={`/articles/${g.slug}`}
                className="block bg-gradient-to-r from-blue-50 to-indigo-50 p-4 sm:p-6 rounded-xl hover:shadow-lg transition-all duration-300 border border-blue-100"
              >
                <div className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">{g.title}</div>
                <div className="text-gray-600 text-sm sm:text-base">Подробное руководство</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Middle Ad Zone */}
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <AdZone zoneId="middle-banner" className="mb-6" />
        </div>
      </div>

      {/* Content Sections */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            
            {/* Guides Section */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="text-2xl sm:text-3xl mr-3 sm:mr-4">📚</div>
                <h3 className="text-xl sm:text-2xl font-bold">Руководства</h3>
              </div>
              <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                Пошаговые инструкции по использованию популярных ИИ инструментов
              </p>
              <div className="space-y-2">
                {guides.map(g => (
                  <Link key={g.slug} href={`/articles/${g.slug}`} className="block text-blue-600 hover:text-blue-800 transition-colors text-sm sm:text-base">→ {g.title}</Link>
                ))}
                <Link href="/guides" className="inline-block mt-2 text-blue-600 hover:text-blue-800 font-semibold text-sm sm:text-base">Все руководства →</Link>
              </div>
            </div>

            {/* Ratings Section */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="text-2xl sm:text-3xl mr-3 sm:mr-4">🏆</div>
                <h3 className="text-xl sm:text-2xl font-bold">Рейтинги</h3>
              </div>
              <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                Объективные рейтинги лучших ИИ инструментов по категориям
              </p>
              <div className="space-y-2">
                {ratings.map(r => (
                  <Link key={r.slug} href={`/articles/${r.slug}`} className="block text-blue-600 hover:text-blue-800 transition-colors text-sm sm:text-base">→ {r.title}</Link>
                ))}
                <Link href="/ratings" className="inline-block mt-2 text-blue-600 hover:text-blue-800 font-semibold text-sm sm:text-base">Все рейтинги →</Link>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="text-2xl sm:text-3xl mr-3 sm:mr-4">👥</div>
                <h3 className="text-xl sm:text-2xl font-bold">Отзывы</h3>
              </div>
              <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                Реальные отзывы пользователей о популярных ИИ инструментах
              </p>
              <div className="space-y-2">
                {reviews.map(r => (
                  <Link key={r.slug} href={`/articles/${r.slug}`} className="block text-blue-600 hover:text-blue-800 transition-colors text-sm sm:text-base">→ {r.title}</Link>
                ))}
                <Link href="/reviews" className="inline-block mt-2 text-blue-600 hover:text-blue-800 font-semibold text-sm sm:text-base">Все отзывы →</Link>
              </div>
            </div>

            {/* News Section */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="text-2xl sm:text-3xl mr-3 sm:mr-4">📰</div>
                <h3 className="text-xl sm:text-2xl font-bold">Новости</h3>
              </div>
              <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                Свежие новости и обновления в мире искусственного интеллекта
              </p>
              <div className="space-y-2">
                {news.map(n => (
                  <Link key={n.slug} href={`/articles/${n.slug}`} className="block text-blue-600 hover:text-blue-800 transition-colors text-sm sm:text-base">→ {n.title}</Link>
                ))}
                <Link href="/news" className="inline-block mt-2 text-blue-600 hover:text-blue-800 font-semibold text-sm sm:text-base">Все новости →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Programs Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Рекомендуемые ИИ инструменты</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <PartnerLink
              title="ChatGPT"
              description="Мощный ИИ чат-бот для решения различных задач"
              href="https://chat.openai.com"
              icon="🤖"
            />
            <PartnerLink
              title="Claude AI"
              description="Продвинутый ИИ ассистент от Anthropic"
              href="https://claude.ai"
              icon="🧠"
            />
            <PartnerLink
              title="Midjourney"
              description="ИИ для создания потрясающих изображений"
              href="https://midjourney.com"
              icon="🎨"
            />
            <PartnerLink
              title="GitHub Copilot"
              description="ИИ помощник для программистов"
              href="https://github.com/features/copilot"
              icon="💻"
            />
            <PartnerLink
              title="Jasper AI"
              description="Специализированный ИИ для создания контента и копирайтинга"
              href="https://jasper.ai"
              icon="✍️"
            />
            <PartnerLink
              title="Notion AI"
              description="ИИ помощник для организации работы и создания документов"
              href="https://notion.so"
              icon="📝"
            />
          </div>
        </div>
      </section>

      {/* Bottom Ad Zone */}
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <AdZone zoneId="bottom-banner" className="mb-6" />
        </div>
      </div>
    </Layout>
  )
}
