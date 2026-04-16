# 项目架构决策记录

## 为什么分离 server/ 和 Vercel Functions？

### 当前架构

```
your-pet-fatev2/
├── vercel.json          # Vercel 部署配置
├── server/              # 独立 Express 服务（路由部署）
│   ├── index.ts
│   ├── routes/
│   └── services/
└── src/                 # React 前端（Vercel 托管）
    ├── pages/
    ├── components/
    └── ...
```

### 决策 1：前后端分离 vs 单体架构

**选择：前后端分离**

```
前端：React + Vite + Tailwind CSS → Vercel (CDN 加速)
                              ↓ HTTP
后端：Express + TypeScript → 独立服务器（Render/Railway）
                              ↓
                            Supabase (数据库)
```

**理由：**
- Vercel 的 Edge Network 为静态资源和 SPA 提供极快的首屏加载
- API 服务独立部署，避免 Serverless 冷启动延迟
- 前端可以独立迭代，不影响后端稳定性
- 便于后续扩展为微服务架构

### 决策 2：为什么用 Supabase？

**Supabase = PostgreSQL + Realtime + Auth + Storage**

| 需求 | Supabase 方案 |
|------|--------------|
| 用户数据持久化 | PostgreSQL 原生支持 |
| 实时性需求 | Realtime subscription |
| 鉴权 | 内置 Auth，支持多种 provider |
| 文件存储 | Storage 服务 |
| 离线支持 | 未来可考虑 IndexedDB |

**替代方案对比：**
- Firebase：Google 生态，但国内访问不稳定
- MongoDB Atlas：适合文档型数据，但缺少原生 SQL 能力
- PlanetScale：MySQL 兼容，但 Serverless 计划有并发限制

### 决策 3：环境变量管理策略

**原则：敏感信息不上传 Git**

```
.env.local (本地开发) ────── gitignore
├── GEMINI_API_KEY=xxx
├── VITE_SUPABASE_URL=xxx
└── VITE_SUPABASE_ANON_KEY=xxx

.vercel.env.[环境] (Vercel Dashboard 配置)
├── production
├── preview
└── development
```

**Why not .env.production?**

Vercel 推荐在 Dashboard 中配置环境变量，而非文件系统。这样：
- 敏感信息不会进入 Git 历史
- 不同分支可配置不同的 preview 环境变量
- 便于团队协作

### 决策 4：Vite + Tailwind CSS v4

**技术栈选择理由：**
- Vite：ESM-based 构建，比 Webpack 快 10 倍
- Tailwind CSS v4：使用 `@tailwindcss/vite` 插件，无需 PostCSS 配置
- React 19：最新稳定版，更好的并发渲染支持

**为什么不用 Next.js？**

- 项目以展示型为主，SSR 收益不大
- 减少学习成本和维护复杂度
- Vercel 同样支持 SPA 部署，性能优异

---

## 部署拓扑图

```
                        ┌─────────────────────┐
                        │      Vercel CDN      │
                        │  ┌───────────────┐  │
   User ───────────────▶│  │  Static Assets │  │
                        │  │  (JS/CSS/IMG)  │  │
                        │  └───────────────┘  │
                        │  ┌───────────────┐  │
                        │  │  index.html    │  │
                        │  │  (SPA Shell)  │  │
                        │  └───────────────┘  │
                        └──────────┬──────────┘
                                   │
                    ┌──────────────┴──────────────┐
                    │         Browser              │
                    │  ┌─────────────────────────┐  │
                    │  │  React SPA + Tailwind  │  │
                    │  └─────────────────────────┘  │
                    │              │                │
                    │              │ fetch()        │
                    │              ▼                │
                    │  ┌─────────────────────────┐  │
                    │  │   Gemini API (AI)       │  │
                    │  │   直接从浏览器调用       │  │
                    │  └─────────────────────────┘  │
                    └──────────────────────────────┘
                                   │
                        ┌──────────┴──────────┐
                        │   Express Backend     │
                        │   (独立服务器)        │
                        │                       │
                        │  /api/fortune         │
                        │  /api/analyze         │
                        └──────────┬──────────┘
                                   │
                        ┌──────────┴──────────┐
                        │     Supabase          │
                        │  PostgreSQL + Auth   │
                        └──────────────────────┘
```

---

## 依赖版本锁定策略

使用 `package.json` 的精确版本范围：

```json
{
  "dependencies": {
    "react": "^19.0.0",       // ^ 允许 patch + minor 更新
    "vite": "^6.2.0"         // ^ 允许 patch + minor 更新
  },
  "devDependencies": {
    "typescript": "~5.8.2"    // ~ 只允许 patch 更新（更严格）
  }
}
```

**为什么？**
- `^` 适合快速迭代的项目，能自动获取安全修复
- `~` 适合需要高度稳定的核心依赖
- 定期运行 `npm update` 获取新版本，手动测试后再部署

---

## 未来扩展方向

1. **PWA 支持**：添加 service worker 实现离线访问
2. **多语言**：使用 `react-i18next` 支持中英文切换
3. **分析集成**：Vercel Analytics 监控访问数据
4. **A/B 测试**：Vercel 的 Edge Middleware 实现
