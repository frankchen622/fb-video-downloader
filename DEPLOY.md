# 🚀 Vercel 部署指南

## 第一步：获取 RapidAPI Key

1. 访问 https://rapidapi.com/
2. 点击右上角 **Sign Up**（如果已有账号则 Log In）
3. 搜索 **"Social Media Video Downloader"**
4. 选择一个支持 Facebook 的 API（推荐：**Social Media Video Downloader**）
5. 点击 **Subscribe to Test**
6. 选择 **Basic Plan**（免费，每月 100 次请求）
7. 复制你的 **X-RapidAPI-Key**（在右侧代码示例中）

## 第二步：部署到 Vercel

1. 访问 https://vercel.com/new
2. 使用 GitHub 登录
3. 点击 **Import Git Repository**
4. 找到 `frankchen622/fb-video-downloader`
5. 点击 **Import**

## 第三步：配置环境变量

在 Vercel 部署页面：

1. 展开 **Environment Variables** 部分
2. 添加变量：
   - **Name**: `RAPIDAPI_KEY`
   - **Value**: `你刚才复制的 API Key`
3. 点击 **Add**

## 第四步：部署

1. 点击 **Deploy**
2. 等待 2-3 分钟
3. 部署完成后，点击 **Visit** 查看你的网站

## 🎉 完成！

你的 Facebook Video Downloader 现在已经上线了！

---

## 常见问题

### Q: 免费额度用完了怎么办？
A: 可以升级 RapidAPI 套餐，或者切换到其他免费 API。

### Q: 如何更新代码？
A: 直接在 GitHub 推送新代码，Vercel 会自动重新部署。

### Q: 如何添加自定义域名？
A: 在 Vercel 项目设置 → Domains 中添加。

### Q: API 报错怎么办？
A: 检查：
1. RAPIDAPI_KEY 是否正确配置
2. API 额度是否用完
3. Facebook 链接是否有效
