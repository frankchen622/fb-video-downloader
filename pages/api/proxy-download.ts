import type { NextApiRequest, NextApiResponse } from 'next'
import https from 'https'
import http from 'http'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { url, filename } = req.query

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'Missing video URL' })
  }

  try {
    // 设置响应头，让浏览器下载文件
    const downloadFilename = (filename as string) || 'video.mp4'
    res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(downloadFilename)}"`)
    res.setHeader('Content-Type', 'video/mp4')

    // 根据 URL 协议选择 http 或 https
    const protocol = url.startsWith('https') ? https : http

    // 代理请求到 Facebook 视频服务器
    protocol.get(url, (videoResponse) => {
      // 转发响应头
      if (videoResponse.headers['content-length']) {
        res.setHeader('Content-Length', videoResponse.headers['content-length'])
      }

      // 将视频流传输到客户端
      videoResponse.pipe(res)
    }).on('error', (error) => {
      console.error('[proxy] Error:', error)
      res.status(500).json({ error: 'Failed to download video' })
    })

  } catch (error: any) {
    console.error('[proxy] Error:', error)
    return res.status(500).json({ error: 'Failed to proxy video download' })
  }
}

// 禁用 Next.js 的 body parser，因为我们要处理流
export const config = {
  api: {
    responseLimit: false,
  },
}
