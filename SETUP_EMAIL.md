# 📧 邮件配置快速指南

联系表单已配置为发送到：**info@savefbs.com**

## 🚀 快速设置（5分钟）

### 步骤 1：获取 Resend API Key

1. 访问 https://resend.com
2. 点击 "Sign Up" 注册（免费，无需信用卡）
3. 登录后，进入 "API Keys" 页面
4. 点击 "Create API Key"
5. 复制生成的 API Key（格式：`re_xxxxxxxxxxxxx`）

### 步骤 2：配置本地环境

打开 `.env.local` 文件，将：
```
RESEND_API_KEY=your_resend_api_key_here
```

替换为你的实际 API Key：
```
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

### 步骤 3：配置生产环境

如果你使用 Vercel 部署：

1. 进入 Vercel 项目设置
2. 找到 "Environment Variables"
3. 添加两个变量：
   - `RESEND_API_KEY` = 你的 API Key
   - `CONTACT_EMAIL` = info@savefbs.com
4. 重新部署

如果使用其他平台（Netlify、Railway 等），在对应的环境变量设置中添加相同的配置。

## ✅ 测试

配置完成后：

1. 本地测试：`npm run dev`
2. 访问 http://localhost:3000/contact
3. 提交测试消息
4. 检查 info@savefbs.com 邮箱

## 📊 免费额度

Resend 免费计划：
- ✅ 每天 100 封邮件
- ✅ 每月 3,000 封邮件
- ✅ 无需信用卡
- ✅ 永久免费

对于联系表单来说完全够用！

## 🎯 收到的邮件格式

```
发件人：DLFB Contact Form <onboarding@resend.dev>
收件人：info@savefbs.com
主题：New Contact Form Submission from [访客姓名]

内容：
姓名：张三
邮箱：zhangsan@example.com
语言：zh
留言：
您好，我想咨询关于...
```

## 🔧 高级配置（可选）

### 使用自己的域名发送邮件

如果你想从 `contact@dlfb.io` 发送邮件：

1. 在 Resend 添加域名 `dlfb.io`
2. 添加 DNS 记录（Resend 会提供）
3. 修改 `pages/api/contact.ts` 中的 `from` 字段：
   ```typescript
   from: 'DLFB Contact <contact@dlfb.io>'
   ```

## ❓ 常见问题

**Q: 没收到邮件？**
- 检查垃圾邮件文件夹
- 确认 API Key 配置正确
- 查看服务器日志是否有错误

**Q: 想换个邮箱？**
- 修改 `.env.local` 中的 `CONTACT_EMAIL`
- 重启开发服务器或重新部署

**Q: 超过免费额度怎么办？**
- Resend 付费计划：$20/月 50,000 封邮件
- 或者切换到其他邮件服务（SendGrid、Mailgun 等）

## 📞 需要帮助？

如果遇到问题，检查：
1. `.env.local` 文件配置是否正确
2. API Key 是否有效
3. 服务器日志中的错误信息
