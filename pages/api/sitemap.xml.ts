import type { NextApiRequest, NextApiResponse } from 'next'

const locales = ['en', 'es', 'pt', 'fr', 'de', 'ja', 'id', 'vi', 'th', 'ar', 'zh', 'ru']
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://savefbs.net'

const pages = [
  { path: '', priority: '1.0', changefreq: 'daily' },
  { path: '/reels-downloader', priority: '0.9', changefreq: 'weekly' },
  { path: '/private-video-downloader', priority: '0.9', changefreq: 'weekly' },
  { path: '/facebook-to-mp3', priority: '0.9', changefreq: 'weekly' },
  { path: '/facebook-to-mp4', priority: '0.9', changefreq: 'weekly' },
  { path: '/contact', priority: '0.6', changefreq: 'monthly' },
  { path: '/privacy-policy', priority: '0.5', changefreq: 'monthly' },
  { path: '/terms-of-use', priority: '0.5', changefreq: 'monthly' },
]

// Fixed lastmod - only update when content actually changes
const LAST_CONTENT_UPDATE = '2026-05-18'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const sitemap = generateSitemap()
  
  res.setHeader('Content-Type', 'text/xml; charset=utf-8')
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=604800')
  res.status(200).send(sitemap)
}

function generateSitemap(): string {
  const urls: string[] = []
  
  // Generate URLs for all locales
  for (const locale of locales) {
    for (const page of pages) {
      // English is the default (no locale prefix)
      const localePrefix = locale === 'en' ? '' : `/${locale}`
      const url = `${siteUrl}${localePrefix}${page.path}`
      
      // Adjust priority for non-English pages
      const priority = locale === 'en' ? page.priority : (parseFloat(page.priority) * 0.9).toFixed(1)
      
      urls.push(`  <url>
    <loc>${url}</loc>
    <lastmod>${LAST_CONTENT_UPDATE}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`)
    }
  }
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`
}
