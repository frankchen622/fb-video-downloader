import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useTranslation } from '@/hooks/useTranslation'

type VideoFormat = {
  url: string
  quality: string
  filesize?: number
}

type VideoInfo = {
  title: string
  thumbnail?: string
  formats: VideoFormat[]
}

export default function Home() {
  const { t, locale } = useTranslation()
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null)
  
  const siteUrl = 'https://dlfb.io'
  const canonicalUrl = locale === 'en' ? siteUrl : `${siteUrl}/${locale}`

  const handleDownload = async () => {
    if (!url.trim()) {
      setError(t('common.enterUrl'))
      return
    }

    setLoading(true)
    setError('')
    setVideoInfo(null)

    try {
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to download video')
      }

      // Set video info to display download options
      setVideoInfo(data)
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleFormatDownload = (downloadUrl: string, filename: string) => {
    // 使用后端代理下载，避免跨域问题
    const proxyUrl = `/api/proxy-download?url=${encodeURIComponent(downloadUrl)}&filename=${encodeURIComponent(filename)}`
    
    // 创建隐藏的 a 标签触发下载
    const link = document.createElement('a')
    link.href = proxyUrl
    link.download = filename
    link.style.display = 'none'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <>
      <Head>
        <title>{t('home.metaTitle')}</title>
        <meta name="description" content={t('home.metaDescription')} />
        <meta name="keywords" content="facebook video downloader, download facebook video, fb video downloader, facebook to mp4, facebook reels download, download fb video, save facebook video, facebook video download online, fb downloader, facebook video download hd, private facebook video downloader, facebook to mp3, download reels facebook, save fb video, facebook story download, free facebook video downloader, no watermark" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph */}
        <meta property="og:title" content="Facebook Video Downloader - Download FB Videos in HD Free" />
        <meta property="og:description" content="Download Facebook videos in HD quality for free. Fast, no watermark, no ads." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="https://dlfb.io/images/og-default.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="DLFB.io" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Facebook Video Downloader - Download FB Videos in HD Free" />
        <meta name="twitter:description" content="Download Facebook videos in HD quality for free. Fast, no watermark, no ads." />
        <meta name="twitter:image" content="https://dlfb.io/images/og-default.png" />
        
        {/* FAQPage Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              { "@type": "Question", "name": "How do I download Facebook videos?", "acceptedAnswer": { "@type": "Answer", "text": "Just copy the video URL from Facebook, paste it into our downloader, and click the download button. Save Facebook videos in HD quality (1080p) to MP4 format. No registration required." }},
              { "@type": "Question", "name": "Is this Facebook video downloader really free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes! Our FB video downloader is 100% free with unlimited downloads. No hidden costs, subscriptions, or premium plans." }},
              { "@type": "Question", "name": "Can I download Facebook videos on mobile?", "acceptedAnswer": { "@type": "Answer", "text": "Absolutely! Works perfectly on iPhone, iPad, Android phones, and tablets. No app installation needed - use directly in your mobile browser." }},
              { "@type": "Question", "name": "Can I download Facebook Reels?", "acceptedAnswer": { "@type": "Answer", "text": "Yes! Download Facebook Reels in full quality. Just copy the Reels URL and paste it into our downloader." }},
              { "@type": "Question", "name": "Will downloaded videos have watermarks?", "acceptedAnswer": { "@type": "Answer", "text": "No watermarks! All downloads are completely clean without any watermarks, logos, or branding." }},
              { "@type": "Question", "name": "Can I convert Facebook videos to MP3?", "acceptedAnswer": { "@type": "Answer", "text": "Yes! Extract high-quality audio from any Facebook video and save it as MP3 (up to 320kbps)." }}
            ]
          })
        }} />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header />

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {t('home.h1')}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {t('home.h1Highlight')}
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              {t('home.subtitle')}
            </p>

            {/* Download Box */}
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder={t('common.paste')}
                  className="flex-1 px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition"
                  onKeyPress={(e) => e.key === 'Enter' && handleDownload()}
                />
                <button
                  onClick={handleDownload}
                  disabled={loading}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {loading ? t('common.processing') : t('common.downloadButton')}
                </button>
              </div>
              
              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                  {error}
                </div>
              )}

              {videoInfo && (
                <div className="mt-6 p-6 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex gap-4 mb-4">
                    {videoInfo.thumbnail && (
                      <img 
                        src={videoInfo.thumbnail} 
                        alt={videoInfo.title}
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">{videoInfo.title}</h3>
                      <p className="text-sm text-gray-600">Choose quality to download:</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {videoInfo.formats.map((format, index) => (
                      <button
                        key={index}
                        onClick={() => handleFormatDownload(format.url, `${videoInfo.title}.mp4`)}
                        className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                      >
                        <div className="flex items-center gap-3">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                          </svg>
                          <span className="font-bold text-lg">Download {format.quality}</span>
                        </div>
                        {format.filesize && (
                          <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                            {(format.filesize / 1024 / 1024).toFixed(2)} MB
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <p className="mt-6 text-sm text-gray-500">
                ✓ {t('common.noRegistration')}  ✓ {t('common.unlimitedDownloads')}  ✓ {t('common.allDevices')}
              </p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="container mx-auto px-4 py-16 bg-white/50">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-4">
              {t('home.featuresTitle')}
            </h3>
            <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              {t('home.featuresSubtitle')}
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  icon: '🎬', 
                  titleKey: 'home.feature1Title', 
                  descKey: 'home.feature1Desc'
                },
                { 
                  icon: '🎵', 
                  titleKey: 'home.feature2Title', 
                  descKey: 'home.feature2Desc'
                },
                { 
                  icon: '📱', 
                  titleKey: 'home.feature3Title', 
                  descKey: 'home.feature3Desc'
                },
                { 
                  icon: '⚡', 
                  titleKey: 'home.feature4Title', 
                  descKey: 'home.feature4Desc'
                },
                { 
                  icon: '🚫', 
                  titleKey: 'home.feature5Title', 
                  descKey: 'home.feature5Desc'
                },
                { 
                  icon: '🔒', 
                  titleKey: 'home.feature6Title', 
                  descKey: 'home.feature6Desc'
                }
              ].map((feature, i) => (
                <div key={i} className="p-6 rounded-xl bg-white shadow-md hover:shadow-xl transition text-center">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h4 className="text-xl font-bold mb-3">{t(feature.titleKey)}</h4>
                  <p className="text-gray-600 leading-relaxed">{t(feature.descKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How to Use */}
        <section id="how-to" className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Downloading Facebook Videos Has Never Been Easier
            </h3>
            <p className="text-xl text-gray-600 text-center mb-12">
              {t('home.stepsSubtitle')}
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: '01', titleKey: 'home.step1Title', descKey: 'home.step1Desc' },
                { step: '02', titleKey: 'home.step2Title', descKey: 'home.step2Desc' },
                { step: '03', titleKey: 'home.step3Title', descKey: 'home.step3Desc' }
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                    {item.step}
                  </div>
                  <h4 className="text-xl font-bold mb-2">{t(item.titleKey)}</h4>
                  <p className="text-gray-600">{t(item.descKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Showcase - Image + Text Module */}
        <section className="container mx-auto px-4 py-16 bg-white/50">
          <div className="max-w-6xl mx-auto">
            {/* Video Downloader */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <div className="order-2 md:order-1">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                  <div className="aspect-[4/3] rounded-xl overflow-hidden">
                    <Image
                      src="/images/video-downloader.png"
                      alt="Facebook Video Downloader"
                      width={1200}
                      height={896}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <h3 className="text-3xl font-bold mb-4">{t('home.videoDownloaderTitle')}</h3>
                <p className="text-lg text-gray-600 mb-6">
                  {t('home.videoDownloaderDesc')}
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{t('home.videoDownloaderFeature1')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{t('home.videoDownloaderFeature2')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{t('home.videoDownloaderFeature3')}</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Reels Downloader */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <div>
                <h3 className="text-3xl font-bold mb-4">{t('home.reelsDownloaderTitle')}</h3>
                <p className="text-lg text-gray-600 mb-6">
                  {t('home.reelsDownloaderDesc')}
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{t('home.reelsDownloaderFeature1')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{t('home.reelsDownloaderFeature2')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{t('home.reelsDownloaderFeature3')}</span>
                  </li>
                </ul>
              </div>
              <div>
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                  <div className="aspect-[9/16] max-w-xs mx-auto rounded-xl overflow-hidden">
                    <Image
                      src="/images/reels-downloader.png"
                      alt="Facebook Reels Downloader"
                      width={768}
                      height={1376}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Stories Downloader */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                  <div className="aspect-[9/16] max-w-xs mx-auto rounded-xl overflow-hidden">
                    <Image
                      src="/images/stories-downloader.png"
                      alt="Facebook Stories Downloader"
                      width={768}
                      height={1376}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <h3 className="text-3xl font-bold mb-4">{t('home.storiesDownloaderTitle')}</h3>
                <p className="text-lg text-gray-600 mb-6">
                  {t('home.storiesDownloaderDesc')}
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{t('home.storiesDownloaderFeature1')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{t('home.storiesDownloaderFeature2')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{t('home.storiesDownloaderFeature3')}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="container mx-auto px-4 py-16 bg-white/50">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {t('homeFaq.title')}
            </h3>
            <div className="space-y-6">
              {(Array.isArray(t('homeFaq.items', { returnObjects: true })) ? t('homeFaq.items', { returnObjects: true }) : []).map((faq: any, i: number) => (
                <details key={i} className="bg-white rounded-xl p-6 shadow-md">
                  <summary className="font-bold text-lg cursor-pointer hover:text-blue-600 transition">
                    {faq.q}
                  </summary>
                  <p className="mt-4 text-gray-600 leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}
