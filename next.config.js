/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "images.unsplash.com",
      "via.placeholder.com",
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:8080"],
    },
  },
};

module.exports = nextConfig;
