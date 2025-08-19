/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Редиректы для старых URL статей
      {
        source: '/articles/guides/:slug.html',
        destination: '/articles/:slug',
        permanent: true,
      },
      {
        source: '/articles/comparisons/:slug.html',
        destination: '/articles/:slug',
        permanent: true,
      },
      {
        source: '/articles/reviews/:slug.html',
        destination: '/articles/:slug',
        permanent: true,
      },
      {
        source: '/articles/news/:slug.html',
        destination: '/articles/:slug',
        permanent: true,
      },
      {
        source: '/articles/main/:slug.html',
        destination: '/articles/:slug',
        permanent: true,
      },
      {
        source: '/articles/ratings/:slug.html',
        destination: '/articles/:slug',
        permanent: true,
      },
      // Редиректы для старых URL отзывов
      {
        source: '/reviews/:slug.html',
        destination: '/articles/:slug',
        permanent: true,
      },
      // Редиректы для старых URL руководств
      {
        source: '/guides/:slug',
        destination: '/articles/:slug',
        permanent: true,
      },
      // Редиректы для старых URL главных страниц
      {
        source: '/main',
        destination: '/',
        permanent: true,
      },
      // Редиректы для некорректных URL
      {
        source: '/5)',
        destination: '/',
        permanent: true,
      },
      {
        source: '/$',
        destination: '/',
        permanent: true,
      },
      {
        source: '/&',
        destination: '/',
        permanent: true,
      },
      {
        source: '/users',
        destination: '/',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/',
        permanent: true,
      },
      {
        source: '/about',
        destination: '/',
        permanent: true,
      },
      {
        source: '/privacy',
        destination: '/',
        permanent: true,
      },
    ]
  },
};

module.exports = nextConfig; 