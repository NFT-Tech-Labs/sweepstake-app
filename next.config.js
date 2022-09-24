/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["dagoats.io", "metadata.degods.com", "nftstorage.link"],
  },
};

module.exports = nextConfig;
