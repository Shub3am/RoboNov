/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["i.dummyjson.com"],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
