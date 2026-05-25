#!/bin/bash

# Facebook Video Downloader - 自动化测试脚本
# 测试所有 API 端点和页面

BASE_URL="http://localhost:3000"
RESULTS_FILE="test-results-$(date +%Y%m%d-%H%M%S).txt"

echo "========================================" | tee $RESULTS_FILE
echo "Facebook Video Downloader - 测试报告" | tee -a $RESULTS_FILE
echo "测试时间: $(date)" | tee -a $RESULTS_FILE
echo "========================================" | tee -a $RESULTS_FILE
echo "" | tee -a $RESULTS_FILE

# 颜色定义
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 测试函数
test_endpoint() {
    local name=$1
    local url=$2
    local method=${3:-GET}
    local data=$4
    
    echo -n "测试 $name ... " | tee -a $RESULTS_FILE
    
    if [ "$method" = "POST" ]; then
        response=$(curl -s -w "\n%{http_code}" -X POST "$url" \
            -H "Content-Type: application/json" \
            -d "$data" 2>&1)
    else
        response=$(curl -s -w "\n%{http_code}" "$url" 2>&1)
    fi
    
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | head -n-1)
    
    if [ "$http_code" -ge 200 ] && [ "$http_code" -lt 300 ]; then
        echo -e "${GREEN}✓ 通过${NC} (HTTP $http_code)" | tee -a $RESULTS_FILE
        echo "  响应: $(echo $body | head -c 100)..." | tee -a $RESULTS_FILE
        return 0
    else
        echo -e "${RED}✗ 失败${NC} (HTTP $http_code)" | tee -a $RESULTS_FILE
        echo "  错误: $body" | tee -a $RESULTS_FILE
        return 1
    fi
}

# 检查服务是否运行
echo "1. 检查服务状态" | tee -a $RESULTS_FILE
echo "-------------------" | tee -a $RESULTS_FILE
if curl -s "$BASE_URL" > /dev/null; then
    echo -e "${GREEN}✓ 服务正在运行${NC}" | tee -a $RESULTS_FILE
else
    echo -e "${RED}✗ 服务未运行，请先启动: npm run dev${NC}" | tee -a $RESULTS_FILE
    exit 1
fi
echo "" | tee -a $RESULTS_FILE

# 测试健康检查端点
echo "2. API 端点测试" | tee -a $RESULTS_FILE
echo "-------------------" | tee -a $RESULTS_FILE
test_endpoint "健康检查" "$BASE_URL/api/health"
echo "" | tee -a $RESULTS_FILE

# 测试下载 API - 无效请求
echo "3. 下载 API 测试" | tee -a $RESULTS_FILE
echo "-------------------" | tee -a $RESULTS_FILE

test_endpoint "空 URL" "$BASE_URL/api/download" "POST" '{"url":""}'
test_endpoint "无效 URL" "$BASE_URL/api/download" "POST" '{"url":"https://example.com"}'
test_endpoint "无效 Facebook URL" "$BASE_URL/api/download" "POST" '{"url":"https://www.facebook.com/invalid"}'

echo "" | tee -a $RESULTS_FILE

# 测试页面加载
echo "4. 页面加载测试" | tee -a $RESULTS_FILE
echo "-------------------" | tee -a $RESULTS_FILE

pages=(
    "/"
    "/en"
    "/es"
    "/pt"
    "/fr"
    "/de"
    "/ja"
    "/zh"
    "/ar"
    "/ru"
    "/vi"
)

for page in "${pages[@]}"; do
    test_endpoint "页面 $page" "$BASE_URL$page"
done

echo "" | tee -a $RESULTS_FILE

# 检查 yt-dlp
echo "5. yt-dlp 检查" | tee -a $RESULTS_FILE
echo "-------------------" | tee -a $RESULTS_FILE
if command -v yt-dlp &> /dev/null; then
    version=$(yt-dlp --version)
    echo -e "${GREEN}✓ yt-dlp 已安装${NC} (版本: $version)" | tee -a $RESULTS_FILE
else
    echo -e "${RED}✗ yt-dlp 未安装${NC}" | tee -a $RESULTS_FILE
fi
echo "" | tee -a $RESULTS_FILE

# 总结
echo "========================================" | tee -a $RESULTS_FILE
echo "测试完成！" | tee -a $RESULTS_FILE
echo "详细结果已保存到: $RESULTS_FILE" | tee -a $RESULTS_FILE
echo "========================================" | tee -a $RESULTS_FILE

echo ""
echo -e "${YELLOW}注意: 真实视频下载测试需要手动进行${NC}"
echo "请访问 $BASE_URL 并使用真实的 Facebook 视频链接测试"
