#!/bin/bash

# 批量修复页面的多语言支持脚本

cd /root/.openclaw/workspace/fb-video-downloader

# 修复 facebook-to-mp3.tsx
echo "修复 facebook-to-mp3.tsx..."
sed -i "7a import { useTranslation } from '@/hooks/useTranslation'" pages/facebook-to-mp3.tsx
sed -i "s/const { locale = 'en' } = router/const { locale = 'en' } = router\n  const { t } = useTranslation()/" pages/facebook-to-mp3.tsx
sed -i "s/'Please enter a Facebook video URL'/t('mp3.enterUrl')/" pages/facebook-to-mp3.tsx
sed -i "s/Facebook to MP3 Converter/{t('mp3.title')}/" pages/facebook-to-mp3.tsx
sed -i "s/Extract audio from FB videos • High quality up to 320kbps • Free & Fast/{t('mp3.subtitle')}/" pages/facebook-to-mp3.tsx
sed -i "s/Paste Facebook video URL.../{t('mp3.placeholder')}/" pages/facebook-to-mp3.tsx
sed -i "s/🎵 Convert to MP3/{t('mp3.button')}/" pages/facebook-to-mp3.tsx
sed -i "s/⏳ Extracting.../{t('mp3.extracting')}/" pages/facebook-to-mp3.tsx

echo "facebook-to-mp3.tsx 修复完成"
