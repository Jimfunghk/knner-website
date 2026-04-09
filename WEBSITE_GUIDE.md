# Knner Website 文檔

## 架構概覽

```
┌─────────────────────────────────────────────────────────────┐
│                    本地電腦                                │
│              D:\knotwhisper\website\                       │
│                  (React 源代碼)                            │
│                     git push                               │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ↓
┌─────────────────────────────────────────────────────────────┐
│                      GitHub                                │
│         https://github.com/Jimfunghk/knner-website         │
│                      main branch                           │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ↓ (兩邊都會 detect 到 push)
        ┌─────────────┴─────────────┐
        ↓                           ↓
┌───────────────┐           ┌───────────────┐
│  GitHub Pages │           │    Vercel     │
│  (備份/慢)    │           │  (主要/快)    │
│               │           │               │
│ jimfunghk.    │           │ knner-website.│
│ github.io/    │           │ vercel.app ✅  │
│ knner-website │           │               │
└───────────────┘           └───────┬───────┘
        │                          │
        └──────────┬───────────────┘
                   ↓
         ┌─────────────────────────────────┐
         │       Cloudflare                  │
         │   (CDN + Domain Routing)         │
         │                                  │
         │   knner.com → Vercel             │
         └─────────────────────────────────┘
```

## Hosting 現況

| URL | Hosting | 用途 | 狀態 |
|-----|---------|------|------|
| `knner-website.vercel.app` | Vercel | 主要網站 | ✅ 正常 |
| `jimfunghk.github.io/knner-website/` | GitHub Pages | 備份 | ⚠️ 指向舊頁面 |
| `knner.com` | Cloudflare → Vercel | 用戶訪問入口 | ✅ 正常 |

## 以後點做

### 1. 改網頁
修改 `website/src/` 入面嘅 `.tsx` 檔，例如：
- `src/sections/Hero.tsx` - 主要標題區
- `src/sections/Download.tsx` - 下載區
- `src/sections/Story.tsx` - 故事區
- 其他 components

### 2. Commit + Push
```bash
cd D:\knotwhisper\website
git add .
git commit -m "描述改動"
git push
```

### 3. 等 Vercel Deploy
通常 1-2 分鐘完成。

### 4. 驗證
- 主要網站：https://knner-website.vercel.app/
- 用戶入口：https://knner.com/

## 常見問題

### Q: 點解 `knner.com` 顯示舊頁面？
A: Cloudflare cache 問題。去 Cloudflare Dashboard → Caching → Purge Everything

### Q: 點解 Vercel deploy 失敗？
A: 可能係 TypeScript build error。去 Vercel Deployments 睇 Build Logs

### Q: 係咪需要郁 GitHub Pages？
A: 不需要，Vercel 係主要 hosting。GitHub Pages 只係備份。

## 重要提醒

- **唔好刪除 `website/vercel.json`** - Vercel 需要呢個嚟行 API
- **唔好刪除 `website/api/` folder** - 包含 license key 驗證 API
- **root `index.html` 已刪除** - 確保 GitHub Pages 唔會 serving 舊 static HTML

## 技術棧

- React + TypeScript
- Vite (build tool)
- Tailwind CSS
- Vercel (hosting + API)
- Cloudflare (DNS/CDN)

## 聯絡

如有問題，檢查順序：
1. Vercel deploy status → https://vercel.com/jimfunghk-6107/knner-website
2. GitHub Actions → https://github.com/Jimfunghk/knner-website/actions
3. Cloudflare DNS settings → https://dash.cloudflare.com/
