import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useRouter } from 'next/router'
import { useTranslation } from '@/hooks/useTranslation'

type VideoFormat = {
  url: string
  quality: string
  filesize?: number
}

type VideoData = {
  title: string
  thumbnail: string
  formats: VideoFormat[]
}

export default function FacebookToMP4() {
  const router = useRouter()
  const { locale = 'en' } = router
  const { t } = useTranslation()
  const [url, setUrl] = useState('')
  
  const siteUrl = 'https://dlfb.io'
  const pagePath = '/facebook-to-mp4'
  const canonicalUrl = locale === 'en' ? `${siteUrl}${pagePath}` : `${siteUrl}/${locale}${pagePath}`
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [videoData, setVideoData] = useState<VideoData | null>(null)

  const handleDownload = async () => {
    if (!url.trim()) {
      setError(t('mp4.enterUrl'))
      return
    }

    setLoading(true)
    setError('')
    setVideoData(null)

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

      setVideoData(data)
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>{t('mp4.metaTitle')}</title>
        <meta name="description" content={t('mp4.metaDescription')} />
        <meta name="keywords" content="facebook to mp4, fb to mp4, facebook video to mp4, convert facebook video to mp4, facebook to mp4 converter, fb video mp4, facebook mp4 download, convert fb to mp4, facebook to mp4 converter online, facebook video mp4 download, save facebook to mp4, facebook link to mp4, fb mp4 converter, facebook to mp4 hd, free facebook to mp4 converter" />
        <link rel="canonical" href={canonicalUrl} />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header />

        {/* Hero + Download Box */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t('mp4.title')}
            </h1>
            <p className="text-lg text-gray-600 mb-10">
              {t('mp4.subtitle')}
            </p>

            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-100">
              <div className="flex flex-col md:flex-row gap-3">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder={t('mp4.placeholder')}
                  className="flex-1 px-5 py-3.5 text-base border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
                  onKeyPress={(e) => e.key === 'Enter' && handleDownload()}
                />
                <button
                  onClick={handleDownload}
                  disabled={loading}
                  className="px-7 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition disabled:opacity-50 whitespace-nowrap"
                >
                  {loading ? t('mp4.converting') : t('mp4.button')}
                </button>
              </div>
              
              {error && (
                <div className="mt-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-600 text-sm">
                  {error}
                </div>
              )}

              {videoData && (
                <div className="mt-6 p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg border border-green-200">
                  <div className="flex items-start gap-4 mb-4">
                    {videoData.thumbnail && (
                      <img 
                        src={videoData.thumbnail} 
                        alt={videoData.title}
                        className="w-32 h-32 object-cover rounded-lg shadow-md"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 mb-2">{videoData.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">Choose your preferred quality:</p>
                    </div>
                  </div>
                  
                  <div className="grid gap-3">
                    {videoData.formats.map((format, index) => (
                      <a
                        key={index}
                        href={format.url}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 bg-white rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:shadow-md transition group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{format.quality}</p>
                            {format.filesize && (
                              <p className="text-xs text-gray-500">
                                {(format.filesize / 1024 / 1024).toFixed(2)} MB
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-blue-600 group-hover:text-purple-600 transition">
                          <span className="font-semibold text-sm">Download</span>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <p className="mt-5 text-xs text-gray-500 text-center">
                No registration • Unlimited downloads • All devices
              </p>
            </div>
          </div>
        </section>

        {/* 3-Step Process */}
        <section className="container mx-auto px-4 py-12 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">{t('mp4.howToTitle')}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { num: '1', titleKey: 'mp4.step1Title', descKey: 'mp4.step1Desc' },
                { num: '2', titleKey: 'mp4.step2Title', descKey: 'mp4.step2Desc' },
                { num: '3', titleKey: 'mp4.step3Title', descKey: 'mp4.step3Desc' }
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

        {/* Why Choose Us - Image + Text */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">{t('mp4.whyChooseTitle')}</h2>
            
            {/* Feature 1 */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <div className="order-2 md:order-1">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                  <div className="aspect-[4/3] rounded-xl overflow-hidden">
                    <Image
                      src="/images/mp4-universal-format.png"
                      alt="Universal MP4 Format"
                      width={1200}
                      height={896}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <h3 className="text-3xl font-bold mb-4">{t('mp4.feature1Title')}</h3>
                <p className="text-lg text-gray-600 mb-6">
                  {t('mp4.feature1Desc')}
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{t('mp4.feature1Point1')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{t('mp4.feature1Point2')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{t('mp4.feature1Point3')}</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-4">{t('mp4.feature2Title')}</h3>
                <p className="text-lg text-gray-600 mb-6">
                  {t('mp4.feature2Desc')}
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{t('mp4.feature2Point1')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{t('mp4.feature2Point2')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{t('mp4.feature2Point3')}</span>
                  </li>
                </ul>
              </div>
              <div>
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                  <div className="aspect-video rounded-xl overflow-hidden">
                    <Image
                      src="/images/mp4-hd-quality.png"
                      alt="HD Quality Downloads"
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

        {/* FAQ */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">{t('mp4Faq.title')}</h2>
            <div className="space-y-6">
              {(Array.isArray(t('mp4Faq.items', { returnObjects: true })) ? t('mp4Faq.items', { returnObjects: true }) : []).map((faq: any, i: number) => (
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
