import { SEOData, PageMetadata } from '@/types';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || `https://${process.env.DOMEN_NAME}` || 'https://your-domain.com';

/**
 * Генерирует метаданные для страницы
 */
export function generateSEOData(data: SEOData): PageMetadata {
  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords,
    ogImage: data.ogImage,
    canonical: data.canonical,
    structuredData: data.structuredData,
  };
}

/**
 * Создает структурированные данные для статьи
 */
export function generateArticleStructuredData(article: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.featuredImage,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'ИИ Боты - Обзоры и Сравнения',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/articles/${article.slug}`,
    },
  };
}

/**
 * Создает структурированные данные для FAQ
 */
export function generateFAQStructuredData(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Создает структурированные данные для обзора
 */
export function generateReviewStructuredData(review: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'SoftwareApplication',
      name: review.botName,
      applicationCategory: 'AI Assistant',
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating,
      bestRating: 5,
    },
    author: {
      '@type': 'Person',
      name: review.author,
    },
    reviewBody: review.content,
    datePublished: review.publishedAt,
  };
}

/**
 * Создает структурированные данные для хлебных крошек
 */
export function generateBreadcrumbStructuredData(breadcrumbs: Array<{ title: string; href: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.title,
      item: `https://your-domain.com${crumb.href}`,
    })),
  };
}

/**
 * Создает структурированные данные для организации
 */
export function generateOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ИИ Боты - Обзоры и Сравнения',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description: 'Современный сайт-блог для обзоров и сравнений ИИ ботов',
    sameAs: [
      'https://t.me/ai_bots_ru',
      'https://vk.com/ai_bots_ru',
    ],
  };
}

/**
 * Создает структурированные данные для веб-сайта
 */
export function generateWebsiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ИИ Боты - Обзоры и Сравнения',
    url: baseUrl,
    description: 'Современный сайт-блог для обзоров и сравнений ИИ ботов',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Генерирует мета-теги для страницы
 */
export function generateMetaTags(metadata: PageMetadata) {
  const tags = [
    { name: 'title', content: metadata.title },
    { name: 'description', content: metadata.description },
    { name: 'keywords', content: metadata.keywords.join(', ') },
    { property: 'og:title', content: metadata.title },
    { property: 'og:description', content: metadata.description },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: metadata.canonical },
    { property: 'og:image', content: metadata.ogImage },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: metadata.title },
    { name: 'twitter:description', content: metadata.description },
    { name: 'twitter:image', content: metadata.ogImage },
  ];

  if (metadata.noIndex) {
    tags.push({ name: 'robots', content: 'noindex, nofollow' });
  }

  return tags;
}

/**
 * Создает sitemap URL
 */
export function generateSitemapUrl(path: string, lastmod?: string, changefreq?: string, priority?: number) {
  return {
    loc: `${baseUrl}${path}`,
    lastmod: lastmod || new Date().toISOString(),
    changefreq: changefreq || 'weekly',
    priority: priority || 0.5,
  };
}

/**
 * Оптимизирует заголовок для SEO
 */
export function optimizeTitle(title: string, maxLength: number = 60): string {
  if (title.length <= maxLength) return title;
  
  const words = title.split(' ');
  let optimized = '';
  
  for (const word of words) {
    if ((optimized + ' ' + word).length <= maxLength) {
      optimized += (optimized ? ' ' : '') + word;
    } else {
      break;
    }
  }
  
  return optimized || title.substring(0, maxLength);
}

/**
 * Оптимизирует описание для SEO
 */
export function optimizeDescription(description: string, maxLength: number = 160): string {
  if (description.length <= maxLength) return description;
  
  return description.substring(0, maxLength).replace(/\s+\w*$/, '') + '...';
}

/**
 * Генерирует slug из заголовка
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * Создает canonical URL
 */
export function createCanonicalUrl(path: string): string {
  return `${baseUrl}${path}`;
} 