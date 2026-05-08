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

        <section className="container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Facebook to MP4 Converter - Free & Fast
            </h1>
            <p className="text-xl text-gray-600 mb-12">
              Convert and download Facebook videos to MP4 format in HD quality (1080p, 720p, 480p). Works on iPhone, Android, Windows, Mac. No watermark, no registration, completely free.
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

        {/* SEO Content Section */}
        <section className="container mx-auto px-4 py-16 bg-white/50">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                Best Free Facebook to MP4 Converter Online
              </h2>
              
              <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
                <p>
                  Looking for a reliable way to <strong>convert Facebook videos to MP4</strong>? Our free <strong>Facebook to MP4 converter</strong> is the perfect solution. <strong>Download Facebook videos as MP4</strong> files in HD quality (1080p, 720p) without any watermarks or registration. Whether you need to <strong>convert FB to MP4</strong> for offline viewing or sharing, our online tool makes it fast and easy.
                </p>
                
                <h3 className="text-2xl font-bold mt-8 mb-4">Why Choose MP4 Format?</h3>
                <p>
                  MP4 is the most universal video format, supported by virtually every device and platform. When you <strong>convert Facebook video to MP4</strong>, you ensure maximum compatibility with iPhones, Android phones, Windows PCs, Macs, smart TVs, and all media players. Our <strong>FB to MP4 converter</strong> maintains excellent video quality while keeping file sizes manageable.
                </p>
                
                <h3 className="text-2xl font-bold mt-8 mb-4">Free Online Facebook to MP4 Converter</h3>
                <p>
                  Unlike other <strong>Facebook MP4 converters</strong> that require software installation, our tool works entirely online. Simply paste your <strong>Facebook video link</strong>, and our <strong>Facebook to MP4 converter online</strong> will process it instantly. <strong>Download Facebook MP4</strong> files in seconds - no apps, no registration, completely free. Perfect for converting videos, reels, and stories.
                </p>
                
                <h3 className="text-2xl font-bold mt-8 mb-4">HD Quality Facebook to MP4 Downloads</h3>
                <p>
                  Get the best quality with our <strong>Facebook to MP4 HD</strong> converter. <strong>Convert FB video to MP4</strong> in resolutions up to 1080p. Our advanced technology ensures you get the highest quality available from the source video. Whether you're downloading tutorials, entertainment, or personal videos, quality is never compromised.
                </p>
                
                <h3 className="text-2xl font-bold mt-8 mb-4">How to Convert Facebook to MP4</h3>
                <p>
                  Converting is simple: copy the <strong>Facebook link to MP4</strong>, paste it into our converter, and click download. Our <strong>FB MP4 converter</strong> handles all the technical work. You can <strong>save Facebook to MP4</strong> on any device - desktop, mobile, or tablet. No technical knowledge required.
                </p>
                
                <div className="mt-8 p-6 bg-blue-50 rounded-xl border-l-4 border-blue-600">
                  <p className="text-lg font-semibold text-blue-900 mb-2">
                    Popular Searches:
                  </p>
                  <p className="text-sm text-blue-800 leading-relaxed">
                    facebook to mp4 • fb to mp4 • facebook video to mp4 • convert facebook video to mp4 • facebook to mp4 converter • fb video mp4 • facebook mp4 download • convert fb to mp4 • facebook to mp4 converter online • facebook video mp4 download • save facebook to mp4 • facebook link to mp4 • fb mp4 converter • facebook to mp4 hd • convert fb video to mp4 online • facebook to mp4 converter free • fb mp4 download • download facebook mp4 • convert fb mp4
                  </p>
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

        <Footer />
      </main>
    </>
  )
}
