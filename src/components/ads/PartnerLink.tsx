import React from 'react';
import Link from 'next/link';

interface PartnerLinkProps {
  title: string;
  description: string;
  href: string;
  icon?: string;
  className?: string;
}

export function PartnerLink({ title, description, href, icon = '🔗', className = '' }: PartnerLinkProps) {
  return (
    <Link 
      href={href}
      className={`block bg-gradient-to-r from-green-50 to-emerald-50 p-4 sm:p-6 rounded-xl hover:shadow-lg transition-all duration-300 border border-green-200 hover:border-green-300 ${className}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="flex items-start space-x-3 sm:space-x-4">
        <div className="text-2xl sm:text-3xl flex-shrink-0">{icon}</div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 sm:mb-2">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            {description}
          </p>
          <div className="mt-2 sm:mt-3">
            <span className="inline-flex items-center text-xs sm:text-sm text-green-600 font-medium">
              Перейти →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
} 