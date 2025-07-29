'use client'

import { ReactNode } from 'react'
import Navigation from './Navigation'
import { Header } from './Header'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <Navigation />
      
      {/* Header with Search */}
      <Header />
      
      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
      
      {/* Защита авторских прав */}
      <div className="bg-gray-900 text-gray-400 text-xs text-center py-2 border-t border-gray-800">
        © ИИ Боты. Все права защищены. Копирование материалов сайта запрещено.
      </div>
    </div>
  )
} 