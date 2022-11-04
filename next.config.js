/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: [
      "dagoats.io",
      "metadata.degods.com",
      "nftstorage.link",
      "arweave.net",
      "www.onlygfx.com",
    ],
  },
};

module.exports = nextConfig;
