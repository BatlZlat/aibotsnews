'use client'

import { ReactNode } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { AdZone } from '../ads/AdZone'

interface LayoutProps {
  children: ReactNode
  showAds?: boolean
}

export default function Layout({ children, showAds = true }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {showAds && <AdZone zoneId="header-banner" />}
        
        {children}
        
        {showAds && <AdZone zoneId="footer-banner" />}
      </main>

      <Footer />
      
      {/* Защита авторских прав */}
      <div className="bg-gray-900 text-gray-400 text-xs text-center py-2 border-t border-gray-800">
        © ИИ Боты 2025. Все права защищены. Копирование материалов сайта запрещено.
      </div>
    </div>
  )
} 