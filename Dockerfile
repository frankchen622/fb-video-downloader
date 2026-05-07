FROM node:20 AS builder

WORKDIR /app

# 复制依赖文件
COPY package*.json ./

# 安装依赖
RUN npm ci

# 复制项目文件
COPY . .

# 构建
RUN npm run build

# 生产镜像
FROM node:20-alpine

# 安装 yt-dlp 和 ffmpeg
RUN apk add --no-cache python3 py3-pip ffmpeg
RUN pip3 install --break-system-packages yt-dlp

WORKDIR /app

# 从 builder 复制构建产物
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["npm", "start"]
