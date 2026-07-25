/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // The hero photo is the heaviest asset on the site; AVIF typically lands
    // well under the WebP size at the same quality.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
