import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Logo from '@/components/Logo'
import Footer from '@/components/Footer'

export default function Home() {
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
        body: JSON.stringify({ url })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to download video')
      }

      // Trigger download
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
        <title>Facebook Video Downloader - Download FB Videos in HD Free | No Watermark</title>
        <meta name="description" content="Download Facebook videos in HD quality for free. Fast, no watermark, no ads. Perfect for content creators, social media managers, and influencers. Works on all devices." />
        <meta name="keywords" content="facebook video downloader, download fb video, facebook video download, fb downloader, no watermark, hd video download" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Facebook Video Downloader - Download FB Videos in HD Free" />
        <meta property="og:description" content="Download Facebook videos in HD quality for free. Fast, no watermark, no ads." />
        <meta property="og:type" content="website" />
        
        {/* Schema.org */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Facebook Video Downloader",
            "description": "Download Facebook videos in HD quality for free",
            "applicationCategory": "MultimediaApplication",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })
        }} />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header */}
        <header className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Logo />
            <nav className="hidden md:flex gap-6 text-sm text-gray-600">
              <Link href="/facebook-to-mp4" className="hover:text-blue-600 transition">FB to MP4</Link>
              <Link href="/facebook-to-mp3" className="hover:text-blue-600 transition">FB to MP3</Link>
              <Link href="/reels-downloader" className="hover:text-blue-600 transition">Reels</Link>
              <Link href="/private-video-downloader" className="hover:text-blue-600 transition">Private Videos</Link>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Download Facebook Videos
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                in HD Quality - Free
              </span>
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Fast, no watermark, no ads. Perfect for content creators, social media managers, and influencers.
            </p>

            {/* Download Box */}
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
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {loading ? 'Processing...' : 'Download'}
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

        {/* Features */}
        <section id="features" className="container mx-auto px-4 py-16 bg-white/50">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Why Choose Our Downloader?
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: '⚡', title: 'Lightning Fast', desc: 'Download videos in seconds with our optimized servers' },
                { icon: '🎬', title: 'HD Quality', desc: 'Get videos in highest available quality up to 1080p' },
                { icon: '🚫', title: 'No Watermark', desc: 'Clean downloads without any watermarks or logos' },
                { icon: '💰', title: '100% Free', desc: 'Unlimited downloads, no hidden fees or subscriptions' },
                { icon: '📱', title: 'All Devices', desc: 'Works on desktop, mobile, and tablet browsers' },
                { icon: '🔒', title: 'Safe & Secure', desc: 'No malware, no tracking, your privacy protected' }
              ].map((feature, i) => (
                <div key={i} className="p-6 rounded-xl bg-white shadow-md hover:shadow-xl transition">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h4 className="text-xl font-bold mb-2">{feature.title}</h4>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How to Use */}
        <section id="how-to" className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-12">
              How to Download Facebook Videos
            </h3>
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

        {/* FAQ */}
        <section id="faq" className="container mx-auto px-4 py-16 bg-white/50">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h3>
            <div className="space-y-6">
              {[
                { q: 'Is this service really free?', a: 'Yes! Our Facebook video downloader is 100% free with no hidden costs, subscriptions, or premium plans. Download unlimited videos.' },
                { q: 'What video quality can I download?', a: 'You can download videos in the highest quality available, including HD (1080p), 720p, 480p, and 360p. We automatically detect all available qualities.' },
                { q: 'Do I need to install any software?', a: 'No installation required! Our tool works directly in your web browser on any device - desktop, mobile, or tablet.' },
                { q: 'Can I download private videos?', a: 'You can only download videos that you have permission to view on Facebook. Respect content creators\' rights and privacy.' },
                { q: 'Is it legal to download Facebook videos?', a: 'Downloading for personal use is generally acceptable. However, never redistribute or use content commercially without permission from the creator.' }
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
