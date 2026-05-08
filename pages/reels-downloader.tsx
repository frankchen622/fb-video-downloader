import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

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
        <header className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              FB Video Downloader
            </Link>
            <nav className="hidden md:flex gap-6 text-sm text-gray-600">
              <Link href="/facebook-to-mp4" className="hover:text-blue-600 transition">FB to MP4</Link>
              <Link href="/facebook-to-mp3" className="hover:text-blue-600 transition">FB to MP3</Link>
              <Link href="/reels-downloader" className="text-blue-600 font-semibold">Reels</Link>
              <Link href="/private-video-downloader" className="hover:text-blue-600 transition">Private Videos</Link>
            </nav>
          </div>
        </header>

        <section className="container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Facebook Reels Downloader
            </h1>
            <p className="text-xl text-gray-600 mb-12">
              Download Facebook Reels in HD quality - save viral short videos instantly
            </p>

            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Paste Facebook Reels URL here..."
                  className="flex-1 px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition"
                  onKeyPress={(e) => e.key === 'Enter' && handleDownload()}
                />
                <button
                  onClick={handleDownload}
                  disabled={loading}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition disabled:opacity-50 whitespace-nowrap"
                >
                  {loading ? 'Downloading...' : 'Download Reel'}
                </button>
              </div>
              
              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                  {error}
                </div>
              )}

              <p className="mt-6 text-sm text-gray-500">
                ✓ HD quality  ✓ No watermark  ✓ Save viral content
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16 bg-white/50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Download Facebook Reels Easily</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {[
                { icon: '🔥', title: 'Save Viral Content', desc: 'Keep trending videos before they disappear' },
                { icon: '📱', title: 'Share Offline', desc: 'Watch reels without internet connection' },
                { icon: '🎬', title: 'Content Creation', desc: 'Use as inspiration for your own content' },
                { icon: '✨', title: 'No Watermark', desc: 'Clean downloads without logos' }
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
              <h3 className="text-2xl font-bold mb-6">How to Download Facebook Reels</h3>
              <div className="space-y-4">
                {[
                  'Open the Facebook Reel you want to download',
                  'Tap the share button and copy the link',
                  'Paste the link in our downloader above',
                  'Click "Download Reel" and save to your device'
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

            <div className="mt-12 grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold mb-4">Perfect For</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Content creators</li>
                  <li>• Social media managers</li>
                  <li>• Digital marketers</li>
                  <li>• Influencers</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold mb-4">Use Cases</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Save funny clips</li>
                  <li>• Archive viral content</li>
                  <li>• Analyze trends</li>
                  <li>• Offline viewing</li>
                </ul>
              </div>
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
