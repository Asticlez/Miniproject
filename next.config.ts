import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Enable React Strict Mode
  env: {
    DATABASE_URL: "file:./dev.db", // Add your database URL here
  },
};

export default nextConfig;