/** @type {import('next').NextConfig} */

const withNextIntl = require('next-intl/plugin')(
  // This is the default (also the `src` folder is supported out of the box)
  './i18n.ts'
);

const nextConfig = withNextIntl({
  // Other Next.js configuration ...
  images: {
    domains: ['localhost', 'ecmf-project.vercel.app', 'ecmf-eg.com', 'ecmf.onrender.com', 'ecmf.onrender.com/public', 'firebasestorage.googleapis.com'],
  },
  env: {
    Api: process.env.DATA_API_URL,
    ApiKey: process.env.DATA_API_KEY
  }
});

module.exports = nextConfig
