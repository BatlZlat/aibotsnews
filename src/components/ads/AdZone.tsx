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
};

export function AdZone({ zoneId, className = '' }: AdZoneProps) {
  useEffect(() => {
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
          window.Ya.Context.AdvManager.render({
            blockId,
            renderTo,
          });
        }
      });
      return;
    }

    // Placeholder для остальных блоков
    const container = document.getElementById(zoneId);
    if (container && !container.innerHTML) {
      container.innerHTML = `
        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 sm:p-4 text-center text-gray-600 text-xs sm:text-sm border border-blue-200">
          <div class="mb-1 sm:mb-2 font-medium">📢 Рекламный блок</div>
          <div class="text-xs opacity-75">${zoneId}</div>
          <div class="mt-2 text-xs opacity-50">728x90 | 300x250 | 320x50</div>
        </div>
      `;
    }
  }, [zoneId]);

  if (zoneId in RSYA_BLOCKS) {
    const { renderTo } = RSYA_BLOCKS[zoneId];
    return (
      <div className={`ad-zone w-full ${className}`}>
        <div id={renderTo}></div>
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