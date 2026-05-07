# Facebook Video Downloader

一个简洁高效的 Facebook 视频下载工具，基于 Next.js + yt-dlp 构建。

## 功能特性

- ✅ 支持 Facebook 视频下载
- ✅ 多画质选择（自动检测可用格式）
- ✅ 简洁美观的 UI 界面
- ✅ 响应式设计，支持移动端
- ✅ 无需注册，完全免费

## 技术栈

- **前端**: Next.js 14 + TypeScript + Tailwind CSS
- **后端**: Next.js API Routes
- **视频解析**: yt-dlp

## 本地开发

### 前置要求

1. Node.js 18+ 
2. 安装 yt-dlp:

```bash
# Ubuntu/Debian
sudo apt install yt-dlp

# macOS
brew install yt-dlp

# 或使用 pip
pip install yt-dlp
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

### Vercel 部署（推荐）

1. Fork 本项目到你的 GitHub
2. 在 Vercel 导入项目
3. 添加环境变量（如需要）
4. 部署完成

⚠️ **注意**: Vercel 的 Serverless 函数默认不包含 yt-dlp，需要：

- 方案 1: 使用 Docker 部署（推荐）
- 方案 2: 改用第三方 API（如 RapidAPI）

### Railway/Render 部署

这些平台支持完整的 Linux 环境，可以直接安装 yt-dlp。

创建 `Dockerfile`:

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

目前无需配置环境变量，开箱即用。

## 注意事项

1. **版权声明**: 请仅下载您有权使用的内容
2. **性能优化**: 建议添加 Redis 缓存视频信息
3. **反爬限制**: Facebook 可能会限制频繁请求，建议添加 IP 轮换
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
