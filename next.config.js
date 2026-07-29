/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Internationalization
  i18n: {
    locales: ['en', 'es', 'pt', 'fr', 'de', 'ja', 'id', 'vi', 'th', 'ar', 'zh', 'ru'],
    defaultLocale: 'en',
  },
  
  // SEO & Performance Optimizations
  compress: true,
  poweredByHeader: false,
  
  // Image Optimization
  images: {
    domains: ['dlfb.io', 'fb-video-downloader-production.up.railway.app'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Headers for Security & SEO
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=10, stale-while-revalidate=59'
          }
        ]
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ]
  },
  
  // Redirects (if needed)
  async redirects() {
    return [
      // ===== 首页 =====
      {
        source: '/',
        destination: 'https://savefbs.com/',
        permanent: true,
      },
      {
        source: '/:locale(es|pt|fr|de|ja|id|vi|th|ar|zh|ru)',
        destination: 'https://savefbs.com/',
        permanent: true,
      },

      // ===== facebook-to-mp4 =====
      {
        source: '/facebook-to-mp4',
        destination: 'https://savefbs.com/facebook-to-mp4-converter/',
        permanent: true,
      },
      {
        source: '/:locale(es|pt|fr|de|ja|id|vi|th|ar|zh|ru)/facebook-to-mp4',
        destination: 'https://savefbs.com/facebook-to-mp4-converter/',
        permanent: true,
      },

      // ===== facebook-to-mp3 =====
      {
        source: '/facebook-to-mp3',
        destination: 'https://savefbs.com/facebook-video-to-mp3/',
        permanent: true,
      },
      {
        source: '/:locale(es|pt|fr|de|ja|id|vi|th|ar|zh|ru)/facebook-to-mp3',
        destination: 'https://savefbs.com/facebook-video-to-mp3/',
        permanent: true,
      },

      // ===== reels-downloader =====
      {
        source: '/reels-downloader',
        destination: 'https://savefbs.com/facebook-reels-download/',
        permanent: true,
      },
      {
        source: '/:locale(es|pt|fr|de|ja|id|vi|th|ar|zh|ru)/reels-downloader',
        destination: 'https://savefbs.com/facebook-reels-download/',
        permanent: true,
      },

      // ===== private-video-downloader =====
      {
        source: '/private-video-downloader',
        destination: 'https://savefbs.com/',
        permanent: true,
      },
      {
        source: '/:locale(es|pt|fr|de|ja|id|vi|th|ar|zh|ru)/private-video-downloader',
        destination: 'https://savefbs.com/',
        permanent: true,
      },

      // ===== contact =====
      {
        source: '/contact',
        destination: 'https://savefbs.com/',
        permanent: true,
      },
      {
        source: '/:locale(es|pt|fr|de|ja|id|vi|th|ar|zh|ru)/contact',
        destination: 'https://savefbs.com/',
        permanent: true,
      },

      // ===== privacy-policy =====
      {
        source: '/privacy-policy',
        destination: 'https://savefbs.com/privacy-policy/',
        permanent: true,
      },
      {
        source: '/:locale(es|pt|fr|de|ja|id|vi|th|ar|zh|ru)/privacy-policy',
        destination: 'https://savefbs.com/privacy-policy/',
        permanent: true,
      },

      // ===== terms-of-use =====
      {
        source: '/terms-of-use',
        destination: 'https://savefbs.com/terms-of-use/',
        permanent: true,
      },
      {
        source: '/:locale(es|pt|fr|de|ja|id|vi|th|ar|zh|ru)/terms-of-use',
        destination: 'https://savefbs.com/terms-of-use/',
        permanent: true,
      },

      // ===== 兜底：其他所有未匹配路径 =====
      {
        source: '/:path*',
        destination: 'https://savefbs.com/',
        permanent: true,
      },
    ]
  },
  
  // Rewrites for sitemap
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap.xml',
      },
    ]
  },
}

module.exports = nextConfig
