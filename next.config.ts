import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'crownbehavioralclinic.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.crownbehavioralclinic.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
