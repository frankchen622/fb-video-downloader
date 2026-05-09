import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Logo from '@/components/Logo'
import Footer from '@/components/Footer'

export default function FacebookToMP3() {
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
        body: JSON.stringify({ url, format: 'mp3' })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to extract audio')
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
        <title>Facebook to MP3 Converter - Extract Audio from FB Videos Free</title>
        <meta name="description" content="Convert Facebook videos to MP3 audio files. Extract high-quality audio from any Facebook video for free. Perfect for music, podcasts, and audio content." />
        <meta name="keywords" content="facebook to mp3, fb to mp3, facebook audio download, extract audio facebook, mp3 converter" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <header className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Logo />
            <nav className="hidden md:flex gap-6 text-sm text-gray-600">
              <Link href="/facebook-to-mp4" className="hover:text-blue-600 transition">FB to MP4</Link>
              <Link href="/facebook-to-mp3" className="text-blue-600 font-semibold">FB to MP3</Link>
              <Link href="/reels-downloader" className="hover:text-blue-600 transition">Reels</Link>
              <Link href="/private-video-downloader" className="hover:text-blue-600 transition">Private Videos</Link>
            </nav>
          </div>
        </header>

        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Facebook to MP3
            </h1>
            <p className="text-lg text-gray-600 mb-10">
              Extract audio from FB videos • High quality • Free
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
                  {loading ? '⏳ Extracting...' : '🎵 Convert to MP3'}
                </button>
              </div>
              
              {error && (
                <div className="mt-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-600 text-sm">
                  {error}
                </div>
              )}

              <p className="mt-5 text-xs text-gray-500 text-center">
                High-quality audio • Fast conversion • No software needed
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose Us - Image + Text */
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            {/* MP3 Format Benefits */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <div className="order-2 md:order-1">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                  <div className="aspect-[4/3] bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="w-24 h-24 mx-auto mb-4 bg-blue-600 rounded-2xl flex items-center justify-center">
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600 font-medium">Audio Format</p>
                      <p className="text-xs text-gray-500 mt-2">320kbps • 256kbps • 192kbps • 128kbps</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <h3 className="text-3xl font-bold mb-4">Why Extract Audio to MP3?</h3>
                <p className="text-lg text-gray-600 mb-6">
                  MP3 is the universal audio format. Extract audio from Facebook videos to save storage, listen offline, and enjoy music anywhere.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Much smaller file size than video</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Works on all music players and devices</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Perfect for music, podcasts, and audio content</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Audio Quality */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-4">High-Quality Audio Extraction</h3>
                <p className="text-lg text-gray-600 mb-6">
                  Extract audio from Facebook videos in the highest quality available. Our converter preserves the original audio quality.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Up to 320kbps bitrate</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">No quality loss during extraction</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Crystal clear sound</span>
                  </li>
                </ul>
              </div>
              <div>
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                  <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="w-20 h-20 mx-auto mb-4 bg-purple-600 rounded-full flex items-center justify-center">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600 font-medium">High-Quality Audio</p>
                      <p className="text-xs text-gray-500 mt-2">Crystal Clear • No Loss</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="container mx-auto px-4 py-12 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">How to Convert Facebook to MP3</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { num: '1', title: 'Copy URL', desc: 'Copy the Facebook video link' },
                { num: '2', title: 'Paste', desc: 'Paste it into the converter' },
                { num: '3', title: 'Download', desc: 'Click convert and save MP3' }
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
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {[
                { q: 'Can I extract audio from any Facebook video?', a: 'Yes, you can extract audio from any public Facebook video. For private videos, you need to have viewing permission on Facebook first.' },
                { q: 'What audio quality will I get?', a: 'Our converter extracts audio in the highest quality available, up to 320kbps MP3. The quality depends on the original video\'s audio track.' },
                { q: 'Is MP3 compatible with all devices?', a: 'Yes, MP3 is the most universal audio format. It works on all smartphones, tablets, computers, and music players.' },
                { q: 'How long does conversion take?', a: 'Audio extraction is very fast, usually taking just a few seconds depending on the video length and your internet speed.' },
                { q: 'Can I convert music videos to MP3?', a: 'Yes, you can extract audio from music videos, live performances, podcasts, or any video content on Facebook. Always respect copyright laws.' }
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
