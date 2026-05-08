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
        <meta name="description" content="Download Facebook videos, Reels & Stories in HD quality for free. Fast FB video downloader with no watermark, no ads. Save Facebook videos to MP4/MP3. Works on all devices." />
        <meta name="keywords" content="facebook video downloader, download facebook video, fb video downloader, facebook to mp4, facebook reels download, download fb video, save facebook video, facebook video download online, fb downloader, facebook video download hd, private facebook video downloader, facebook to mp3, download reels facebook, save fb video, facebook story download, free facebook video downloader, no watermark" />
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
                in Seconds - Completely Free
              </span>
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Save any Facebook video, reel, or story to your device in just three simple steps. No registration, no software installation, no watermarks. Download FB videos in HD quality (1080p) to MP4 or extract audio to MP3. Works on iPhone, Android, Windows, and Mac.
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
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Complete Solution for Facebook Content
            </h3>
            <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              dlfb.io is the best free Facebook video downloader for saving videos, reels, photos, and stories in high quality. Download FB videos online without watermark, no registration required. Works on all devices.
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

        {/* Supported Formats & Devices */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-5xl mx-auto">
            <h3 className="text-3xl font-bold text-center mb-12">Supported Formats & Devices</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Formats */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 text-center">
                <div className="mb-6">
                  <div className="inline-block p-4 bg-white rounded-full shadow-lg mb-4">
                    <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">Video Formats</h4>
                </div>
                <ul className="space-y-3 inline-block text-left">
                  {['MP4 (1080p, 720p, 480p, 360p)', 'MP3 Audio (320kbps)', 'Facebook Reels', 'Facebook Stories'].map((format, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{format}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Devices */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 text-center">
                <div className="mb-6">
                  <div className="inline-block p-4 bg-white rounded-full shadow-lg mb-4">
                    <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">All Devices</h4>
                </div>
                <ul className="space-y-3 inline-block text-left">
                  {['iPhone & iPad (iOS)', 'Android Phones & Tablets', 'Windows PC & Laptop', 'Mac & MacBook'].map((device, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{device}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SEO Content Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100">
              <h3 className="text-3xl font-bold mb-6 text-gray-900">
                The Best Free Facebook Video Downloader Online
              </h3>
              
              <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
                <p>
                  <strong>dlfb.io</strong> is the most reliable and fastest <strong>Facebook video downloader</strong> that lets you <strong>download Facebook videos</strong> in HD quality without any watermarks. Whether you want to <strong>save Facebook videos</strong>, <strong>download FB reels</strong>, or <strong>extract audio to MP3</strong>, our free online tool makes it incredibly easy.
                </p>
                
                <h4 className="text-2xl font-bold mt-8 mb-4">Download Facebook Videos in Any Format</h4>
                <p>
                  Our <strong>FB video downloader</strong> supports multiple formats and quality options. <strong>Download videos from Facebook</strong> in MP4 format with resolutions up to 1080p HD. Need just the audio? Use our <strong>Facebook to MP3</strong> converter to extract high-quality audio (320kbps) from any video. You can also <strong>download Facebook Reels</strong>, Stories, and even <strong>private Facebook videos</strong> (if you have access).
                </p>
                
                <h4 className="text-2xl font-bold mt-8 mb-4">Works on All Devices - No App Required</h4>
                <p>
                  Unlike other <strong>Facebook video downloader apps</strong>, dlfb.io works directly in your browser. No need to install software or download apps. Simply paste the <strong>Facebook video link</strong> and download instantly on your iPhone, Android, Windows PC, or Mac. Our <strong>online Facebook video downloader</strong> is optimized for all devices and browsers.
                </p>
                
                <h4 className="text-2xl font-bold mt-8 mb-4">Fast, Free, and No Watermarks</h4>
                <p>
                  Experience lightning-fast downloads with our optimized servers. <strong>Download FB videos</strong> in seconds without any annoying watermarks or logos. Our service is completely <strong>free</strong> with unlimited downloads - no registration, no hidden fees, no premium plans. Just pure, clean video downloads.
                </p>
                
                <h4 className="text-2xl font-bold mt-8 mb-4">Safe and Private</h4>
                <p>
                  Your privacy matters. We don't store your videos, track your downloads, or collect personal information. <strong>Save Facebook videos</strong> securely and anonymously. Our <strong>Facebook downloader</strong> is 100% safe and respects your privacy.
                </p>
                
                <div className="mt-8 p-6 bg-blue-50 rounded-xl border-l-4 border-blue-600">
                  <p className="text-lg font-semibold text-blue-900 mb-2">
                    Popular Searches:
                  </p>
                  <p className="text-sm text-blue-800 leading-relaxed">
                    facebook video downloader • download facebook video • fb video downloader • facebook to mp4 • facebook reels download • download fb video • save facebook video • facebook video download online • fb downloader • facebook video download hd • download reels facebook • save fb video • facebook story download • free facebook video downloader • fbdown • fdownloader • downloadfacebook
                  </p>
                </div>
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
