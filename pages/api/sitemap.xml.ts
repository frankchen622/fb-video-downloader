import type { NextApiRequest, NextApiResponse } from 'next'

const locales = ['en', 'es', 'pt', 'fr', 'de', 'ja', 'id', 'vi', 'th', 'ar', 'zh', 'ru']
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dlfb.io'

const pages = [
  '',
  '/reels-downloader',
  '/private-video-downloader',
  '/facebook-to-mp3',
  '/facebook-to-mp4',
  '/contact',
  '/privacy-policy',
  '/terms-of-use',
]

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const sitemap = generateSitemap()
  
  res.setHeader('Content-Type', 'text/xml')
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate')
  res.status(200).send(sitemap)
}

function generateSitemap(): string {
  const urls: string[] = []
  
  // Generate URLs for all pages in all languages
  for (const page of pages) {
    for (const locale of locales) {
      const url = locale === 'en' 
        ? `${siteUrl}${page}`
        : `${siteUrl}/${locale}${page}`
      
      const alternates = locales.map(loc => {
        const altUrl = loc === 'en'
          ? `${siteUrl}${page}`
          : `${siteUrl}/${loc}${page}`
        return `    <xhtml:link rel="alternate" hreflang="${loc}" href="${altUrl}" />`
      }).join('\n')
      
      urls.push(`
  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
${alternates}
    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}${page}" />
  </url>`)
    }
  }
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>`
}
