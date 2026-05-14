import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

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
        body: JSON.stringify({ url, type: 'private' })
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
        <meta name="description" content="Download private Facebook videos you have permission to view. Save videos from private groups, friends-only posts, and restricted content." />
        <meta name="keywords" content="private facebook video downloader, download private fb video, facebook group video download, friends only video" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header />

        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Private Video Downloader
            </h1>
            <p className="text-lg text-gray-600 mb-10">
              Download private FB videos • Groups • Friends-only posts
            </p>

            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-100">
              <div className="flex flex-col md:flex-row gap-3">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Paste private Facebook video URL..."
                  className="flex-1 px-5 py-3.5 text-base border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
                  onKeyPress={(e) => e.key === 'Enter' && handleDownload()}
                />
                <button
                  onClick={handleDownload}
                  disabled={loading}
                  className="px-7 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition disabled:opacity-50 whitespace-nowrap"
                >
                  {loading ? '⏳ Downloading...' : '🔒 Download Video'}
                </button>
              </div>
              
              {error && (
                <div className="mt-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-600 text-sm">
                  {error}
                </div>
              )}

              <p className="mt-5 text-xs text-gray-500 text-center">
                Requires viewing permission • Respects privacy settings
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">How to Download Private Videos</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { num: '1', title: 'Login', desc: 'Be logged into Facebook' },
                { num: '2', title: 'Copy Link', desc: 'Copy the private video URL' },
                { num: '3', title: 'Download', desc: 'Paste and download' }
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
          <div className="max-w-6xl mx-auto">
            {/* Feature 1: Facebook Private Video Downloading */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <div className="order-2 md:order-1">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                  <div className="aspect-video rounded-xl overflow-hidden">
                    <Image 
                      src="/images/private/private-downloading.png" 
                      alt="Facebook Private Video Downloading"
                      width={1376}
                      height={768}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <h3 className="text-3xl font-bold mb-4">Facebook Private Video Downloading</h3>
                <p className="text-lg text-gray-600 mb-6">
                  Download videos from private Facebook groups, friends-only posts, and restricted content you have permission to access. Save memories and important content securely.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Access private group videos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Download friends-only posts</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Save restricted content you can view</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Feature 2: High Quality */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <div>
                <h3 className="text-3xl font-bold mb-4">High Quality</h3>
                <p className="text-lg text-gray-600 mb-6">
                  Preserve the original quality of private videos. Download in full HD with crisp visuals and clear audio—no compression, no quality loss.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Up to 1080p HD resolution</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Original audio quality preserved</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Maintains source video quality</span>
                  </li>
                </ul>
              </div>
              <div>
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                  <div className="aspect-video rounded-xl overflow-hidden">
                    <Image 
                      src="/images/private/high-quality.png" 
                      alt="High Quality"
                      width={1376}
                      height={768}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 3: Secure & Private */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <div className="order-2 md:order-1">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                  <div className="aspect-video rounded-xl overflow-hidden">
                    <Image 
                      src="/images/private/secure-private.png" 
                      alt="Secure & Private"
                      width={1376}
                      height={768}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <h3 className="text-3xl font-bold mb-4">Secure & Private</h3>
                <p className="text-lg text-gray-600 mb-6">
                  Your login credentials and personal data are never stored or shared. We use secure connections to protect your privacy while downloading private content.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">End-to-end encrypted connections</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">No data storage or tracking</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Your credentials stay with Facebook</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Feature 4: Anonymous Downloading */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-4">Anonymous Downloading</h3>
                <p className="text-lg text-gray-600 mb-6">
                  Download privately without leaving traces. The video owner won't be notified, and your download activity remains completely anonymous.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">No download notifications sent</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Owner won't know you downloaded</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Completely discreet downloading</span>
                  </li>
                </ul>
              </div>
              <div>
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                  <div className="aspect-video rounded-xl overflow-hidden">
                    <Image 
                      src="/images/private/anonymous-downloading.png" 
                      alt="Anonymous Downloading"
                      width={1376}
                      height={768}
                      className="w-full h-full object-cover"
                    />
                  </div>
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
                { q: 'How to download private Facebook videos?', a: 'Using our facebook private video downloader is easy: 1) Make sure you can view the video on Facebook, 2) Copy the video URL, 3) Paste it into our downloader, 4) Click download. Our private video downloader for facebook works with all private content you have access to.' },
                { q: 'Can I download a private Facebook video?', a: 'Yes! You can download a private facebook video if you have viewing permission. Our facebook private video downloading tool respects privacy settings and only works with content you\'re authorized to view.' },
                { q: 'Do I need to be logged into Facebook?', a: 'Yes, you must be logged into Facebook to download facebook video private content. Our downloader facebook private video tool requires your viewing permission to access private content.' },
                { q: 'Will the video owner know I downloaded it?', a: 'No! Our facebook private video downloader provides completely anonymous downloading. The video owner won\'t be notified when you download private facebook videos.' },
                { q: 'Can I download videos from private groups?', a: 'Yes! If you\'re a member of the private group, you can download video facebook private content. Our private video fb downloader works with all private group videos you can view.' },
                { q: 'Does it work on mobile phones?', a: 'Yes! You can download private facebook videos mobile on both iPhone and Android. Our fb private video downloader works directly in your mobile browser without any app.' },
                { q: 'Can I download private Facebook videos on Android?', a: 'Absolutely! Our download private facebook video android tool works perfectly on all Android devices. Just use your mobile browser to access our facebook private video downloader.' },
                { q: 'Is this private video downloader free?', a: 'Completely free! Our facebook private video downloader has no hidden costs. Download private facebook content as many times as you want without paying.' },
                { q: 'Can I download private Facebook Reels?', a: 'Yes! Our tool supports facebook reels download private and facebook private reels download. If you can view the private Reel, you can download it using our fb private reel downloader.' },
                { q: 'Can I download private Facebook Stories?', a: 'Yes! Our tool supports facebook story download private content. Use our facebook private story downloader to save Stories from friends and groups you have access to.' },
                { q: 'Will there be a watermark on downloaded videos?', a: 'No watermarks! Our facebook private video download without watermark feature ensures clean downloads. You get the original video exactly as it appears on Facebook.' },
                { q: 'What quality are downloaded private videos?', a: 'Our facebook private video downloader preserves original HD quality. When you download facebook video private content, you get the same quality as on Facebook - up to 1080p.' },
                { q: 'How to find the private video URL?', a: 'Open the private video on Facebook, right-click (or tap share), and copy the link. Then paste it into our facebook private video downloader to start downloading.' },
                { q: 'Can I download private videos without an app?', a: 'Yes! No app needed. Our web-based facebook private video downloader works directly in your browser. Just visit our site for instant private video downloading.' },
                { q: 'Is it safe to use this downloader?', a: 'Completely safe! Our fb private video downloader doesn\'t store your credentials or personal data. We use secure encrypted connections for all facebook private video downloading.' },
                { q: 'Can I download private videos from Facebook pages?', a: 'Yes, if the page has restricted content you can access. Our download facebook private tool works with any private content you have permission to view.' },
                { q: 'What if the download fails?', a: 'Make sure you\'re logged into Facebook and have permission to view the video. Try refreshing the page and copying the URL again. Our facebook private video downloader works 99% of the time.' },
                { q: 'Can I download multiple private videos?', a: 'Yes! Use our facebook private video downloader repeatedly for multiple videos. There are no daily limits on how many private videos you can download.' },
                { q: 'Does it work with Facebook Lite?', a: 'Yes! Our private video downloader for facebook works with Facebook Lite too. Copy the video link from Facebook Lite and paste it into our downloader.' },
                { q: 'Can I download private videos in HD?', a: 'Yes! Our facebook private video downloader preserves full HD quality. Download video facebook private content in the highest available resolution.' },
                { q: 'How fast is the download?', a: 'Very fast! Our facebook private video downloading service typically completes in 10-30 seconds depending on video length and your internet speed.' },
                { q: 'Do I need to install any software?', a: 'No installation required! Our web-based facebook private video downloader works entirely in your browser. No extensions, plugins, or apps needed for fb private video download.' },
                { q: 'Can I download private videos on iPhone?', a: 'Yes! Our facebook private video downloader works on iPhone Safari. Download private facebook videos directly to your device without any app.' },
                { q: 'Is there a file size limit?', a: 'No file size limits! Our facebook private video downloader handles videos of any length. Download short clips or long videos from private facebook content.' },
                { q: 'Can I download private live videos?', a: 'Yes, if the live video has ended and is saved as a replay. Our facebook private video downloading tool works with saved live streams you have access to.' },
                { q: 'What format are downloaded videos?', a: 'Downloaded private videos are in MP4 format, compatible with all devices. Our download facebook video private service provides universal MP4 files.' },
                { q: 'Can I share downloaded private videos?', a: 'The video is saved to your device after using our facebook private video downloader. Always respect the original creator\'s privacy and copyright when sharing.' },
                { q: 'Does it work on Windows PC?', a: 'Yes! Our facebook private video downloader works on Windows, Mac, and Linux. Use any browser on your computer for fb private video download.' },
                { q: 'How is this different from public video downloaders?', a: 'Our facebook private video downloader specifically handles restricted content that requires viewing permission. Regular downloaders can\'t access private facebook video content.' },
                { q: 'Can I download private videos from closed groups?', a: 'Yes! If you\'re a member of the closed group, our private video downloader for facebook can download any video you can view in that group.' }
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
