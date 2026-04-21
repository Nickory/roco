# GitHub Pages 发布步骤

## 1) 推送仓库

已包含静态页面，可直接发布。

## 2) 开启 Pages

1. 进入仓库 `Settings` -> `Pages`
2. `Build and deployment` 里选择：
   - Source: `Deploy from a branch`
   - Branch: `main` / `root`
3. 保存后等待发布完成

## 3) 配置全站真实排行

1. 按 `cloudflare-worker/README.md` 部署 Worker
2. 把 Worker 的 `/stats`、`/hit` 地址写到 `assets/js/ranking-config.js`
3. 提交并推送

完成后，GitHub Pages 提供前端页面，Cloudflare Worker + KV 提供全站共享排行数据。
