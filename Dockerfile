FROM node:20-alpine

# 安装 yt-dlp 和 ffmpeg
RUN apk add --no-cache python3 py3-pip ffmpeg
RUN pip3 install --break-system-packages yt-dlp

WORKDIR /app

# 复制依赖文件
COPY package*.json ./

# 清理 npm 缓存并使用 npm ci 安装依赖
RUN npm cache clean --force && npm ci

# 复制项目文件
COPY . .

# 构建 Next.js 应用
RUN npm run build

# 删除 devDependencies 减小镜像体积
RUN npm prune --production

EXPOSE 3000

CMD ["npm", "start"]
