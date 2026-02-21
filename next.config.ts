import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig;

export default nextConfig;
