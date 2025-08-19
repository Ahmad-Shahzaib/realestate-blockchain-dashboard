/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable TypeScript type checking
  typescript: {
    ignoreBuildErrors: true,
  },
  // Disable ESLint
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "pub-b7fd9c30cdbf439183b75041f5f71b92.r2.dev",
      },
      {
        protocol: "https",
        hostname: "picsum.photos", // 👈 added this
      },
    ],
  },
};

module.exports = nextConfig;
