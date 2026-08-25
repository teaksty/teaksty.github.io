/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    // Project imagery may be hosted anywhere; add hosts here when you swap in real assets.
    remotePatterns: [],
  },
};

export default nextConfig;
