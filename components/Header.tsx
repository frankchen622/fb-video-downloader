import Link from 'next/link'
import Logo from './Logo'
import LanguageSwitcher from './LanguageSwitcher'
import { useTranslation } from '@/hooks/useTranslation'

export default function Header() {
  const { t } = useTranslation()
  
  return (
    <header className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex gap-6 text-sm text-gray-600">
            <Link href="/facebook-to-mp4" className="hover:text-blue-600 transition">{t('nav.toMp4')}</Link>
            <Link href="/facebook-to-mp3" className="hover:text-blue-600 transition">{t('nav.toMp3')}</Link>
            <Link href="/reels-downloader" className="hover:text-blue-600 transition">{t('nav.reels')}</Link>
            <Link href="/private-video-downloader" className="hover:text-blue-600 transition">{t('nav.privateVideos')}</Link>
          </nav>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  )
}
