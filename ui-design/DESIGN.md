# Design System: Your Pet Fate — 灵魂档案管理员 (Soulful Archivist)

## 1. 设计哲学：灵魂档案管理员

**创意北极星 (Creative North Star)**

本设计系统摒弃业界常见的"临床感"应用界面，转而从高端编辑档案室和精品药剂师期刊中汲取灵感。目标是让用户感觉仿佛正在揭开一则关于他们与动物王国深层联系的命中注定之真理。

我们拒绝传统移动应用那种"封闭盒子"式的刚硬布局，转而拥抱**有机不对称 (Organic Asymmetry)**。元素应仿佛被手工放置在重磅纸张上。通过利用层叠叠加、超大字体和无边框理念，我们创造出一种触感温润、情感丰沛且极度奢华的数字体验。

---

## 2. 色彩系统

### 基础色板 (Foundation Palette)

| Token | 色值 | 用途 |
|-------|------|------|
| `--color-background` | `#fcf9f4` | 页面背景 (暖白) |
| `--color-surface` | `#fcf9f4` | 表面层 |
| `--color-surface-bright` | `#fcf9f4` | 亮色表面 |
| `--color-surface-dim` | `#dcdad5` | 暗色表面 |
| `--color-surface-container` | `#f0ede9` | 容器背景 |
| `--color-surface-container-low` | `#f6f3ee` | 内容区域背景 |
| `--color-surface-container-high` | `#ebe8e3` | 卡片/组件背景 |
| `--color-surface-container-highest` | `#e5e2dd` | 高层级容器 |
| `--color-surface-container-lowest` | `#ffffff` | 浮动元素/卡片 |

### 主色 (Primary)

| Token | 色值 | 用途 |
|-------|------|------|
| `--color-primary` | `#72553d` | 主按钮、重点元素 (深可可棕) |
| `--color-primary-container` | `#8d6d54` | 主色容器 |
| `--color-on-primary` | `#ffffff` | 主色上的文字 |
| `--color-on-primary-container` | `#fff9f7` | 主色容器上的文字 |
| `--color-primary-fixed` | `#ffdcc3` | 固定主色 |
| `--color-primary-fixed-dim` | `#e6bfa2` | 固定主色暗调 |
| `--color-on-primary-fixed` | `#2b1705` | 固定主色上的文字 |
| `--color-on-primary-fixed-variant` | `#5c412b` | 固定主色文字变体 |
| `--color-surface-tint` | `#765840` | 表面色调 |

### 副色 (Secondary)

| Token | 色值 | 用途 |
|-------|------|------|
| `--color-secondary` | `#3f6928` | 副色 (翠绿) |
| `--color-secondary-container` | `#bff1a0` | 副色容器 |
| `--color-on-secondary` | `#ffffff` | 副色上的文字 |
| `--color-on-secondary-container` | `#456f2e` | 副色容器上的文字 |
| `--color-secondary-fixed` | `#bff1a0` | 固定副色 |
| `--color-secondary-fixed-dim` | `#a4d486` | 固定副色暗调 |
| `--color-on-secondary-fixed` | `#082100` | 固定副色上的文字 |
| `--color-on-secondary-fixed-variant` | `#285012` | 固定副色文字变体 |

### 三级色 (Tertiary)

| Token | 色值 | 用途 |
|-------|------|------|
| `--color-tertiary` | `#6e5736` | 三级色 (暖棕) |
| `--color-tertiary-container` | `#886f4c` | 三级色容器 |
| `--color-on-tertiary` | `#ffffff` | 三级色上的文字 |
| `--color-on-tertiary-container` | `#fff9f6` | 三级色容器上的文字 |
| `--color-tertiary-fixed` | `#fedeb3` | 固定三级色 |
| `--color-tertiary-fixed-dim` | `#e0c299` | 固定三级色暗调 |
| `--color-on-tertiary-fixed` | `#281801` | 固定三级色上的文字 |
| `--color-on-tertiary-fixed-variant` | `#584324` | 固定三级色文字变体 |

