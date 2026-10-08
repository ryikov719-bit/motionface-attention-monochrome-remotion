# 雅马哈 IT 担当者大会 · AI 工作立体书

最新主片选择 **YamahaBook**：1920×1080、30 fps、128.2 秒。以贯穿全片的立体书和连续镜头讲解数据整理、软件培训、PPT/演示视频、海报延展及审核。保留已确认的中文配音与舒缓氛围混音。

```bash
npm ci
npm run dev
# 在 Studio 选择 YamahaBook
npm run render:book
```

输出 `out/yamaha-popup-book.mp4`。`npm run lint` 检查代码，`npm run build` 生成 bundle。

参考 [popup-book-constraints](https://github.com/nolangz/popup-book-constraints) 的纸张折叠、立体展开、层次与镜头语言，独立用 Remotion + CSS 3D 实现。未复制参考仓库代码或素材，并非 Three.js 原项目移植。第二个参考仓库 `ygahmd-cell/remotion` 在本次检查时返回 404，未采用其中内容。

`src/BookExplainer.tsx` 为新版主片；`BOOK_SHOT_PLAN.md` 记录逐章动作。所有动画由帧计算，支持确定性定位。`public/icons/it-sage-sprite.png` 是已生成的纸感六类图标，原始透明素材保留。`public/audio/approved-ambient-mix.m4a` 是已确认配音与 Almost in F 的完整混音；音乐署名见 `public/audio/CREDITS.txt`，字体许可见 `public/fonts/`。界面、数据与文件为可编辑的演示示例。

旧版与原参考动效继续保留，以下为历史实现说明。

---

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

## BGM 混音

大会主片已换为 Almost in F / Kevin MacLeod 的轻柔氛围配乐（CC BY 4.0）。完整来源与署名见 public/audio/CREDITS.txt，片尾也含署名。public/audio/it-summit-ambient-ducked.wav 已按已确认配音预烘焙自动降音量、2 kHz 避让和首尾淡化；更换配音后需重新生成 ducking。配音与章节时长保持不变。

## 大会界面设计修订

新增 src/VisualTheme.tsx：低对比网格、缓慢仪表线、黑蓝渐变和冷青色强调。开场采用图文卡片，输入页含任务标签和三步流程，工作台采用带序号的高亮导航；内容与字幕时序不变。最终视觉修订成片沿用上一版舒缓配乐成片的完整音轨，避免改变已调整混音。

## 暖米白 / 鼠尾草绿参考风格

根据用户提供的风格图，将大会主片改为暖米白底、白色细边、柔和阴影、鼠尾草绿/淡紫/浅黄卡片，用细线连接输入、智能体和成品。imagegen 重新生成 public/icons/it-sage-sprite.png（1536×1024 RGBA），旧图标保留。src/SoftArtwork.tsx 统一生成可编辑的 PPT 封面、工作流图和海报方案，取代主片内旧金属效果图；src/VisualTheme.tsx 定义浅色背景和连接线。
