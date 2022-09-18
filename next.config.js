/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["dagoats.io"],
  },
};

module.exports = nextConfig;
