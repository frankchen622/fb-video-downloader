# RTL (Right-to-Left) Layout Fix for Arabic

## 问题描述
阿拉伯语页面 (https://dlfb.io/ar/facebook-to-mp4) 的文字和排版没有遵循从右向左的顺序。

## 已修复的问题

### 1. **HTML 方向设置** ✅
- `_document.tsx` 已经正确设置了 `dir="rtl"` 属性
- 当 locale 为 'ar' 时，HTML 根元素自动应用 RTL 方向

### 2. **CSS RTL 支持** ✅
在 `styles/globals.css` 中添加了全面的 RTL 支持：

#### 文本对齐
```css
[dir="rtl"] body,
[dir="rtl"] p,
[dir="rtl"] h1,
[dir="rtl"] h2,
[dir="rtl"] h3,
[dir="rtl"] h4,
[dir="rtl"] h5,
[dir="rtl"] h6 {
  text-align: right;
}
```

#### Flex 方向反转
```css
[dir="rtl"] .flex:not(.flex-col):not(.flex-col-reverse) {
  flex-direction: row-reverse;
}
```

#### 列表对齐
```css
[dir="rtl"] ul,
[dir="rtl"] ol {
  padding-right: 1.5rem;
  padding-left: 0;
}
```

#### 输入框对齐
```css
[dir="rtl"] input,
[dir="rtl"] textarea {
  text-align: right;
}
```

#### 按钮和间距
```css
[dir="rtl"] .justify-between {
  flex-direction: row-reverse;
}

[dir="rtl"] .space-x-reverse > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 1;
}
```

### 3. **保持居中对齐** ✅
某些元素（如标题）需要保持居中对齐：
```css
[dir="rtl"] .text-center {
  text-align: center !important;
}
```

## 修改的文件

1. **styles/globals.css**
   - 添加了完整的 RTL CSS 规则
   - 支持文本、flex、列表、输入框的 RTL 布局

2. **tailwind.config.js**
   - 添加了 future.hoverOnlyWhenSupported 配置
   - 为未来的 Tailwind 特性做准备

## 测试方法

1. 访问阿拉伯语页面：
   ```
   https://dlfb.io/ar
   https://dlfb.io/ar/facebook-to-mp4
   https://dlfb.io/ar/facebook-to-mp3
   ```

2. 验证以下内容：
   - ✅ 文字从右向左排列
   - ✅ 导航菜单在右侧
   - ✅ 输入框文字从右开始
   - ✅ 按钮位置正确
   - ✅ 列表项目符号在右侧
   - ✅ 居中的标题保持居中

## 已有的翻译

阿拉伯语翻译已经完整存在于：
- `locales/ar.json` - 主要翻译文件（512行）
- `locales/pages-ar.json` - 页面特定翻译（140行）

所有阿拉伯语文本都已翻译，包括：
- 页面标题和描述
- 按钮和表单
- 常见问题 (FAQ)
- 功能介绍
- 步骤说明

## 技术细节

### Next.js i18n 配置
`next.config.js` 中已配置：
```javascript
i18n: {
  locales: ['en', 'es', 'pt', 'fr', 'de', 'ja', 'id', 'vi', 'th', 'ar', 'zh', 'ru'],
  defaultLocale: 'en',
}
```

### 翻译 Hook
`hooks/useTranslation.ts` 已经支持阿拉伯语：
```typescript
import ar from '@/locales/ar.json'

const translations: Record<string, any> = {
  en, es, pt, fr, de, ja, id, vi, th, zh, ar, ru,
}
```

## 部署

修改已经推送到 GitHub 主分支：
```bash
git add styles/globals.css tailwind.config.js
git commit -m "Fix RTL layout for Arabic"
git push origin main
```

如果项目配置了自动部署（如 Railway/Vercel），更改将自动部署到生产环境。

## 验证清单

- [x] HTML `dir` 属性正确设置
- [x] CSS RTL 规则完整
- [x] 文本对齐从右向左
- [x] Flex 布局反转
- [x] 列表和输入框对齐正确
- [x] 翻译文件完整
- [x] 构建成功
- [x] 代码已推送到 GitHub

## 下一步

1. 等待自动部署完成（如果已配置）
2. 访问 https://dlfb.io/ar/facebook-to-mp4 验证修复效果
3. 如需手动部署，运行：
   ```bash
   npm run build
   npm start
   ```

## 注意事项

- RTL 布局不会影响其他语言（英语、西班牙语等）
- 所有 RTL 规则都使用 `[dir="rtl"]` 选择器，只在阿拉伯语页面生效
- 图片和图标位置会自动调整
- 某些绝对定位的元素可能需要单独调整（如果发现问题）
