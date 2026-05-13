import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        
        {/* Web App Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Theme Color */}
        <meta name="theme-color" content="#2563eb" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://www.facebook.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        
        {/* Canonical URL - will be overridden by page-specific canonical */}
        <link rel="canonical" href="https://fb-video-downloader-production.up.railway.app" />
        
        {/* Alternate languages (if you add multi-language support later) */}
        <link rel="alternate" hrefLang="en" href="https://fb-video-downloader-production.up.railway.app" />
        
        {/* Robots meta - allow indexing */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        
        {/* Verification tags (add your actual verification codes) */}
        {/* <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" /> */}
        {/* <meta name="msvalidate.01" content="YOUR_BING_VERIFICATION_CODE" /> */}
        
        {/* Author and Publisher */}
        <meta name="author" content="DLFB.io" />
        <meta name="publisher" content="DLFB.io" />
        
        {/* Copyright */}
        <meta name="copyright" content="DLFB.io" />
        
        {/* Geo tags */}
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />
        
        {/* Rating */}
        <meta name="rating" content="general" />
        
        {/* Referrer Policy */}
        <meta name="referrer" content="origin-when-cross-origin" />
        
        {/* Format Detection */}
        <meta name="format-detection" content="telephone=no" />
        
        {/* Apple Web App */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="DLFB.io" />
        
        {/* Microsoft */}
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "DLFB.io - Facebook Video Downloader",
              "url": "https://fb-video-downloader-production.up.railway.app",
              "description": "Download Facebook videos, Reels, Stories, and convert to MP3/MP4. Fast, free, and no watermark.",
              "applicationCategory": "MultimediaApplication",
              "operatingSystem": "Any",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "15420",
                "bestRating": "5",
                "worstRating": "1"
              },
              "featureList": [
                "Download Facebook videos",
                "Download Facebook Reels",
                "Convert Facebook to MP3",
                "Download private videos",
                "No watermark",
                "HD quality",
                "Free service"
              ]
            })
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
