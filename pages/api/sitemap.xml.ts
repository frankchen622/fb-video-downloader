import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const baseUrl = 'https://fb-video-downloader-production.up.railway.app'
  
  const pages = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/facebook-to-mp4', priority: '0.9', changefreq: 'weekly' },
    { url: '/facebook-to-mp3', priority: '0.9', changefreq: 'weekly' },
    { url: '/reels-downloader', priority: '0.9', changefreq: 'weekly' },
    { url: '/private-video-downloader', priority: '0.9', changefreq: 'weekly' },
    { url: '/privacy-policy', priority: '0.5', changefreq: 'monthly' },
    { url: '/terms-of-use', priority: '0.5', changefreq: 'monthly' },
    { url: '/contact', priority: '0.6', changefreq: 'monthly' },
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  res.setHeader('Content-Type', 'text/xml')
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate')
  res.status(200).send(sitemap)
}
