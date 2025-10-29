import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone", // for self-hosting or Docker
  reactStrictMode: true,
};

export default nextConfig;
