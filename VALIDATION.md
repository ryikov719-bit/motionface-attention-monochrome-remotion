# 验证记录

2026-10-07，Node.js 26.6.0，Remotion 4.0.533，macOS arm64。

- npm run lint：ESLint 与 TypeScript 通过。
- npm run build：完整 bundle 生成。
- AttentionLandscape：1920×1080、30 fps、368 帧，约 12.27 秒；已完整渲染并检查关键帧。
- SVG 重建了原片的卡片、硬币、手、曲线图、人物及转盘；横版重新构图，无竖版拉伸或黑边填充。
- imagegen 图标：1536×1024 RGBA，alpha 范围 0–254，格子角点 alpha=0；透明通道保留。
- YAML/JSON/源码中未包含绑定 token 或下载签名。
- npm audit 的 10 个 high 来自 ESLint 开发依赖 braces 链，无上游自动修复版本；未进行不兼容强制升级。

- 精修 UI：收细边框、统一石墨灰字幕和大会页眉，移除漂浮角色；检查开场图标、输入界面及 PPT 结果帧。
- 精修图标：使用 imagegen v2 原始 RGBA 素材，保持 1536×1024 和六类任务布局。
- 参考动效全片 FFmpeg 解码通过。
- GitHub 仓库已创建并验证 visibility=PUBLIC；远端 main 与本地最终提交一致。
- MotionFace 绑定 HTTP 200，响应 recording_id 为 772dd12b-cd28-4635-a41d-207f9939c0a4，github_url 为 https://github.com/ryikov719-bit/motionface-attention-monochrome-remotion，逐项匹配成功。

- YamahaMonochrome 最终主片：H.264/AAC、1920×1080、30 fps、3846 帧、128.2 秒；字幕与已确认配音保留，音量规范至目标 -16 LUFS。
- 源码、依赖锁文件、字体许可与生成素材已提交；全 Git 历史及跟踪文件的绑定凭证/签名扫描通过。

## BGM 更新

采用已核实来源的 Cipher / Kevin MacLeod（CC BY 3.0），剪辑、EQ、自动 ducking 和淡入淡出均记于 public/audio/mix-record.json。人声、字幕和 128.2 秒章节时间不变，片尾及 public/audio/CREDITS.txt 保留署名。Remotion lint 和 build 通过。

## 舒缓配乐修订

因用户反馈电子配乐过吵，替换为 Almost in F / Kevin MacLeod（CC BY 4.0），原人声不变。背景音轨约 -42.5 LUFS，比上一版约低 10 dB；配乐去低频轰鸣、限制高频、2 kHz 避让及缓慢 ducking，128.2 秒版本全片解码通过。Remotion lint/build 通过，音乐署名更新为 4.0。

## 大会界面设计修订

新增黑蓝渐变背景、低对比网格与仪表线、青色重点、图文能力卡片、输入页任务标签/流程和高亮导航。检查开场、输入、PPT 成品帧，文字无重叠裁切。ESLint/TypeScript 和 bundle 通过。主片仍为 3846 帧/128.2 秒，最终文件沿用舒缓配乐版的原音轨。

## 暖米白 / 鼠尾草绿参考风格

统一浅色界面、细线工作流、圆角与柔和阴影。imagegen 六图标 atlas RGBA 1536×1024、alpha 0–254。检查输入、能力概览、培训及海报预览。内容顺序、字幕、帧率和章节时长不变。ESLint/TypeScript 通过。

## 2026-10-08 · 全片立体书改版

YamahaBook 已完整渲染：H.264、1920×1080、30 fps、3846 帧、128.2 秒。ESLint/TypeScript、Remotion bundle 与完整 FFmpeg 解码通过。检查开场、台账汇总、企业微信培训、视频时间线、海报延展、权限审核与收尾关键帧；修复层叠培训页遮字、开场边缘裁切与简报段文字溢出。

最终交付音轨从上一版已确认氛围混音成片无重编码复制；两版音频流 SHA256 均为 `95a82864a2a0481c12b49d0c99d9bfadafa2302ca41b77f59a3581c3c85dc91d`。保留原配音、字幕时序和 BGM 音量。

参考 popup-book-constraints 的纸张层次、折页、连续镜头方向；独立 CSS 3D 实现，没有复制其代码与素材。第二个参考 ygahmd-cell/remotion 返回 404，未采用。原公开仓库和 MotionFace 绑定继续沿用，未修改他人绑定。
