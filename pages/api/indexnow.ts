import type { NextApiRequest, NextApiResponse } from 'next';

const INDEXNOW_KEY = 'e1e8eb8b9ef7492b0c91668cf9efbfbc';
const HOST = 'dlfb.io';

interface IndexNowResponse {
  success: boolean;
  message: string;
  submitted?: number;
}

/**
 * IndexNow API endpoint
 * Submits URLs to search engines for faster indexing
 * 
 * Usage:
 * POST /api/indexnow
 * Body: { urls: string[] } or { url: string }
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IndexNowResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }

  try {
    const { url, urls } = req.body;
    
    // Normalize to array
    const urlList: string[] = urls || (url ? [url] : []);
    
    if (!urlList.length || urlList.length > 10000) {
      return res.status(400).json({
        success: false,
        message: 'Please provide 1-10000 URLs'
      });
    }

    // Submit to IndexNow (Bing, Yandex, etc.)
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        host: HOST,
        key: INDEXNOW_KEY,
        keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
        urlList: urlList
      })
    });

    if (response.ok || response.status === 202) {
      return res.status(200).json({
        success: true,
        message: 'URLs submitted successfully',
        submitted: urlList.length
      });
    }

    return res.status(response.status).json({
      success: false,
      message: `IndexNow API error: ${response.status} ${response.statusText}`
    });

  } catch (error) {
    console.error('IndexNow submission error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to submit URLs'
    });
  }
}
