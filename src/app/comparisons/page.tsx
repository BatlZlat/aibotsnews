import Link from 'next/link'
import { Metadata } from 'next'
import { AdZone } from '@/components/ads/AdZone'
import { PartnerLink } from '@/components/ads/PartnerLink'
import fs from 'fs'
import path from 'path'

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
  title: 'Сравнения ИИ ботов | ИИ Боты 2025',
  description: 'Детальные сравнения популярных ИИ ботов: ChatGPT vs Claude, Midjourney vs DALL-E, GitHub Copilot vs Microsoft Copilot и других AI инструментов.',
  keywords: 'сравнения ИИ боты, ChatGPT vs Claude, Midjourney vs DALL-E, сравнение AI инструментов',
}

export default function ComparisonsPage() {
  const comparisonsDir = path.join(process.cwd(), 'content/articles/comparisons')
  const comparisons: Array<{title: string, slug: string, description: string, tools: string[]}> = []
  
  if (fs.existsSync(comparisonsDir)) {
    const files = fs.readdirSync(comparisonsDir)
    const mdFiles = files.filter(file => file.endsWith('-seo.md'))
    const tempComparisons: Array<{title: string, slug: string, description: string, tools: string[]}> = []
    
    mdFiles.forEach(file => {
      const slug = file.replace('.md', '')
      const content = fs.readFileSync(path.join(comparisonsDir, file), 'utf-8')
      const titleMatch = content.match(/^#\s+(.+)$/m)
      const title = titleMatch ? cleanText(titleMatch[1]) : slug
      const paragraphs = content.split(/\n\n+/).map(cleanText).filter(p => !/^\s*<script/i.test(p) && !/^\s*<meta/i.test(p) && !/^\s*<!--/i.test(p) && !/^\s*SEO Keywords:/i.test(p))
      const found = paragraphs.find(p => isValidDescription(p, title))
      const description = found ? (found.length > 150 ? found.slice(0, 150) + '...' : found) : ''
      const toolsMatch = title.match(/(.+?)\s+vs\s+(.+)/i)
      const tools = toolsMatch ? [toolsMatch[1].trim(), toolsMatch[2].trim()] : ['Инструмент 1', 'Инструмент 2']
      tempComparisons.push({ title, slug, description, tools })
    })
    // Фильтрация дубликатов по title
    const uniqueTitles = new Set<string>()
    tempComparisons.forEach(c => {
      if (!uniqueTitles.has(c.title)) {
        uniqueTitles.add(c.title)
        comparisons.push(c)
      }
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 to-red-100">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Сравнения ИИ ботов
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Детальные сравнения популярных ИИ инструментов. Узнайте, какой инструмент лучше подходит для ваших задач: ChatGPT или Claude, Midjourney или DALL-E, и другие сравнения.
          </p>
        </div>
      </section>

      {/* Top Ad Zone */}
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <AdZone zoneId="comparisons-top-banner" className="mb-6" />
        </div>
      </div>

      {/* Comparisons Grid */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {comparisons.map((comparison) => (
              <Link 
                key={comparison.slug}
                href={`/articles/${comparison.slug}`}
                className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="mb-4">
                  {/* Tools Comparison */}
                  <div className="flex items-center justify-between mb-4 p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
                    <div className="text-center flex-1">
                      <div className="text-sm font-medium text-gray-700">{comparison.tools[0]}</div>
                    </div>
                    <div className="mx-3 text-lg font-bold text-orange-600">VS</div>
                    <div className="text-center flex-1">
                      <div className="text-sm font-medium text-gray-700">{comparison.tools[1]}</div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                    {comparison.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
                    {comparison.description}
                  </p>
                </div>
                <div className="flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base">
                  Читать сравнение →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Middle Ad Zone */}
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <AdZone zoneId="comparisons-middle-banner" className="mb-6" />
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
          <AdZone zoneId="comparisons-bottom-banner" className="mb-6" />
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-600 to-red-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
            Выберите лучший инструмент
          </h2>
          <p className="text-lg sm:text-xl text-orange-100 mb-6 sm:mb-8">
            Изучите сравнения и выберите ИИ инструмент, который подходит именно вам
          </p>
          <Link 
            href="/guides"
            className="bg-white text-orange-600 px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-sm sm:text-base"
          >
            Смотреть руководства
          </Link>
        </div>
      </section>
    </div>
  )
} 