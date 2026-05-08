import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function PrivateVideoDownloader() {
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
        body: JSON.stringify({ url, private: true })
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
        <title>Private Facebook Video Downloader - Download Private FB Videos</title>
        <meta name="description" content="Download private Facebook videos that you have access to. Secure and easy way to save private videos from friends and groups. Respects privacy settings." />
        <meta name="keywords" content="private facebook video downloader, download private fb video, facebook private video, save private videos" />
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
              <Link href="/reels-downloader" className="hover:text-blue-600 transition">Reels</Link>
              <Link href="/private-video-downloader" className="text-blue-600 font-semibold">Private Videos</Link>
            </nav>
          </div>
        </header>

        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Private Facebook Video Downloader
            </h1>
            <p className="text-xl text-gray-600 mb-12">
              Download private Facebook videos that you have permission to view
            </p>

            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-left">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> You can only download private videos that you have access to on Facebook. Make sure you're logged into Facebook and have permission to view the video.
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Paste private Facebook video URL here..."
                  className="flex-1 px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition"
                  onKeyPress={(e) => e.key === 'Enter' && handleDownload()}
                />
                <button
                  onClick={handleDownload}
                  disabled={loading}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition disabled:opacity-50"
                >
                  {loading ? 'Processing...' : 'Download'}
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
            <h2>Download Private Facebook Videos Securely</h2>
            <p>
              Our private video downloader allows you to save videos from your friends, closed groups, or private pages - as long as you have permission to view them on Facebook.
            </p>

            <h3>How It Works</h3>
            <ol>
              <li>Make sure you're logged into Facebook and can view the private video</li>
              <li>Copy the video URL from your browser's address bar</li>
              <li>Paste the URL in our downloader above</li>
              <li>Click download and save the video to your device</li>
            </ol>

            <h3>Privacy & Security</h3>
            <ul>
              <li><strong>Respects Privacy:</strong> Only works for videos you have access to</li>
              <li><strong>Secure Process:</strong> Your login credentials are never stored</li>
              <li><strong>No Data Collection:</strong> We don't save or share your information</li>
              <li><strong>Direct Download:</strong> Videos are downloaded directly to your device</li>
            </ul>

            <h3>Important Guidelines</h3>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p className="font-semibold">Please respect content creators' rights:</p>
              <ul>
                <li>Only download videos you have permission to access</li>
                <li>Don't share private videos publicly without consent</li>
                <li>Respect copyright and intellectual property rights</li>
                <li>Use downloaded content responsibly and ethically</li>
              </ul>
            </div>

            <h3>Common Use Cases</h3>
            <ul>
              <li>Saving family videos from private groups</li>
              <li>Archiving memories from friends' profiles</li>
              <li>Downloading educational content from closed groups</li>
              <li>Backing up your own private videos</li>
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
