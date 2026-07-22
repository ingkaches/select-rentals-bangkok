const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

const nextConfig = {
  typescript: { ignoreBuildErrors: true },
  eslint:     { ignoreDuringBuilds: true },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' }
    ]
  }
};

module.exports = withNextIntl(nextConfig);
