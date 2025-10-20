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
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'pub-b7fd9c30cdbf439183b75041f5f71b92.r2.dev',
      },
      {
        protocol: 'https',
        hostname: 'fractprop.s3.eu-north-1.amazonaws.com',
      },
    ],
  },
  // Increase the timeout for static page generation (in seconds)
  staticPageGenerationTimeout: 1000,
  // Enable debug logging for the build
  logging: {
    level: 'verbose',
  },
  // Optionally, we can try to disable the image optimization if it's causing issues, but note that this is a premium feature in Vercel.
  // images: {
  //   unoptimized: true
  // }
};

module.exports = nextConfig;