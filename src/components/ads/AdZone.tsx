'use client'

import React, { useEffect } from 'react';
import { getAdZonesByPosition, shouldShowAds } from '@/utils/ads';

interface AdZoneProps {
  zoneId: string;
  className?: string;
}

export function AdZone({ zoneId, className = '' }: AdZoneProps) {
  useEffect(() => {
    if (!shouldShowAds()) return;

    // Здесь будет логика инициализации рекламы
    // Пока просто создаем placeholder
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

  return (
    <div 
      id={zoneId}
      className={`ad-zone w-full ${className}`}
      data-zone-id={zoneId}
    />
  );
} 