# Facebook Video Downloader

一个简洁高效的 Facebook 视频下载工具，基于 Next.js + yt-dlp 构建。

## 功能特性

- ✅ 支持 Facebook 视频下载
- ✅ 多画质选择（自动检测可用格式）
- ✅ 简洁美观的 UI 界面
- ✅ 响应式设计，支持移动端
- ✅ 完全免费，无请求限制

## 技术栈

- **前端**: Next.js 14 + TypeScript + Tailwind CSS
- **后端**: Next.js API Routes
- **视频解析**: yt-dlp（开源免费）

## 本地开发

### 前置要求

1. Node.js 18+ 
2. 安装 yt-dlp:

```bash
# Ubuntu/Debian
sudo apt install yt-dlp

# macOS
brew install yt-dlp

# Windows (使用 Scoop)
scoop install yt-dlp
```

### 安装依赖

```bash
npm install
# 或
pnpm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

## 部署

### Railway 部署（推荐）✅

Railway 支持 Docker，可以完美运行 yt-dlp。

**步骤：**

1. 访问 https://railway.app/
2. 使用 GitHub 登录
3. 点击 **New Project** → **Deploy from GitHub repo**
4. 选择 `frankchen622/fb-video-downloader`
5. Railway 会自动检测 Dockerfile 并部署
6. 等待 3-5 分钟，完成！

**成本：**
- 免费额度：$5/月（约 500 小时运行时间）
- 超出后按量付费：约 $0.000231/分钟
- **适合流量：** 每天几千次请求完全没问题

### Render 部署（备选）

Render 也支持 Docker，操作类似 Railway。

1. 访问 https://render.com/
2. 连接 GitHub 仓库
3. 选择 **Web Service**
4. 使用 Docker 部署
5. 免费套餐可用（有限制）

### Vercel 部署

⚠️ **不推荐**：Vercel 不支持 yt-dlp（Serverless 环境限制）

如需使用 Vercel，请切换到 RapidAPI 分支（需要付费 API）。

## Dockerfile

项目已包含 Dockerfile，支持一键部署：

```dockerfile
FROM node:18-alpine

# 安装 yt-dlp 和 ffmpeg
RUN apk add --no-cache python3 py3-pip ffmpeg
RUN pip3 install yt-dlp

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

## 环境变量

无需配置环境变量，开箱即用！

## 注意事项

1. **版权声明**: 请仅下载您有权使用的内容
2. **性能优化**: 建议添加 Redis 缓存视频信息
3. **反爬限制**: Facebook 可能会限制频繁请求
4. **法律风险**: 部分地区可能有法律限制，请自行评估

## 后续优化建议

- [ ] 添加视频预览功能
- [ ] 支持批量下载
- [ ] 添加下载历史记录
- [ ] 支持更多平台（Twitter, Instagram, TikTok）
- [ ] 添加 CDN 加速
- [ ] 实现用户认证系统

## License

MIT
