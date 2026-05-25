import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useRouter } from 'next/router'
import { useTranslation } from '@/hooks/useTranslation'

export default function PrivateVideoDownloader() {
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
  const pagePath = '/private-video-downloader'
  const canonicalUrl = locale === 'en' ? `${siteUrl}${pagePath}` : `${siteUrl}/${locale}${pagePath}`

  const handleDownload = async () => {
    if (!url.trim()) {
      setError(t('private.enterUrl'))
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
        <title>Private Facebook Video Downloader - Download Private FB Videos</title>
        <meta name="description" content="Download private Facebook videos you have permission to view. Save videos from private groups, friends-only posts, and restricted content." />
        <meta name="keywords" content="private facebook video downloader, download private fb video, facebook group video download, friends only video" />
        <link rel="canonical" href={canonicalUrl} />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header />

        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t('private.title')}
            </h1>
            <p className="text-lg text-gray-600 mb-10">
              {t('private.subtitle')}
            </p>

            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-100">
              <div className="flex flex-col md:flex-row gap-3">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder={t('private.placeholder')}
                  className="flex-1 px-5 py-3.5 text-base border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
                  onKeyPress={(e) => e.key === 'Enter' && handleDownload()}
                />
                <button
                  onClick={handleDownload}
                  disabled={loading}
                  className="px-7 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition disabled:opacity-50 whitespace-nowrap"
                >
                  {loading ? t('private.downloading') : t('private.button')}
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
                        className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                      >
                        <div className="flex items-center gap-3">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
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
                Requires viewing permission • Respects privacy settings
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">{t('private.howToTitle')}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { num: '1', titleKey: 'private.step1Title', descKey: 'private.step1Desc' },
                { num: '2', titleKey: 'private.step2Title', descKey: 'private.step2Desc' },
                { num: '3', titleKey: 'private.step3Title', descKey: 'private.step3Desc' }
              ].map((step) => (
                <div key={step.num} className="bg-white rounded-xl p-6 text-center shadow-md">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-3">
                    {step.num}
                  </div>
                  <h3 className="font-bold mb-1">{t(step.titleKey)}</h3>
                  <p className="text-sm text-gray-600">{t(step.descKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            {/* Feature 1: Facebook Private Video Downloading */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <div className="order-2 md:order-1">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                  <div className="aspect-video rounded-xl overflow-hidden">
                    <Image 
                      src="/images/private/private-downloading.png" 
                      alt="Facebook Private Video Downloading"
                      width={1376}
                      height={768}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <h3 className="text-3xl font-bold mb-4">{t('private.feature1Title')}</h3>
                <p className="text-lg text-gray-600 mb-6">
                  {t('private.feature1Desc')}
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{t('private.feature1Point1')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{t('private.feature1Point2')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Save restricted content you can view</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Feature 2: High Quality */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <div>
                <h3 className="text-3xl font-bold mb-4">{t('private.feature2Title')}</h3>
                <p className="text-lg text-gray-600 mb-6">
                  Preserve the original quality of private videos. Download in full HD with crisp visuals and clear audio—no compression, no quality loss.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{t('private.feature2Point1')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{t('private.feature2Point3')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Maintains source video quality</span>
                  </li>
                </ul>
              </div>
              <div>
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                  <div className="aspect-video rounded-xl overflow-hidden">
                    <Image 
                      src="/images/private/high-quality.png" 
                      alt="High Quality"
                      width={1376}
                      height={768}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 3: Secure & Private */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <div className="order-2 md:order-1">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                  <div className="aspect-video rounded-xl overflow-hidden">
                    <Image 
                      src="/images/private/secure-private.png" 
                      alt="Secure & Private"
                      width={1376}
                      height={768}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <h3 className="text-3xl font-bold mb-4">{t('private.feature3Title')}</h3>
                <p className="text-lg text-gray-600 mb-6">
                  Your login credentials and personal data are never stored or shared. We use secure connections to protect your privacy while downloading private content.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">End-to-end encrypted connections</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">No data storage or tracking</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Your credentials stay with Facebook</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Feature 4: Anonymous Downloading */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-4">{t('private.feature4Title')}</h3>
                <p className="text-lg text-gray-600 mb-6">
                  Download privately without leaving traces. The video owner won't be notified, and your download activity remains completely anonymous.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">No download notifications sent</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Owner won't know you downloaded</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Completely discreet downloading</span>
                  </li>
                </ul>
              </div>
              <div>
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                  <div className="aspect-video rounded-xl overflow-hidden">
                    <Image 
                      src="/images/private/anonymous-downloading.png" 
                      alt="Anonymous Downloading"
                      width={1376}
                      height={768}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">{t('privateFaq.title')}</h2>
            <div className="space-y-6">
              {(Array.isArray(t('privateFaq.items', { returnObjects: true })) ? t('privateFaq.items', { returnObjects: true }) : []).map((faq: any, i: number) => (
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
