/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "build",
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["localhost", "127.0.0.1", "www.imagesource.com"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**",
        port: "9199",
      },
    ],
  },
};

module.exports = nextConfig;
