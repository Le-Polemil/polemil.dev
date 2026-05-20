/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bo.polemil.dev',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'bo2.polemil.dev',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.wildnatureimages.com',
        port: '',
        pathname: '/**',
      },
      // Local bekoffice-v2 in development
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
  },
  i18n: {
    locales: ["fr","en"],
    defaultLocale: "fr",
  },

};

module.exports = nextConfig;
