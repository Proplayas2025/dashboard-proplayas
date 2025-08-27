import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'localhost',
      'proplayas.org',
      'proplayas.local',
      'www.gettyimages.es',
      'imgs.search.brave.com',
      'i.pinimg.com'
    ],
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: '**' },
    ],
  },
  devIndicators: false // Disable the "Experimental features" warning in development mode
  /* config options here */
};

export default nextConfig;
