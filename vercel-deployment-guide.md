# Vercel 部署指南

## 快速开始

### 准备工作

- Node.js 18+ 环境
- Vercel 账号 ([vercel.com](https://vercel.com))
- GitHub/GitLab/Bitbucket 仓库（推荐）或本地项目

---

## 方式一：通过 Vercel Dashboard 部署（推荐新手）

### 步骤 1：安装 Vercel CLI

```bash
npm install -g vercel
```

或使用 pnpm / yarn：

```bash
pnpm add -g vercel
```

### 步骤 2：登录 Vercel

```bash
vercel login
```

浏览器会弹出登录页面，支持 GitHub、GitLab、Bitbucket 或邮箱登录。

### 步骤 3：导入项目

```bash
cd your-pet-fatev2
vercel
```

按照提示操作：
- Set up and deploy? `Y`
- Which scope? 选择你的个人账号或团队
- Link to existing project? `N`（新项目）
- Project name? `your-pet-fate`（或自定义）
- Directory? `./`（当前目录）
- Override settings? `N`

Vercel 会自动检测 Vite 框架并配置部署。

### 步骤 4：配置环境变量

部署完成后，在 Vercel Dashboard 中：

1. 进入 **Project Settings** → **Environment Variables**
2. 添加以下变量：

| 变量名 | 值 | 说明 |
|--------|-----|------|
| `GEMINI_API_KEY` | `your_key_here` | Google Gemini API 密钥 |

获取地址：https://makersuite.google.com/app/apikey

### 步骤 5：重新部署

添加环境变量后，点击 **Deployments** → 最新部署 → **Redeploy**

---

## 方式二：通过 Git 持续部署（推荐团队）

### 步骤 1：将代码推送到 Git 仓库

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/your-pet-fatev2.git
git push -u origin main
```

### 步骤 2：在 Vercel 导入项目

1. 登录 [vercel.com](https://vercel.com)
2. 点击 **Add New** → **Project**
3. 选择你的 Git 仓库
4. Vercel 自动检测为 Vite + React 项目
5. 配置 **Environment Variables**
6. 点击 **Deploy**

此后每次推送到 main 分支，都会自动触发部署。

---

## 两种后端架构对比

### 方案 A：独立 Express 服务（当前项目使用）

```
Frontend (Vercel)          Backend (独立服务器)
┌─────────────────┐       ┌─────────────────┐
│  React + Vite   │       │  Express API    │
│  托管在 Vercel   │  ──── │  托管在 Render  │
│                 │ HTTPS │  或 Railway     │
└─────────────────┘       └─────────────────┘
```

**优点：**
- 前端部署简单，完全免费
- 后端可自由选择技术栈
- 数据库迁移灵活

**缺点：**
- 需要维护两个服务
- 跨域配置稍复杂

**推荐托管后端：**
- [Render](https://render.com) - 免费额度充足
- [Railway](https://railway.app) - 按需付费
- [Supabase](https://supabase.com) - 已有数据库可选

---

### 方案 B：Vercel Serverless Functions

```
Vercel (统一平台)
┌─────────────────┬─────────────────┐
│  Frontend       │  API Routes     │
│  React + Vite   │  /api/*         │
│                 │  Serverless     │
└─────────────────┴─────────────────┘
```

**优点：**
- 单一平台管理
- 自动弹性扩缩容
- 内置 CDN 和边缘网络
- 无跨域问题

**缺点：**
- Serverless 函数有执行时间限制（默认 10s）
- 冷启动延迟
- 免费额度有限（100h/月）

**目录结构：**

```
your-pet-fatev2/
├── vercel.json
├── api/
│   └── fortune.ts        # Vercel Serverless Function
├── src/
│   └── ...
└── ...
```

**vercel.json 配置：**

```json
{
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/$1" }
  ]
}
```

**api/fortune.ts 示例：**

```typescript
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  const { method } = req;

  if (method === 'POST') {
    // 处理 Gemini 请求
    const { messages } = req.body;
    // ...
  }

  res.status(200).json({ message: 'Hello from Vercel!' });
}
```

---

## 常见问题

### Q: 部署后字体不显示？

检查 `vercel.json` 的 headers 配置，确保 Google Fonts 的 CORS 头已正确设置。

### Q: 图片资源 404？

Vercel 默认不缓存 `public/` 外的静态资源。将图片放在 `public/` 目录，或使用外部 CDN（如现有的 Google Photos 链接）。

### Q: API 请求失败？

- 确认环境变量已正确配置
- 检查后端服务是否正常运行
- 确认 CORS 配置允许 Vercel 域名访问

### Q: 构建失败？

```bash
npm run build
```

本地先运行构建命令，确认无错误后再部署。

---

## 下一步

- 配置 Supabase 数据库：参考 `FORKS.md`
- 设置自定义域名：Project Settings → Domains
- 开启 HTTPS：自动配置，无需额外操作
