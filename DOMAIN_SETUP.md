# 域名绑定指南

## 📋 准备工作

1. 确保你已经购买了域名（例如：savefbs.net）
2. 有域名的 DNS 管理权限
3. Railway 项目已部署成功

## 🚀 Railway 域名绑定步骤

### 步骤 1: 在 Railway 添加自定义域名

1. 登录 [Railway Dashboard](https://railway.app)
2. 进入项目 `fb-video-downloader`
3. 点击你的服务（Service）
4. 进入 `Settings` 标签
5. 找到 `Domains` 部分
6. 点击 `+ Add Domain`
7. 输入你的域名：
   - 根域名：`savefbs.net`
   - 或子域名：`www.savefbs.net`

### 步骤 2: 配置 DNS 记录

Railway 会显示需要添加的 DNS 记录。去你的域名注册商添加：

#### 选项 A: 使用根域名（savefbs.net）

```
类型: A
名称: @
值: [Railway 提供的 IP 地址]
TTL: 自动或 3600
```

#### 选项 B: 使用 www 子域名（www.savefbs.net）

```
类型: CNAME
名称: www
值: fb-video-downloader-production.up.railway.app
TTL: 自动或 3600
```

#### 推荐: 同时配置根域名和 www

```
# 根域名
类型: A
名称: @
值: [Railway IP]

# www 子域名
类型: CNAME
名称: www
值: fb-video-downloader-production.up.railway.app
```

### 步骤 3: 等待 DNS 传播

- 通常需要 5-30 分钟
- 最长可能需要 48 小时
- 可以使用 [DNS Checker](https://dnschecker.org) 检查传播状态

### 步骤 4: SSL 证书自动配置

Railway 会自动为你的域名配置 Let's Encrypt SSL 证书，通常在域名验证后几分钟内完成。

## 🔧 使用 Cloudflare（推荐）

如果你的域名使用 Cloudflare，可以获得更好的性能和安全性：

### 1. 添加 DNS 记录

```
类型: CNAME
名称: @
值: fb-video-downloader-production.up.railway.app
代理状态: 已代理（橙色云朵）
```

```
类型: CNAME
名称: www
值: fb-video-downloader-production.up.railway.app
代理状态: 已代理（橙色云朵）
```

### 2. Cloudflare 优化设置

#### SSL/TLS 设置
- 进入 `SSL/TLS` → `Overview`
- 选择 `Full (strict)` 模式

#### 性能优化
- 进入 `Speed` → `Optimization`
- 启用 `Auto Minify` (HTML, CSS, JS)
- 启用 `Brotli` 压缩
- 启用 `Rocket Loader`（可选）

#### 安全设置
- 进入 `SSL/TLS` → `Edge Certificates`
- 启用 `Always Use HTTPS`
- 启用 `Automatic HTTPS Rewrites`
- 启用 `HTTP Strict Transport Security (HSTS)`

#### 缓存设置
- 进入 `Caching` → `Configuration`
- 缓存级别：`Standard`
- 浏览器缓存 TTL：`4 hours`

## 📝 域名绑定后的配置更新

### 1. 在 Railway 设置环境变量

进入 Railway 项目 → `Variables` 标签，添加：

```
NEXT_PUBLIC_SITE_URL=https://savefbs.net
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 2. 更新 Google Search Console

1. 访问 [Google Search Console](https://search.google.com/search-console)
2. 添加新的资源（Property）：`https://savefbs.net`
3. 验证域名所有权
4. 提交 sitemap：`https://savefbs.net/sitemap.xml`

### 3. 更新 Google Analytics

1. 访问 [Google Analytics](https://analytics.google.com)
2. 更新网站 URL 为 `https://savefbs.net`
3. 复制 Measurement ID（格式：G-XXXXXXXXXX）
4. 在 Railway 环境变量中设置 `NEXT_PUBLIC_GA_ID`

### 4. 更新 robots.txt

robots.txt 已经更新为使用 `savefbs.net`，无需额外操作。

## ✅ 验证域名绑定

### 1. 检查 DNS 解析

```bash
# 检查 A 记录
dig savefbs.net

# 检查 CNAME 记录
dig www.savefbs.net
```

### 2. 检查 SSL 证书

访问 `https://savefbs.net`，点击浏览器地址栏的锁图标，查看证书详情。

### 3. 检查 SEO 配置

- 访问 `https://savefbs.net/sitemap.xml` 确认 sitemap 正常
- 访问 `https://savefbs.net/robots.txt` 确认 robots.txt 正常
- 使用 [Google Rich Results Test](https://search.google.com/test/rich-results) 测试结构化数据

## 🐛 常见问题

### DNS 未生效

- 等待更长时间（最多 48 小时）
- 清除本地 DNS 缓存：
  - Windows: `ipconfig /flushdns`
  - Mac: `sudo dscacheutil -flushcache`
  - Linux: `sudo systemd-resolve --flush-caches`

### SSL 证书错误

- 确保 DNS 已正确配置
- 等待 Railway 自动配置 SSL（通常 5-10 分钟）
- 如果使用 Cloudflare，确保 SSL 模式为 `Full (strict)`

### 网站无法访问

- 检查 Railway 服务是否正常运行
- 检查 DNS 记录是否正确
- 检查防火墙或 CDN 设置

## 📊 性能监控

### 推荐工具

1. [Google PageSpeed Insights](https://pagespeed.web.dev/)
2. [GTmetrix](https://gtmetrix.com/)
3. [WebPageTest](https://www.webpagetest.org/)
4. [Lighthouse](https://developers.google.com/web/tools/lighthouse)

### 目标指标

- First Contentful Paint (FCP): < 1.8s
- Largest Contentful Paint (LCP): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1
- Time to Interactive (TTI): < 3.8s

## 🎯 下一步

1. ✅ 绑定自定义域名
2. ✅ 配置 SSL 证书
3. ✅ 设置环境变量
4. ⬜ 提交 sitemap 到 Google Search Console
5. ⬜ 提交 sitemap 到 Bing Webmaster Tools
6. ⬜ 设置 Google Analytics
7. ⬜ 监控网站性能和 SEO 表现
