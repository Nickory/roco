# Cloudflare Worker (全站真实排行后端)

## 1) 前置准备

1. 安装 Wrangler: `npm i -g wrangler`
2. 登录 Cloudflare: `wrangler login`
3. 创建 KV:
   - `wrangler kv namespace create RANKING_KV`
   - `wrangler kv namespace create RANKING_KV --preview`
4. 把命令返回的 `id` / `preview_id` 填到 `wrangler.toml`

## 2) 可选：设置写入口令

- `wrangler secret put API_TOKEN`

## 3) 部署

- `wrangler deploy`

部署后会得到 Worker URL，例如：

- `https://roco-ranking.<your-subdomain>.workers.dev`

接口：

- `GET /stats`
- `POST /hit` body: `{ "spiritId": "spirit_3167" }`

## 4) 前端配置

修改 `/assets/js/ranking-config.js`：

```js
window.__RANKING_STATS_URL__ = 'https://roco-ranking.<your-subdomain>.workers.dev/stats';
window.__RANKING_HIT_URL__ = 'https://roco-ranking.<your-subdomain>.workers.dev/hit';
window.__RANKING_TOKEN__ = '和 API_TOKEN 一致（如果你设置了）';
```
