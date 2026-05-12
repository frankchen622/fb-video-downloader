#!/bin/bash
set -e

echo "🔧 Installing/Updating yt-dlp..."

# 检测系统包管理器并安装 yt-dlp
if command -v apt-get &> /dev/null; then
    echo "📦 Using apt-get to install yt-dlp..."
    apt-get update && apt-get install -y yt-dlp || true
elif command -v pip3 &> /dev/null; then
    echo "📦 Using pip3 to install yt-dlp..."
    pip3 install -U yt-dlp --break-system-packages || pip3 install -U yt-dlp --user || true
elif command -v pip &> /dev/null; then
    echo "📦 Using pip to install yt-dlp..."
    pip install -U yt-dlp --break-system-packages || pip install -U yt-dlp --user || true
elif command -v brew &> /dev/null; then
    echo "📦 Using brew to install yt-dlp..."
    brew install yt-dlp || brew upgrade yt-dlp || true
else
    echo "⚠️  No package manager found, trying to download binary..."
    mkdir -p ~/.local/bin
    curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o ~/.local/bin/yt-dlp
    chmod a+rx ~/.local/bin/yt-dlp
    export PATH="$HOME/.local/bin:$PATH"
fi

# 验证安装
if command -v yt-dlp &> /dev/null; then
    echo "✅ yt-dlp installed successfully!"
    yt-dlp --version
else
    echo "⚠️  yt-dlp not found in PATH, but installation may have succeeded"
fi
