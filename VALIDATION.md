# 验证记录

2026-10-07，Node.js 26.6.0，Remotion 4.0.533，macOS arm64。

- npm run lint：ESLint 与 TypeScript 通过。
- npm run build：完整 bundle 生成。
- AttentionLandscape：1920×1080、30 fps、368 帧，约 12.27 秒；已完整渲染并检查关键帧。
- SVG 重建了原片的卡片、硬币、手、曲线图、人物及转盘；横版重新构图，无竖版拉伸或黑边填充。
- imagegen 图标：1536×1024 RGBA，alpha 范围 0–254，格子角点 alpha=0；透明通道保留。
- YAML/JSON/源码中未包含绑定 token 或下载签名。
- npm audit 的 10 个 high 来自 ESLint 开发依赖 braces 链，无上游自动修复版本；未进行不兼容强制升级。

主片全片解码、公开仓库与绑定结果将进一步记录。
