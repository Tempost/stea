//@ts-check

/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const { env } = require('./src/utils/env');
console.log(env);

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  // compiler: {
  //   removeConsole: {
  //     exclude: ['error'],
  //   },
  // },
  // swcMinify: true,
};

// @ts-ignore
module.exports = withBundleAnalyzer(nextConfig);
