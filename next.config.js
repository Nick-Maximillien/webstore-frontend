/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
  },
  images: {
    domains: ['res.cloudinary.com'], // ✅ Cloudinary domain allowed
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/media/**', // ✅ If you fetch local media while testing
      },
    ],
  },
};

module.exports = nextConfig;
