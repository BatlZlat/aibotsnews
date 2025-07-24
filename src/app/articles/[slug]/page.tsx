import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AdZone } from '@/components/ads/AdZone'
import { PartnerLink } from '@/components/ads/PartnerLink'
import fs from 'fs'
import path from 'path'
import Link from 'next/link'

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const articlesDir = path.join(process.cwd(), 'content/articles')
  const categories = ['main', 'guides', 'ratings', 'reviews', 'news', 'comparisons']
  const params: { slug: string }[] = []

  for (const category of categories) {
    const categoryPath = path.join(articlesDir, category)
    if (fs.existsSync(categoryPath)) {
      const files = fs.readdirSync(categoryPath)
      const mdFiles = files.filter(file => file.endsWith('.md'))
      
      mdFiles.forEach(file => {
        const slug = file.replace('.md', '')
        params.push({ slug })
      })
    }
  }

  return params
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  
  // Ищем статью во всех категориях
  const articlesDir = path.join(process.cwd(), 'content/articles')
  const categories = ['main', 'guides', 'ratings', 'reviews', 'news', 'comparisons']
  
  let articleContent = ''
  let metaData: { description?: string; keywords?: string; [key: string]: unknown } = {}
  
  for (const category of categories) {
    const articlePath = path.join(articlesDir, category, `${slug}.md`)
    const metaPath = path.join(articlesDir, category, `${slug}.meta`)
    
    if (fs.existsSync(articlePath)) {
      articleContent = fs.readFileSync(articlePath, 'utf-8')
      
      if (fs.existsSync(metaPath)) {
        const metaContent = fs.readFileSync(metaPath, 'utf-8')
        try {
          metaData = JSON.parse(metaContent)
        } catch (e) {
          console.error('Error parsing meta file:', e)
        }
      }
      break
    }
  }

  if (!articleContent) {
    notFound()
  }

  // Извлекаем заголовок из контента (первая строка с #)
  const titleMatch = articleContent.match(/^#\s+(.+)$/m)
  const title = titleMatch ? titleMatch[1] : slug

  return {
    title: `${title} | ИИ Боты 2025`,
    description: metaData.description || `Подробная статья о ${title}`,
    keywords: metaData.keywords || 'ИИ бот, искусственный интеллект, AI',
    openGraph: {
      title: title,
      description: metaData.description || `Подробная статья о ${title}`,
      type: 'article',
      url: `https://aibotsguide.com/articles/${slug}`,
    },
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  // Ищем статью во всех категориях
  const articlesDir = path.join(process.cwd(), 'content/articles')
  const categories = ['main', 'guides', 'ratings', 'reviews', 'news', 'comparisons']
  
  let articleContent = ''
  let category = ''
  
  for (const cat of categories) {
    const articlePath = path.join(articlesDir, cat, `${slug}.md`)
    
    if (fs.existsSync(articlePath)) {
      articleContent = fs.readFileSync(articlePath, 'utf-8')
      category = cat
      break
    }
  }

  if (!articleContent) {
    notFound()
  }

  // Извлекаем заголовок из контента
  const titleMatch = articleContent.match(/^#\s+(.+)$/m)
  const title = titleMatch ? titleMatch[1] : slug

  // Конвертируем markdown в HTML (простая версия)
  const htmlContent = articleContent
    .replace(/^#\s+(.+)$/m, '<h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">$1</h1>')
    .replace(/^##\s+(.+)$/gm, '<h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mt-8 mb-4">$1</h2>')
    .replace(/^###\s+(.+)$/gm, '<h3 class="text-xl sm:text-2xl font-bold text-gray-900 mt-6 mb-3">$1</h3>')
    .replace(/^####\s+(.+)$/gm, '<h4 class="text-lg sm:text-xl font-semibold text-gray-900 mt-4 mb-2">$1</h4>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em class="italic">$1</em>')
    .replace(/`(.+?)`/g, '<code class="bg-gray-100 px-2 py-1 rounded text-sm">$1</code>')
    .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto my-4"><code>$1</code></pre>')
    .replace(/\n\n/g, '</p><p class="mb-4 text-gray-700 leading-relaxed">')
    .replace(/^\n/, '<p class="mb-4 text-gray-700 leading-relaxed">')
    .replace(/\n$/, '</p>')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Ad Zone */}
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto">
          <AdZone zoneId="article-top-banner" className="mb-4" />
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          {/* Breadcrumbs */}
          <nav className="text-sm text-gray-500 mb-6">
            <ol className="flex items-center space-x-2">
              <li><Link href="/" className="hover:text-blue-600">Главная</Link></li>
              <li>/</li>
              <li><Link href={`/${category}`} className="hover:text-blue-600 capitalize">{category}</Link></li>
              <li>/</li>
              <li className="text-gray-900">{title}</li>
            </ol>
          </nav>

          {/* Article Header */}
          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {title}
            </h1>
            <div className="flex items-center text-sm text-gray-500">
              <span>ИИ Боты 2025</span>
              <span className="mx-2">•</span>
              <span>{new Date().toLocaleDateString('ru-RU')}</span>
            </div>
          </header>

          {/* Article Content */}
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>
      </article>

      {/* Middle Ad Zone */}
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <AdZone zoneId="article-middle-banner" className="mb-6" />
        </div>
      </div>

      {/* Related Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Похожие статьи</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Что такое ИИ боты в 2025 году</h3>
            <p className="text-gray-600 text-sm mb-4">Подробное руководство по искусственному интеллекту</p>
            <Link href="/articles/what-is-ai-bot-2024-seo" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Читать далее →
            </Link>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Топ-10 лучших ИИ ботов для бизнеса</h3>
            <p className="text-gray-600 text-sm mb-4">Рейтинг самых эффективных AI инструментов</p>
            <Link href="/articles/top-10-ai-bots-for-business-2024-seo" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Читать далее →
            </Link>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Как выбрать ИИ бота для ваших задач</h3>
            <p className="text-gray-600 text-sm mb-4">Руководство по выбору подходящего инструмента</p>
            <Link href="/articles/how-to-choose-ai-bot-seo" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Читать далее →
            </Link>
          </div>
        </div>
      </section>

      {/* Partner Programs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Рекомендуемые инструменты</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
        </div>
      </section>

      {/* Bottom Ad Zone */}
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <AdZone zoneId="article-bottom-banner" className="mb-6" />
        </div>
      </div>
    </div>
  )
} 