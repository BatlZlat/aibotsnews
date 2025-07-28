'use client'

import React, { useEffect } from 'react';
import { shouldShowAds } from '@/utils/ads';

interface AdZoneProps {
  zoneId: string;
  className?: string;
}

declare global {
  interface Window {
    yaContextCb?: Array<() => void>;
    Ya?: {
      Context?: {
        AdvManager?: {
          render: (config: Record<string, unknown>) => void;
        };
      };
    };
  }
}

const RSYA_BLOCKS: Record<string, { blockId: string; renderTo: string }> = {
  'header-banner': {
    blockId: 'R-A-16407258-1',
    renderTo: 'yandex_rtb_R-A-16407258-1',
  },
  'sidebar-top': {
    blockId: 'R-A-16407258-2',
    renderTo: 'yandex_rtb_R-A-16407258-2',
  },
  'sidebar-bottom': {
    blockId: 'R-A-16407258-3',
    renderTo: 'yandex_rtb_R-A-16407258-3',
  },
  'footer-banner': {
    blockId: 'R-A-16407258-4',
    renderTo: 'yandex_rtb_R-A-16407258-4',
  },
  // Добавляем недостающие блоки
  'top-banner': {
    blockId: 'R-A-16407258-1',
    renderTo: 'yandex_rtb_R-A-16407258-1',
  },
  'middle-banner': {
    blockId: 'R-A-16407258-1',
    renderTo: 'yandex_rtb_R-A-16407258-1',
  },
  'bottom-banner': {
    blockId: 'R-A-16407258-4',
    renderTo: 'yandex_rtb_R-A-16407258-4',
  },
  'sidebar-banner': {
    blockId: 'R-A-16407258-2',
    renderTo: 'yandex_rtb_R-A-16407258-2',
  },
  // Блоки для разных страниц
  'article-top-banner': {
    blockId: 'R-A-16407258-1',
    renderTo: 'yandex_rtb_R-A-16407258-1',
  },
  'article-middle-banner': {
    blockId: 'R-A-16407258-1',
    renderTo: 'yandex_rtb_R-A-16407258-1',
  },
  'article-bottom-banner': {
    blockId: 'R-A-16407258-4',
    renderTo: 'yandex_rtb_R-A-16407258-4',
  },
  'reviews-top-banner': {
    blockId: 'R-A-16407258-1',
    renderTo: 'yandex_rtb_R-A-16407258-1',
  },
  'reviews-middle-banner': {
    blockId: 'R-A-16407258-1',
    renderTo: 'yandex_rtb_R-A-16407258-1',
  },
  'reviews-bottom-banner': {
    blockId: 'R-A-16407258-4',
    renderTo: 'yandex_rtb_R-A-16407258-4',
  },
  'news-top-banner': {
    blockId: 'R-A-16407258-1',
    renderTo: 'yandex_rtb_R-A-16407258-1',
  },
  'news-middle-banner': {
    blockId: 'R-A-16407258-1',
    renderTo: 'yandex_rtb_R-A-16407258-1',
  },
  'news-bottom-banner': {
    blockId: 'R-A-16407258-4',
    renderTo: 'yandex_rtb_R-A-16407258-4',
  },
  'comparisons-top-banner': {
    blockId: 'R-A-16407258-1',
    renderTo: 'yandex_rtb_R-A-16407258-1',
  },
  'comparisons-middle-banner': {
    blockId: 'R-A-16407258-1',
    renderTo: 'yandex_rtb_R-A-16407258-1',
  },
  'comparisons-bottom-banner': {
    blockId: 'R-A-16407258-4',
    renderTo: 'yandex_rtb_R-A-16407258-4',
  },
  'ratings-top-banner': {
    blockId: 'R-A-16407258-1',
    renderTo: 'yandex_rtb_R-A-16407258-1',
  },
  'ratings-middle-banner': {
    blockId: 'R-A-16407258-1',
    renderTo: 'yandex_rtb_R-A-16407258-1',
  },
  'ratings-bottom-banner': {
    blockId: 'R-A-16407258-4',
    renderTo: 'yandex_rtb_R-A-16407258-4',
  },
  'guides-top-banner': {
    blockId: 'R-A-16407258-1',
    renderTo: 'yandex_rtb_R-A-16407258-1',
  },
  'guides-middle-banner': {
    blockId: 'R-A-16407258-1',
    renderTo: 'yandex_rtb_R-A-16407258-1',
  },
  'guides-bottom-banner': {
    blockId: 'R-A-16407258-4',
    renderTo: 'yandex_rtb_R-A-16407258-4',
  },
};

export function AdZone({ zoneId, className = '' }: AdZoneProps) {
  useEffect(() => {
    // Проверяем, нужно ли показывать рекламу
    if (!shouldShowAds()) return;

    if (zoneId in RSYA_BLOCKS) {
      // Проверяем, что скрипт уже загружен
      if (!document.getElementById('yandex-rtb-loader')) {
        const script = document.createElement('script');
        script.id = 'yandex-rtb-loader';
        script.src = 'https://yandex.ru/ads/system/context.js';
        script.async = true;
        document.head.appendChild(script);
      }
      
      // Инициализация блока после загрузки скрипта
      window.yaContextCb = window.yaContextCb || [];
      const { blockId, renderTo } = RSYA_BLOCKS[zoneId];
      
      window.yaContextCb.push(() => {
        if (window.Ya && window.Ya.Context && window.Ya.Context.AdvManager) {
          try {
            window.Ya.Context.AdvManager.render({
              blockId,
              renderTo,
            });
          } catch {
            console.log(`РСЯ блок ${blockId} не может загрузиться на localhost (это нормально для разработки)`);
          }
        }
      });
      return;
    }

    // Placeholder для остальных блоков
    const container = document.getElementById(zoneId);
    if (container && !container.innerHTML) {
      container.innerHTML = `
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 sm:p-4 text-center text-gray-600 text-xs sm:text-sm border border-blue-200">
          <div className="mb-1 sm:mb-2 font-medium">📢 Рекламный блок</div>
          <div className="text-xs opacity-75">${zoneId}</div>
          <div className="mt-2 text-xs opacity-50">728x90 | 300x250 | 320x50</div>
        </div>
      `;
    }
  }, [zoneId]);

  if (zoneId in RSYA_BLOCKS) {
    const { renderTo, blockId } = RSYA_BLOCKS[zoneId];
    
    return (
      <div className={`ad-zone w-full ${className}`}>
        <div id={renderTo} className="min-h-[90px] bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-3 sm:p-4 text-center text-gray-600 text-xs sm:text-sm border border-green-200">
          <div className="mb-1 sm:mb-2 font-medium">📢 РСЯ блок</div>
          <div className="text-xs opacity-75">{zoneId}</div>
          <div className="mt-2 text-xs opacity-50">ID: {blockId}</div>
          <div className="mt-1 text-xs text-orange-600">
            ⚠️ На localhost показывается placeholder
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      id={zoneId}
      className={`ad-zone w-full ${className}`}
      data-zone-id={zoneId}
    />
  );
} 