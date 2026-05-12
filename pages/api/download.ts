import type { NextApiRequest, NextApiResponse } from 'next'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

type VideoFormat = {
  url: string
  quality: string
  filesize?: number
}

type ResponseData = {
  title?: string
  thumbnail?: string
  formats?: VideoFormat[]
  error?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { url } = req.body

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: '请提供有效的视频链接' })
  }

  // 验证是否为 Facebook 链接
  if (!url.includes('facebook.com') && !url.includes('fb.watch')) {
    return res.status(400).json({ error: '请提供有效的 Facebook 视频链接' })
  }

  try {
    // 使用 yt-dlp 获取视频信息
    const command = `yt-dlp -j --no-warnings --no-check-certificates "${url}"`
    
    console.log(`[yt-dlp] Fetching: ${url}`)
    
    const { stdout, stderr } = await execAsync(command, {
      timeout: 30000, // 30秒超时
    })

    if (stderr && !stdout) {
      console.error(`[yt-dlp] stderr: ${stderr}`)
      throw new Error('无法获取视频信息')
    }
    
    console.log(`[yt-dlp] Success: ${url}`)

    const videoInfo = JSON.parse(stdout)
    
    // 提取可用的视频格式
    const formats: VideoFormat[] = []
    
    if (videoInfo.formats) {
      // 筛选出有视频流的格式
      const videoFormats = videoInfo.formats.filter(
        (f: any) => f.vcodec !== 'none' && f.url
      )

      // 按分辨率排序，取最好的几个
      const sortedFormats = videoFormats
        .sort((a: any, b: any) => (b.height || 0) - (a.height || 0))
        .slice(0, 3)

      sortedFormats.forEach((format: any) => {
        formats.push({
          url: format.url,
          quality: format.height 
            ? `${format.height}p (${format.ext})` 
            : `${format.ext}`,
          filesize: format.filesize || undefined,
        })
      })
    }

    // 如果没有找到格式，使用默认 URL
    if (formats.length === 0 && videoInfo.url) {
      formats.push({
        url: videoInfo.url,
        quality: '默认画质',
      })
    }

    return res.status(200).json({
      title: videoInfo.title || '未知标题',
      thumbnail: videoInfo.thumbnail,
      formats,
    })

  } catch (error: any) {
    console.error('[yt-dlp] Error:', error.message)
    console.error('[yt-dlp] Full error:', error)
    
    if (error.message?.includes('timeout')) {
      return res.status(408).json({ error: '请求超时，请重试' })
    }
    
    // 检查是否是 yt-dlp 版本问题
    if (error.message?.includes('Cannot parse data')) {
      return res.status(500).json({ 
        error: 'yt-dlp 需要更新，请联系管理员' 
      })
    }
    
    return res.status(500).json({ 
      error: '无法下载视频，请检查链接是否正确或稍后重试' 
    })
  }
}

