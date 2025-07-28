import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import Script from 'next/script';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "ИИ Боты 2025: Лучшие AI инструменты и руководства",
    template: "%s | ИИ Боты 2025"
  },
  description: "Подробные обзоры, рейтинги и руководства по использованию ИИ ботов в 2025 году. ChatGPT, Claude, Midjourney и другие AI инструменты.",
  keywords: "ИИ бот, искусственный интеллект, AI помощник, ChatGPT, Claude, Midjourney, 2025",
  authors: [{ name: "ИИ Боты 2025" }],
  creator: "ИИ Боты 2025",
  publisher: "ИИ Боты 2025",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.EXT_PUBLIC_SITE_URL || `https://${process.env.DOMEN_NAME}`),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: process.env.EXT_PUBLIC_SITE_URL || `https://${process.env.DOMEN_NAME}`,
    title: 'ИИ Боты 2025: Лучшие AI инструменты и руководства',
    description: 'Подробные обзоры, рейтинги и руководства по использованию ИИ ботов в 2025 году.',
    siteName: 'ИИ Боты 2025',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ИИ Боты 2025: Лучшие AI инструменты и руководства',
    description: 'Подробные обзоры, рейтинги и руководства по использованию ИИ ботов в 2025 году.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' }
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'ИИ Боты 2025',
  },
  other: {
    'msapplication-TileColor': '#2563eb',
  },
};

export const viewport: Viewport = {
  themeColor: '#2563eb',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "ИИ Боты 2025",
              "description": "Подробные обзоры, рейтинги и руководства по использованию ИИ ботов в 2025 году",
              "url": process.env.EXT_PUBLIC_SITE_URL || `https://${process.env.DOMEN_NAME}`,
              "potentialAction": {
                "@type": "SearchAction",
                "target": `${process.env.EXT_PUBLIC_SITE_URL || `https://${process.env.DOMEN_NAME}`}/search?q={search_term_string}`,
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        {/* Google Analytics */}
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-CYCQXM29N8"
        />
        <Script
          id="google-analytics-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-CYCQXM29N8');
            `,
          }}
        />
        
        {/* Yandex.Metrika */}
        <Script
          id="yandex-metrika"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
              ym(103475212, "init", {
                   clickmap:true,
                   trackLinks:true,
                   accurateTrackBounce:true,
                   webvisor:true,
                   trackHash:true,
                   ut:false
              });
              // Отладочная информация
              console.log('Yandex Metrika initialized with counter: 103475212');
              console.log('Current domain:', window.location.hostname);
            `,
          }}
        />
        <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/103475212" style={{ position: 'absolute', left: '-9999px' }} alt="" />
          </div>
        </noscript>
        
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
