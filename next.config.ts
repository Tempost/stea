const nextConfig = {
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
  reactStrictMode: true,
  reactCompiler: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
