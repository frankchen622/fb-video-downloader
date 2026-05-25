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
    // 方案1: 尝试在新标签页打开（浏览器会自动下载视频）
    const newWindow = window.open(downloadUrl, '_blank')
    
    // 方案2: 如果弹窗被阻止，提供复制链接选项
    if (!newWindow) {
      // 复制链接到剪贴板
      navigator.clipboard.writeText(downloadUrl).then(() => {
        alert('下载链接已复制到剪贴板！请在新标签页粘贴访问。\nDownload link copied! Please paste in a new tab.')
      }).catch(() => {
        // 如果复制失败，显示链接
        alert(`请复制此链接在新标签页打开：\n${downloadUrl}`)
      })
    }
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
                  title: 'HD Video Downloader', 
                  desc: 'Download Facebook videos in HD quality with just one click. Save videos in MP4 format for offline viewing anytime, anywhere. Supports all video formats and resolutions up to 1080p.'
                },
                { 
                  icon: '🎵', 
                  title: 'Audio Extractor', 
                  desc: 'Extract high-quality audio from any Facebook video. Perfect for saving music, podcasts, or interviews in MP3 format (up to 320kbps) for offline listening.'
                },
                { 
                  icon: '📱', 
                  title: 'Reels & Stories', 
                  desc: 'Download Facebook Reels and Stories before they disappear. Save entertaining short-form content, tutorials, or viral reels in full quality to watch offline or share with friends.'
                },
                { 
                  icon: '⚡', 
                  title: 'Lightning Fast', 
                  desc: 'Download videos in seconds with our optimized servers. No waiting, no delays - just instant downloads at maximum speed.'
                },
                { 
                  icon: '🚫', 
                  title: 'No Watermarks', 
                  desc: 'Clean downloads without any watermarks, logos, or branding. Get pure, original content exactly as it appears on Facebook.'
                },
                { 
                  icon: '🔒', 
                  title: 'Safe & Private', 
                  desc: 'Your privacy is protected. We don\'t store your data, track your activity, or require any personal information. 100% secure and anonymous.'
                }
              ].map((feature, i) => (
                <div key={i} className="p-6 rounded-xl bg-white shadow-md hover:shadow-xl transition text-center">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h4 className="text-xl font-bold mb-3">{feature.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
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
              Follow these three simple steps to save any Facebook video, reel, or photo to your device in seconds. No registration, no software installation required.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: '01', title: 'Copy Link', desc: 'Open Facebook and copy the video URL from the address bar or share menu' },
                { step: '02', title: 'Paste URL', desc: 'Return here and paste the link into the input field above' },
                { step: '03', title: 'Download', desc: 'Click the download button and save your video in HD quality' }
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                    {item.step}
                  </div>
                  <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                  <p className="text-gray-600">{item.desc}</p>
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
                <h3 className="text-3xl font-bold mb-4">Video Downloader</h3>
                <p className="text-lg text-gray-600 mb-6">
                  Download Facebook videos in HD quality with just one click. DLFB.io supports all video formats and resolutions, allowing you to save Facebook videos to your device in MP4 format for offline viewing anytime, anywhere.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">HD quality up to 1080p</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">No watermarks or logos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Works on all devices</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Reels Downloader */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <div>
                <h3 className="text-3xl font-bold mb-4">Reels Downloader</h3>
                <p className="text-lg text-gray-600 mb-6">
                  Download Facebook Reels videos in high definition. Perfect for saving entertaining short-form content, tutorials, or viral reels to watch offline or share with friends.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Save Reels before they disappear</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Full quality downloads</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Fast and easy to use</span>
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
                <h3 className="text-3xl font-bold mb-4">Stories Downloader</h3>
                <p className="text-lg text-gray-600 mb-6">
                  Capture and save Facebook Stories before they disappear. Download stories from any public Facebook account in full quality, preserving memorable moments that would otherwise be lost after 24 hours.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Save stories permanently</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Download before 24h expiration</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Original quality preserved</span>
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
              Frequently Asked Questions
            </h3>
            <div className="space-y-6">
              {[
                { 
                  q: 'How do I download Facebook videos?', 
                  a: 'Downloading Facebook videos is simple with our free Facebook video downloader. Just copy the video URL from Facebook, paste it into our downloader above, and click the download button. You can save Facebook videos in HD quality (1080p, 720p, 480p) to MP4 format. No registration or software installation required - works directly in your browser on any device.' 
                },
                { 
                  q: 'Is this Facebook video downloader really free?', 
                  a: 'Yes! Our FB video downloader is 100% free with unlimited downloads. There are no hidden costs, subscriptions, or premium plans. Download as many Facebook videos, Reels, and Stories as you want without paying anything. We believe everyone should have free access to save their favorite Facebook content.' 
                },
                { 
                  q: 'What video quality can I download from Facebook?', 
                  a: 'You can download Facebook videos in the highest quality available from the source. Our Facebook video download tool supports HD quality up to 1080p, as well as 720p, 480p, and 360p. We automatically detect all available video qualities and let you choose the best option for your needs. Download FB videos in HD for the best viewing experience.' 
                },
                { 
                  q: 'Can I download Facebook videos on mobile?', 
                  a: 'Absolutely! Our Facebook video downloader works perfectly on mobile devices. Whether you\'re using an iPhone, iPad, Android phone, or tablet, you can easily download Facebook videos. Just open Facebook in your mobile browser, copy the video link, paste it into our FB downloader, and save the video to your device. Works on iOS and Android.' 
                },
                { 
                  q: 'Do I need to install software to download FB videos?', 
                  a: 'No installation required! Unlike other Facebook video downloader apps, our online tool works directly in your web browser. No need to download or install any software, extensions, or apps. Simply visit our website, paste the Facebook video URL, and download. This makes it safer and more convenient than downloadable Facebook downloader software.' 
                },
                { 
                  q: 'Can I download Facebook Reels?', 
                  a: 'Yes! Our tool supports downloading Facebook Reels in addition to regular videos. You can download Facebook Reels in full quality and save them to your device for offline viewing. Just copy the Reels URL and paste it into our downloader. Perfect for saving entertaining short-form content, tutorials, or viral reels before they disappear.' 
                },
                { 
                  q: 'Can I download Facebook Stories?', 
                  a: 'Yes, you can download Facebook Stories with our tool. Since Stories disappear after 24 hours, our Facebook story downloader lets you save them permanently. Download stories from any public Facebook account in full quality. Preserve memorable moments that would otherwise be lost. Just paste the story URL before it expires.' 
                },
                { 
                  q: 'Will downloaded videos have watermarks?', 
                  a: 'No watermarks! All videos downloaded through our Facebook video downloader are completely clean without any watermarks, logos, or branding. You get the original video exactly as it appears on Facebook. We don\'t add any marks to your downloaded content - just pure, clean video files.' 
                },
                { 
                  q: 'Can I convert Facebook videos to MP3?', 
                  a: 'Yes! Our tool includes a Facebook to MP3 converter. You can extract high-quality audio from any Facebook video and save it as MP3 (up to 320kbps). Perfect for saving music, podcasts, interviews, or any audio content from Facebook videos. Just use our FB to MP3 converter feature to download only the audio.' 
                },
                { 
                  q: 'What formats can I download Facebook videos in?', 
                  a: 'Our Facebook video downloader supports MP4 format, which is the most universal video format that works on all devices and platforms. You can also convert Facebook videos to MP3 audio format. MP4 is compatible with iPhone, Android, Windows, Mac, smart TVs, and all media players. It offers excellent quality with manageable file sizes.' 
                },
                { 
                  q: 'How fast is the download process?', 
                  a: 'Our Facebook video download service is lightning fast! Most videos are processed and ready to download within 5-10 seconds. The actual download speed depends on your internet connection and the video file size. We use optimized servers to ensure the fastest possible download experience. No waiting, no delays - just instant downloads.' 
                },
                { 
                  q: 'Can I download private Facebook videos?', 
                  a: 'You can only download Facebook videos that you have permission to view. If you can watch a video on Facebook (including private videos shared with you), you can download it with our tool. However, you cannot download videos from private accounts you don\'t have access to. Always respect content creators\' privacy and rights.' 
                },
                { 
                  q: 'Is it safe to use this Facebook video downloader?', 
                  a: 'Yes, our Facebook downloader is 100% safe and secure. We don\'t store your videos, track your downloads, or collect personal information. Your privacy is protected. We don\'t require registration or login, so your Facebook account stays secure. All downloads are processed securely and anonymously.' 
                },
                { 
                  q: 'Is it legal to download Facebook videos?', 
                  a: 'Downloading Facebook videos for personal use is generally acceptable. However, you should always respect copyright and content creators\' rights. Never redistribute, repost, or use downloaded content commercially without permission from the original creator. Use our FB video downloader responsibly and ethically.' 
                },
                { 
                  q: 'Does this work on all devices?', 
                  a: 'Yes! Our Facebook video downloader works on all devices and platforms. Download FB videos on iPhone, iPad, Android phones, Android tablets, Windows PC, Mac, Linux, and even Chromebooks. Our online tool is fully responsive and optimized for all screen sizes. No matter what device you use, you can save Facebook videos easily.' 
                }
              ].map((faq, i) => (
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
