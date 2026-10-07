import { SceneBackdrop, InputDetails } from "./VisualTheme";
import { IconAsset } from "./IconAsset";
import { AIInputPanel } from "./AIInput";
import React from "react";
import { Audio } from "@remotion/media";
import { AbsoluteFill, Sequence, staticFile, useCurrentFrame } from "remotion";
import scenes from "./yamaha-scenes.json";
import {
  FontStyles,
  InkBox,
  Label,
  palette,
  progress,
  smooth,
  Star,
} from "./design";

const prompts = [
  "",
  "整理各部门设备台账，生成汇总与异常清单。",
  "汇总设备台账，标记重复、缺失与过期设备。",
  "帮我做一个企业微信使用教程培训",
  "将这份 IT 工作简报制作成汇报 PPT 和演示视频。",
  "为 IT 担当者大会设计海报，并延展会场屏幕。",
  "检查这次任务的权限与执行记录。",
  "",
];
const plans = [
  [],
  ["读取 3 份台账", "统一字段与日期", "输出汇总和异常"],
  ["校验格式和重复", "汇总部门与设备", "生成图表和清单"],
  ["面向新同事 · 15 分钟", "登录 / 通讯录 / 群聊", "文件协作 / 会议 / 安全"],
  ["现状 → 问题 → 下一步", "生成 8 页 PPT 初稿", "制作分镜与字幕"],
  ["生成 3 个视觉方向", "调整标题与尺寸", "延展海报、通知、屏幕"],
  ["查看授权工具", "确认数据范围", "保留操作日志"],
  [],
];
const titles = [
  "AI 智能体，能帮 IT 做什么？",
  "从一句需求开始",
  "数据整理：从台账到洞察",
  "软件培训：从问题到教程",
  "PPT 与视频：从简报到成品",
  "海报物料：从需求到效果图",
  "先审核，再执行",
  "让重复工作更少，让 IT 价值更大",
];
const Cursor: React.FC<{ x: number; y: number; click?: boolean }> = ({
  x,
  y,
  click = false,
}) => (
  <g transform={`translate(${x} ${y})`}>
    <path
      d="M0 0v29l8-7l8 13l7-4l-8-12l12-2Z"
      fill="#dedede"
      stroke={palette.ink}
      strokeWidth="2"
    />
    {click && (
      <circle r="20" fill="none" stroke={palette.orange} strokeWidth="3" />
    )}
  </g>
);
const FileCard: React.FC<{
  name: string;
  type: string;
  x?: number;
  y?: number;
}> = ({ name, type, x = 322, y = 443 }) => (
  <g>
    <InkBox x={x} y={y} w={566} h={91} fill="#191b1d" radius={9} />
    <IconAsset
      index={type === "PPT" ? 1 : type === "IMG" ? 3 : 0}
      x={x + 45}
      y={y + 45}
      size={75}
    />
    <Label x={x + 96} y={y + 37} size={22}>
      {name}
    </Label>
    <Label x={x + 96} y={y + 62} size={15} fill={palette.muted}>
      ✓ 已生成初稿 · 点击打开检查
    </Label>
    <Label x={x + 528} y={y + 55} size={23}>
      ↗
    </Label>
  </g>
);

