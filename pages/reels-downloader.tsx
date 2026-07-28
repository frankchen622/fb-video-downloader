import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useRouter } from 'next/router'
import { useTranslation } from '@/hooks/useTranslation'

export default function ReelsDownloader() {
  const router = useRouter()
  const { locale = 'en' } = router
  const { t } = useTranslation()
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [videoInfo, setVideoInfo] = useState<{
    title: string
    thumbnail?: string
    formats: Array<{ url: string; quality: string; filesize?: number }>
  } | null>(null)
  
  const siteUrl = 'https://dlfb.io'
  const pagePath = '/reels-downloader'
  const canonicalUrl = locale === 'en' ? `${siteUrl}${pagePath}` : `${siteUrl}/${locale}${pagePath}`

  const handleDownload = async () => {
    if (!url.trim()) {
      setError(t('reels.enterUrl'))
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
        throw new Error(data.error || 'Failed to download reel')
      }

      setVideoInfo(data)
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleFormatDownload = (downloadUrl: string, filename: string) => {
    const proxyUrl = `/api/proxy-download?url=${encodeURIComponent(downloadUrl)}&filename=${encodeURIComponent(filename)}`
    
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
        <title>{t('reels.metaTitle')}</title>
        <meta name="description" content={t('reels.metaDescription')} />
        <meta name="keywords" content="facebook reels downloader, download fb reels, reels video download, facebook short videos, save reels, FB reels download, download facebook reels free, facebook reels HD, no watermark reels downloader" />
        <link rel="canonical" href={canonicalUrl} />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header />

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t('reels.title')}
            </h1>
            <p className="text-xl text-gray-600 mb-3">
              {t('reels.subtitle')}
            </p>
            <p className="text-base text-gray-500 mb-4 max-w-2xl mx-auto">
              {t('reels.heroDescription')}
            </p>
            <p className="text-sm text-blue-600 font-medium mb-8">
              {t('reels.heroFeatures')}
            </p>

            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-100">
              <div className="flex flex-col md:flex-row gap-3">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder={t('reels.placeholder')}
                  className="flex-1 px-5 py-3.5 text-base border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
                  onKeyPress={(e) => e.key === 'Enter' && handleDownload()}
                />
                <button
                  onClick={handleDownload}
                  disabled={loading}
                  className="px-7 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition disabled:opacity-50 whitespace-nowrap"
                >
                  {loading ? t('reels.downloading') : t('reels.button')}
                </button>
              </div>
              
              {error && (
                <div className="mt-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-600 text-sm">
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
                        className="w-24 h-24 object-cover rounded-lg"
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
                        className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
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

              <p className="mt-5 text-xs text-gray-500 text-center">
                {t('reels.footer')}
              </p>
            </div>
          </div>
        </section>

        {/* Feature Overview Grid */}
        <section className="container mx-auto px-4 py-12 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-3">Complete Facebook Reels Downloader Solution</h2>
            <p className="text-center text-gray-500 mb-10 max-w-2xl mx-auto">Everything you need to download, save, and manage Facebook Reels in one free tool</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { icon: '🎬', title: 'HD Video Downloads', desc: 'Download Facebook Reels in full HD quality up to 1080p with crystal-clear visuals' },
                { icon: '🚫', title: 'No Watermarks', desc: 'Clean, unbranded downloads with zero logos or overlays added to your videos' },
                { icon: '⚡', title: 'Lightning Fast', desc: 'Process any Reel in 5-15 seconds with our optimized high-speed servers' },
                { icon: '📱', title: 'All Devices', desc: 'Works perfectly on iPhone, Android, Windows, Mac, and all modern browsers' },
                { icon: '🔒', title: 'Private & Secure', desc: 'No data stored, no tracking, complete privacy protection guaranteed' },
                { icon: '♾️', title: 'Unlimited Free', desc: 'Download as many Reels as you want with zero cost and zero restrictions' },
              ].map((item, i) => (
                <div key={i} className="bg-blue-50 rounded-xl p-6 text-center hover:shadow-md transition">
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How To Steps */}
        <section className="container mx-auto px-4 py-12 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-center">{t('reels.howToTitle')}</h2>
            <p className="text-center text-gray-500 mb-8">{t('reels.howToSubtitle')}</p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { num: '1', titleKey: 'reels.step1Title', descKey: 'reels.step1Desc' },
                { num: '2', titleKey: 'reels.step2Title', descKey: 'reels.step2Desc' },
                { num: '3', titleKey: 'reels.step3Title', descKey: 'reels.step3Desc' }
              ].map((step) => (
                <div key={step.num} className="bg-white rounded-xl p-6 text-center shadow-md">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-3">
                    {step.num}
                  </div>
                  <h3 className="font-bold mb-2">{t(step.titleKey)}</h3>
                  <p className="text-sm text-gray-600">{t(step.descKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Feature Sections */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            {/* Feature 1: Save Viral Reels */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <div className="order-2 md:order-1">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                  <div className="aspect-[9/16] max-w-xs mx-auto rounded-2xl overflow-hidden">
                    <Image 
                      src="/images/reels/save-viral-reels.png" 
                      alt="Save Viral Facebook Reels"
                      width={768}
                      height={1376}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <h3 className="text-3xl font-bold mb-4">{t('reels.feature1Title')}</h3>
                <p className="text-lg text-gray-600 mb-6">{t('reels.feature1Desc')}</p>
                <ul className="space-y-3">
                  {['feature1Point1','feature1Point2','feature1Point3','feature1Point4'].map((key) => (
                    <li key={key} className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{t(`reels.${key}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Feature 2: No Watermark */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <div>
                <h3 className="text-3xl font-bold mb-4">{t('reels.feature2Title')}</h3>
                <p className="text-lg text-gray-600 mb-6">{t('reels.feature2Desc')}</p>
                <ul className="space-y-3">
                  {['feature2Point1','feature2Point2','feature2Point3','feature2Point4'].map((key) => (
                    <li key={key} className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{t(`reels.${key}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                  <div className="aspect-video rounded-xl overflow-hidden">
                    <Image 
                      src="/images/reels/no-watermark.webp" 
                      alt="Download Facebook Reels Without Watermark"
                      width={1376}
                      height={768}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 3: High Quality */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <div className="order-2 md:order-1">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                  <div className="aspect-video rounded-xl overflow-hidden">
                    <Image 
                      src="/images/reels/high-quality.png" 
                      alt="Download Facebook Reels in 1080p HD Quality"
                      width={1376}
                      height={768}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <h3 className="text-3xl font-bold mb-4">{t('reels.feature3Title')}</h3>
                <p className="text-lg text-gray-600 mb-6">{t('reels.feature3Desc')}</p>
                <ul className="space-y-3">
                  {['feature3Point1','feature3Point2','feature3Point3','feature3Point4'].map((key) => (
                    <li key={key} className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{t(`reels.${key}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Feature 4: Easy to Use */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <div>
                <h3 className="text-3xl font-bold mb-4">{t('reels.feature4Title')}</h3>
                <p className="text-lg text-gray-600 mb-6">{t('reels.feature4Desc')}</p>
                <ul className="space-y-3">
                  {['feature4Point1','feature4Point2','feature4Point3','feature4Point4'].map((key) => (
                    <li key={key} className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{t(`reels.${key}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                  <div className="aspect-video rounded-xl overflow-hidden">
                    <Image 
                      src="/images/reels/easy-to-use.png" 
                      alt="Easy to Use Facebook Reels Downloader"
                      width={1376}
                      height={768}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 5: Free Unlimited */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <div className="order-2 md:order-1">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-10 border border-green-100 text-center">
                  <div className="text-7xl mb-4">♾️</div>
                  <div className="text-4xl font-extrabold text-green-600 mb-2">100% FREE</div>
                  <div className="text-lg text-gray-600">Unlimited Downloads</div>
                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    {['No Limits','No Fees','No Registration','No Watermarks'].map(tag => (
                      <span key={tag} className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full font-medium">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <h3 className="text-3xl font-bold mb-4">{t('reels.feature5Title')}</h3>
                <p className="text-lg text-gray-600 mb-6">{t('reels.feature5Desc')}</p>
                <ul className="space-y-3">
                  {['feature5Point1','feature5Point2','feature5Point3','feature5Point4'].map((key) => (
                    <li key={key} className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{t(`reels.${key}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Feature 6: Fast & Safe */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-4">{t('reels.feature6Title')}</h3>
                <p className="text-lg text-gray-600 mb-6">{t('reels.feature6Desc')}</p>
                <ul className="space-y-3">
                  {['feature6Point1','feature6Point2','feature6Point3','feature6Point4'].map((key) => (
                    <li key={key} className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{t(`reels.${key}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-10 border border-blue-100">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    {[
                      { icon: '⚡', label: '5-15 sec', desc: 'Processing Time' },
                      { icon: '🔒', label: '256-bit', desc: 'SSL Encryption' },
                      { icon: '🗑️', label: '0 Data', desc: 'Stored' },
                      { icon: '✅', label: '100%', desc: 'Safe & Private' },
                    ].map((stat) => (
                      <div key={stat.label} className="bg-white rounded-xl p-4 shadow-sm">
                        <div className="text-3xl mb-1">{stat.icon}</div>
                        <div className="font-bold text-blue-700 text-lg">{stat.label}</div>
                        <div className="text-xs text-gray-500">{stat.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="bg-gradient-to-br from-purple-50 to-blue-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">{t('reels.useCasesTitle')}</h2>
              <p className="text-center text-gray-500 mb-10 max-w-2xl mx-auto">{t('reels.useCasesSubtitle')}</p>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: '🎥', titleKey: 'reels.useCase1Title', descKey: 'reels.useCase1Desc' },
                  { icon: '📊', titleKey: 'reels.useCase2Title', descKey: 'reels.useCase2Desc' },
                  { icon: '😄', titleKey: 'reels.useCase3Title', descKey: 'reels.useCase3Desc' },
                  { icon: '📚', titleKey: 'reels.useCase4Title', descKey: 'reels.useCase4Desc' },
                ].map((uc, i) => (
                  <div key={i} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
                    <div className="text-4xl mb-3">{uc.icon}</div>
                    <h3 className="font-bold text-gray-900 mb-2">{t(uc.titleKey)}</h3>
                    <p className="text-sm text-gray-600">{t(uc.descKey)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-3">{t('reelsFaq.title')}</h2>
            <p className="text-center text-gray-500 mb-10">{t('reelsFaq.subtitle')}</p>
            <div className="space-y-4">
              {(Array.isArray(t('reelsFaq.items', { returnObjects: true })) ? t('reelsFaq.items', { returnObjects: true }) : []).map((faq: any, i: number) => (
                <details key={i} className="bg-white rounded-xl p-6 shadow-md group">
                  <summary className="font-bold text-lg cursor-pointer hover:text-blue-600 transition list-none flex items-center justify-between gap-2">
                    <span>{faq.q}</span>
                    <svg className="w-5 h-5 flex-shrink-0 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
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
