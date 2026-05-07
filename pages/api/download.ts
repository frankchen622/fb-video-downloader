import type { NextApiRequest, NextApiResponse } from 'next'

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
    // 使用 RapidAPI 的 Social Media Downloader
    const rapidApiKey = process.env.RAPIDAPI_KEY || ''
    
    if (!rapidApiKey) {
      // 如果没有配置 API Key，返回友好提示
      return res.status(500).json({ 
        error: '服务未配置，请联系管理员添加 RAPIDAPI_KEY 环境变量' 
      })
    }

    const response = await fetch('https://social-media-video-downloader.p.rapidapi.com/smvd/get/all', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': rapidApiKey,
        'X-RapidAPI-Host': 'social-media-video-downloader.p.rapidapi.com'
      },
      body: JSON.stringify({ url })
    })

    if (!response.ok) {
      throw new Error('API 请求失败')
    }

    const data = await response.json()

    // 解析 API 返回的数据
    const formats: VideoFormat[] = []
    
    if (data.links && Array.isArray(data.links)) {
      data.links.forEach((link: any) => {
        if (link.link) {
          formats.push({
            url: link.link,
            quality: link.quality || link.type || '默认画质',
            filesize: link.size || undefined
          })
        }
      })
    }

    // 如果 API 返回的格式不同，尝试其他字段
    if (formats.length === 0 && data.url) {
      formats.push({
        url: data.url,
        quality: '默认画质'
      })
    }

    return res.status(200).json({
      title: data.title || data.meta?.title || '未知标题',
      thumbnail: data.thumbnail || data.picture,
      formats
    })

  } catch (error: any) {
    console.error('Download error:', error)
    
    return res.status(500).json({ 
      error: '无法下载视频，请检查链接是否正确或稍后重试' 
    })
  }
}
