import Link from 'next/link'
import { Metadata } from 'next'
import { AdZone } from '@/components/ads/AdZone'
import { PartnerLink } from '@/components/ads/PartnerLink'
import fs from 'fs'
import path from 'path'
import Head from 'next/head';
import { generateArticleStructuredData } from '@/utils/seo';

function isValidDescription(paragraph: string, title: string): boolean {
  if (!paragraph) return false;
  if (paragraph.trim().startsWith('{') || paragraph.trim().startsWith('[')) return false;
  if (/(@context|@type|headline|description|Article)/i.test(paragraph)) return false;
  if (paragraph.trim() === title.trim()) return false;
  if (!/^[А-ЯA-Zа-яa-z]/.test(paragraph.trim())) return false;
  if (paragraph.trim().split(' ').length < 3) return false;
  return true;
}

function cleanText(text: string): string {
  let cleaned = text.replace(/<[^>]+>/g, ' ')
  cleaned = cleaned.replace(/[#*_`>\-]/g, '')
  cleaned = cleaned.replace(/<!--([\s\S]*?)-->/g, '')
  cleaned = cleaned.replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim()
  return cleaned
}

export const metadata: Metadata = {
  title: 'Рейтинги ИИ ботов | ИИ Боты 2025',
  description: 'Топ рейтинги лучших ИИ ботов: чат-боты, генераторы изображений, инструменты для программирования и продуктивности в 2025 году.',
  keywords: 'рейтинги ИИ боты, топ ИИ инструменты, лучшие AI боты, рейтинг ChatGPT, рейтинг Claude',
}

export default function RatingsPage() {
  const ratingsDir = path.join(process.cwd(), 'content/articles/ratings')
  const ratings: Array<{title: string, slug: string, description: string, category: string, topCount: number}> = []
  
  if (fs.existsSync(ratingsDir)) {
    const files = fs.readdirSync(ratingsDir)
    const mdFiles = files.filter(file => file.endsWith('-seo.md'))
    const tempRatings: Array<{title: string, slug: string, description: string, category: string, topCount: number}> = []
    
    mdFiles.forEach(file => {
      const slug = file.replace('.md', '')
      const content = fs.readFileSync(path.join(ratingsDir, file), 'utf-8')
      const titleMatch = content.match(/^#\s+(.+)$/m)
      const title = titleMatch ? cleanText(titleMatch[1]) : slug
      const paragraphs = content.split(/\n\n+/).map(cleanText).filter(p => !/^\s*<script/i.test(p) && !/^\s*<meta/i.test(p) && !/^\s*<!--/i.test(p) && !/^\s*SEO Keywords:/i.test(p))
      const found = paragraphs.find(p => isValidDescription(p, title))
      const description = found ? (found.length > 150 ? found.slice(0, 150) + '...' : found) : ''
      let category = 'Общий рейтинг'
      let topCount = 10
      if (title.includes('чат-бот')) category = 'Чат-боты'
      else if (title.includes('изображен')) category = 'Генераторы изображений'
      else if (title.includes('программир')) category = 'Инструменты для программирования'
      else if (title.includes('продуктивн')) category = 'Инструменты продуктивности'
      const topMatch = title.match(/топ-(\d+)/i)
      if (topMatch) {
        topCount = parseInt(topMatch[1])
      }
      tempRatings.push({ title, slug, description, category, topCount })
    })
    // Фильтрация дубликатов по title
    const uniqueTitles = new Set<string>()
    tempRatings.forEach(r => {
      if (!uniqueTitles.has(r.title)) {
        uniqueTitles.add(r.title)
        ratings.push(r)
      }
    })
  }

  // Формируем structured data для всех рейтингов
  const items = ratings.map(rating => generateArticleStructuredData({
    title: rating.title,
    excerpt: rating.description,
    featuredImage: '',
    author: 'ИИ Боты',
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    slug: rating.slug
  }));
  const collectionStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    'name': 'Рейтинги ИИ ботов',
    'hasPart': items
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionStructuredData) }}
        />
      </Head>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-yellow-50 to-amber-100">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Рейтинги ИИ ботов
              </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Топ рейтинги лучших ИИ инструментов по категориям. Узнайте, какие ИИ боты занимают первые места в 2025 году.
              </p>
          </div>
        </section>

        {/* Top Ad Zone */}
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto">
            <AdZone zoneId="ratings-top-banner" className="mb-6" />
          </div>
        </div>

        {/* Ratings Grid */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {ratings.map((rating) => (
                <Link 
                  key={rating.slug}
                  href={`/articles/${rating.slug}`}
                  className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="mb-4">
                    {/* Category and Top Count */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                          {rating.category}
                      </span>
                      <span className="text-sm text-gray-500 font-medium">
                        Топ {rating.topCount}
                      </span>
                        </div>
                    
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                        {rating.title}
                      </h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
                        {rating.description}
                      </p>
                  </div>
                  <div className="flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base">
                        Смотреть рейтинг →
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Middle Ad Zone */}
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto">
            <AdZone zoneId="ratings-middle-banner" className="mb-6" />
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
                icon="��"
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
            <AdZone zoneId="ratings-bottom-banner" className="mb-6" />
          </div>
        </div>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-yellow-600 to-amber-700">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
              Выберите лучший инструмент
            </h2>
            <p className="text-lg sm:text-xl text-yellow-100 mb-6 sm:mb-8">
              Изучите рейтинги и выберите ИИ инструмент, который подходит именно вам
            </p>
              <Link 
                href="/guides"
              className="bg-white text-yellow-600 px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-sm sm:text-base"
              >
              Смотреть руководства
              </Link>
          </div>
        </section>
      </div>
    </>
  )
} 