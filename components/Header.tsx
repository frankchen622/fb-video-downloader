import Link from 'next/link'
import Logo from './Logo'
import LanguageSwitcher from './LanguageSwitcher'

export default function Header() {
  return (
    <header className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex gap-6 text-sm text-gray-600">
            <Link href="/facebook-to-mp4" className="hover:text-blue-600 transition">FB to MP4</Link>
            <Link href="/facebook-to-mp3" className="hover:text-blue-600 transition">FB to MP3</Link>
            <Link href="/reels-downloader" className="hover:text-blue-600 transition">Reels</Link>
            <Link href="/private-video-downloader" className="hover:text-blue-600 transition">Private Videos</Link>
          </nav>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  )
}
