'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-xl sm:text-2xl">🤖</div>
            <span className="text-lg sm:text-xl font-bold text-gray-900">ИИ Боты</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link 
              href="/guides" 
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm lg:text-base"
            >
              Руководства
            </Link>
            <Link 
              href="/ratings" 
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm lg:text-base"
            >
              Рейтинги
            </Link>
            <Link 
              href="/reviews" 
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm lg:text-base"
            >
              Отзывы
            </Link>
            <Link 
              href="/news" 
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm lg:text-base"
            >
              Новости
            </Link>
            <Link 
              href="/comparisons" 
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm lg:text-base"
            >
              Сравнения
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 transition-colors p-2"
              aria-label="Открыть меню"
            >
              <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link 
                href="/guides" 
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Руководства
              </Link>
              <Link 
                href="/ratings" 
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Рейтинги
              </Link>
              <Link 
                href="/reviews" 
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Отзывы
              </Link>
              <Link 
                href="/news" 
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Новости
              </Link>
              <Link 
                href="/comparisons" 
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Сравнения
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
} 