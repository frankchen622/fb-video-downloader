FROM node:20-alpine

# 安装 yt-dlp 和 ffmpeg
RUN apk add --no-cache python3 py3-pip ffmpeg
RUN pip3 install --break-system-packages yt-dlp

WORKDIR /app

# 复制依赖文件
COPY package*.json ./

# 使用 npm ci 安装依赖
RUN npm ci

# 复制项目文件
COPY . .

# 构建 Next.js 应用
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
