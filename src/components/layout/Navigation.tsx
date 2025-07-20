import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigationItems = [
  { name: 'Главная', href: '/' },
  { name: 'Обзоры', href: '/reviews' },
  { name: 'Сравнения', href: '/comparisons' },
  { name: 'Новости', href: '/news' },
  { name: 'Инструкции', href: '/guides' },
  { name: 'Рейтинги', href: '/ratings' },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center space-x-8">
      {navigationItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`text-sm font-medium transition-colors duration-200 ${
              isActive
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
} 