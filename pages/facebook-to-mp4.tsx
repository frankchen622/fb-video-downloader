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

        {/* Quick Benefits */}
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">HD Quality</h3>
                <p className="text-gray-600 text-sm">Download in 1080p, 720p, or 480p - your choice</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">All Devices</h3>
                <p className="text-gray-600 text-sm">Works on iPhone, Android, Windows, Mac</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">No Watermark</h3>
                <p className="text-gray-600 text-sm">Clean videos, no logos or branding added</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
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

        {/* FAQ */}
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { 
                  q: 'How do I convert Facebook videos to MP4?', 
                  a: 'Copy the Facebook video URL, paste it into the converter above, and click "Convert to MP4". The video will be ready to download in seconds.' 
                },
                { 
                  q: 'Is this converter free?', 
                  a: 'Yes, completely free with unlimited conversions. No registration, no hidden fees, no subscriptions.' 
                },
                { 
                  q: 'What quality can I download?', 
                  a: 'You can download in HD quality up to 1080p, depending on the source video quality. We automatically detect all available resolutions.' 
                },
                { 
                  q: 'Does it work on mobile?', 
                  a: 'Yes! Works perfectly on iPhone and Android. Just copy the video link from the Facebook app and paste it into our converter.' 
                },
                { 
                  q: 'Will there be a watermark?', 
                  a: 'No watermarks, logos, or branding. You get the clean original video.' 
                },
                { 
                  q: 'Can I convert private videos?', 
                  a: 'You can convert any video you have permission to view on Facebook. For private videos, check our Private Video Downloader page.' 
                }
              ].map((faq, i) => (
                <details key={i} className="bg-white rounded-lg p-5 shadow-md border border-gray-100 group">
                  <summary className="font-semibold cursor-pointer hover:text-blue-600 transition flex items-center justify-between">
                    <span>{faq.q}</span>
                    <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-3 text-gray-600 text-sm leading-relaxed">{faq.a}</p>
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
