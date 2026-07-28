#!/bin/bash
# 为所有语言添加完整的 nav 和 footer 翻译

cd /root/.openclaw/workspace/fb-video-downloader

# 葡萄牙语 (pt)
echo "处理葡萄牙语..."
# 备份
cp locales/pt.json locales/pt.json.bak

# 中文简体 (zh)  
echo "处理中文..."
cp locales/zh.json locales/zh.json.bak

# 法语 (fr)
echo "处理法语..."
cp locales/fr.json locales/fr.json.bak

# 德语 (de)
echo "处理德语..."
cp locales/de.json locales/de.json.bak

# 日语 (ja)
echo "处理日语..."
cp locales/ja.json locales/ja.json.bak

# 印尼语 (id)
echo "处理印尼语..."
cp locales/id.json locales/id.json.bak

# 越南语 (vi)
echo "处理越南语..."
cp locales/vi.json locales/vi.json.bak

# 泰语 (th)
echo "处理泰语..."
cp locales/th.json locales/th.json.bak

# 俄语 (ru)
echo "处理俄语..."
cp locales/ru.json locales/ru.json.bak

echo "备份完成！"
