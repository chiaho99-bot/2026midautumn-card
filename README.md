# 月宮抽祝福：中秋互動賀卡

四位月宮居民（嫦娥、玉兔、吳剛、蟾蜍）各有一張可愛插圖、一段故事和一句中英雙語祝福。
每位居民有專屬連結，例如 `https://<帳號>.github.io/<倉庫>/#chang`。

純靜態網頁，沒有需要安裝或編譯的東西。

## 上架到 GitHub Pages

1. 在 GitHub 建一個新倉庫（例如 `midautumn-card`）。
2. 把這個資料夾裡的檔案全部上傳，`index.html` 要放在最外層。
3. 到倉庫的 **Settings → Pages**，Source 選 **Deploy from a branch**，Branch 選 `main`、資料夾選 `/ (root)`，按 Save。
4. 約一兩分鐘後，網址會是 `https://<帳號>.github.io/<倉庫>/`。

注意：倉庫和網頁是公開的，`assets/photo.jpg` 裡的照片任何人都看得到。

## 點擊統計（選用，記到 Google 試算表）

網頁本身不顯示次數。要統計的話，用 Google Apps Script 接一個小小的接收端：

1. 開一份 Google 試算表，選單 **擴充功能 → Apps Script**。
2. 把 `apps-script/Code.gs` 的內容整份貼上，儲存。
3. 在編輯器上方選擇函式 `setup`，按 **執行**（第一次會要求授權），會建立「紀錄」與「統計」兩個分頁。
4. 右上角 **部署 → 新增部署作業 → 類型選「網頁應用程式」**：執行身分選「我」，誰可以存取選「所有人」，按部署，複製網頁應用程式網址。
5. 打開 `index.html`，找到 `var COUNT_ENDPOINT = "";`，貼上剛剛的網址，重新上傳。

之後每次有人點選插圖，「紀錄」分頁會多一列，「統計」分頁自動算出每位居民的次數。
用專屬連結直接打開不算一次點擊。

## 檔案

- `index.html`：整個網頁（樣式和程式都在裡面）
- `assets/photo.jpg`：署名卡上的照片
- `apps-script/Code.gs`：點擊統計的接收端（選用）