### 中性色 (Neutral)

| Token | 色值 | 用途 |
|-------|------|------|
| `--color-on-surface` | `#1c1c19` | 表面上的文字 (非纯黑) |
| `--color-on-surface-variant` | `#4f453f` | 表面文字变体 |
| `--color-on-background` | `#1c1c19` | 背景上的文字 |
| `--color-inverse-surface` | `#31302d` | 反转表面 |
| `--color-inverse-on-surface` | `#f3f0eb` | 反转表面上的文字 |
| `--color-inverse-primary` | `#e6bfa2` | 反转主色 |
| `--color-outline` | `#81746e` | 边框/分割线 |
| `--color-outline-variant` | `#d3c3bc` | 边框变体 (低对比度) |

### 功能色 (Functional)

| Token | 色值 | 用途 |
|-------|------|------|
| `--color-error` | `#ba1a1a` | 错误状态 |
| `--color-error-container` | `#ffdad6` | 错误容器 |
| `--color-on-error` | `#ffffff` | 错误色上的文字 |
| `--color-on-error-container` | `#93000a` | 错误容器上的文字 |

---

## 3. 宠物类别强调色 (Category Accents)

每个宠物类别承载其独特的灵魂。当用户与特定动物匹配时，界面应通过微妙的径向渐变"渗透"到该类别的色调世界：

| 类别 | 强调色 | 用途场景 |
|------|--------|----------|
| **猫 (Cats)** | `#E8C9A0` | 温暖大地色，用于猫咪相关结果展示 |
| **狗 (Dogs)** | `#A8D88A` | 翠绿森林色，用于犬类结果展示 |
| **兔 (Rabbits)** | `#C9B4E8` | 淡紫罗兰色，用于兔类结果展示 |
| **小动物 (Small Animals)** | `#F0C878` | 金琥珀色，用于小宠物结果展示 |
| **鱼 (Fish)** | `#78C8F0` | 深海蓝色，用于鱼类结果展示 |
| **鸟 (Birds)** | `#C8E878` | 草地青柠色，用于鸟类结果展示 |

---

## 4. 字体系统

### 字体族

```css
--font-headline: "Noto Serif SC", "Noto Serif", serif;
--font-body: "Plus Jakarta Sans", sans-serif;
--font-label: "Plus Jakarta Sans", sans-serif;
```

### 字体用途

- **Noto Serif SC (标题字体):** 传达历史感与意义感。用于结果展示和情感洞察，营造"停顿时刻"。
- **Plus Jakarta Sans (正文字体):** 现代、清晰的无衬线字体。用于说明文字和标签，确保品牌的诗意不牺牲可读性。

### 字体层级

| 层级 | 字体 | 字号 | 用途 |
|------|------|------|------|
| Display-LG | Noto Serif SC | 3.5rem (56px) | "命运揭晓" (如 "The Midnight Feline") |
| Headline | Noto Serif SC | 2.5rem-3.5rem | 页面标题、结果名称 |
| Title | Noto Serif SC | 1.75rem-2rem | 卡片标题、模块标题 |
| Body-LG | Plus Jakarta Sans | 1.125rem (18px) | 叙述性内容、故事文字 |
| Body | Plus Jakarta Sans | 1rem (16px) | 常规正文 |
| Label-MD | Plus Jakarta Sans | 0.75rem (12px) | 全大写标签，letter-spacing: 0.05em |

---

## 5. 组件规范

### 5.1 卡片 (Cards)

**设计意图：** 如同"命运卡组" (Fortune Deck)

- **圆角:** 始终使用 `xl` (3rem/48px)，夸张的圆角显得有机且安全
- **内边距:** 1.5rem (24px)
- **禁止** 使用分割线。使用 `body-sm` 间距 (0.75rem) 来分隔卡片内各部分
- **交互:** 悬停/点击时，卡片应轻微放大 (scale 1.02x) 而非变暗