const Chat: React.FC<{ id: number; t: number }> = ({ id, t }) => {
  const typed = prompts[id - 1].slice(
    0,
    Math.floor(progress(t, 0.8, 3.3) * prompts[id - 1].length),
  );
  return (
    <g>
      <InkBox x={292} y={160} w={786} h={438} fill="#191b1d" radius={12} />
      <Label x={319} y={192} size={20}>
        AI 工作助手
      </Label>
      <Star x={469} y={183} />
      <Label x={1048} y={190} size={13} anchor="end" fill={palette.muted}>
        示例界面
      </Label>
      <path d="M312 206h746" stroke="#44474a" />
      <InkBox x={318} y={228} w={734} h={79} fill="#202326" />
      <Label x={337} y={260} size={21}>
        {typed.slice(0, 27)}
      </Label>
      <Label x={337} y={287} size={21}>
        {typed.slice(27)}
        {t < 3.5 && Math.floor(t * 3) % 2 === 0 ? "│" : ""}
      </Label>
      <circle cx={1021} cy={282} r={16} fill={palette.orange} />
      <Label x={1021} y={289} size={20} anchor="middle" fill="#dedede">
        ↑
      </Label>
      {t >= 3.6 && (
        <g opacity={progress(t, 3.6, 4.1)}>
          <Label x={338} y={340} size={19}>
            ✦ 正在拆解任务并使用工具…
          </Label>
          {plans[id - 1].map((v, i) => (
            <g key={v} opacity={progress(t, 4.5 + i * 0.65, 5 + i * 0.65)}>
              <InkBox
                x={334 + i * 239}
                y={361}
                w={222}
                h={56}
                fill={[palette.yellow, "#253034", "#292c34"][i]}
                radius={8}
              />
              <Label x={445 + i * 239} y={395} size={17} anchor="middle">
                {t > 6.5 ? "✓ " : ""}
                {v}
              </Label>
            </g>
          ))}
        </g>
      )}
      <InkBox x={318} y={548} w={734} h={34} fill={palette.paper} radius={7} />
      <Label x={335} y={571} size={14} fill={palette.muted}>
        继续描述你的需求…
      </Label>
      <Label x={1034} y={571} size={16} anchor="end">
        ＋
      </Label>
      {t >= 7 && (
        <g opacity={progress(t, 7, 7.5)}>
          <FileCard
            name={
              [
                "",
                "",
                "设备台账汇总.xlsx",
                "企业微信新同事培训.pptx",
                "IT 工作汇报.pptx",
                "IT 担当者大会视觉方案",
                "任务执行记录.json",
              ][id - 1] || "设备台账汇总.xlsx"
            }
            type={id === 4 || id === 5 ? "PPT" : id === 6 ? "IMG" : "XLS"}
          />
        </g>
      )}
    </g>
  );
};

const DataResult: React.FC<{ t: number }> = ({ t }) => (
  <g>
    <InkBox x={284} y={150} w={834} h={449} fill="#191b1d" />
    <Label x={310} y={185} size={23}>
      设备台账汇总.xlsx
    </Label>
    <Label x={1087} y={184} anchor="end" size={16}>
      ✓ 校验完成
    </Label>
    <path d="M304 199h792" stroke="#536b79" />
    {["设备清单", "汇总图表", "异常记录"].map((v, i) => (
      <g key={v}>
        <InkBox
          x={306 + i * 134}
          y={210}
          w={124}
          h={30}
          fill={
            i === (t < 11 ? 0 : t < 14 ? 1 : 2) ? palette.yellow : palette.paper
          }
          radius={5}
        />
        <Label x={368 + i * 134} y={231} anchor="middle" size={16}>
          {v}
        </Label>
      </g>
    ))}
    {t < 11 ? (
      <>
        <rect x="306" y="256" width="790" height="37" fill="#282b2e" />
        {["部门", "设备类型", "数量", "购入年份", "校验结果"].map((v, i) => (
          <Label key={v} x={320 + i * 153} y={281} size={17}>
            {v}
          </Label>
        ))}
        {["管理部", "生产部", "销售部", "研发部", "采购部", "信息系统"].map(
          (v, i) => (
            <g key={v}>
              <rect
                x={306}
                y={300 + i * 44}
                width={790}
                height={40}
                fill={i === 2 ? "#34312b" : i % 2 ? "#1c2024" : "#191b1d"}
              />
              <Label x={320} y={327 + i * 44} size={17}>
                {v}
              </Label>
              <Label x={473} y={327 + i * 44} size={17}>
                {i % 2 ? "工作站" : "笔记本"}
              </Label>
              <Label x={626} y={327 + i * 44} size={18}>
                {[24, 67, 38, 52, 19, 32][i]}
              </Label>
              <Label x={779} y={327 + i * 44} size={18}>
                {2024 - (i % 3)}
              </Label>
              <Label
                x={932}
                y={327 + i * 44}
                size={17}
                fill={i === 2 ? palette.orange : "#488d75"}
              >
                {i === 2 ? "重复 · 待确认" : "✓ 正常"}
              </Label>
            </g>
          ),
        )}
      </>
    ) : t < 14 ? (
      <>
        {["设备总数", "部门数量", "待确认异常"].map((v, i) => (
          <g key={v}>
            <InkBox
              x={309 + i * 263}
              y={261}
              w={245}
              h={89}
              fill={[palette.yellow, "#253034", "#302929"][i]}
            />
            <Label x={326 + i * 263} y={288} size={16}>
              {v}
            </Label>
            <Label x={326 + i * 263} y={330} size={37}>
              {["232", "6", "8"][i]}
            </Label>
          </g>
        ))}
        {[24, 67, 38, 52, 19, 32].map((v, i) => (
          <g key={i}>
            <rect
              x={357 + i * 114}
              y={546 - v * 2.4 * progress(t, 11, 12)}
              width={58}
              height={Math.max(1, v * 2.4 * progress(t, 11, 12))}
              rx={5}
              fill={i === 1 ? palette.orange : palette.mint}
            />
            <Label x={385 + i * 114} y={568} size={15} anchor="middle">
              {["管理", "生产", "销售", "研发", "采购", "IT"][i]}
            </Label>
          </g>
        ))}
      </>
    ) : (
      <>
        <Label x={322} y={285} size={26}>
          8 条异常，等待担当者确认
        </Label>
        {["重复资产编号：3 条", "购入日期缺失：2 条", "保修已过期：3 条"].map(
          (v, i) => (
            <g key={v}>
              <InkBox
                x={322}
                y={314 + i * 62}
                w={747}
                h={48}
                fill={i === 0 ? "#302929" : palette.paper}
              />
              <Label x={340} y={345 + i * 62} size={20}>
                {v}
              </Label>
              <Label x={1046} y={345 + i * 62} anchor="end" size={18}>
                查看 ↗
              </Label>
            </g>
          ),
        )}
        <Label x={324} y={553} size={17} fill={palette.muted}>
          检查数据口径与异常后，再导出正式报告。
        </Label>
      </>
    )}
  </g>
);

