# 🚀 Railway 部署指南

## 为什么选择 Railway？

- ✅ 支持 Docker（可以运行 yt-dlp）
- ✅ 完全免费（$5/月额度）
- ✅ 自动部署（推送代码即更新）
- ✅ 无请求次数限制

---

## 部署步骤

### 第一步：注册 Railway

1. 访问 https://railway.app/
2. 点击 **Login** → 使用 GitHub 登录
3. 授权 Railway 访问你的 GitHub

### 第二步：创建项目

1. 点击 **New Project**
2. 选择 **Deploy from GitHub repo**
3. 找到 `frankchen622/fb-video-downloader`
4. 点击 **Deploy Now**

### 第三步：等待部署

1. Railway 会自动检测 Dockerfile
2. 开始构建镜像（约 3-5 分钟）
3. 部署完成后，点击 **Generate Domain** 获取公网地址

### 第四步：配置域名（可选）

1. 在项目设置中点击 **Settings**
2. 找到 **Domains** 部分
3. 点击 **Generate Domain** 或添加自定义域名

---

## 🎉 完成！

你的 Facebook Video Downloader 现在已经上线了！

**示例地址：** `https://your-project.up.railway.app`

---

## 常见问题

### Q: 免费额度够用吗？
A: $5/月约等于 500 小时运行时间，对于中小流量完全够用。

### Q: 如何更新代码？
A: 直接在 GitHub 推送新代码，Railway 会自动重新部署。

### Q: 如何查看日志？
A: 在 Railway 项目页面点击 **Deployments** → 选择最新部署 → 查看日志。

### Q: 超出免费额度怎么办？
A: 可以绑定信用卡，按量付费（很便宜）。或者切换到 Render 的免费套餐。

### Q: 如何添加自定义域名？
A: 在项目设置 → Domains 中添加，然后在域名 DNS 设置中添加 CNAME 记录。

---

## 成本估算

**免费额度：** $5/月
- 约 500 小时运行时间
- 适合每天 1000-5000 次请求

**超出后：** $0.000231/分钟
- 每天 10,000 次请求 ≈ $10/月
- 比 RapidAPI 便宜 5-20 倍！

---

## 需要帮助？

遇到问题可以：
1. 查看 Railway 文档：https://docs.railway.app/
2. 查看项目 README.md
3. 提交 GitHub Issue