```css
.card {
  background: var(--color-surface-container-lowest);
  border-radius: 3rem; /* xl */
  padding: 1.5rem;
  box-shadow: 0 32px 64px rgba(114, 85, 61, 0.06); /* Whisper Shadow */
  transition: transform 300ms ease-out;
}
.card:hover {
  transform: scale(1.02);
}
```

### 5.2 按钮 (Buttons)

**主要按钮 (Primary)**
```css
.btn-primary {
  background: var(--color-primary);
  color: var(--color-on-primary);
  border-radius: 9999px; /* full */
  padding: 1rem 2.5rem;
  font-weight: 700;
  font-size: 1.125rem;
  box-shadow: 0 10px 40px rgba(114, 85, 61, 0.15);
  transition: transform 300ms ease-out, box-shadow 300ms ease-out;
}
.btn-primary:hover {
  transform: scale(1.02);
}
.btn-primary:active {
  transform: scale(0.95);
}
```

**次要按钮 (Secondary)**
```css
.btn-secondary {
  background: transparent;
  border: 1px solid var(--color-outline-variant);
  color: var(--color-primary);
  border-radius: 9999px;
  padding: 1rem 2.5rem;
  font-weight: 700;
}
.btn-secondary:hover {
  background: var(--color-surface-container-low);
}
```

**幽灵按钮 (Ghost/Tertiary)**
```css
.btn-ghost {
  background: transparent;
  color: var(--color-primary);
  text-decoration: underline;
  text-underline-offset: 4px;
  opacity: 0.8;
}
```

### 5.3 选择 Chips (Selection Chips)

用于展示性格特质标签

```css
.chip {
  background: var(--color-surface-container-high);
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-primary);
  transition: all 300ms ease-out;
}
.chip-active {
  background: var(--color-primary-fixed); /* 类别强调色 */
  color: var(--color-on-primary-fixed);
}
```

### 5.4 导航栏 (Navigation)

**顶部导航 (TopNav)**
```css
.top-nav {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 50;
  background: rgba(252, 249, 244, 0.4);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}
```

**底部导航 (BottomNav)**
```css
.bottom-nav {
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 50;
  border-radius: 3rem 3rem 0 0;
  background: rgba(252, 249, 244, 0.8);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  box-shadow: 0 -8px 32px rgba(114, 85, 61, 0.06);
}
```

---

## 6. 间距系统

我们使用宽松的间距系统以防止界面显得拥挤：

| 层级 | 值 | 用途 |
|------|-----|------|
| Tight | 0.5rem (8px) | 标签与图标之间 |
| Standard | 1.5rem (24px) | 卡片内部间距 |
| Editorial | 3rem (48px) | 区块间距和"命运"结果分隔 |

---

## 7. 移动端优先响应式策略

### 断点

| 断点 | 宽度 | 用途 |
|------|------|------|
| 默认 | < 768px | 移动端 (Mobile-first) |
| md | >= 768px | 平板 |
| lg | >= 1024px | 桌面 |

### 核心策略

- 移动端布局为默认设计，桌面端进行增强
- 使用 `max-w-screen-xl` 约束最大内容宽度
- 移动端底部导航默认显示，桌面端可选隐藏
- 图片和卡片在桌面端可并排排列，移动端堆叠显示

---

## 8. Web 和移动端适配指南

### 色彩适配

暗色模式通过反转 `on-surface` 文字颜色和调整背景透明度实现：

```css
@media (prefers-color-scheme: dark) {
  --color-background: #1c1c19;
  --color-surface: #1c1c19;
  --color-on-surface: #f3f0eb;
  --color-primary: #e6bfa2; /* 使用浅色主色以在暗色背景上保持可见性 */
  /* ... 其他 token 相应调整 */
}
```

### 深度实现原则

传统投影对此体验过于强烈。我们通过**叠加原则**实现深度：

1. **色调叠加 (Tonal Stacking):** 将 `surface-container-lowest` 卡片叠加在 `surface-container-low` 背景上。这仅通过颜色值就创造出自然的"抬起"效果。

