import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* About */}
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold mb-4">About dlfb.io</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                dlfb.io is a free online tool to download Facebook videos, reels, and convert them to MP4 or MP3 format. Fast, secure, and easy to use on any device. No registration required.
              </p>
              <p className="text-sm text-gray-500">
                Perfect for content creators, social media managers, digital marketers, and anyone who wants to save Facebook videos for offline viewing.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-600 hover:text-blue-600 transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/facebook-to-mp4" className="text-gray-600 hover:text-blue-600 transition">
                    FB to MP4
                  </Link>
                </li>
                <li>
                  <Link href="/facebook-to-mp3" className="text-gray-600 hover:text-blue-600 transition">
                    FB to MP3
                  </Link>
                </li>
                <li>
                  <Link href="/reels-downloader" className="text-gray-600 hover:text-blue-600 transition">
                    Reels Downloader
                  </Link>
                </li>
                <li>
                  <Link href="/private-video-downloader" className="text-gray-600 hover:text-blue-600 transition">
                    Private Videos
                  </Link>
                </li>
                <li>
                  <a href="https://savefbs.com/" className="text-gray-600 hover:text-blue-600 transition" target="_blank" rel="noopener noreferrer">
                    Facebook Video Downloader
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-lg font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy-policy" className="text-gray-600 hover:text-blue-600 transition">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms-of-use" className="text-gray-600 hover:text-blue-600 transition">
                    Terms of Use
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-600 hover:text-blue-600 transition">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
              <p>
                © {new Date().getFullYear()} dlfb.io. All rights reserved.
              </p>
              <p className="text-center md:text-right">
                <strong className="text-gray-700">Disclaimer:</strong> We are not affiliated with Facebook or Meta. All trademarks belong to their respective owners.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
