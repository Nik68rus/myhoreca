/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({ dest: 'public' });

const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
};

module.exports = withPWA(nextConfig);
// module.exports = nextConfig;
