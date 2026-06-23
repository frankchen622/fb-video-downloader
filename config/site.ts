// Site configuration
export const siteConfig = {
  name: 'SaveFBS.net',
  title: 'SaveFBS.net - Facebook Video Downloader',
  description: 'Download Facebook videos, Reels, Stories, and convert to MP3/MP4. Fast, free, and no watermark.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://savefbs.net',
  ogImage: '/images/og-default.png',
  links: {
    twitter: 'https://twitter.com/savefbs',
    github: 'https://github.com/frankchen622/fb-video-downloader',
  },
  creator: '@savefbs',
}

export type SiteConfig = typeof siteConfig
