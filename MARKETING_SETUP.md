# Knner 營銷素材設置指南

## ✅ 已創建的營銷組件

### 1. Facebook Pixel
- **檔案**: `src/components/FacebookPixel.tsx`
- **功能**: 追蹤網站訪客行為

### 2. Social Proof Section
- **檔案**: `src/components/SocialProof.tsx`
- **功能**: 用戶數量、用家見證、Trust Badges

### 3. Screenshots Section
- **檔案**: `src/sections/Screenshots.tsx`
- **功能**: 展示 App 截圖（需要替換 placeholder）

### 4. Demo Video Section
- **檔案**: `src/sections/DemoVideo.tsx`
- **功能**: 嵌入 30 秒介紹影片

---

## 📋 Facebook Pixel 安裝指南

### Step 1: 創建 Facebook Pixel
1. 前往 [Facebook Business Suite](https://business.facebook.com/)
2. 進入 "Events Manager"
3. 點擊 "Connect Data Sources" → "Web"
4. 選擇 "Facebook Pixel" → "Continue"
5. 輸入 Pixel 名稱（如：Knner Website）
6. 複製 Pixel ID（格式：XXXXXXXXXX）

### Step 2: 替換 Pixel ID
在 `src/components/FacebookPixel.tsx` 中替換：
```tsx
// 將 YOUR_PIXEL_ID 替換為實際的 Pixel ID
<FacebookPixel pixelId="YOUR_PIXEL_ID" />
```

### Step 3: 在 App.tsx 中啟用
確保 `App.tsx` 中有引入並使用：
```tsx
import { FacebookPixel } from '@/components/FacebookPixel';

// 在 JSX 中添加（在 ThemeProvider 內）
<FacebookPixel pixelId="YOUR_PIXEL_ID" />
```

### Step 4: 追蹤 Events
在需要追蹤的位置調用：
```tsx
import { trackEvent } from '@/components/FacebookPixel';

// 用戶點擊下載
trackEvent('Lead', { content_name: 'Download Button' });

// 用戶完成購買
trackEvent('Purchase', { value: 39, currency: 'HKD' });
```

---

## 📸 Screenshots 設置指南

### 推薦截圖尺寸
- **桌面截圖**: 1920 x 1080 (16:9)
- **手機截圖**: 1080 x 1920 (9:16)

### 截圖位置
在 `src/sections/Screenshots.tsx` 中，每個截圖的 placeholder 需要替換為實際圖片：

1. 主要介面截圖
2. 設定頁面截圖
3. 用量追蹤截圖
4. 悬浮球模式截圖

### 建議工具
- Windows: Lightshot / Snipping Tool
- Mac: Cmd + Shift + 4
- 手機: 系統截圖功能

---

## 🎬 Demo Video 製作指南

### 推薦格式
- **長度**: 30-60 秒
- **格式**: MP4 (H.264)
- **平台**: YouTube / 直接托管

### 影片腳本（30秒）

**0-3秒**: 開場
> "你還在浪費時間打字嗎？"

**4-10秒**: 展示錄音功能
> 展示語音輸入 → 即時轉文字

**11-17秒**: 展示多語言
> 切換到不同語言，展示 100+ 語言

**18-24秒**: 展示離線功能
> 展示無網絡情況下仍可使用

**25-30秒**: CTA
> "立即免費試用 Knner！"

### 上傳影片
1. 創建 YouTube 頻道
2. 上傳影片（設為 "不公開" 或 "公開"）
3. 複製影片 URL
4. 在 `src/sections/DemoVideo.tsx` 中替換 iframe src

---

## 🌐 部署更新

完成設置後，部署到 GitHub Pages：

```bash
cd website
git add .
git commit -m "Add marketing components: Facebook Pixel, Social Proof, Screenshots, Demo Video"
git push
```

等待 GitHub Actions 完成部署（約 2-3 分鐘）。

---

## 📊 驗證設置

### 測試 Facebook Pixel
1. 安裝 [Facebook Pixel Helper Chrome Extension](https://chrome.google.com/webstore/detail/facebook-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc)
2. 訪問網站
3. 確認 PageView event 被觸發

### 測試 Screenshots
確認所有截圖正確顯示，沒有 placeholder 文字

### 測試 Video
確認影片可以正常播放

---

## 📞 幫助資源

- [Facebook Pixel 設置](https://www.facebook.com/business/help/952203354838751)
- [YouTube 上傳影片](https://support.google.com/youtube/answer/57407)
- [Tailwind CSS 文檔](https://tailwindcss.com/docs)