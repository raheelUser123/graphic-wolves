import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    inlineCss: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lightsalmon-swallow-827714.hostingersite.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.lightsalmon-swallow-827714.hostingersite.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
