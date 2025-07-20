// Базовые типы для контента
export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  tags: string[];
  category: 'review' | 'news' | 'guide' | 'rating' | 'comparison';
  featuredImage?: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  readingTime: number;
  views: number;
}

// Типы для ИИ ботов
export interface AIBot {
  id: string;
  name: string;
  slug: string;
  description: string;
  features: string[];
  pricing: {
    free: boolean;
    paid: boolean;
    plans?: PricingPlan[];
  };
  pros: string[];
  cons: string[];
  rating: number;
  reviewCount: number;
  website: string;
  affiliateLink?: string;
  logo: string;
  screenshots: string[];
  category: 'chatbot' | 'assistant' | 'creative' | 'productivity';
}

export interface PricingPlan {
  name: string;
  price: number;
  currency: string;
  period: 'monthly' | 'yearly' | 'one-time';
  features: string[];
}

// Типы для рекламы
export interface AdZone {
  id: string;
  name: string;
  position: 'header' | 'sidebar' | 'content' | 'footer' | 'in-content';
  size: 'banner' | 'rectangle' | 'square' | 'leaderboard';
  responsive: boolean;
  mobile: boolean;
  desktop: boolean;
  network: 'rsya' | 'adsense' | 'affiliate';
  code: string;
  enabled: boolean;
}

// Типы для SEO
export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonical?: string;
  structuredData?: object;
}

// Типы для навигации
export interface NavigationItem {
  id: string;
  title: string;
  href: string;
  children?: NavigationItem[];
  external?: boolean;
}

// Типы для аналитики
export interface AnalyticsEvent {
  event: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
}

// Типы для пользователей
export interface User {
  id: string;
  email: string;
  name?: string;
  preferences: {
    theme: 'light' | 'dark' | 'auto';
    language: 'ru' | 'en';
  };
}

// Типы для API ответов
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Типы для пагинации
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Типы для поиска
export interface SearchParams {
  query: string;
  category?: string;
  tags?: string[];
  sortBy?: 'date' | 'rating' | 'views' | 'title';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

// Типы для фильтров
export interface FilterOptions {
  categories: string[];
  tags: string[];
  priceRange: {
    min: number;
    max: number;
  };
  rating: {
    min: number;
    max: number;
  };
}

// Типы для комментариев
export interface Comment {
  id: string;
  articleId: string;
  author: string;
  content: string;
  createdAt: string;
  rating?: number;
  approved: boolean;
}

// Типы для подписки
export interface Subscription {
  id: string;
  email: string;
  subscribedAt: string;
  active: boolean;
  preferences: {
    news: boolean;
    reviews: boolean;
    guides: boolean;
  };
}

// Типы для уведомлений
export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    href: string;
  };
}

// Типы для метаданных страницы
export interface PageMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonical?: string;
  noIndex?: boolean;
  structuredData?: object;
}

// Типы для хлебных крошек
export interface Breadcrumb {
  title: string;
  href: string;
  current?: boolean;
}

// Типы для тегов
export interface Tag {
  id: string;
  name: string;
  slug: string;
  count: number;
  color?: string;
}

// Типы для категорий
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  count: number;
  icon?: string;
} 