import Link from 'next/link'
import { useTranslation } from '@/hooks/useTranslation'

export default function Footer() {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* About */}
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold mb-4">{t('footer.aboutTitle')}</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t('footer.aboutText')}
              </p>
              <p className="text-sm text-gray-500">
                {t('footer.aboutDescription')}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-4">{t('footer.quickLinksTitle')}</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-600 hover:text-blue-600 transition">
                    {t('footer.home')}
                  </Link>
                </li>
                <li>
                  <Link href="/facebook-to-mp4" className="text-gray-600 hover:text-blue-600 transition">
                    {t('footer.fbToMp4')}
                  </Link>
                </li>
                <li>
                  <Link href="/facebook-to-mp3" className="text-gray-600 hover:text-blue-600 transition">
                    {t('footer.fbToMp3')}
                  </Link>
                </li>
                <li>
                  <Link href="/reels-downloader" className="text-gray-600 hover:text-blue-600 transition">
                    {t('footer.reelsDownloader')}
                  </Link>
                </li>
                <li>
                  <Link href="/private-video-downloader" className="text-gray-600 hover:text-blue-600 transition">
                    {t('footer.privateVideos')}
                  </Link>
                </li>
                <li>
                  <a href="https://savefbs.com/" className="text-gray-600 hover:text-blue-600 transition" target="_blank" rel="noopener noreferrer">
                    {t('footer.facebookVideoDownloader')}
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-lg font-bold mb-4">{t('footer.legalTitle')}</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy-policy" className="text-gray-600 hover:text-blue-600 transition">
                    {t('footer.privacyPolicy')}
                  </Link>
                </li>
                <li>
                  <Link href="/terms-of-use" className="text-gray-600 hover:text-blue-600 transition">
                    {t('footer.termsOfUse')}
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-600 hover:text-blue-600 transition">
                    {t('footer.contactUs')}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
              <p>
                {t('footer.copyright').replace('{year}', String(currentYear))}
              </p>
              <p className="text-center md:text-right">
                <strong className="text-gray-700">{t('footer.disclaimer')}</strong> {t('footer.disclaimerText')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
