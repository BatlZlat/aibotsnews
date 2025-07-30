import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AdZone } from '@/components/ads/AdZone'
import { PartnerLink } from '@/components/ads/PartnerLink'
import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import { generateBreadcrumbStructuredData } from '@/utils/seo';

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
  let category = ''
  
  for (const cat of categories) {
    const articlePath = path.join(articlesDir, cat, `${slug}.md`)
    const metaPath = path.join(articlesDir, cat, `${slug}.meta`)
    
    if (fs.existsSync(articlePath)) {
      articleContent = fs.readFileSync(articlePath, 'utf-8')
      category = cat
      
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

  // Проверка metaData на валидность
  function safeMeta(meta: Record<string, unknown> | undefined, key: string, fallback: string = ''): string {
    return (meta && typeof meta[key] === 'string' && meta[key].trim() !== '') ? meta[key] as string : fallback;
  }

  return {
    title: `${title} | ИИ Боты`,
    description: safeMeta(metaData, 'description', `Подробная статья о ${title}`),
    keywords: safeMeta(metaData, 'keywords', 'ИИ бот, искусственный интеллект, AI'),
    openGraph: {
      title: title,
      description: safeMeta(metaData, 'description', `Подробная статья о ${title}`),
      type: 'article',
      url: `${process.env.EXT_PUBLIC_SITE_URL || `https://${process.env.DOMEN_NAME}`}/articles/${slug}`,
      images: [{
        url: safeMeta(metaData, 'ogImage', `${process.env.EXT_PUBLIC_SITE_URL || `https://${process.env.DOMEN_NAME}`}/default-image.png`),
        width: 1200,
        height: 630,
        alt: title,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: safeMeta(metaData, 'description', `Подробная статья о ${title}`),
    },
    alternates: {
      canonical: `${process.env.EXT_PUBLIC_SITE_URL || `https://${process.env.DOMEN_NAME}`}/articles/${slug}`,
    },
    other: {
      'article:published_time': safeMeta(metaData, 'datePublished', new Date().toISOString()),
      'article:modified_time': safeMeta(metaData, 'dateModified', new Date().toISOString()),
      'article:author': 'ИИ Боты',
      'article:section': category.charAt(0).toUpperCase() + category.slice(1),
    },
  }
}

// Улучшенная функция для преобразования markdown-таблиц в HTML-таблицы
function convertMarkdownTables(md: string): string {
  // Ищем все таблицы по паттерну: строка с |, затем строка-разделитель, затем >=1 строка с |
  return md.replace(/((?:^|\n)(\|[^\n]+\|)[ \t]*\n(\|[ \t\-:|]+\|)[ \t]*\n((?:\|[^\n]+\|[ \t]*\n?)+))/gm, (match: string, _table: string, headerLine: string, _alignLine: string, bodyLines: string) => {
    const header = headerLine.split('|').map((cell: string) => cell.trim()).filter((cell: string, i: number, arr: string[]) => i !== 0 && i !== arr.length - 1);
    const rows = bodyLines.trim().split('\n').map((row: string) => row.split('|').map((cell: string) => cell.trim()).filter((cell: string, i: number, arr: string[]) => i !== 0 && i !== arr.length - 1));
    // Формируем thead
    const thead = `<thead><tr>${header.map((cell: string) => `<th class="px-3 py-2 bg-gray-100 text-gray-900 font-semibold border border-gray-200">${cell}</th>`).join('')}</tr></thead>`;
    // Формируем tbody
    const tbody = `<tbody>${rows.map((row: string[]) => `<tr>${row.map((cell: string) => `<td class="px-3 py-2 border border-gray-200">${cell}</td>`).join('')}</tr>`).join('')}</tbody>`;
    // Оборачиваем в table с адаптивным контейнером
    return `<div class="overflow-x-auto my-6"><table class="min-w-full text-sm text-left border-collapse rounded-lg shadow-sm bg-white">${thead}${tbody}</table></div>`;
  });
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

  // Извлекаем заголовок из контента (первая строка с #)
  const titleMatch = articleContent.match(/^#\s+(.+)$/m)
  const title = titleMatch ? titleMatch[1] : slug

  // Сначала преобразуем markdown-таблицы в HTML-таблицы
  const htmlContent = convertMarkdownTables(articleContent)
    .replace(/^#\s+(.+)$/m, '') // Удаляем H1 заголовок, так как он уже есть в header
    .replace(/^##\s+(.+)$/gm, '<h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mt-8 mb-4">$1</h2>')
    .replace(/^###\s+(.+)$/gm, '<h3 class="text-xl sm:text-2xl font-bold text-gray-900 mt-6 mb-3">$1</h3>')
    .replace(/^####\s+(.+)$/gm, '<h4 class="text-lg sm:text-xl font-semibold text-gray-900 mt-4 mb-2">$1</h4>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em class="italic">$1</em>')
    .replace(/`(.+?)`/g, '<code class="bg-gray-100 px-2 py-1 rounded text-sm">$1</code>')
    .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto my-4"><code>$1</code></pre>')
    // Правильная обработка абзацев - оборачиваем в <p> только текст, который не является заголовками или другими блоками
    .replace(/(?<!<[^>]*>)([^<>\n]+(?:\n[^<>\n]+)*?)(?=\n\n|\n#|\n##|\n###|\n####|\n```|$)/g, '<p class="mb-4 text-gray-700 leading-relaxed">$1</p>')
    .replace(/\n\n/g, '')
    .replace(/<p[^>]*><\/p>/g, ''); // Удаляем пустые параграфы

  // Извлекаем метаданные для structured data
  let metaData: { description?: string; keywords?: string; [key: string]: unknown } = {}
  const metaPath = path.join(process.cwd(), 'content/articles', category, `${slug}.meta`)
  if (fs.existsSync(metaPath)) {
    const metaContent = fs.readFileSync(metaPath, 'utf-8')
    try {
      metaData = JSON.parse(metaContent)
    } catch (e) {
      console.error('Error parsing meta file for structured data:', e)
    }
  }

  // Проверка metaData на валидность
  function safeMeta(meta: Record<string, unknown> | undefined, key: string, fallback: string = ''): string {
    return (meta && typeof meta[key] === 'string' && meta[key].trim() !== '') ? meta[key] as string : fallback;
  }

  // Формируем breadcrumbs
  const breadcrumbs = [
    { title: 'Главная', href: '/' },
    { title: category.charAt(0).toUpperCase() + category.slice(1), href: `/${category}` },
    { title, href: `/articles/${slug}` }
  ];
  
  // Формируем breadcrumb structured data
  const breadcrumbStructuredData = generateBreadcrumbStructuredData(breadcrumbs);
  const breadcrumbStructuredDataJson = JSON.stringify(breadcrumbStructuredData);
  

  
  return (
    <>
      {/* Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbStructuredDataJson }}
      />
      
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
                <span>ИИ Боты</span>
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
    </>
  )
} 