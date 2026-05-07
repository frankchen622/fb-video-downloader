FROM node:20-alpine

# 安装 yt-dlp 和 ffmpeg
RUN apk add --no-cache python3 py3-pip ffmpeg
RUN pip3 install --break-system-packages yt-dlp

WORKDIR /app

# 复制依赖文件
COPY package*.json ./

# 安装所有依赖（包括 devDependencies）
RUN npm install

# 复制项目文件
COPY . .

# 构建 Next.js 应用
RUN npm run build

# 删除 devDependencies 减小镜像体积
RUN npm prune --production

EXPOSE 3000

CMD ["npm", "start"]
