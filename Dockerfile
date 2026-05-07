FROM node:18-alpine

# 安装 yt-dlp 和 ffmpeg
RUN apk add --no-cache python3 py3-pip ffmpeg
RUN pip3 install yt-dlp

WORKDIR /app

# 复制依赖文件
COPY package*.json ./
RUN npm install

# 复制项目文件
COPY . .

# 构建 Next.js 应用
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
