import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function ReelsDownloader() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleDownload = async () => {
    if (!url.trim()) {
      setError('Please enter a Facebook Reels URL')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, type: 'reels' })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to download reel')
      }

      window.location.href = data.downloadUrl
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Facebook Reels Downloader - Download FB Reels in HD Free</title>
        <meta name="description" content="Download Facebook Reels videos in HD quality for free. Save viral short videos, funny clips, and trending reels without watermark. Fast and easy." />
        <meta name="keywords" content="facebook reels downloader, download fb reels, reels video download, facebook short videos, save reels" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header />

        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Facebook Reels Downloader
            </h1>
            <p className="text-lg text-gray-600 mb-10">
              Download FB Reels in HD • No watermark • Free
            </p>

            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-100">
              <div className="flex flex-col md:flex-row gap-3">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Paste Facebook Reels URL..."
                  className="flex-1 px-5 py-3.5 text-base border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
                  onKeyPress={(e) => e.key === 'Enter' && handleDownload()}
                />
                <button
                  onClick={handleDownload}
                  disabled={loading}
                  className="px-7 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition disabled:opacity-50 whitespace-nowrap"
                >
                  {loading ? '⏳ Downloading...' : '🎬 Download Reel'}
                </button>
              </div>
              
              {error && (
                <div className="mt-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-600 text-sm">
                  {error}
                </div>
              )}

              <p className="mt-5 text-xs text-gray-500 text-center">
                HD quality • No watermark • Save viral content
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">How to Download Facebook Reels</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { num: '1', title: 'Copy Link', desc: 'Copy the Reels URL from Facebook' },
                { num: '2', title: 'Paste', desc: 'Paste it into the downloader' },
                { num: '3', title: 'Download', desc: 'Click download and save' }
              ].map((step) => (
                <div key={step.num} className="bg-white rounded-xl p-6 text-center shadow-md">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-3">
                    {step.num}
                  </div>
                  <h3 className="font-bold mb-1">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            {/* Feature 1: Save Viral Reels */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <div className="order-2 md:order-1">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                  <div className="aspect-[9/16] max-w-xs mx-auto rounded-2xl overflow-hidden">
                    <Image 
                      src="/images/reels/save-viral-reels.png" 
                      alt="Save Viral Reels"
                      width={768}
                      height={1376}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <h3 className="text-3xl font-bold mb-4">Save Viral Reels</h3>
                <p className="text-lg text-gray-600 mb-6">
                  Download trending Facebook Reels to watch offline, share with friends, or repost on other platforms. Never lose your favorite content again.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Download any public Reel instantly</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Keep viral content before it disappears</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Build your personal collection offline</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Feature 2: No Watermark */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <div>
                <h3 className="text-3xl font-bold mb-4">No Watermark</h3>
                <p className="text-lg text-gray-600 mb-6">
                  Get clean, watermark-free downloads every time. We don't add logos or branding—just the original Reel exactly as it appears on Facebook.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Pure, unbranded downloads</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">No logos or text overlays</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Perfect for sharing and reposting</span>
                  </li>
                </ul>
              </div>
              <div>
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                  <div className="aspect-video rounded-xl overflow-hidden">
                    <Image 
                      src="/images/reels/no-watermark.webp" 
                      alt="No Watermark"
                      width={1376}
                      height={768}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 3: High-Quality Downloading */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <div className="order-2 md:order-1">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                  <div className="aspect-video rounded-xl overflow-hidden">
                    <Image 
                      src="/images/reels/high-quality.png" 
                      alt="High-Quality Downloading"
                      width={1376}
                      height={768}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <h3 className="text-3xl font-bold mb-4">High-Quality Downloading</h3>
                <p className="text-lg text-gray-600 mb-6">
                  Preserve the original quality of every Reel. Download in full HD (1080p) with crisp visuals and clear audio—no compression, no quality loss.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Up to 1080p HD resolution</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Original audio quality preserved</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">No pixelation or artifacts</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Feature 4: Easy to Use */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-4">Easy to Use</h3>
                <p className="text-lg text-gray-600 mb-6">
                  Three simple steps: copy, paste, download. No registration, no app installation, no complicated settings. Works instantly in your browser.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">No account or login required</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Works on any device (phone, tablet, PC)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Download in seconds, not minutes</span>
                  </li>
                </ul>
              </div>
              <div>
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                  <div className="aspect-video rounded-xl overflow-hidden">
                    <Image 
                      src="/images/reels/easy-to-use.png" 
                      alt="Easy to Use"
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
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {[
                { q: 'How to download Facebook Reels?', a: 'Using our Facebook reels download tool is simple: 1) Copy the Reels URL from Facebook, 2) Paste it into our downloader, 3) Click download. Our fb reels download service works with all public Reels. You can also use face book reel downloader for quick downloads.' },
                { q: 'Can I download FB Reels on mobile?', a: 'Yes! Our download facebook reels tool works perfectly on mobile browsers. No need for a facebook reels download app - just use our web-based fb reels downloader directly on your phone. Works on both iPhone and Android for facebook reels video download.' },
                { q: 'Is this Facebook Reels downloader free?', a: 'Completely free! Our facebook reels downloader is 100% free with no hidden costs. Download reels facebook as many times as you want. No registration needed for fb reels video download or facebook download reels.' },
                { q: 'What quality are downloaded Reels?', a: 'Our download facebook reels service preserves original quality, typically HD (1080p). When you download reels fb, you get the same quality as on Facebook. Our facebook reels video download maintains full resolution.' },
                { q: 'Do downloaded Reels have watermarks?', a: 'No watermarks! When you use our facebook reels download tool, you get clean videos. Our fb reels download service doesn\'t add any logos. Perfect for repost using our facebook reel downloader.' },
                { q: 'How to find Facebook Reels URL?', a: 'Open the Reel on Facebook, tap the three dots menu, select "Copy link". Then paste into our facebook reels downloader. Works for all public Reels using our download reels facebook tool.' },
                { q: 'Can I download private Facebook Reels?', a: 'You can download private Reels if you have viewing permission on Facebook. Our facebook reels download tool respects privacy settings. Login to Facebook first, then use our fb reels downloader.' },
                { q: 'Does it work without installing apps?', a: 'Yes! No facebook reels download app needed. Our web-based facebook reels downloader works directly in your browser. Just visit our site for instant fb reels download without any installation.' },
                { q: 'Can I download multiple Reels at once?', a: 'Yes, you can download reels facebook one by one quickly. Our facebook reels download service is fast enough for batch downloading. Use our fb reels downloader repeatedly for multiple videos.' },
                { q: 'How fast is the download?', a: 'Very fast! Our download facebook reels service typically completes in 10-30 seconds. The facebook reels video download speed depends on your internet connection and video length.' },
                { q: 'Can I save Facebook Reels to my phone?', a: 'Absolutely! Use our facebook reels download tool on mobile to save directly to your device. Our fb reels download service works on all smartphones for easy saving.' },
                { q: 'Is Facebook Reels downloader safe?', a: 'Completely safe! Our facebook reels downloader doesn\'t store your data or videos. We don\'t require login for public Reels. Safe fb reels download guaranteed.' },
                { q: 'Can I download Reels from Facebook Stories?', a: 'Yes, if the Story contains a Reel, you can use our facebook reels download tool. Our download reels facebook service works with Reels shared in Stories too.' },
                { q: 'What file format are downloaded Reels?', a: 'Downloaded Reels are in MP4 format, compatible with all devices. Our facebook reels video download provides universal MP4 files that play everywhere.' },
                { q: 'Can I download Facebook Reels on PC?', a: 'Yes! Our facebook reels downloader works perfectly on Windows, Mac, and Linux. Use our fb reels download service on any computer browser.' },
                { q: 'Do I need a Facebook account?', a: 'For public Reels, no account needed. For private Reels, you need to be logged into Facebook. Our facebook reels download tool works both ways.' },
                { q: 'Can I download Reels in HD quality?', a: 'Yes! Our download facebook reels service preserves HD quality up to 1080p. Get crystal clear facebook reels video download every time.' },
                { q: 'How to download Facebook Reels to gallery?', a: 'After using our facebook reels downloader, the video saves to your default download folder. On mobile, you can move it to your gallery after fb reels download completes.' },
                { q: 'Can I download Reels from Facebook Lite?', a: 'Yes! Our facebook reels download tool works with Facebook Lite too. Copy the Reel link from Facebook Lite and use our fb reels downloader.' },
                { q: 'Is there a download limit?', a: 'No limits! Download reels facebook as many times as you want. Our facebook reels downloader has no daily or monthly restrictions.' },
                { q: 'Can I download Reels with music?', a: 'Yes! Our facebook reels video download includes the original audio and music. Everything is preserved when you download facebook reels.' },
                { q: 'Does it work on iPhone?', a: 'Perfectly! Our facebook reels download tool works great on iPhone Safari. No facebook reels download app needed - just use our web-based fb reels downloader.' },
                { q: 'Can I download Reels from Facebook groups?', a: 'Yes, if you\'re a group member and the Reel is visible to you. Use our facebook reels downloader to download reels facebook from groups.' },
                { q: 'How to download Facebook Reels without app?', a: 'Simply use our web-based facebook reels downloader! No app installation required. Just paste the URL and start your fb reels download instantly.' },
                { q: 'Can I share downloaded Reels?', a: 'Yes, after using our facebook reels download service, you can share the video file anywhere. Always respect copyright when sharing downloaded content.' },
                { q: 'What if download fails?', a: 'Try refreshing the page and copying the URL again. Make sure the Reel is public. Our facebook reels downloader works 99% of the time. Contact support if fb reels download issues persist.' },
                { q: 'Can I download Reels in different qualities?', a: 'Our facebook reels video download automatically gets the best available quality. We\'re working on adding quality options to our download facebook reels service.' },
                { q: 'Does it work with Facebook Watch Reels?', a: 'Yes! Our facebook reels downloader works with Reels in Facebook Watch. Use our fb reels download tool for any Reel location on Facebook.' },
                { q: 'Can I download Reels from Facebook pages?', a: 'Absolutely! Our download reels facebook tool works with Reels from any public Facebook page. Just copy the link and use our facebook reels downloader.' },
                { q: 'How to download Facebook Reels on Android?', a: 'Open Facebook on Android, copy the Reel link, paste into our facebook reels download tool in your browser. No facebook reels download app needed!' }
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
