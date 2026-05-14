// Site configuration
export const siteConfig = {
  name: 'DLFB.io',
  title: 'DLFB.io - Facebook Video Downloader',
  description: 'Download Facebook videos, Reels, Stories, and convert to MP3/MP4. Fast, free, and no watermark.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://dlfb.io',
  ogImage: '/images/og-default.png',
  links: {
    twitter: 'https://twitter.com/dlfb_io',
    github: 'https://github.com/frankchen622/fb-video-downloader',
  },
  creator: '@dlfb_io',
}

export type SiteConfig = typeof siteConfig
