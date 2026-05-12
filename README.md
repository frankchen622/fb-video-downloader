# Facebook Video Downloader

一个基于 Next.js 的 Facebook 视频下载工具，使用 yt-dlp 提取视频。

## 功能特性

- ✅ 支持 Facebook 视频、Reels、Stories
- ✅ 多种画质选择（1080p、720p、480p、360p）
- ✅ 无水印下载
- ✅ 自动更新 yt-dlp

## 部署到 Railway

### 1. 推送代码到 GitHub

```bash
git add .
git commit -m "Add auto yt-dlp update"
git push
```

### 2. 在 Railway 中部署

1. 访问 [railway.app](https://railway.app)
2. 点击 "New Project" → "Deploy from GitHub repo"
3. 选择你的仓库
4. Railway 会自动检测 Next.js 项目并部署

### 3. 环境变量（可选）

无需额外配置，`postinstall` 脚本会自动安装 yt-dlp。

### 4. 验证部署

访问 `https://your-app.railway.app/api/health` 检查 yt-dlp 是否正常：

```json
{
  "status": "ok",
  "ytdlp": {
    "installed": true,
    "version": "2024.12.06"
  }
}
```

## 本地开发

### 安装依赖

```bash
npm install
```

### 安装 yt-dlp

```bash
# macOS
brew install yt-dlp

# Ubuntu/Debian
sudo apt install yt-dlp

# 或使用 pip
pip3 install -U yt-dlp
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

## API 端点

### POST /api/download

下载 Facebook 视频信息

**请求：**
```json
{
  "url": "https://www.facebook.com/watch?v=123456789"
}
```

**响应：**
```json
{
  "title": "视频标题",
  "thumbnail": "https://...",
  "formats": [
    {
      "url": "https://...",
      "quality": "1080p (mp4)",
      "filesize": 12345678
    }
  ]
}
```

### GET /api/health

健康检查

**响应：**
```json
{
  "status": "ok",
  "ytdlp": {
    "installed": true,
    "version": "2024.12.06"
  }
}
```

## 故障排查

### yt-dlp 版本过旧

如果遇到 "Cannot parse data" 错误，说明 yt-dlp 需要更新：

```bash
# 手动更新
pip3 install -U yt-dlp

# 或重新部署（会自动更新）
git commit --allow-empty -m "Trigger redeploy"
git push
```

### Railway 部署失败

检查构建日志，确保：
1. `scripts/install-yt-dlp.sh` 有执行权限
2. Railway 环境有 pip 或 apt-get

## 技术栈

- **前端：** Next.js 15 + React 19 + TailwindCSS
- **后端：** Next.js API Routes
- **视频提取：** yt-dlp
- **部署：** Railway

## License

MIT
