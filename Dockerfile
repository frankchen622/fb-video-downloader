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

# 安装 Node 依赖并验证
RUN npm ci && \
    echo "=== Checking node_modules ===" && \
    ls -la node_modules/ && \
    echo "=== Checking .bin ===" && \
    ls -la node_modules/.bin/ && \
    echo "=== Checking next ===" && \
    ls -la node_modules/.bin/next || echo "next not found!" && \
    echo "=== Checking next package ===" && \
    ls -la node_modules/next/ || echo "next package not found!"

# 复制源代码
COPY . .

# 构建应用（使用绝对路径）
RUN /app/node_modules/.bin/next build

# 清理开发依赖
RUN npm prune --production

EXPOSE 3000

CMD ["npm", "start"]
