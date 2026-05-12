#!/bin/bash

echo "🧪 Testing yt-dlp with Facebook..."
echo ""

# 测试 yt-dlp 版本
echo "📦 yt-dlp version:"
yt-dlp --version
echo ""

# 测试一个真实的 Facebook 视频（需要你提供）
if [ -z "$1" ]; then
    echo "⚠️  Usage: ./test-download.sh <facebook-video-url>"
    echo ""
    echo "Example:"
    echo "  ./test-download.sh 'https://www.facebook.com/watch?v=123456789'"
    exit 1
fi

URL="$1"
echo "🔗 Testing URL: $URL"
echo ""

echo "📥 Fetching video info..."
yt-dlp -j --no-warnings --no-check-certificates "$URL" | jq -r '.title, .thumbnail, .formats[0].url' 2>&1

echo ""
echo "✅ Test complete!"
