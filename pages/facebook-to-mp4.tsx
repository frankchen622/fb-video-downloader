import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Logo from '@/components/Logo'

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
        <title>Facebook to MP4 Converter - Download FB Videos as MP4 Free</title>
        <meta name="description" content="Convert and download Facebook videos to MP4 format in HD quality. Fast, free, and works on all devices. No watermark, no registration required." />
        <meta name="keywords" content="facebook to mp4, fb to mp4, facebook video to mp4, convert facebook video, mp4 downloader" />
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

        <section className="container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Facebook to MP4 Converter
            </h1>
            <p className="text-xl text-gray-600 mb-12">
              Download Facebook videos in MP4 format - the most compatible video format for all devices
            </p>

            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Paste Facebook video URL here..."
                  className="flex-1 px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition"
                  onKeyPress={(e) => e.key === 'Enter' && handleDownload()}
                />
                <button
                  onClick={handleDownload}
                  disabled={loading}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition disabled:opacity-50 whitespace-nowrap"
                >
                  {loading ? 'Converting...' : 'Convert to MP4'}
                </button>
              </div>
              
              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                  {error}
                </div>
              )}

              <p className="mt-6 text-sm text-gray-500">
                ✓ No registration required  ✓ Unlimited downloads  ✓ All devices supported
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16 bg-white/50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Why Download Facebook Videos as MP4?</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {[
                { icon: '📱', title: 'Universal Compatibility', desc: 'Works on iPhone, Android, Windows, Mac, and Linux' },
                { icon: '🎬', title: 'High Quality', desc: 'Maintains excellent video quality with efficient compression' },
                { icon: '💾', title: 'Small File Size', desc: 'Optimized compression saves storage space' },
                { icon: '🔄', title: 'Easy Sharing', desc: 'Compatible with all social media platforms' }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-6 bg-white rounded-xl shadow-md">
                  <div className="text-4xl">{item.icon}</div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 md:p-12">
              <h3 className="text-2xl font-bold mb-6">How to Convert Facebook Video to MP4</h3>
              <div className="space-y-4">
                {[
                  'Copy the Facebook video URL from your browser',
                  'Paste it into the converter above',
                  'Click "Convert to MP4" and download your video'
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                      {i + 1}
                    </div>
                    <p className="text-gray-700 pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {[
                { q: 'Is MP4 the best format for Facebook videos?', a: 'Yes, MP4 is the most widely supported video format. It works on all devices, platforms, and media players, making it the ideal choice for downloading Facebook videos.' },
                { q: 'What quality can I download?', a: 'You can download Facebook videos in the highest quality available, including HD (1080p), 720p, 480p, and 360p. Our converter automatically detects all available qualities.' },
                { q: 'Is this converter free?', a: 'Yes, our Facebook to MP4 converter is 100% free with unlimited conversions. No hidden fees, no subscriptions, no registration required.' },
                { q: 'Do I need to install software?', a: 'No installation needed! Our converter works directly in your web browser on any device - desktop, mobile, or tablet.' },
                { q: 'Can I convert private videos?', a: 'You can only convert videos that you have permission to view on Facebook. For private videos, use our Private Video Downloader page.' }
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

        <footer className="container mx-auto px-4 py-12 border-t border-gray-200">
          <div className="max-w-6xl mx-auto text-center text-gray-600">
            <div className="flex flex-wrap justify-center gap-6 mb-6">
              <Link href="/" className="hover:text-blue-600 transition">Home</Link>
              <Link href="/facebook-to-mp4" className="hover:text-blue-600 transition">FB to MP4</Link>
              <Link href="/facebook-to-mp3" className="hover:text-blue-600 transition">FB to MP3</Link>
              <Link href="/reels-downloader" className="hover:text-blue-600 transition">Reels Downloader</Link>
              <Link href="/private-video-downloader" className="hover:text-blue-600 transition">Private Videos</Link>
            </div>
            <p className="text-sm">
              © 2024 FB Video Downloader. Not affiliated with Facebook or Meta.
            </p>
          </div>
        </footer>
      </main>
    </>
  )
}
