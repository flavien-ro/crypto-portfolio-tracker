/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  env: {
    API_NODE_URL: process.env.API_NODE_URL,
    WALLET_CONNECT_ID: process.env.WALLET_CONNECT_ID,
  },
};

module.exports = nextConfig;
