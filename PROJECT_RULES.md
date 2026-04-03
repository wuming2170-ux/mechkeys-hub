# MechKeys Hub 建站规则

## 项目信息
- **网站**: https://mechkeys-hub.vercel.app/
- **GitHub**: https://github.com/wuming2170-ux/mechkeys-hub
- **追踪ID**: mechkeyshub-20 (Amazon Associates)
- **主题**: 机械键盘产品评测与购买指南

---

## 一、导航结构规则

### 1.1 顶部导航（所有页面必须一致）

**HTML结构:**
```html
<header class="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-white/10">
    <div class="max-w-7xl mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
            <a href="/" class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xl">⌨️</div>
                <span class="font-bold text-xl">MechKeys Hub</span>
            </a>
            <nav class="flex items-center gap-1">
                <!-- 10个导航链接 -->
            </nav>
        </div>
    </div>
</header>
```

**10个导航链接（必须按此顺序）:**
| 链接 | 文件 | 图标 |
|------|------|------|
| Home | / | fa-home (indigo-400) |
| 60% | /60_percent.html | fa-th-large (indigo-400) |
| 65% | /65_percent.html | fa-th-large (indigo-400) |
| TKL | /tkl.html | fa-th (indigo-400) |
| Full Size | /full-size.html | fa-keyboard (indigo-400) |
| Brands | /brands.html | fa-tags (purple-400) |
| Best Value | /best-value.html | fa-fire (orange-400) |
| Switches | /switches.html | fa-toggle-on (amber-400) |
| Compare | /compare.html | fa-balance-scale (blue-400) |
| Guides | /guides.html | fa-book (green-400) |

**Nav CSS样式:**
```css
.nav-link {
    padding: 0.5rem 0.75rem;
    border-radius: 0.5rem;
    color: #d1d5db;
    font-size: 0.9375rem;
    font-weight: 500;
    transition: all 0.2s;
    white-space: nowrap;
}
.nav-link:hover {
    color: white;
    background: rgba(255, 255, 255, 0.1);
}
```

### 1.2 Footer链接
```
Home → /
Beginners Guide → /guide-beginners.html
Budget Guide → /guide-budget.html
Compare → /compare.html
```

---

## 二、页面结构规则

### 2.1 布局尺寸
- **最大宽度**: `max-w-7xl mx-auto`
- **内边距**: `px-4 py-4` (头部), `py-12 px-4` (内容区)
- **卡片圆角**: `rounded-2xl`
- **边框**: `border border-white/10`

### 2.2 颜色系统

**主色调 (Primary):**
- Primary: `#6366f1` (indigo-500)
- Primary Dark: `#4f46e5` (indigo-600)
- Accent: `#f59e0b` (amber-500)

**背景:**
- 渐变背景: `background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%);`
- 卡片背景: `bg-white/5` 或 `bg-slate-800/50`

**文字:**
- 主文字: 白色
- 次要文字: `text-gray-400`
- 链接: `text-indigo-400`

### 2.3 字体
- 主字体: `font-family: 'Inter', system-ui, sans-serif;`
- 标题: `font-bold`, 常用尺寸 `text-3xl`, `text-4xl`, `text-5xl`
- 正文: `text-base` 或 `text-sm`

### 2.4 卡片悬停效果
```css
.card-hover {
    transition: all 0.3s ease;
}
.card-hover:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(99,102,241,0.15);
}
```

---

## 三、品牌页面规则

### 3.1 文件命名
- 文件位置: `brand/[品牌名小写].html`
- 示例: `brand/keychron.html`, `brand/filco.html`

### 3.2 品牌页面必须包含

**头部:**
```html
<main class="max-w-7xl mx-auto px-4 py-10">
    <div class="mb-6">
        <a href="/brands.html" class="text-indigo-400 hover:underline text-sm">← All Brands</a>
    </div>

    <!-- Brand Header -->
    <div class="bg-gradient-to-r from-[color]-900/30 to-[color]-900/30 rounded-2xl p-8 mb-8 border border-[color]-500/30">
        <div class="flex items-center gap-6">
            <div class="w-20 h-20 bg-[color]-900/30 rounded-2xl flex items-center justify-center text-4xl border border-[color]-500/30">🇯🇵/🏆/⌨️</div>
            <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                    <h1 class="text-3xl font-bold text-[color]-400">[Brand Name]</h1>
                    <span class="bg-[color]-900/30 text-[color]-400 px-3 py-1 rounded-full text-sm font-semibold border border-[color]-500/30">[X] Products</span>
                </div>
                <p class="text-[color]-300 text-lg mb-2 opacity-80">[Tagline]</p>
                <p class="text-slate-300 max-w-2xl">[Description]</p>
            </div>
        </div>
    </div>
```

**产品卡片:**
- 使用与品牌主题色一致的 `border-[color]-500/50 hover` 效果
- 图片使用 Amazon CDN: `m.media-amazon.com/images/I/...`
- 必须有 Amazon 购买链接，带追踪 tag: `?tag=mechkeyshub-20`

