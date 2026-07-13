FROM node:20-slim

# 安装必要的系统依赖
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    ffmpeg \
    curl \
    && rm -rf /var/lib/apt/lists/*

# 安装最新版 yt-dlp（直接从官方下载二进制，绕过 pip 版本滞后问题）
RUN curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp \
    && chmod a+rx /usr/local/bin/yt-dlp

WORKDIR /app

# 复制 package 文件
COPY package.json ./

# 重置 npm 镜像源为官方源
RUN npm config set registry https://registry.npmjs.org/

# 安装依赖（不使用 lockfile）
RUN npm install --legacy-peer-deps

# 复制源代码
COPY . .

# 构建应用（限制 Node.js 内存避免 OOM）
RUN NODE_OPTIONS=--max-old-space-size=512 npm run build

EXPOSE 3000

# 启动时也限制内存
CMD ["node", "--max-old-space-size=512", "node_modules/.bin/next", "start"]
