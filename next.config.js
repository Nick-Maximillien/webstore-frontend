/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
      typedRoutes: true,
    },
    images: {
      remotePatterns: [
        {
          protocol: "http",
          hostname: "localhost", 
          port: "8000",
          pathname: "/media/**",
          domains: ['res.cloudinary.com'],
          // Adjusted for your media paths
        },
      ],
    },
  };
  
  module.exports = nextConfig;
