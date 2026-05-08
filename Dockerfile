FROM node:20-slim

# 安装必要的系统依赖
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

# 安装 yt-dlp
RUN pip3 install --break-system-packages yt-dlp

WORKDIR /app

# 复制 package 文件
COPY package.json package-lock.json ./

# 升级 npm 到最新版本（修复 npm 崩溃问题）
RUN npm install -g npm@latest

# 安装所有依赖（包括 devDependencies）
RUN npm ci

# 复制源代码
COPY . .

# 构建应用
RUN npm run build

# 清理开发依赖
RUN npm prune --production

EXPOSE 3000

CMD ["npm", "start"]
