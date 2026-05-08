/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // 构建时忽略 TypeScript 错误
    ignoreBuildErrors: true,
  },
  eslint: {
    // 构建时忽略 ESLint 错误
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
