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

        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Facebook Reels Downloader
            </h1>
            <p className="text-xl text-gray-600 mb-12">
              Download Facebook Reels in HD quality - save viral short videos instantly
            </p>

            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
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
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition disabled:opacity-50"
                >
                  {loading ? 'Downloading...' : 'Download Reel'}
                </button>
              </div>
              
              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                  {error}
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h2>Download Facebook Reels Easily</h2>
            <p>
              Facebook Reels are short, entertaining videos that deserve to be saved and shared. Our downloader makes it easy to save your favorite reels in high quality without any watermarks.
            </p>

            <h3>Why Download Facebook Reels?</h3>
            <ul>
              <li><strong>Save Viral Content:</strong> Keep trending videos before they disappear</li>
              <li><strong>Share Offline:</strong> Watch reels without internet connection</li>
              <li><strong>Content Creation:</strong> Use as inspiration or reference for your own content</li>
              <li><strong>No Watermark:</strong> Clean downloads without logos or branding</li>
            </ul>

            <h3>How to Download Facebook Reels</h3>
            <ol>
              <li>Open the Facebook Reel you want to download</li>
              <li>Tap the share button and copy the link</li>
              <li>Paste the link in our downloader above</li>
              <li>Click "Download Reel" and save to your device</li>
            </ol>

            <h3>Perfect For</h3>
            <ul>
              <li>Content creators looking for inspiration</li>
              <li>Social media managers curating content</li>
              <li>Anyone who wants to save funny or entertaining reels</li>
              <li>Marketers analyzing trending content</li>
            </ul>
          </div>
        </section>

        <footer className="container mx-auto px-4 py-12 border-t border-gray-200">
          <div className="max-w-6xl mx-auto text-center text-gray-600">
            <div className="flex flex-wrap justify-center gap-6 mb-6">
              <Link href="/" className="hover:text-blue-600">Home</Link>
              <Link href="/facebook-to-mp4" className="hover:text-blue-600">FB to MP4</Link>
              <Link href="/facebook-to-mp3" className="hover:text-blue-600">FB to MP3</Link>
              <Link href="/reels-downloader" className="hover:text-blue-600">Reels Downloader</Link>
              <Link href="/private-video-downloader" className="hover:text-blue-600">Private Videos</Link>
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
