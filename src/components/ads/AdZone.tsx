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
        <div class="bg-gray-100 rounded-lg p-4 text-center text-gray-500 text-sm">
          <div class="mb-2">📢 Рекламный блок</div>
          <div class="text-xs">${zoneId}</div>
        </div>
      `;
    }
  }, [zoneId]);

  return (
    <div 
      id={zoneId}
      className={`ad-zone ${className}`}
      data-zone-id={zoneId}
    />
  );
} 