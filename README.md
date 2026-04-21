# Roco Spirit Match

一个离线可运行的《洛克王国》精灵人格测试静态项目（SBTI 风格改造版）。

## 当前版本重点

- SBTI 风格体验：短路径双选题、类型代码化结果、相近结果展示。
- 精灵库升级：主流高人气 + 扩展系列 + 隐藏系列（噩梦 / 圣域 / 深渊）。
- 匹配模型升级：维度距离 + 人气权重 + 隐藏系列触发规则。
- 分享能力升级：
  - 导出 PNG 结果卡
  - 复制结果文案
  - 复制分享链接（hash 直达结果）
  - 系统分享（支持 Web Share 的环境）
- 官方图鉴同步能力：
  - 支持从 BWIKI MediaWiki API 批量拉取精灵页
  - 解析信息框并生成全量 JSON
  - 自动下载真实立绘到本地目录

## 目录结构

- `index.html`：页面结构与入口
- `assets/css/style.css`：样式文件（简洁化视觉）
- `assets/js/app.js`：测试流程、匹配算法、分享链路、精灵库扩展逻辑
- `assets/data/spirits.json`：基础本地精灵条目
- `assets/data/spirits.full.json`：官方图鉴批量生成的全量精灵数据
- `assets/data/spirits.inline.js`：本地直开兜底数据
- `assets/spirits/`：本地精灵图片素材
- `assets/spirits_full/`：从官方图鉴批量下载的真实精灵立绘
- `assets/ui/`：图标、Logo、海报等 UI 资源
- `SOURCES.md`：素材来源清单
- `scripts/build_spirits_full.py`：全量数据与图片同步脚本

## 运行方式

完整解压 ZIP 后，双击打开 `index.html` 即可。

若浏览器限制 `file://` 读取，建议在项目目录启动本地服务：

```bash
python3 -m http.server
```

## 一键同步全量图鉴与图片

```bash
python3 scripts/build_spirits_full.py
```

脚本会输出：

1. `assets/data/spirits.full.json`
2. `assets/spirits_full/` 下的真实立绘图片

## 全站真实人气排行（可选）

默认会用浏览器本地统计排行。  
如果你要“全站所有用户共享同一份真实排行”，需要接一个云端统计接口：

1. 复制 `assets/js/ranking-config.example.js` 为 `assets/js/ranking-config.js`
2. 填写：
   - `window.__RANKING_STATS_URL__`
   - `window.__RANKING_HIT_URL__`
   - `window.__RANKING_TOKEN__`（可选）

接口约定：

- `GET stats` 返回：`{ totalTests, resultStats }`
- `POST hit` 请求体：`{ spiritId }`，返回同上

## 说明

1. 本项目中的图鉴链接来自公开可访问页面。
2. 本项目中的人格标签、匹配说明和隐藏触发逻辑属于玩法设计，不代表官方设定。
3. 若要继续扩充精灵条目，可在 `assets/js/app.js` 的 `EXTENDED_SPIRITS` 中追加条目，或扩充 `assets/data/spirits.json`。
