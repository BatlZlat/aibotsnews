'use client'

import { ReactNode } from 'react'
import { AdZone } from '../ads/AdZone'

interface LayoutProps {
  children: ReactNode
  showAds?: boolean
}

export default function Layout({ children, showAds = true }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {children}
      
      {/* Защита авторских прав */}
      <div className="bg-gray-900 text-gray-400 text-xs text-center py-2 border-t border-gray-800">
        © ИИ Боты 2025. Все права защищены. Копирование материалов сайта запрещено.
      </div>
    </div>
  )
} 