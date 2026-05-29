# IndexNow Integration

This project uses IndexNow API to notify search engines (Bing, Yandex, etc.) about new or updated content for faster indexing.

## Setup

### 1. API Key Verification File

The API key verification file is already created at:
```
public/e1e8eb8b9ef7492b0c91668cf9efbfbc.txt
```

This file will be accessible at:
```
https://dlfb.io/e1e8eb8b9ef7492b0c91668cf9efbfbc.txt
```

### 2. API Endpoint

The IndexNow API endpoint is available at:
```
POST /api/indexnow
```

## Usage

### Automatic Submission (Recommended)

After each deployment, URLs are automatically submitted via the `postbuild` script:

```bash
npm run build  # Automatically runs indexnow after build
```

### Manual Submission

Submit all pages manually:

```bash
npm run indexnow
```

Or use the bash script:

```bash
./scripts/submit-indexnow.sh
```

### Submit Specific URLs

Use the API endpoint directly:

```bash
curl -X POST https://dlfb.io/api/indexnow \
  -H "Content-Type: application/json" \
  -d '{"urls": ["https://dlfb.io/", "https://dlfb.io/reels-downloader"]}'
```

Or submit a single URL:

```bash
curl -X POST https://dlfb.io/api/indexnow \
  -H "Content-Type: application/json" \
  -d '{"url": "https://dlfb.io/facebook-to-mp3"}'
```

## Verification

After deployment, verify the setup:

1. Check the key file is accessible:
   ```
   curl https://dlfb.io/e1e8eb8b9ef7492b0c91668cf9efbfbc.txt
   ```
   Should return: `e1e8eb8b9ef7492b0c91668cf9efbfbc`

2. Test the API endpoint:
   ```bash
   curl -X POST https://dlfb.io/api/indexnow \
     -H "Content-Type: application/json" \
     -d '{"url": "https://dlfb.io/"}'
   ```

3. Check Bing Webmaster Tools:
   - Go to https://www.bing.com/webmasters
   - Add your site if not already added
   - Check IndexNow submissions in the dashboard

## How It Works

1. **API Key**: A unique key (`e1e8eb8b9ef7492b0c91668cf9efbfbc`) identifies your site
2. **Verification File**: The key is placed in `public/` to prove ownership
3. **Submission**: URLs are sent to `api.indexnow.org` with the key
4. **Search Engines**: Bing, Yandex, and other IndexNow partners receive the notification

## Supported Search Engines

- Bing
- Yandex
- Seznam.cz
- Naver (via IndexNow protocol)

## Rate Limits

- Maximum 10,000 URLs per request
- No official rate limit, but avoid excessive submissions
- Submit only when content changes

## Troubleshooting

### Key file not accessible
Make sure the file is in `public/` directory and deployed correctly.

### API returns 403
The key file might not be accessible or the domain doesn't match.

### API returns 400
Check the URL format - must be absolute URLs starting with `https://dlfb.io`

## References

- [IndexNow Documentation](https://www.indexnow.org/documentation)
- [Bing IndexNow Guide](https://www.bing.com/indexnow/getstarted)

