# Attention — Monochrome Motion / 16:9

Remotion 重建 MotionFace 片段 `772dd12b-cd28-4635-a41d-207f9939c0a4`，参考其黑白金属材质、柔光、数字增长、悬浮硬币、收益卡片、转盘和 CREATE TO EARN 收尾，重新构图为 1920×1080 的横版。

## 运行与渲染

Node.js 22 或更新版本。已使用 Node.js 26.6.0、Remotion 4.0.533 验证。

```bash
npm ci
npm run dev
```

选择 `AttentionLandscape`。渲染：

```bash
npm run render
```

输出 `out/attention.mp4`，H.264，1920×1080，30 fps，368 帧，约 12.27 秒。

```bash
npm run lint
npm run build
```

## 结构与参考分析

- `src/Attention.tsx`：SVG 金属卡片、硬币、手、图表、人物、转盘、渐变、柔光与帧驱动动画。
- `src/Root.tsx`：可编辑 composition 的尺寸、帧率、长度。
- `public/fonts/`：Noto Sans SC 开源字体及 SIL OFL 许可证。

原参考为 720×1280、30 fps、约 12.26 秒。0–2.2 秒数字与悬浮金属卡片；2.05–4.35 秒黑白转换、落币与手托硬币；4.15–7.15 秒 Money / Reach 收益图表及币堆；7–10.6 秒转盘和人物；10.25 秒开始 CREATE TO EARN。

字体采用粗无衬线，颜色控制在黑、白、灰阶；用渐变、反光、软阴影、光晕和细微噪点重建材质。为横版重新安排物体位置与大小，避免把竖版画面拉伸或放在中央加黑边。

这是可编辑的视觉重建：保留核心构图元素、材质方向和动画顺序，局部文字、物体几何和轨迹重新绘制。使用 SVG 的 2.5D 表现，没有复制原片像素，也未复制原音轨。动画由当前帧计算，支持定位任意帧和确定性渲染。

[参考公开片段页面](https://motionface.cc/?recording=772dd12b-cd28-4635-a41d-207f9939c0a4)。仓库不包含原参考视频、签名下载地址或绑定凭证。

完整验证与绑定结果见 `VALIDATION.md`。

## 大会主片与生成图标

新增 YamahaMonochrome：1920×1080、30 fps、128.2 秒，沿用用户已确认的中文配音。外层界面改为黑白金属/玻璃质感，展示输入需求、生成任务计划、文件、PPT 翻页、视频时间线、海报与审核流程。生成图标用于任务标题、生成文件及开场六类能力展示；已有生成效果图在界面中以灰阶呈现。

```bash
npm run render:yamaha
```

public/icons/it-metal-sprite-v2.png 为 imagegen 生成的 1536×1024 透明 PNG，三列两行，每格 512×512，依次为数据整理、培训 PPT、视频制作、海报物料、权限审核、AI 对话。没有品牌标志或字体。src/IconAsset.tsx 通过 SVG 视口读取单个图标，原图和 alpha 不经过编辑；manifest.json 记录各图标区域。

主片界面、数据和文件均为演示示例，内容需担当者检查。参考动效单独保留在 AttentionLandscape。

精修版采用石墨灰、拉丝银及烟灰玻璃材质，统一细边框、暗色字幕和大会页眉，减少装饰性角色。第一版图标保留为素材历史。
