import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost', 'proplayas.org'],
  },
  devIndicators: false // Disable the "Experimental features" warning in development mode
  /* config options here */
};

export default nextConfig;
