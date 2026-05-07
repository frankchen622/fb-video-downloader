#!/bin/bash

echo "🚀 启动 Facebook Video Downloader..."
echo ""

# 检查 yt-dlp 是否安装
if ! command -v yt-dlp &> /dev/null; then
    echo "❌ yt-dlp 未安装，正在安装..."
    sudo apt update && sudo apt install -y yt-dlp
fi

# 检查 node_modules
if [ ! -d "node_modules" ]; then
    echo "📦 安装依赖..."
    npm install
fi

echo ""
echo "✅ 准备完成！启动开发服务器..."
echo "🌐 访问: http://localhost:3000"
echo ""

npm run dev
