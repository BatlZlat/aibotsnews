import { AdZone } from '@/types';

/**
 * Конфигурация рекламных зон
 */
export const AD_ZONES: AdZone[] = [
  {
    id: 'header-banner',
    name: 'Header Banner',
    position: 'header',
    size: 'leaderboard',
    responsive: true,
    mobile: true,
    desktop: true,
    network: 'rsya',
    code: '<div id="header-ad" class="ad-zone"></div>',
    enabled: true,
  },
  {
    id: 'sidebar-top',
    name: 'Sidebar Top',
    position: 'sidebar',
    size: 'rectangle',
    responsive: true,
    mobile: false,
    desktop: true,
    network: 'rsya',
    code: '<div id="sidebar-top-ad" class="ad-zone"></div>',
    enabled: true,
  },
  {
    id: 'content-top',
    name: 'Content Top',
    position: 'content',
    size: 'rectangle',
    responsive: true,
    mobile: true,
    desktop: true,
    network: 'rsya',
    code: '<div id="content-top-ad" class="ad-zone"></div>',
    enabled: true,
  },
  {
    id: 'content-middle',
    name: 'Content Middle',
    position: 'in-content',
    size: 'rectangle',
    responsive: true,
    mobile: true,
    desktop: true,
    network: 'rsya',
    code: '<div id="content-middle-ad" class="ad-zone"></div>',
    enabled: true,
  },
  {
    id: 'content-bottom',
    name: 'Content Bottom',
    position: 'content',
    size: 'rectangle',
    responsive: true,
    mobile: true,
    desktop: true,
    network: 'rsya',
    code: '<div id="content-bottom-ad" class="ad-zone"></div>',
    enabled: true,
  },
  {
    id: 'sidebar-bottom',
    name: 'Sidebar Bottom',
    position: 'sidebar',
    size: 'rectangle',
    responsive: true,
    mobile: false,
    desktop: true,
    network: 'rsya',
    code: '<div id="sidebar-bottom-ad" class="ad-zone"></div>',
    enabled: true,
  },
  {
    id: 'footer-banner',
    name: 'Footer Banner',
    position: 'footer',
    size: 'leaderboard',
    responsive: true,
    mobile: true,
    desktop: true,
    network: 'rsya',
    code: '<div id="footer-ad" class="ad-zone"></div>',
    enabled: true,
  },
];

/**
 * Получает рекламные зоны для определенной позиции
 */
export function getAdZonesByPosition(position: AdZone['position']): AdZone[] {
  return AD_ZONES.filter(zone => zone.position === position && zone.enabled);
}

/**
 * Получает рекламные зоны для мобильных устройств
 */
export function getMobileAdZones(): AdZone[] {
  return AD_ZONES.filter(zone => zone.mobile && zone.enabled);
}

/**
 * Получает рекламные зоны для десктопа
 */
export function getDesktopAdZones(): AdZone[] {
  return AD_ZONES.filter(zone => zone.desktop && zone.enabled);
}

/**
 * Проверяет, нужно ли показывать рекламу
 */
export function shouldShowAds(): boolean {
  // Проверка на ботов
  if (typeof window !== 'undefined') {
    const userAgent = navigator.userAgent.toLowerCase();
    const isBot = /bot|crawler|spider|crawling/i.test(userAgent);
    if (isBot) return false;
  }

  // Проверка на режим разработки
  if (process.env.NODE_ENV === 'development') {
    return false;
  }

  return true;
}

/**
 * Инициализирует рекламные блоки РСЯ
 */
export function initializeRSYAAds(): void {
  if (typeof window === 'undefined' || !shouldShowAds()) return;

  // Проверяем, что РСЯ уже загружен
  if (window.Ya && window.Ya.Context) {
    return;
  }

  // Загружаем РСЯ скрипт
  const script = document.createElement('script');
  script.src = 'https://yandex.ru/ads/system/context.js';
  script.async = true;
  document.head.appendChild(script);
}

/**
 * Создает рекламный блок РСЯ
 */
