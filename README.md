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
- **后端**: Next.js API Routes + RapidAPI
- **视频解析**: Social Media Video Downloader API

## 本地开发

### 前置要求

1. Node.js 18+ 
2. RapidAPI Key（见下方"环境变量"部分）

### 安装依赖

```bash
npm install
# 或
pnpm install
```

### 启动开发服务器

```bash
# 创建 .env.local 文件并添加你的 RAPIDAPI_KEY
echo "RAPIDAPI_KEY=your_key_here" > .env.local

npm run dev
```

访问 http://localhost:3000

## 部署

### Vercel 部署（推荐）✅

1. Fork 本项目到你的 GitHub
2. 在 Vercel 导入项目
3. **重要**：添加环境变量 `RAPIDAPI_KEY`
4. 部署完成

**Vercel 环境变量配置：**
- 进入项目设置 → Environment Variables
- 添加：`RAPIDAPI_KEY` = `你的API密钥`
- 重新部署

⚠️ **注意**: 免费的 RapidAPI 额度有限（每月 100 次），生产环境建议升级套餐。

### Railway/Render 部署（可选）

如果你想用 yt-dlp 方案（不依赖第三方 API），可以部署到这些平台。

创建 `Dockerfile`（已包含在项目中）：

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

### 必需配置

创建 `.env.local` 文件：

```bash
RAPIDAPI_KEY=your_rapidapi_key_here
```

### 获取 RapidAPI Key

1. 访问 https://rapidapi.com/ 并注册（免费）
2. 搜索 "Social Media Video Downloader"
3. 订阅 API（有免费额度：每月 100 次请求）
4. 复制你的 API Key
5. 在 Vercel 部署时添加环境变量 `RAPIDAPI_KEY`

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
