import { Metadata } from 'next';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import fs from 'fs';
import path from 'path';

export const metadata: Metadata = {
  title: 'Поиск ИИ ботов | ИИ Боты 2025',
  description: 'Поиск по статьям об ИИ ботах, руководствам, рейтингам и отзывам.',
  keywords: 'поиск ИИ боты, поиск AI инструменты, найти ИИ помощник',
};

interface SearchResult {
  title: string;
  slug: string;
  description: string;
  category: string;
  url: string;
}

function cleanText(text: string): string {
  let cleaned = text.replace(/<[^>]+>/g, ' ');
  cleaned = cleaned.replace(/[#*_`>\-]/g, '');
  cleaned = cleaned.replace(/<!--([\s\S]*?)-->/g, '');
  cleaned = cleaned.replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim();
  return cleaned;
}

function searchArticles(query: string): SearchResult[] {
  const results: SearchResult[] = [];
  const searchQuery = query.toLowerCase();
  
  // Папки для поиска
  const folders = [
    'content/articles/main',
    'content/articles/guides',
    'content/articles/ratings',
    'content/articles/reviews',
    'content/articles/news',
    'content/articles/comparisons'
  ];

  folders.forEach(folder => {
    const folderPath = path.join(process.cwd(), folder);
    if (fs.existsSync(folderPath)) {
      const files = fs.readdirSync(folderPath);
      const mdFiles = files.filter(file => file.endsWith('-seo.md'));
      
      mdFiles.forEach(file => {
        const filePath = path.join(folderPath, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const titleMatch = content.match(/^#\s+(.+)$/m);
        const title = titleMatch ? cleanText(titleMatch[1]) : file.replace('.md', '');
        
        // Поиск по заголовку и содержимому
        const contentLower = content.toLowerCase();
        const titleLower = title.toLowerCase();
        
        if (titleLower.includes(searchQuery) || contentLower.includes(searchQuery)) {
          const paragraphs = content.split(/\n\n+/).map(cleanText).filter(p => 
            !/^\s*<script/i.test(p) && 
            !/^\s*<meta/i.test(p) && 
            !/^\s*<!--/i.test(p) && 
            !/^\s*SEO Keywords:/i.test(p) &&
            p.length > 10
          );
          
          const description = paragraphs.find(p => p.length > 20) || '';
          const category = folder.split('/').pop() || 'Статья';
          
          results.push({
            title,
            slug: file.replace('.md', ''),
            description: description.length > 150 ? description.slice(0, 150) + '...' : description,
            category,
            url: `/articles/${file.replace('.md', '')}`
          });
        }
      });
    }
  });

  return results;
}

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q || '';
  const results = query ? searchArticles(query) : [];

  return (
    <Layout showAds={true}>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
                Поиск ИИ ботов
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-6 sm:mb-8 max-w-4xl mx-auto px-4">
                Найдите нужную информацию об ИИ инструментах, руководствах и рейтингах
              </p>
            </div>
          </div>
        </section>

        {/* Search Results */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {query && (
              <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                  Результаты поиска для "{query}"
                </h2>
                <p className="text-gray-600">
                  Найдено {results.length} {results.length === 1 ? 'статья' : results.length < 5 ? 'статьи' : 'статей'}
                </p>
              </div>
            )}

            {!query && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                  Введите поисковый запрос
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Используйте поиск в верхней части страницы, чтобы найти статьи об ИИ ботах, руководства и рейтинги
                </p>
              </div>
            )}

            {query && results.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">😕</div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                  Ничего не найдено
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto mb-6">
                  По вашему запросу "{query}" ничего не найдено. Попробуйте изменить поисковый запрос или просмотрите наши разделы:
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="/guides" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                    Руководства
                  </Link>
                  <Link href="/ratings" className="bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 transition-colors">
                    Рейтинги
                  </Link>
                  <Link href="/reviews" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
                    Отзывы
                  </Link>
                  <Link href="/news" className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors">
                    Новости
                  </Link>
                </div>
              </div>
            )}

            {results.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                {results.map((result, index) => (
                  <div key={index} className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {result.category}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                      {result.title}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">
                      {result.description}
                    </p>
                    <Link 
                      href={result.url}
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-sm sm:text-base transition-colors"
                    >
                      Читать статью →
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">ИИ Боты 2025</h3>
                <p className="text-gray-400 text-sm sm:text-base">
                  Поиск и обзоры ИИ инструментов
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
                <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Поиск</h4>
                <ul className="space-y-1 sm:space-y-2 text-gray-400 text-sm sm:text-base">
                  <li><Link href="/search?q=chatgpt" className="hover:text-white transition-colors">ChatGPT</Link></li>
                  <li><Link href="/search?q=claude" className="hover:text-white transition-colors">Claude</Link></li>
                  <li><Link href="/search?q=midjourney" className="hover:text-white transition-colors">Midjourney</Link></li>
                  <li><Link href="/search?q=github copilot" className="hover:text-white transition-colors">GitHub Copilot</Link></li>
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