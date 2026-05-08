import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="relative">
        <span className="text-3xl font-black tracking-tight">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            dl
          </span>
          <span className="text-gray-900">fb</span>
        </span>
        <span className="text-sm font-semibold text-gray-500 ml-0.5">.io</span>
      </div>
      <div className="hidden md:block text-xs text-gray-500 border-l border-gray-300 pl-3 py-1">
        <div className="font-medium">Download Facebook</div>
        <div className="text-gray-400">Videos & Reels</div>
      </div>
    </Link>
  )
}
