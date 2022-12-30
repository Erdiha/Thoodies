/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'images.pexels.com',
      'edamam-product-images.s3.amazonaws.com',
      'image.pexels.com',
      'www.pexels.com',
    ],
  },
};

module.exports = nextConfig;
