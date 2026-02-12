/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  env: {
    WORDPRESS_API_URL: process.env.WORDPRESS_API_URL || 'https://quagua.com/wp-json',
  },
}
module.exports = nextConfig
