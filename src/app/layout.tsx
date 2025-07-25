import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import Head from 'next/head';

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
  metadataBase: new URL('https://aibotsguide.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://aibotsguide.com',
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-W44P66H5GP"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-W44P66H5GP');
            `,
          }}
        />
        {/* Yandex.Metrika counter */}
        <script
          type="text/javascript"
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
                   webvisor:true
              });
            `,
          }}
        />
      </Head>
      <noscript>
        <div>
          <img src="https://mc.yandex.ru/watch/103475212" style={{ position: 'absolute', left: '-9999px' }} alt="" />
        </div>
      </noscript>
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
                "url": "https://aibotsnews.ru",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://aibotsnews.ru/search?q={search_term_string}",
                  "query-input": "required name=search_term_string"
                }
              })
            }}
          />
          
          {/* Additional meta tags */}
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#2563eb" />
          <meta name="msapplication-TileColor" content="#2563eb" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="ИИ Боты 2025" />
          
          {/* Preconnect to external domains */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          
          {/* Favicon */}
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="icon" href="/icon.svg" type="image/svg+xml" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          
          {/* Manifest */}
          <link rel="manifest" href="/manifest.json" />
        </head>
        <body className={inter.className}>
          <Navigation />
          <main>{children}</main>
        </body>
      </html>
    </>
  );
}
