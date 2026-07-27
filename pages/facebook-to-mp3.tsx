import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useRouter } from 'next/router'
import { useTranslation } from '@/hooks/useTranslation'

export default function FacebookToMP3() {
  const router = useRouter()
  const { locale = 'en' } = router
  const { t } = useTranslation()
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [audioInfo, setAudioInfo] = useState<{
    title: string
    thumbnail?: string
    formats: Array<{ url: string; quality: string; filesize?: number }>
  } | null>(null)
  
  const siteUrl = 'https://dlfb.io'
  const pagePath = '/facebook-to-mp3'
  const canonicalUrl = locale === 'en' ? `${siteUrl}${pagePath}` : `${siteUrl}/${locale}${pagePath}`

  const handleDownload = async () => {
    if (!url.trim()) {
      setError(t('mp3.enterUrl'))
      return
    }

    setLoading(true)
    setError('')
    setAudioInfo(null)

    try {
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, format: 'mp3' })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to extract audio')
      }

      setAudioInfo(data)
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleFormatDownload = (downloadUrl: string, filename: string) => {
    // 使用后端代理下载
    const proxyUrl = `/api/proxy-download?url=${encodeURIComponent(downloadUrl)}&filename=${encodeURIComponent(filename)}`
    
    const link = document.createElement('a')
    link.href = proxyUrl
    link.download = filename
    link.style.display = 'none'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const faqData = [
    {
      category: '🎵 Basic Usage',
      questions: [
        {
          q: 'How to convert Facebook video to MP3?',
          a: 'Using our Facebook to MP3 converter is simple: 1) Copy the Facebook video link, 2) Paste it into the converter box, 3) Click "Convert", 4) Download your MP3 file. We support all Facebook content types including Facebook Reels to MP3, Facebook Story to MP3, and Facebook Live to MP3.'
        },
        {
          q: 'Can I download Facebook music and songs?',
          a: 'Yes! Our tool supports Facebook song download, Facebook music download MP3, Facebook audio download MP3, and extracting audio from Facebook videos. Perfect for music, podcasts, and any audio content shared on Facebook.'
        },
        {
          q: 'What Facebook content types are supported?',
          a: 'Our Facebook MP3 downloader supports: ✅ Regular video posts (Facebook video download MP3), ✅ Reels short videos, ✅ Stories, ✅ Live stream replays (Facebook Live to MP3), ✅ Private videos (download private Facebook video to MP3), ✅ Audio posts (Facebook audio MP3).'
        }
      ]
    },
    {
      category: '🔧 Technical & Format',
      questions: [
        {
          q: 'What is the output MP3 quality?',
          a: 'We offer multiple quality options: Standard (128kbps), High quality (Facebook to MP3 320kbps at 320kbps), and automatic matching to original video quality. Use our Facebook MP3 converter 320kbps for the best audio experience.'
        },
        {
          q: 'Can I convert MP4 videos to MP3?',
          a: 'Yes! Our tool supports Facebook MP4 to MP3 conversion, Facebook MP4 to MP3 converter for batch processing, and convert Facebook MP4 to MP3 online quickly. Download Facebook MP4 to MP3 with one click.'
        },
        {
          q: 'What output formats are supported?',
          a: 'Main formats: MP3 (most popular), M4A (optimized for Apple devices), and Facebook converter MP3 MP4 supporting both video and audio formats.'
        }
      ]
    },
    {
      category: '📱 Device & Platform',
      questions: [
        {
          q: 'Can I use this on mobile?',
          a: 'Fully mobile compatible! No need for a Facebook download MP3 app - use directly in your browser. Works with Facebook Lite converter for low-spec devices, supports both Android and iOS. Our Facebook MP3 download app is web-based.'
        },
        {
          q: 'Do I need to install software?',
          a: 'No installation needed! We are a Facebook to MP3 online tool: ✅ Facebook video to MP3 converter online free, ✅ Convert Facebook to MP3 online, ✅ Facebook MP3 converter online in browser, ✅ Download Facebook video to MP3 online instantly.'
        }
      ]
    },
    {
      category: '🆓 Cost & Limits',
      questions: [
        {
          q: 'Is this tool free?',
          a: 'Completely free! Facebook to MP3 converter free, Facebook video to MP3 converter free with unlimited uses, Facebook MP3 converter free with no hidden fees, and free download Facebook video to MP3 forever.'
        },
        {
          q: 'Are there usage limits?',
          a: 'No limits: ✅ Unlimited daily downloads, ✅ No file size restrictions, ✅ No account registration required, ✅ Facebook download MP3 free anytime, anywhere.'
        }
      ]
    },
    {
      category: '🔒 Privacy & Security',
      questions: [
        {
          q: 'Can I download private videos?',
          a: 'Yes, but with conditions: You must have permission to view the video, use our download private Facebook video to MP3 feature, login to your Facebook account, and Facebook private video download MP3 protects your privacy.'
        },
        {
          q: 'Is my data safe?',
          a: 'Absolutely secure: 🔒 We don\'t store your video links, 🔒 No download history recorded, 🔒 No personal information collected, 🔒 Facebook to MP3 converter private with privacy protection.'
        }
      ]
    },
    {
      category: '⚡ Speed & Performance',
      questions: [
        {
          q: 'How fast is the conversion?',
          a: 'Very fast: ⚡ Average conversion time: 10-30 seconds, ⚡ Facebook video to MP3 online free download instant, ⚡ Batch conversion supported, ⚡ Fast Facebook to MP3 with high-speed servers.'
        },
        {
          q: 'Can I batch download?',
          a: 'Batch operations supported: 📦 Convert multiple videos simultaneously, 📦 Facebook MP3 download converter batch processing, 📦 One-click download all files, 📦 Batch Facebook to MP3 for efficiency.'
        }
      ]
    },
    {
      category: '🌐 Compatibility',
      questions: [
        {
          q: 'Which browsers are supported?',
          a: 'All browsers supported: ✅ Chrome / Edge, ✅ Firefox, ✅ Safari, ✅ Opera, ✅ Mobile browsers.'
        },
        {
          q: 'Can I use it with Facebook Lite?',
          a: 'Yes! Facebook Lite MP3 fully compatible, suitable for low-spec devices, slow network areas, and Facebook Lite converter optimized experience.'
        }
      ]
    },
    {
      category: '🎯 Special Features',
      questions: [
        {
          q: 'Can I extract audio only?',
          a: 'Of course! We specialize in audio extraction: Facebook video to audio converter, Facebook audio converter MP3 format conversion, convert Facebook video to audio MP3 high quality, and Facebook video to audio MP3 preserving original quality.'
        },
        {
          q: 'Do you support YouTube and other platforms?',
          a: 'Currently focused on Facebook, but also support: YouTube MP3 Facebook partial compatibility, Facebook converter converter MP3 multi-platform support planned, more social platforms coming soon.'
        }
      ]
    },
    {
      category: '🔗 Links & Downloads',
      questions: [
        {
          q: 'How to get Facebook video link?',
          a: 'Get link method: 1) Open Facebook video, 2) Click "Share" button, 3) Select "Copy link", 4) Paste into our Facebook link to MP3 converter. Supports: Facebook URL to MP3, Facebook link download MP3, convert Facebook link to MP3.'
        },
        {
          q: 'Where are downloaded files saved?',
          a: 'File save location: 💾 Browser default download folder, 💾 Save Facebook video to MP3 auto-save, 💾 Save from Facebook to MP3 customizable path, 💾 Download MP3 from Facebook direct download.'
        }
      ]
    },
    {
      category: '🛠️ Troubleshooting',
      questions: [
        {
          q: 'What if conversion fails?',
          a: 'Common solutions: 1) Check if video link is correct, 2) Confirm video hasn\'t been deleted, 3) Try refreshing the page, 4) Use Facebook video download MP3 online backup servers, 5) Clear browser cache.'
        },
        {
          q: 'Why can\'t some videos be downloaded?',
          a: 'Possible reasons: ❌ Video has been deleted, ❌ Privacy settings restrictions, ❌ Regional restrictions, ❌ Copyright protected content. Solution: Use Facebook downloader MP3 online advanced mode.'
        }
      ]
    },
    {
      category: '📊 Comparison',
      questions: [
        {
          q: 'What advantages over other tools?',
          a: 'Our advantages: ✨ Facebook to MP3 converter online free completely free, ✨ No registration, ✨ No ad interference, ✨ High-speed conversion, ✨ Best Facebook MP3 converter user\'s choice.'
        },
        {
          q: 'Why choose us over other tools?',
          a: 'Core advantages: 🏆 Facebook MP3 converter download fastest speed, 🏆 Facebook video to MP3 converter free download completely free, 🏆 No watermarks, 🏆 High quality output, 🏆 Top Facebook to MP3 industry leading.'
        }
      ]
    },
    {
      category: '🎬 Content Types',
      questions: [
        {
          q: 'Can I download Facebook Reels?',
          a: 'Fully supports Reels: Facebook Reels to MP3 converter specially optimized, Facebook Reels download MP3 quick extraction, convert Facebook Reels to MP3 maintaining quality, supports all Reels short videos.'
        },
        {
          q: 'Can I convert Facebook Live?',
          a: 'Supports live replays: Facebook Live to MP3 live recording, convert Facebook Live to MP3 replay conversion, Facebook Live video to MP3 complete save. Note: Only supports ended live replays.'
        }
      ]
    },
    {
      category: '💡 Advanced Features',
      questions: [
        {
          q: 'Can I edit audio?',
          a: 'Basic editing features: ✂️ Trim audio length, ✂️ Adjust volume, ✂️ Facebook audio to MP3 format conversion, ✂️ Add fade in/out effects.'
        },
        {
          q: 'Do you support playlist downloads?',
          a: 'Batch download supported: 📋 Facebook playlist to MP3 playlist conversion, 📋 Bulk link import, 📋 One-click download all, 📋 Bulk Facebook MP3 download efficient processing.'
        }
      ]
    },
    {
      category: '🔄 Conversion & Format',
      questions: [
        {
          q: 'What\'s the difference between MP3 and MP4?',
          a: 'Format comparison: MP3: Pure audio format, smaller file size; MP4: Video format, includes visuals; Facebook MP3 MP4: We support both formats; Facebook converter MP3 MP4 online: Free choice.'
        },
        {
          q: 'Can I convert MP3 back to video?',
          a: 'Reverse conversion supported: MP3 to Facebook video audio to video, convert MP3 to Facebook format format adaptation, MP3 to video for Facebook add cover image, convert MP3 to MP4 for Facebook upload optimization.'
        }
      ]
    }
  ]

  return (
    <>
      <Head>
        <title>{t('mp3.metaTitle')}</title>
        <meta name="description" content={t('mp3.metaDescription')} />
        <meta name="keywords" content="facebook to mp3, facebook video to mp3, facebook mp3 converter, fb to mp3, facebook audio download, facebook music download, facebook reels to mp3, facebook to mp3 320kbps, download facebook mp3, convert facebook to mp3" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:title" content="Facebook to MP3 Converter - Extract Audio Free" />
        <meta property="og:description" content="Convert Facebook videos to MP3 audio files free. High quality up to 320kbps. Works with Reels, Stories and Live videos. No software needed." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="https://dlfb.io/images/og-default.png" />
        <meta property="og:site_name" content="DLFB.io" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Facebook to MP3 Converter - Extract Audio Free" />
        <meta name="twitter:description" content="Convert Facebook videos to MP3 audio files free. High quality up to 320kbps. No software needed." />
        <meta name="twitter:image" content="https://dlfb.io/images/og-default.png" />

        {/* FAQPage Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How do I convert a Facebook video to MP3?",
                "acceptedAnswer": { "@type": "Answer", "text": "Copy the Facebook video link, paste it into the converter box, click 'Convert', and download your MP3 file. Works for all Facebook content including Reels, Stories, and Live videos." }
              },
              {
                "@type": "Question",
                "name": "Is this Facebook to MP3 converter free?",
                "acceptedAnswer": { "@type": "Answer", "text": "Yes, completely free with unlimited conversions. No hidden fees, no registration, no premium plans." }
              },
              {
                "@type": "Question",
                "name": "What audio quality does it support?",
                "acceptedAnswer": { "@type": "Answer", "text": "Multiple quality options: 128kbps (standard), 192kbps, 256kbps, and 320kbps (highest quality). Choose the bitrate that fits your needs." }
              },
              {
                "@type": "Question",
                "name": "Can I use this on mobile?",
                "acceptedAnswer": { "@type": "Answer", "text": "Yes! Works directly in your mobile browser on iPhone and Android. No app installation needed." }
              },
              {
                "@type": "Question",
                "name": "Does it work with Facebook Reels?",
                "acceptedAnswer": { "@type": "Answer", "text": "Yes. Paste any Facebook Reels URL and extract the audio as MP3 instantly." }
              },
              {
                "@type": "Question",
                "name": "Is my data safe?",
                "acceptedAnswer": { "@type": "Answer", "text": "Yes. We don't store your video links, download history, or any personal information. Everything is processed securely and deleted immediately." }
              }
            ]
          })
        }} />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header />

        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t('mp3.title')}
            </h1>
            <p className="text-lg text-gray-600 mb-10">
              {t('mp3.subtitle')}
            </p>

            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-100">
              <div className="flex flex-col md:flex-row gap-3">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder={t('mp3.placeholder')}
                  className="flex-1 px-5 py-3.5 text-base border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
                  onKeyPress={(e) => e.key === 'Enter' && handleDownload()}
                />
                <button
                  onClick={handleDownload}
                  disabled={loading}
                  className="px-7 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition disabled:opacity-50 whitespace-nowrap"
                >
                  {loading ? t('mp3.extracting') : t('mp3.button')}
                </button>
              </div>
              
              {error && (
                <div className="mt-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-600 text-sm">
                  {error}
                </div>
              )}

              {audioInfo && (
                <div className="mt-6 p-6 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex gap-4 mb-4">
                    {audioInfo.thumbnail && (
                      <img 
                        src={audioInfo.thumbnail} 
                        alt={audioInfo.title}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">{audioInfo.title}</h3>
                      <p className="text-sm text-gray-600">Choose audio quality to download:</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {audioInfo.formats.map((format, index) => (
                      <button
                        key={index}
                        onClick={() => handleFormatDownload(format.url, `${audioInfo.title}.mp3`)}
                        className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                      >
                        <div className="flex items-center gap-3">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
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
                {t('mp3.footer')}
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">{t('mp3.howToTitle')}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { num: '1', titleKey: 'mp3.step1Title', descKey: 'mp3.step1Desc' },
                { num: '2', titleKey: 'mp3.step2Title', descKey: 'mp3.step2Desc' },
                { num: '3', titleKey: 'mp3.step3Title', descKey: 'mp3.step3Desc' }
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
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">{t('mp3.whyChooseTitle')}</h2>
            
            {/* Feature 1: Universal Audio Format */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <div className="order-2 md:order-1">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                  <div className="aspect-[4/3] rounded-xl overflow-hidden">
                    <Image 
                      src="/images/features/universal-audio.png" 
                      alt="Universal Audio Format"
                      width={1200}
                      height={896}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">🎵</span>
                  <h3 className="text-3xl font-bold">{t('mp3.feature1Title')}</h3>
                </div>
                <p className="text-lg text-gray-600 mb-6">
                  {t('mp3.feature1Desc')}
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{t('mp3.feature1Point1')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{t('mp3.feature1Point2')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{t('mp3.feature1Point3')}</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Feature 2: Lightning-Fast Conversion */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">⚡</span>
                  <h3 className="text-3xl font-bold">{t('mp3.feature2Title')}</h3>
                </div>
                <p className="text-lg text-gray-600 mb-6">
                  {t('mp3.feature2Desc')}
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{t('mp3.feature2Point1')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{t('mp3.feature2Point2')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{t('mp3.feature2Point3')}</span>
                  </li>
                </ul>
              </div>
              <div>
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                  <div className="aspect-video rounded-xl overflow-hidden">
                    <Image 
                      src="/images/features/fast-conversion.png" 
                      alt="Lightning-Fast Conversion"
                      width={1376}
                      height={768}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 3: Premium Audio Quality */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                  <div className="aspect-video rounded-xl overflow-hidden">
                    <Image 
                      src="/images/features/premium-quality.png" 
                      alt="Premium Audio Quality"
                      width={1376}
                      height={768}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">💎</span>
                  <h3 className="text-3xl font-bold">{t('mp3.feature3Title')}</h3>
                </div>
                <p className="text-lg text-gray-600 mb-6">
                  {t('mp3.feature3Desc')}
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{t('mp3.feature3Point1')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{t('mp3.feature3Point2')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{t('mp3.feature3Point3')}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">{t('mp3Faq.title')}</h2>
            <div className="space-y-6">
              {(Array.isArray(t('mp3Faq.items', { returnObjects: true })) ? t('mp3Faq.items', { returnObjects: true }) : []).map((faq: any, i: number) => (
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
