import { useState } from 'react'
import Head from 'next/head'

export default function Home() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [videoData, setVideoData] = useState<any>(null)

  const handleDownload = async () => {
    if (!url.trim()) {
      setError('请输入 Facebook 视频链接')
      return
    }

    setLoading(true)
    setError('')
    setVideoData(null)

    try {
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || '下载失败')
      }

      setVideoData(data)
    } catch (err: any) {
      setError(err.message || '发生错误，请重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Facebook Video Downloader - 免费下载 FB 视频</title>
        <meta name="description" content="免费下载 Facebook 视频，支持高清画质" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold text-gray-800 mb-4">
                📹 Facebook Video Downloader
              </h1>
              <p className="text-gray-600 text-lg">
                免费下载 Facebook 视频，支持高清画质
              </p>
            </div>

            {/* Input Section */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                  粘贴 Facebook 视频链接
                </label>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://www.facebook.com/..."
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition"
                  disabled={loading}
                />
              </div>

              <button
                onClick={handleDownload}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? '正在获取视频...' : '获取下载链接'}
              </button>

              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  ⚠️ {error}
                </div>
              )}
            </div>

            {/* Video Result */}
            {videoData && (
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  ✅ 视频已准备好
                </h2>
                
                {videoData.title && (
                  <p className="text-gray-700 mb-4 font-medium">
                    {videoData.title}
                  </p>
                )}

                <div className="space-y-3">
                  {videoData.formats?.map((format: any, index: number) => (
                    <a
                      key={index}
                      href={format.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-lg transition text-center"
                    >
                      📥 下载 {format.quality || '视频'}
                      {format.filesize && ` (${(format.filesize / 1024 / 1024).toFixed(1)} MB)`}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Instructions */}
            <div className="mt-12 bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                📖 使用说明
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>打开 Facebook，找到你想下载的视频</li>
                <li>复制视频链接（点击分享 → 复制链接）</li>
                <li>粘贴到上方输入框，点击"获取下载链接"</li>
                <li>选择画质，点击下载按钮即可保存</li>
              </ol>
            </div>

            {/* Disclaimer */}
            <div className="mt-8 text-center text-gray-500 text-sm">
              <p>⚠️ 免责声明：请尊重版权，仅下载您有权使用的内容</p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