### 3.3 品牌列表页 (brand/index.html)
- 显示所有品牌及产品数量
- 链接格式: `/brand/[品牌名小写].html`

---

## 四、产品数据规则

### 4.1 数据文件
- **主数据**: `inline-products-detailed.js` (334KB, 316+产品)
- **原始数据**: `all-products-collected.json`

### 4.2 产品字段
```javascript
{
    id: 1,
    name: "Product Name",
    tagline: "Short tagline",
    price: "$XX",
    price_tier: "budget|mid|high|premium",
    rating: "X.X",
    switch_type: "Cherry MX Red / Gateron / etc",
    layout: "60%|65%|TKL|Full Size",
    connectivity: "Wired|Bluetooth|USB-C",
    hot_swap: "Yes|No",
    rgb: "Yes|No",
    image: "https://m.media-amazon.com/images/I/...",
    url: "https://www.amazon.com/dp/ASIN?tag=mechkeyshub-20",
    brand: "BrandName",
    pros: ["Pro 1", "Pro 2"],
    description: "Description text",
    amazon_asin: "ASIN"
}
```

### 4.3 价格区间分类
- **Budget**: < $50
- **Mid**: $50-$100
- **High**: $100-$150
- **Premium**: > $150

---

## 五、爬虫规则

### 5.1 数据源
1. **SerpAPI** - Google 搜索结果
   - API Key: `cdd1aca98dbd77c0bff81297ff7dfa8242199466099c57ca22cd999497ed03c2`
   - 用于爬取 Amazon 产品搜索结果

2. **Amazon 直接爬取**
   - `amazon-crawler.js`
   - `serpapi-crawler.js` / `serpapi-crawler-v2.js`

### 5.2 爬取流程
1. 使用 SerpAPI 搜索关键词获取产品列表
2. 获取产品 ASIN
3. 爬取产品详情（价格、评分、图片）
4. 保存到 JSON 文件
5. 生成 inline-products-detailed.js

### 5.3 图片处理
- 使用 Amazon CDN: `m.media-amazon.com/images/I/...`
- 备用图片: `https://m.media-amazon.com/images/I/[ASIN]._AC_SX679_.jpg`

---

## 六、SEO 规则

### 6.1 Meta 标签
```html
<title>[Page Title] | MechKeys Hub</title>
<meta name="description" content="[Description under 160 chars]">
<link rel="canonical" href="https://mechkeys-hub.com/[page].html">
```

### 6.2 结构化数据
- Schema.org WebSite
- Schema.org Product (可选)
- BreadcrumbList

### 6.3 年份更新
- 每年1月1日更新所有 "2025" → "2026" 等
- 包括: title, description, h1, 按钮文字

---

## 七、Git 推送规则

### 7.1 提交信息格式
```
[类型] 简短描述

详细说明（可选）
- 修复内容1
- 修复内容2
```

### 7.2 常见提交类型
- `Fix`: 修复问题
- `Add`: 新增内容
- `Update`: 更新现有内容
- `Remove`: 移除内容

### 7.3 推送前检查
1. `git status` - 确认修改的文件
2. `git diff --stat` - 确认修改内容
3. `git push` - 推送到 GitHub
4. Vercel 会自动部署

---

## 八、Vercel 部署规则

### 8.1 自动部署
- GitHub push 后自动触发
- 无需手动部署

### 8.2 手动部署
```bash
cd ~/Desktop/mechkeys-hub
vercel --prod
```

### 8.3 常见问题
- 如遇推送失败，检查网络连接
- Vercel 登录失效需要重新登录

---

## 九、页面清单

| 页面 | 文件 | 说明 |
|------|------|------|
| 首页 | index.html | 产品列表 + 导航 |
| 60% | 60_percent.html | 60%布局产品 |
| 65% | 65_percent.html | 65%布局产品 |
| TKL | tkl.html | TKL布局产品 |
| 全尺寸 | full-size.html | 全尺寸产品 |
| 品牌中心 | brands.html | 所有品牌列表 |
| 品牌页 | brand/*.html | 各品牌专属页 |
| 最佳性价比 | best-value.html | 预算友好产品 |
| 轴体 | switches.html | 按轴体分类 |
| 对比 | compare.html | 产品对比功能 |
| 指南 | guides.html | 购买指南列表 |
| 指南详情 | guide-*.html | 各类指南文章 |

---

## 十、后续更新检查清单

新增内容时必须检查:
- [ ] 导航10个链接完整且顺序正确
- [ ] 导航图标颜色正确
- [ ] 导航样式一致（nav-link）
- [ ] Footer链接正确
- [ ] 所有页面年份一致（2026）
- [ ] Amazon链接带追踪tag
- [ ] 图片使用Amazon CDN
- [ ] 产品数据文件已更新
- [ ] Git提交信息清晰
- [ ] 推送到GitHub

---

*最后更新: 2026-04-03*
