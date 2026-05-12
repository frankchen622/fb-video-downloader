import type { NextApiRequest, NextApiResponse } from 'next'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

type HealthData = {
  status: 'ok' | 'error'
  ytdlp?: {
    installed: boolean
    version?: string
  }
  error?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HealthData>
) {
  try {
    // 检查 yt-dlp 是否安装
    const { stdout } = await execAsync('yt-dlp --version', { timeout: 5000 })
    const version = stdout.trim()

    return res.status(200).json({
      status: 'ok',
      ytdlp: {
        installed: true,
        version,
      },
    })
  } catch (error: any) {
    return res.status(500).json({
      status: 'error',
      ytdlp: {
        installed: false,
      },
      error: error.message || 'yt-dlp not found',
    })
  }
}
