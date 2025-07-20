import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Sidebar } from './Sidebar';
import { AdZone } from '../ads/AdZone';

interface LayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
  showAds?: boolean;
}

export function Layout({ children, showSidebar = true, showAds = true }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />
      
      {/* Header Ad */}
      {showAds && <AdZone zoneId="header-banner" />}
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <main className="flex-1">
            {children}
          </main>
          
          {/* Sidebar */}
          {showSidebar && (
            <aside className="lg:w-80">
              <Sidebar />
            </aside>
          )}
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
      
      {/* Footer Ad */}
      {showAds && <AdZone zoneId="footer-banner" />}
    </div>
  );
} 