const PPTResult: React.FC<{ t: number; guide: boolean }> = ({ t, guide }) => {
  const page = Math.min(3, Math.floor(Math.max(0, t - 11) / 1.6));
  const head = guide
    ? [
        "企业微信 · 新同事培训",
        "01 登录与通讯录",
        "02 群聊与文件协作",
        "03 会议与安全设置",
      ][page]
    : [
        "IT 工作汇报",
        "01 当前工作现状",
        "02 关键问题与改善",
        "03 下一步行动计划",
      ][page];
  return (
    <g>
      <InkBox x={273} y={143} w={856} h={463} fill="#191b1d" />
      <Label x={293} y={176} size={19}>
        {guide ? "企业微信新同事培训.pptx" : "IT 工作汇报.pptx"}
      </Label>
      <Label x={1108} y={176} size={16} anchor="end">
        {page + 1} / {guide ? 10 : 8} 页 · 初稿
      </Label>
      <path d="M291 190h820" stroke="#597383" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <InkBox
            x={292}
            y={209 + i * 83}
            w={110}
            h={68}
            fill={i === page ? palette.yellow : "#192a35"}
            radius={5}
          />
          <Label x={346} y={239 + i * 83} anchor="middle" size={15}>
            {i + 1}
          </Label>
          <path
            d={`M307 ${253 + i * 83}h78m-78 7h53`}
            stroke="#5a7181"
            strokeWidth="2"
          />
        </g>
      ))}
      <InkBox
        x={424}
        y={207}
        w={682}
        h={365}
        fill={page === 0 ? "#242627" : "#191b1d"}
        radius={4}
      />
      <Label x={452} y={254} size={31} weight={700}>
        {head}
      </Label>
      <path d="M452 271h625" stroke={palette.orange} strokeWidth="4" />
      {page === 0 ? (
        <>
          <image
            href={staticFile("yamaha/training.png")}
            x="452"
            y="291"
            width="370"
            height="235"
            preserveAspectRatio="xMidYMid slice"
          />
          <InkBox x={843} y={310} w={231} h={161} fill={palette.mint} />
          <Label x={863} y={346} size={22}>
            {guide ? "15 分钟快速上手" : "从简报到表达"}
          </Label>
          <Label x={863} y={383} size={18}>
            流程清晰 · 示例具体
          </Label>
          <Label x={863} y={421} size={18}>
            逐页检查 · 修改初稿
          </Label>
        </>
      ) : (
        <>
          {[
            "了解目标与适用范围",
            "按步骤操作并观察结果",
            "遇到问题，联系 IT 支持",
          ].map((v, i) => (
            <g key={v}>
              <circle
                cx={473}
                cy={313 + i * 71}
                r={16}
                fill={[palette.yellow, palette.mint, palette.pink][i]}
              />
              <Label x={473} y={320 + i * 71} size={20} anchor="middle">
                {i + 1}
              </Label>
              <Label x={504} y={319 + i * 71} size={22}>
                {v}
              </Label>
            </g>
          ))}
          <InkBox x={882} y={301} w={194} h={199} fill="#253034" />
          <Label x={904} y={332} size={17}>
            操作示例
          </Label>
          <rect
            x="897"
            y="346"
            width="162"
            height="129"
            rx="7"
            fill="#191b1d"
            stroke={palette.ink}
          />
          <rect x="898" y="347" width="42" height="127" fill="#636b71" />
          <path
            d="M950 365h93m-93 24h73m-73 24h83m-83 24h51"
            stroke="#747b80"
            strokeWidth="8"
          />
          <Cursor x={1025} y={415} click />
        </>
      )}
      <Label x={454} y={549} size={15} fill={palette.muted}>
        示例页面 · 内容与操作步骤需担当者确认
      </Label>
      <Cursor x={1095} y={562} click={Math.floor(t * 2) % 3 === 0} />
    </g>
  );
};
const VideoResult: React.FC<{ t: number }> = ({ t }) => (
  <g>
    <InkBox x={275} y={143} w={856} h={463} fill="#191b1d" />
    <Label x={299} y={179} size={22}>
      IT 汇报演示视频 · 分镜与字幕
    </Label>
    <InkBox x={950} y={157} w={158} h={30} fill={palette.mint} />
    <Label x={1029} y={179} anchor="middle" size={16}>
      导出演示视频 ↗
    </Label>
    <image
      href={staticFile("yamaha/data.png")}
      x="299"
      y="203"
      width="555"
      height="246"
      preserveAspectRatio="xMidYMid slice"
    />
    <InkBox x={870} y={203} w={238} h={246} fill="#25282b" />
    <Label x={888} y={236} size={20}>
      分镜清单
    </Label>
    {["现状概览", "关键问题", "改善计划", "行动与分工"].map((v, i) => (
      <Label key={v} x={891} y={276 + i * 43} size={19}>
        {t > 12 + i * 0.4 ? "✓" : "○"} {v}
      </Label>
    ))}
    <path d="M298 476h805" stroke={palette.ink} />
    {Array.from({ length: 6 }, (_, i) => (
      <g key={i}>
        <InkBox
          x={298 + i * 134}
          y={489}
          w={126}
          h={51}
          fill={[palette.yellow, palette.mint, palette.pink][i % 3]}
          radius={5}
        />
        <Label x={311 + i * 134} y={521} size={15}>
          镜头 {i + 1}
        </Label>
      </g>
    ))}
    <InkBox x={299} y={550} w={804} h={25} fill="#3d424b" radius={4} />
    {Array.from({ length: 155 }, (_, i) => (
      <path
        key={i}
        d={`M${304 + i * 5} ${561 - Math.abs(Math.sin(i * 3)) * 7}v${Math.abs(Math.sin(i * 3)) * 14}`}
        stroke="#8c7eb4"
      />
    ))}
    <path
      d={`M${300 + progress(t, 13, 18) * 790} 477v104`}
      stroke={palette.orange}
      strokeWidth="2"
    />
  </g>
);
const PosterResult: React.FC<{ t: number }> = ({ t }) => (
  <g>
    <InkBox x={280} y={143} w={852} h={463} fill="#191b1d" />
    <Label x={302} y={179} size={22}>
      IT 担当者大会 · 视觉物料
    </Label>
    <Label x={1106} y={179} size={16} anchor="end">
      海报 / 通知图 / 会场屏幕
    </Label>
    <image
      href={staticFile("yamaha/poster.png")}
      x="303"
      y="201"
      width="232"
      height="348"
      preserveAspectRatio="xMidYMid slice"
    />
    <image
      href={staticFile("yamaha/banner.png")}
      x="559"
      y="201"
      width="550"
      height="309"
      preserveAspectRatio="xMidYMid slice"
    />
    <InkBox
      x={559}
      y={525}
      w={550}
      h={50}
      fill={t > 15 ? palette.mint : palette.yellow}
    />
    <Label x={833} y={557} size={20} anchor="middle">
      {t > 15 ? "✓ 品牌文字、尺寸与用途已检查" : "方向 A · 点击选择并延展尺寸"}
    </Label>
    {t > 10 && <Cursor x={1058} y={549} click={t < 11} />}
    <Label x={419} y={579} size={16} anchor="middle">
      AI 生成效果图
    </Label>
  </g>
);

