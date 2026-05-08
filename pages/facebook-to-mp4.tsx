import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

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
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              FB Video Downloader
            </Link>
            <nav className="hidden md:flex gap-6 text-sm text-gray-600">
              <Link href="/facebook-to-mp4" className="text-blue-600 font-semibold">FB to MP4</Link>
              <Link href="/facebook-to-mp3" className="hover:text-blue-600 transition">FB to MP3</Link>
              <Link href="/reels-downloader" className="hover:text-blue-600 transition">Reels</Link>
              <Link href="/private-video-downloader" className="hover:text-blue-600 transition">Private Videos</Link>
            </nav>
          </div>
        </header>

        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Facebook to MP4 Converter
            </h1>
            <p className="text-xl text-gray-600 mb-12">
              Download Facebook videos in MP4 format - the most compatible video format for all devices
            </p>

            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
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
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition disabled:opacity-50"
                >
                  {loading ? 'Converting...' : 'Convert to MP4'}
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
            <h2>Why Download Facebook Videos as MP4?</h2>
            <p>
              MP4 is the most widely supported video format across all devices and platforms. When you convert Facebook videos to MP4, you ensure maximum compatibility with smartphones, tablets, computers, smart TVs, and media players.
            </p>

            <h3>Benefits of MP4 Format</h3>
            <ul>
              <li><strong>Universal Compatibility:</strong> Works on iPhone, Android, Windows, Mac, and Linux</li>
              <li><strong>High Quality:</strong> Maintains excellent video quality with efficient compression</li>
              <li><strong>Small File Size:</strong> Optimized compression saves storage space</li>
              <li><strong>Easy Sharing:</strong> Compatible with all social media platforms and messaging apps</li>
            </ul>

            <h3>How to Convert Facebook Video to MP4</h3>
            <ol>
              <li>Copy the Facebook video URL from your browser</li>
              <li>Paste it into the converter above</li>
              <li>Click "Convert to MP4" and download your video</li>
            </ol>
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
