/** @type {import('next').NextConfig} */

const withNextIntl = require('next-intl/plugin')(
  // This is the default (also the `src` folder is supported out of the box)
  './i18n.ts'
);

const nextConfig = withNextIntl({
  // Other Next.js configuration ...
  images: {
    domains: ['localhost'], 
  },
});

module.exports = nextConfig