export function createRSYAAd(zoneId: string, adId: string): void {
  if (typeof window === 'undefined' || !shouldShowAds()) return;

  const zone = AD_ZONES.find(z => z.id === zoneId);
  if (!zone) return;

  // Создаем контейнер для рекламы
  const container = document.getElementById(zoneId);
  if (!container) return;

  // Инициализируем РСЯ
  if (window.Ya?.Context?.AdvManager) {
    window.Ya.Context.AdvManager.render({
      blockId: adId,
      renderTo: container,
      statId: 123456, // Замените на ваш ID
    });
  }
}

/**
 * Создает рекламный блок Google AdSense
 */
export function createAdSenseAd(zoneId: string, adSlot: string): void {
  if (typeof window === 'undefined' || !shouldShowAds()) return;

  const container = document.getElementById(zoneId);
  if (!container) return;

  // Создаем AdSense блок
  const adElement = document.createElement('ins');
  adElement.className = 'adsbygoogle';
  adElement.style.display = 'block';
  adElement.setAttribute('data-ad-client', 'ca-pub-1234567890123456'); // Замените на ваш ID
  adElement.setAttribute('data-ad-slot', adSlot);
  adElement.setAttribute('data-ad-format', 'auto');
  adElement.setAttribute('data-full-width-responsive', 'true');

  container.appendChild(adElement);

  // Загружаем AdSense
  if (window.adsbygoogle) {
    window.adsbygoogle.push({});
  }
}

/**
 * Создает партнерскую ссылку
 */
export function createAffiliateLink(url: string, affiliateId: string): string {
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}ref=${affiliateId}`;
}

/**
 * Отслеживает клик по партнерской ссылке
 */
export function trackAffiliateClick(affiliateId: string, productName: string): void {
  if (typeof window === 'undefined') return;

  // Отправляем событие в аналитику
  if (window.gtag) {
    window.gtag('event', 'affiliate_click', {
      event_category: 'affiliate',
      event_label: productName,
      value: affiliateId,
    });
  }

  // Отправляем событие в Яндекс.Метрику
  if (window.ym) {
    window.ym(123456, 'reachGoal', 'affiliate_click', {
      product: productName,
      affiliate_id: affiliateId,
    });
  }
}

/**
 * Получает размеры рекламного блока
 */
export function getAdSize(size: AdZone['size']): { width: number; height: number } {
  const sizes = {
    banner: { width: 728, height: 90 },
    rectangle: { width: 300, height: 250 },
    square: { width: 250, height: 250 },
    leaderboard: { width: 728, height: 90 },
  };

  return sizes[size] || sizes.rectangle;
}

/**
 * Проверяет видимость рекламного блока
 */
export function isAdVisible(zoneId: string): boolean {
  if (typeof window === 'undefined') return false;

  const element = document.getElementById(zoneId);
  if (!element) return false;

  const rect = element.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}

/**
 * Отслеживает показы рекламы
 */
export function trackAdImpression(zoneId: string, network: string): void {
  if (typeof window === 'undefined') return;

  // Отправляем событие в аналитику
  if (window.gtag) {
    window.gtag('event', 'ad_impression', {
      event_category: 'ads',
      event_label: zoneId,
      value: network,
    });
  }

  // Отправляем событие в Яндекс.Метрику
  if (window.ym) {
    window.ym(123456, 'reachGoal', 'ad_impression', {
      zone_id: zoneId,
      network: network,
    });
  }
}

/**
 * Получает рекламные зоны для определенной страницы
 */
export function getPageAdZones(pageType: string): AdZone[] {
  const pageZones: Record<string, string[]> = {
    home: ['header-banner', 'content-top', 'sidebar-top', 'content-bottom', 'footer-banner'],
    article: ['content-top', 'content-middle', 'content-bottom', 'sidebar-top', 'sidebar-bottom'],
    category: ['header-banner', 'content-top', 'sidebar-top', 'content-bottom', 'footer-banner'],
    search: ['content-top', 'sidebar-top', 'content-bottom'],
  };

  const zoneIds = pageZones[pageType] || pageZones.home;
  return AD_ZONES.filter(zone => zoneIds.includes(zone.id) && zone.enabled);
}

// Типы для window объекта
declare global {
  interface Window {
    Ya?: {
      Context?: {
        AdvManager?: {
          render: (config: Record<string, unknown>) => void;
        };
      };
    };
    gtag?: (...args: unknown[]) => void;
    ym?: (id: number, action: string, goal: string, params?: Record<string, unknown>) => void;
    adsbygoogle?: unknown[];
  }
} 