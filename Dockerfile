FROM node:18-alpine

# 安装 yt-dlp 和 ffmpeg
RUN apk add --no-cache python3 py3-pip ffmpeg
RUN pip3 install --break-system-packages yt-dlp

WORKDIR /app

# 复制所有文件
COPY . .

# 安装所有依赖（包括 devDependencies）
RUN npm install

# 构建 Next.js 应用（使用完整路径）
RUN ./node_modules/.bin/next build

# 删除 devDependencies 减小镜像体积
RUN npm prune --production

EXPOSE 3000

CMD ["npm", "start"]