2. **环境阴影 (Ambient Shadows):** 对于交互式浮动元素，使用"低语阴影"：
   - 模糊: 32px 到 64px
   - 透明度: 4% 到 8%
   - 颜色: `on-surface` 的调色版本 (绝不使用纯黑)

3. **幽灵边框 (Ghost Border):** 如果无障碍要求需要描边，使用 `outline-variant` 的 15% 透明度。绝不使用高对比度描边。

4. **玻璃态 (Glassmorphism):** 对于叠加层或导航栏，使用 40% 透明度 `surface` 颜色配合 `backdrop-filter: blur(20px)`。允许背景的"命运"色彩柔和地渗透进 UI。

---

## 9. 动画原则

### 核心动画

| 动画类型 | 时长 | 缓动 | 用途 |
|----------|------|------|------|
| 微交互 | 200-300ms | ease-out | 按钮悬停、点击反馈 |
| 状态切换 | 300-500ms | ease-out | 卡片悬停、内容切换 |
| 入场动画 | 400-600ms | ease-out | 页面切换、元素进入 |
| 变形动画 | 500-700ms | ease-in-out | 图片悬停缩放 |

### 页面切换动画 (Framer Motion)

```tsx
// 页面入场
<motion.main
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.4, ease: "easeOut" }}
>
```

### 交互反馈

- **按钮点击:** `scale(0.95)` → `scale(1.0)`
- **按钮悬停:** `scale(1.02)`, 阴影增强
- **卡片悬停:** `scale(1.02)`, 微妙阴影加深
- **图片悬停:** `scale(1.1)`, 持续 500-700ms

---

## 10. 品牌标识与吉祥物

### 品牌字体 (Logo)

```css
.logo {
  font-family: "Noto Serif SC", serif;
  font-style: italic;
  font-size: 1.5rem-2rem;
  letter-spacing: -0.02em;
  color: var(--color-primary);
}
```

### Material Symbols

使用 Google Material Symbols (Outlined variant)，24px 规格：

```css
.material-symbols-outlined {
  font-variation-settings:
    "FILL" 0,
    "wght" 400,
    "GRAD" 0,
    "opsz" 24;
  display: inline-block;
  line-height: 1;
}
```

---

## 11. 禁止事项 (Do's and Don'ts)

### Do
- **使用** 有意的留白。让字体像奢侈品杂志一样呼吸。
- **重叠** 图片。让宠物照片略微"突破"其容器卡片的边界，营造定制感。
- **使用** "柔和" 图像。照片应具有高调灯光或暖色滤镜以匹配米色基调。

### Don't
- **不要** 使用 90 度直角。所有元素必须圆角 (`md` 比例或更高) 以保持"共情"基调。
- **不要** 使用纯黑 (`#000000`) 作为文字。使用 `on-surface` (`#1c1c19`) 保持柔和的纸上墨迹感。
- **不要** 使用标准"系统"图标。使用细描边、手绘或定制策划的图标。
- **不要** 使用分割线或水平线。使用垂直间距来分隔不同想法。

---

## 12. 设计资源

### 图标
- Material Symbols Outlined (Google Fonts)
- 变体设置: FILL 0, wght 400, GRAD 0, opsz 24

### 字体
- Noto Serif SC (Google Fonts)
- Plus Jakarta Sans (Google Fonts)

### 渐变

```css
/* 命运渐变 - 用于 Hero 区域 */
.fate-gradient {
  background: radial-gradient(circle at 50% 30%, #6b4e37 0%, #2c2420 100%);
}

/* 命运渐变背景 */
.fate-gradient-bg {
  background:
    radial-gradient(circle at top right, #e8c9a0 0%, transparent 40%),
    radial-gradient(circle at bottom left, #72553d20 0%, transparent 40%);
}

/* 猫咪类别混合 */
.cat-category-blend {
  background: linear-gradient(
    180deg,
    rgba(44, 36, 32, 0.05) 0%,
    rgba(107, 78, 55, 0.1) 100%
  );
}
```

---

*本设计系统是一份活文档，旨在指导创建一种尊重人类与宠物之间纽带的灵魂化、高端数字旅程。*
