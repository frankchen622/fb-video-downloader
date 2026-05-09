import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Logo from '@/components/Logo'
import Footer from '@/components/Footer'

export default function FacebookToMP4() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleDownload = async () => {
    if (!url.trim()) {
      setError('Please enter a Facebook video URL')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, format: 'mp4' })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to download video')
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
        <title>Facebook to MP4 Converter - Download FB Videos as MP4 Free | HD Quality</title>
        <meta name="description" content="Convert Facebook videos to MP4 format in HD quality (1080p, 720p). Free online FB to MP4 converter - no watermark, no registration. Download Facebook videos as MP4 on any device." />
        <meta name="keywords" content="facebook to mp4, fb to mp4, facebook video to mp4, convert facebook video to mp4, facebook to mp4 converter, fb video mp4, facebook mp4 download, convert fb to mp4, facebook to mp4 converter online, facebook video mp4 download, save facebook to mp4, facebook link to mp4, fb mp4 converter, facebook to mp4 hd, free facebook to mp4 converter" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <header className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Logo />
            <nav className="hidden md:flex gap-6 text-sm text-gray-600">
              <Link href="/facebook-to-mp4" className="text-blue-600 font-semibold">FB to MP4</Link>
              <Link href="/facebook-to-mp3" className="hover:text-blue-600 transition">FB to MP3</Link>
              <Link href="/reels-downloader" className="hover:text-blue-600 transition">Reels</Link>
              <Link href="/private-video-downloader" className="hover:text-blue-600 transition">Private Videos</Link>
            </nav>
          </div>
        </header>

        {/* Hero + Download Box */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Facebook to MP4
            </h1>
            <p className="text-lg text-gray-600 mb-10">
              Convert FB videos to MP4 in HD • Free • No watermark
            </p>

            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-100">
              <div className="flex flex-col md:flex-row gap-3">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Paste Facebook video URL..."
                  className="flex-1 px-5 py-3.5 text-base border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
                  onKeyPress={(e) => e.key === 'Enter' && handleDownload()}
                />
                <button
                  onClick={handleDownload}
                  disabled={loading}
                  className="px-7 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition disabled:opacity-50 whitespace-nowrap"
                >
                  {loading ? '⏳ Converting...' : '🚀 Convert to MP4'}
                </button>
              </div>
              
              {error && (
                <div className="mt-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-600 text-sm">
                  {error}
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
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">How to Convert Facebook to MP4</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { num: '1', title: 'Copy URL', desc: 'Copy the Facebook video link' },
                { num: '2', title: 'Paste', desc: 'Paste it into the converter' },
                { num: '3', title: 'Download', desc: 'Click convert and save MP4' }
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

        {/* Why Choose Us - Image + Text */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Facebook to MP4 Converter?</h2>
            
            {/* Feature 1 */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <div className="order-2 md:order-1">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                  <div className="aspect-[4/3] bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="w-24 h-24 mx-auto mb-4 bg-blue-600 rounded-2xl flex items-center justify-center">
                        <span className="text-3xl font-bold text-white">MP4</span>
                      </div>
                      <p className="text-sm text-gray-600 font-medium">Universal Format</p>
                      <p className="text-xs text-gray-500 mt-2">1080p • 720p • 480p • 360p</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <h3 className="text-3xl font-bold mb-4">Universal MP4 Format</h3>
                <p className="text-lg text-gray-600 mb-6">
                  MP4 is the universal video format, supported by every device and platform. Convert Facebook videos to MP4 for maximum compatibility.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Works on all devices and platforms</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">High quality with small file size</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Industry standard for video</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-4">HD Quality Downloads</h3>
                <p className="text-lg text-gray-600 mb-6">
                  Download Facebook videos in the highest quality available. Our converter detects all resolutions and lets you choose the best quality.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Up to 1080p Full HD</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">No quality loss during conversion</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Multiple quality options available</span>
                  </li>
                </ul>
              </div>
              <div>
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                  <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="w-20 h-20 mx-auto mb-4 bg-purple-600 rounded-full flex items-center justify-center">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600 font-medium">HD Video Quality</p>
                      <p className="text-xs text-gray-500 mt-2">Crystal Clear • No Watermark</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {[
                { 
                  q: 'How do I convert Facebook videos to MP4?', 
                  a: 'Simply copy the Facebook video URL, paste it into our converter above, and click "Convert to MP4". The video will be processed and ready to download in seconds. No registration or software installation required.' 
                },
                { 
                  q: 'Is MP4 the best format for Facebook videos?', 
                  a: 'Yes, MP4 is the most widely supported video format. It works on all devices (iPhone, Android, Windows, Mac), platforms, and media players, making it the ideal choice for downloading Facebook videos.' 
                },
                { 
                  q: 'What quality can I download?', 
                  a: 'You can download Facebook videos in the highest quality available, including HD (1080p), 720p, 480p, and 360p. Our converter automatically detects all available qualities from the source video.' 
                },
                { 
                  q: 'Is this Facebook to MP4 converter free?', 
                  a: 'Yes, our Facebook to MP4 converter is 100% free with unlimited conversions. No hidden fees, no subscriptions, no registration required. Download as many videos as you want.' 
                },
                { 
                  q: 'Do I need to install software?', 
                  a: 'No installation needed! Our converter works directly in your web browser on any device - desktop, mobile, or tablet. Just paste the URL and download.' 
                },
                { 
                  q: 'Can I convert Facebook videos on mobile?', 
                  a: 'Absolutely! Our Facebook to MP4 converter works perfectly on mobile devices. Simply open Facebook in your mobile browser, copy the video link, and paste it into our converter. Works on both iPhone and Android.' 
                },
                { 
                  q: 'Will the downloaded video have a watermark?', 
                  a: 'No, all videos downloaded through our converter are completely clean without any watermarks, logos, or branding. You get the original video exactly as it appears on Facebook.' 
                },
                { 
                  q: 'How long does the conversion take?', 
                  a: 'Conversion is usually instant! Most videos are processed and ready to download within 5-10 seconds, depending on the video length and your internet speed.' 
                },
                { 
                  q: 'Can I convert private Facebook videos?', 
                  a: 'You can only convert videos that you have permission to view on Facebook. If you can watch it on Facebook, you can convert it. For private videos, check out our Private Video Downloader page.' 
                },
                { 
                  q: 'What types of Facebook videos can I convert?', 
                  a: 'You can convert regular Facebook videos, Reels, Stories, live videos (after they end), and videos from Facebook Watch. Our converter supports all types of Facebook video content.' 
                },
                { 
                  q: 'Is it legal to download Facebook videos?', 
                  a: 'Downloading videos for personal use is generally acceptable. However, always respect copyright and content creators\' rights. Never redistribute or use downloaded content commercially without permission.' 
                },
                { 
                  q: 'Why is MP4 better than other formats?', 
                  a: 'MP4 offers the best balance of quality and file size. It\'s universally compatible, plays on all devices, supports high resolutions, and is accepted by all social media platforms. It\'s the industry standard for video.' 
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
