/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "images.unsplash.com",
      "via.placeholder.com",
      "images.squarespace-cdn.com", // Add this
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:8080"],
    },
  },
};

module.exports = nextConfig;
