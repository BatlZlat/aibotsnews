import Link from 'next/link'
import { Metadata } from 'next'
import { AdZone } from '@/components/ads/AdZone'
import { PartnerLink } from '@/components/ads/PartnerLink'
import Layout from '@/components/layout/Layout'
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
  title: 'Рейтинги ИИ ботов | ИИ Боты',
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
    <Layout>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionStructuredData) }}
        />
      </Head>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-yellow-50 to-amber-100">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
                Рейтинги ИИ ботов
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-6 sm:mb-8 max-w-4xl mx-auto px-4">
                Топ рейтинги лучших ИИ инструментов по категориям. Узнайте, какие ИИ боты занимают первые места в 2025 году.
              </p>
            </div>
          </div>
        </section>

        {/* Top Ad Zone */}
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto">
            <AdZone zoneId="top-banner" className="mb-6" />
          </div>
        </div>

        {/* Ratings Grid */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {ratings.map((rating) => (
                <div key={rating.slug} className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {rating.category}
                    </span>
                    <span className="text-xs font-semibold text-gray-500">Топ {rating.topCount}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 line-clamp-2">
                    {rating.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6 line-clamp-3">
                    {rating.description}
                  </p>
                  <Link 
                    href={`/articles/${rating.slug}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-sm sm:text-base transition-colors"
                  >
                    Смотреть рейтинг →
                  </Link>
                </div>
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

        {/* CTA Section */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-yellow-600 to-amber-700">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 px-4">
              Выберите лучший ИИ инструмент
            </h2>
            <p className="text-lg sm:text-xl text-yellow-100 mb-6 sm:mb-8 px-4">
              Наши рейтинги помогут вам найти идеальный ИИ инструмент для ваших задач
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Link 
                href="/guides"
                className="bg-white text-yellow-600 px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-sm sm:text-base"
              >
                Изучить руководства
              </Link>
              <Link 
                href="/reviews"
                className="border border-white text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-yellow-600 transition-colors text-sm sm:text-base"
              >
                Читать отзывы
              </Link>
            </div>
          </div>
        </section>

        {/* Partner Programs Section */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Популярные ИИ инструменты
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                Инструменты, которые занимают первые места в наших рейтингах
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <PartnerLink
                title="ChatGPT Plus"
                description="Лидер рейтинга чат-ботов с расширенными возможностями"
                href="https://chat.openai.com/chat"
                icon="🤖"
              />
              <PartnerLink
                title="Midjourney"
                description="Лучший генератор изображений по версии наших экспертов"
                href="https://www.midjourney.com"
                icon="🎨"
              />
              <PartnerLink
                title="GitHub Copilot"
                description="Топ-1 в рейтинге инструментов для программирования"
                href="https://github.com/features/copilot"
                icon="💻"
              />
              <PartnerLink
                title="Claude Pro"
                description="Мощный ИИ помощник для работы с текстом"
                href="https://claude.ai"
                icon="🧠"
              />
              <PartnerLink
                title="Jasper AI"
                description="Лучший инструмент для создания контента"
                href="https://jasper.ai"
                icon="✍️"
              />
              <PartnerLink
                title="Notion AI"
                description="ИИ помощник для организации работы"
                href="https://notion.so"
                icon="📝"
              />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">ИИ Боты</h3>
                <p className="text-gray-400 text-sm sm:text-base">
                  Объективные рейтинги и обзоры ИИ инструментов
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Разделы</h4>
                <ul className="space-y-1 sm:space-y-2 text-gray-400 text-sm sm:text-base">
                  <li><Link href="/guides" className="hover:text-white transition-colors">Руководства</Link></li>
                  <li><Link href="/ratings" className="hover:text-white transition-colors">Рейтинги</Link></li>
                  <li><Link href="/reviews" className="hover:text-white transition-colors">Отзывы</Link></li>
                  <li><Link href="/news" className="hover:text-white transition-colors">Новости</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Категории</h4>
                <ul className="space-y-1 sm:space-y-2 text-gray-400 text-sm sm:text-base">
                  <li><Link href="/ratings" className="hover:text-white transition-colors">Чат-боты</Link></li>
                  <li><Link href="/ratings" className="hover:text-white transition-colors">Генераторы изображений</Link></li>
                  <li><Link href="/ratings" className="hover:text-white transition-colors">Инструменты программирования</Link></li>
                  <li><Link href="/ratings" className="hover:text-white transition-colors">Продуктивность</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Информация</h4>
                <ul className="space-y-1 sm:space-y-2 text-gray-400 text-sm sm:text-base">
                  <li><Link href="/about" className="hover:text-white transition-colors">О проекте</Link></li>
                  <li><Link href="/contact" className="hover:text-white transition-colors">Контакты</Link></li>
                  <li><Link href="/privacy" className="hover:text-white transition-colors">Политика конфиденциальности</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-400">
              <p className="text-sm sm:text-base">&copy; 2025 ИИ Боты. Все права защищены.</p>
            </div>
          </div>
        </footer>
      </div>
    </Layout>
  );
} 