const Chapter: React.FC<{ scene: (typeof scenes)[number] }> = ({ scene }) => {
  const f = useCurrentFrame();
  const t = f / 30;
  const id = scene.id;
  const open = t > 9.3;
  const caption = scene.captions.find(
    (c) => t >= c.start && t < c.start + c.duration,
  );
  const fade = Math.min(
    progress(t, 0, 0.35),
    1 - progress(t, scene.duration - 0.3, scene.duration),
  );
  return (
    <AbsoluteFill style={{ background: palette.paper }}>
      <svg viewBox="0 0 1280 720" width="100%" height="100%">
        <SceneBackdrop id={id} t={t} />
        <g
          opacity={fade}
          transform={`translate(${(1 - smooth(t, 0, 0.5)) * 25} 0)`}
        >
          <Label x={45} y={43} size={18} fill={palette.muted}>
            雅马哈 IT 担当者大会 · AI 智能体科普
          </Label>
          <Label x={1237} y={43} size={13} fill={palette.muted} anchor="end">
            IT SUMMIT / AI WORKFLOW
          </Label>
          <path d="M43 59h1194" stroke="#2b3c48" strokeWidth="1" />
          <path d="M43 59h250" stroke="url(#accentEdge)" strokeWidth="2" />
          <rect
            x={45}
            y={80}
            width={4}
            height={34}
            rx={2}
            fill={palette.orange}
          />
          <Label x={63} y={112} size={34} weight={600}>
            {titles[id - 1]}
          </Label>

          {id >= 2 && id <= 7 && (
            <IconAsset
              index={
                id === 2
                  ? 5
                  : id === 3
                    ? 0
                    : id === 4
                      ? 1
                      : id === 5
                        ? 2
                        : id === 6
                          ? 3
                          : 4
              }
              x={1165}
              y={100}
              size={80}
            />
          )}
          {id !== 1 && id !== 8 && (
            <>
              <InkBox x={44} y={159} w={211} h={439} fill="#191c1f" />
              <Label x={64} y={194} size={23}>
                任务工作台
              </Label>
              {[
                "对话与任务",
                "设备与数据",
                "培训与内容",
                "设计与物料",
                "审核与日志",
              ].map((v, i) => (
                <g key={v}>
                  {i ===
                    (id === 5 ? 2 : id === 6 ? 3 : id === 7 ? 4 : id - 2) && (
                    <rect
                      x={60}
                      y={218 + i * 53}
                      width={180}
                      height={41}
                      rx={9}
                      fill="#173441"
                      stroke="#315765"
                    />
                  )}
                  <Label
                    x={74}
                    y={245 + i * 53}
                    size={12}
                    fill={
                      i ===
                      (id === 5 ? 2 : id === 6 ? 3 : id === 7 ? 4 : id - 2)
                        ? palette.orange
                        : "#526c7a"
                    }
                  >
                    {String(i + 1).padStart(2, "0")}
                  </Label>
                  <Label
                    x={101}
                    y={246 + i * 53}
                    size={17}
                    fill={
                      i ===
                      (id === 5 ? 2 : id === 6 ? 3 : id === 7 ? 4 : id - 2)
                        ? "#e6f3f8"
                        : "#8ba0ad"
                    }
                  >
                    {v}
                  </Label>
                </g>
              ))}
              <Label x={64} y={538} size={15} fill={palette.muted}>
                工具已按任务授权
              </Label>
              <Label x={64} y={569} size={15} fill={palette.muted}>
                输出保留操作记录
              </Label>
            </>
          )}
          {id === 1 ? (
            <>
              <InkBox x={49} y={166} w={765} h={420} fill="#191b1d" />
              <image
                href={staticFile("yamaha/data.png")}
                x="62"
                y="179"
                width="739"
                height="393"
                preserveAspectRatio="xMidYMid slice"
              />
              <g opacity={smooth(t, 2, 3)}>
                <InkBox x={864} y={170} w={358} h={110} fill={palette.yellow} />
                <Label x={892} y={218} size={30}>
                  数据整理
                </Label>
                <Label x={891} y={256} size={20}>
                  表格 → 图表与报告
                </Label>
              </g>
              <g opacity={smooth(t, 3.5, 4.5)}>
                <InkBox x={864} y={304} w={358} h={110} fill={palette.mint} />
                <Label x={892} y={351} size={30}>
                  软件培训
                </Label>
                <Label x={891} y={390} size={20}>
                  步骤 → PPT 与演示
                </Label>
              </g>
              <g opacity={smooth(t, 5, 6)}>
                <InkBox x={864} y={438} w={358} h={110} fill="#2f3035" />
                <Label x={892} y={485} size={30}>
                  内容物料
                </Label>
                <Label x={891} y={524} size={20}>
                  需求 → 视频与海报
                </Label>
              </g>
            </>
          ) : id === 8 ? (
            <>
              <InkBox x={50} y={163} w={1176} h={420} fill="#191b1d" />
              {["判断", "协作", "改善"].map((v, i) => (
                <g key={v} opacity={smooth(t, 0.7 + i * 0.65, 1.4 + i * 0.65)}>
                  <InkBox
                    x={97 + i * 348}
                    y={207}
                    w={314}
                    h={231}
                    fill={[palette.yellow, palette.mint, "#eadbf6"][i]}
                  />
                  <Label x={254 + i * 348} y={326} size={57} anchor="middle">
                    {v}
                  </Label>
                  <Label x={254 + i * 348} y={390} size={20} anchor="middle">
                    {["确认目标与事实", "连接同事与工具", "把时间用于价值"][i]}
                  </Label>
                </g>
              ))}
              <Label x={107} y={527} size={31}>
                从一个具体任务开始，让智能体承担重复步骤。
              </Label>
            </>
          ) : id === 7 && t > 7 ? (
            <>
              <InkBox x={286} y={149} w={845} h={448} fill="#191b1d" />
              <Label x={310} y={187} size={25}>
                执行前审核
              </Label>
              {[
                "权限范围：仅使用已授权工具",
                "数据范围：示例设备台账",
                "操作记录：已保存任务日志",
              ].map((v, i) => (
                <g key={v}>
                  <InkBox
                    x={311}
                    y={215 + i * 71}
                    w={792}
                    h={55}
                    fill={["#253034", palette.yellow, "#292c34"][i]}
                  />
                  <Label x={332} y={249 + i * 71} size={22}>
                    ✓ {v}
                  </Label>
                </g>
              ))}
              <InkBox
                x={313}
                y={452}
                w={789}
                h={114}
                fill={t > 10 ? palette.mint : palette.paper}
              />
              <Label x={337} y={495} size={26}>
                {t > 10 ? "✓ 担当者确认，开始执行" : "等待担当者确认"}
              </Label>
              <Label x={337} y={538} size={19}>
                先从不涉及敏感数据的小任务试起。
              </Label>
              <Cursor x={1072} y={493} click={t > 9.6 && t < 10.6} />
            </>
          ) : !open ? (
            <Chat id={id} t={t} />
          ) : id === 3 ? (
            <DataResult t={t} />
          ) : id === 4 ? (
            <PPTResult t={t} guide />
          ) : id === 5 ? (
            t < 13.2 ? (
              <PPTResult t={t} guide={false} />
            ) : (
              <VideoResult t={t} />
            )
          ) : id === 6 ? (
            <PosterResult t={t} />
          ) : (
            <>
              <Chat id={id} t={t} />
              <g opacity={smooth(t, 9.3, 10)}>
                <InkBox x={350} y={430} w={525} h={96} fill={palette.mint} />
                <Label x={382} y={467} size={22}>
                  ✓ 设备台账汇总.xlsx
                </Label>
                <Label x={382} y={502} size={18}>
                  汇总、图表与异常清单，已准备就绪。
                </Label>
              </g>
            </>
          )}
          {id === 1 && t >= 7.3 && (
            <g opacity={smooth(t, 7.3, 7.8)}>
              <rect
                x={42}
                y={156}
                width={1190}
                height={448}
                rx={18}
                fill="#0c141c"
                stroke="#1a2d38"
              />
              {[
                "数据整理",
                "培训 PPT",
                "演示视频",
                "海报物料",
                "权限审核",
                "AI 对话",
              ].map((name, i) => (
                <g
                  key={name}
                  opacity={smooth(t, 7.3 + i * 0.13, 7.8 + i * 0.13)}
                >
                  <InkBox
                    x={68 + (i % 3) * 382}
                    y={176 + Math.floor(i / 3) * 200}
                    w={350}
                    h={181}
                    fill="#121e28"
                    radius={17}
                  />
                  <Label
                    x={91 + (i % 3) * 382}
                    y={206 + Math.floor(i / 3) * 200}
                    size={11}
                    fill={palette.orange}
                  >
                    {
                      [
                        "DATA / 01",
                        "LEARNING / 02",
                        "VIDEO / 03",
                        "DESIGN / 04",
                        "CONTROL / 05",
                        "AGENT / 06",
                      ][i]
                    }
                  </Label>
                  <Label
                    x={91 + (i % 3) * 382}
                    y={256 + Math.floor(i / 3) * 200}
                    size={23}
                    weight={600}
                  >
                    {name}
                  </Label>
                  <Label
                    x={91 + (i % 3) * 382}
                    y={283 + Math.floor(i / 3) * 200}
                    size={12}
                    fill={palette.muted}
                  >
                    {
                      [
                        "从台账到洞察",
                        "从问题到教程",
                        "从方案到演示",
                        "从需求到视觉",
                        "从授权到追踪",
                        "从指令到交付",
                      ][i]
                    }
                  </Label>
                  <IconAsset
                    index={i}
                    x={339 + (i % 3) * 382}
                    y={262 + Math.floor(i / 3) * 200}
                    size={127}
                  />
                  <path
                    d={`M${91 + (i % 3) * 382} ${330 + Math.floor(i / 3) * 200}h${70 + smooth(t, 7.3, 8.5) * 225}`}
                    stroke="url(#accentEdge)"
                    strokeWidth="1.5"
                  />
                </g>
              ))}
            </g>
          )}
          {id >= 2 && id <= 6 && t < 4.35 && (
            <g opacity={1 - progress(t, 3.95, 4.35)}>
              <rect
                x={0}
                y={127}
                width={1280}
                height={483}
                fill="url(#sceneBackground)"
              />
              <AIInputPanel t={t} text={prompts[id - 1]} clear={false} />
              <InputDetails />
            </g>
          )}

          {id >= 2 && id <= 6 && t > 8.5 && t < 9.5 && (
            <Cursor x={868} y={494} click />
          )}
        </g>
        <path d="M45 627h1190" stroke="#314551" />
        {scenes.map((s, i) => (
          <g key={s.id}>
            <circle
              cx={62 + i * 157}
              cy={648}
              r={7}
              fill={
                s.id === id
                  ? palette.orange
                  : s.id < id
                    ? palette.mint
                    : "#6e8796"
              }
            />
            <Label
              x={77 + i * 157}
              y={653}
              size={13}
              fill={s.id === id ? palette.ink : palette.muted}
            >
              {s.label}
            </Label>
          </g>
        ))}
        {caption && (
          <>
            <rect
              x={45}
              y={668}
              width={1190}
              height={40}
              rx={9}
              fill="#101216"
              stroke="#292d32"
            />
            <Label x={640} y={695} size={22} fill="#e7e9ec" anchor="middle">
              {caption.text}
            </Label>
          </>
        )}
      </svg>
    </AbsoluteFill>
  );
};
export const YamahaMonochrome: React.FC = () => (
  <AbsoluteFill>
    <FontStyles />
    <Audio src={staticFile("audio/it-summit-ambient-ducked.wav")} />
    {scenes.map((scene) => (
      <Sequence
        key={scene.id}
        from={Math.round(scene.start * 30)}
        durationInFrames={Math.round(scene.duration * 30)}
      >
        <Chapter scene={scene} />
        <Sequence from={6}>
          <Audio src={staticFile(scene.voice)} />
        </Sequence>
      </Sequence>
    ))}

    <Sequence from={3726} durationInFrames={120}>
      <svg
        viewBox="0 0 1280 720"
        width="100%"
        height="100%"
        style={{ position: "absolute", pointerEvents: "none" }}
      >
        <Label x={1237} y={78} size={9} fill="#aeb3b9" anchor="end">
          Music: Almost in F — Kevin MacLeod (incompetech.com)
        </Label>
        <Label x={1237} y={90} size={9} fill="#aeb3b9" anchor="end">
          CC BY 4.0 · creativecommons.org/licenses/by/4.0/
        </Label>
      </svg>
    </Sequence>
  </AbsoluteFill>
);
