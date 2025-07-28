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
  // Не JSON, не schema.org, не повтор заголовка, не технический блок
  if (paragraph.trim().startsWith('{') || paragraph.trim().startsWith('[')) return false;
  if (/(@context|@type|headline|description|Article)/i.test(paragraph)) return false;
  if (paragraph.trim() === title.trim()) return false;
  // Должно быть хотя бы 2 слова и начинаться с буквы
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
  title: 'Руководства по ИИ ботам | ИИ Боты 2025',
  description: 'Пошаговые инструкции и гайды по использованию ИИ ботов: ChatGPT, Claude, Midjourney, GitHub Copilot и других AI инструментов.',
  keywords: 'руководства ИИ боты, инструкции ChatGPT, гайд Claude, как использовать AI',
}

export default function GuidesPage() {
  const guidesDir = path.join(process.cwd(), 'content/articles/guides')
  const guides: Array<{title: string, slug: string, description: string}> = []
  
  if (fs.existsSync(guidesDir)) {
    const files = fs.readdirSync(guidesDir)
    const mdFiles = files.filter(file => file.endsWith('-seo.md'))
    const tempGuides: Array<{title: string, slug: string, description: string}> = []
    
    mdFiles.forEach(file => {
      const slug = file.replace('.md', '')
      const content = fs.readFileSync(path.join(guidesDir, file), 'utf-8')
      const titleMatch = content.match(/^#\s+(.+)$/m)
      const title = titleMatch ? cleanText(titleMatch[1]) : slug
      const paragraphs = content.split(/\n\n+/).map(cleanText).filter(p => !/^\s*<script/i.test(p) && !/^\s*<meta/i.test(p) && !/^\s*<!--/i.test(p) && !/^\s*SEO Keywords:/i.test(p))
      const found = paragraphs.find(p => isValidDescription(p, title))
      const description = found ? (found.length > 150 ? found.slice(0, 150) + '...' : found) : ''
      tempGuides.push({ title, slug, description })
    })
    // Фильтрация дубликатов по title
    const uniqueTitles = new Set<string>()
    tempGuides.forEach(g => {
      if (!uniqueTitles.has(g.title)) {
        uniqueTitles.add(g.title)
        guides.push(g)
      }
    })
  }

  // Формируем structured data для всех гайдов
  const items = guides.map(guide => generateArticleStructuredData({
    title: guide.title,
    excerpt: guide.description,
    featuredImage: '',
    author: 'ИИ Боты',
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    slug: guide.slug
  }));
  const collectionStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    'name': 'Руководства по ИИ ботам',
    'hasPart': items
  };

  return (
    <Layout showAds={true}>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionStructuredData) }}
        />
      </Head>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Руководства по ИИ ботам
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Подробные инструкции по использованию популярных ИИ инструментов. Научитесь эффективно работать с ChatGPT, Claude, Midjourney и другими AI помощниками.
            </p>
          </div>
        </section>

        {/* Top Ad Zone */}
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto">
            <AdZone zoneId="top-banner" className="mb-6" />
          </div>
        </div>

        {/* Guides Grid */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {guides.map((guide, index) => (
                <div key={guide.slug} className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      Руководство
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 line-clamp-2">
                    {guide.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6 line-clamp-3">
                    {guide.description}
                  </p>
                  <Link 
                    href={`/articles/${guide.slug}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-sm sm:text-base transition-colors"
                  >
                    Читать руководство →
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
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-700">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 px-4">
              Начните использовать ИИ уже сегодня
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8 px-4">
              Следуйте нашим подробным руководствам и научитесь эффективно работать с ИИ инструментами
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Link 
                href="/ratings"
                className="bg-white text-blue-600 px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-sm sm:text-base"
              >
                Смотреть рейтинги
              </Link>
              <Link 
                href="/reviews"
                className="border border-white text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors text-sm sm:text-base"
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
                Инструменты, для которых у нас есть подробные руководства
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
                description="Лучший ИИ для создания потрясающих изображений"
                href="https://www.midjourney.com"
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
                description="Специализированный ИИ для создания контента"
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
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">ИИ Боты 2025</h3>
                <p className="text-gray-400 text-sm sm:text-base">
                  Подробные руководства по ИИ инструментам
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
                <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Инструменты</h4>
                <ul className="space-y-1 sm:space-y-2 text-gray-400 text-sm sm:text-base">
                  <li><Link href="/guides/chatgpt" className="hover:text-white transition-colors">ChatGPT</Link></li>
                  <li><Link href="/guides/claude" className="hover:text-white transition-colors">Claude</Link></li>
                  <li><Link href="/guides/midjourney" className="hover:text-white transition-colors">Midjourney</Link></li>
                  <li><Link href="/guides/github-copilot" className="hover:text-white transition-colors">GitHub Copilot</Link></li>
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