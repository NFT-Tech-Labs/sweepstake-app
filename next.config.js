/** @type {import('next').NextConfig} */
const nextConfig = {
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
