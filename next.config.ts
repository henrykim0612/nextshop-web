import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL("https://tailwindcss.com/plus-assets/**")],
  },
};

export default nextConfig;
