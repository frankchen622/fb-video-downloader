import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Logo from '@/components/Logo'

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
            <Logo />
            <nav className="hidden md:flex gap-6 text-sm text-gray-600">
              <Link href="/facebook-to-mp4" className="hover:text-blue-600 transition">FB to MP4</Link>
              <Link href="/facebook-to-mp3" className="hover:text-blue-600 transition">FB to MP3</Link>
              <Link href="/reels-downloader" className="hover:text-blue-600 transition">Reels</Link>
              <Link href="/private-video-downloader" className="text-blue-600 font-semibold">Private Videos</Link>
            </nav>
          </div>
        </header>

        <section className="container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Private Facebook Video Downloader
            </h1>
            <p className="text-xl text-gray-600 mb-12">
              Download private Facebook videos that you have permission to view
            </p>

            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
              <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded text-left">
                <p className="text-sm text-blue-800">
                  <strong>📌 Note:</strong> You can only download private videos that you have access to on Facebook. Make sure you're logged into Facebook and have permission to view the video.
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
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition disabled:opacity-50 whitespace-nowrap"
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
                ✓ Secure process  ✓ Privacy respected  ✓ No data stored
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16 bg-white/50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Download Private Facebook Videos Securely</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {[
                { icon: '🔒', title: 'Respects Privacy', desc: 'Only works for videos you have access to' },
                { icon: '🛡️', title: 'Secure Process', desc: 'Your login credentials are never stored' },
                { icon: '🚫', title: 'No Data Collection', desc: 'We don\'t save or share your information' },
                { icon: '⚡', title: 'Direct Download', desc: 'Videos downloaded directly to your device' }
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

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 md:p-12 mb-12">
              <h3 className="text-2xl font-bold mb-6">How It Works</h3>
              <div className="space-y-4">
                {[
                  'Make sure you\'re logged into Facebook and can view the private video',
                  'Copy the video URL from your browser\'s address bar',
                  'Paste the URL in our downloader above',
                  'Click download and save the video to your device'
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

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-3 text-yellow-900">⚠️ Important Guidelines</h3>
              <p className="text-yellow-800 mb-3">Please respect content creators' rights:</p>
              <ul className="space-y-2 text-yellow-800">
                <li>• Only download videos you have permission to access</li>
                <li>• Don't share private videos publicly without consent</li>
                <li>• Respect copyright and intellectual property rights</li>
                <li>• Use downloaded content responsibly and ethically</li>
              </ul>
            </div>

            <div className="mt-12 grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold mb-4">Common Use Cases</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Family videos from private groups</li>
                  <li>• Memories from friends' profiles</li>
                  <li>• Educational content</li>
                  <li>• Backing up your own videos</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold mb-4">Privacy Features</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• No login credentials stored</li>
                  <li>• Direct device download</li>
                  <li>• No tracking or analytics</li>
                  <li>• Secure HTTPS connection</li>
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
