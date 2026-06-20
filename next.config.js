/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow any HTTPS image host — admins paste arbitrary image URLs from the
    // CMS, and Cloudinary (res.cloudinary.com) serves uploaded media.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:8080"],
    },
  },
};

module.exports = nextConfig;
