/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
    domains: ['localhost', 'bloom-valley-nursery.vercel.app'],
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig 