import React, { useEffect, useState } from "react";
import {
  AbsoluteFill,
  continueRender,
  delayRender,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { Audio } from "@remotion/media";
import scenes from "./yamaha-scenes.json";
import { FontStyles, smooth, progress } from "./design";
import { IconAsset } from "./IconAsset";
import { SoftArtwork } from "./SoftArtwork";
const c = {
  ink: "#354139",
  muted: "#7d8772",
  sage: "#dbe7cf",
  lilac: "#e4ddee",
  yellow: "#f0e6be",
  paper: "#faf8f0",
};
const titles = [
  "AI 智能体，能帮 IT 做什么？",
  "把目标说清楚，让任务开始流动",
  "数据整理：从台账到洞察",
  "软件培训：从问题到教程",
  "汇报与视频：从简报到表达",
  "海报物料：从方向到延展",
  "审核执行：先确认，再行动",
  "让重复工作更少，让 IT 价值更大",
];
const prompts = [
  "",
  "整理各部门设备台账，生成汇总与异常清单。",
  "",
  "帮我做一个企业微信使用教程培训",
  "把这份 IT 工作简报，做成汇报 PPT 和演示视频。",
  "为 IT 担当者大会设计海报，并延展会场屏幕。",
  "",
  "",
];
const txt: React.CSSProperties = { fontFamily: "CN,sans-serif", color: c.ink };
const tag: React.CSSProperties = {
  fontSize: 11,
  letterSpacing: 2,
  color: c.muted,
};
const Chip: React.FC<{ children: React.ReactNode; color?: string }> = ({
  children,
  color = c.sage,
}) => (
  <span
    style={{
      display: "inline-block",
      background: color,
      border: "1px solid #fff",
      borderRadius: 15,
      padding: "6px 12px",
      fontSize: 13,
      whiteSpace: "nowrap",
    }}
  >
    {children}
  </span>
);
const Icon: React.FC<{ i: number; size?: number }> = ({ i, size = 100 }) => (
  <svg width={size} height={size} viewBox="0 0 150 150">
    <IconAsset index={i} x={75} y={75} size={150} />
  </svg>
);
const Pop: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  t: number;
  at?: number;
  fold?: number;
  rot?: number;
  z?: number;
  turn?: number;
  color?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({
  x,
  y,
  w,
  h,
  t,
  at = 0,
  fold = 1,
  rot = 0,
  z = 0,
  turn = 0,
  color = c.paper,
  children,
  style = {},
}) => {
  const p = smooth(t, at, at + 0.8) * fold;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        height: h,
        transformStyle: "preserve-3d",
        transformOrigin: "50% 100%",
        transform: `translateZ(${z}px) translateY(${(1 - p) * 42}px) rotateX(${(1 - p) * -82}deg) rotateZ(${rot * (1 - smooth(t, at + 0.8, at + 1.4))}deg) rotateY(${turn}deg)`,
        opacity: p,
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(120deg,#ffffffbb,transparent 50%),${color}`,
          border: "1.4px solid #fff",
          borderRadius: 16,
          boxShadow: "4px 5px 0 #dbd8cd, 0 22px 26px -17px #29251c65",
          padding: 20,
          ...txt,
        }}
      >
        {children}
      </div>
    </div>
  );
};
const Pointer: React.FC<{ x: number; y: number; click?: boolean }> = ({
  x,
  y,
  click = false,
}) => (
  <svg
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: 40,
      height: 45,
      overflow: "visible",
    }}
    viewBox="0 0 40 45"
  >
    {click && (
      <circle
        cx="0"
        cy="0"
        r="19"
        fill="none"
        stroke="#8a9f75"
        strokeWidth="2"
      />
    )}
    <path
      d="M0 0v30l8-7 8 15 6-4-8-14 12-2Z"
      fill="#fffef8"
      stroke="#526247"
      strokeWidth="2"
    />
  </svg>
);
const Prompt: React.FC<{ id: number; t: number }> = ({ id, t }) => {
  const sentence = prompts[id];
  const send = smooth(t, 3.6, 4.7);
  const typed = sentence.slice(
    0,
    Math.floor(progress(t, 0.7, 3.25) * sentence.length),
  );
  return (
    <Pop
      x={230 - send * 160}
      y={205 - send * 12}
      w={820 - send * 510}
      h={245 - send * 80}
      t={t}
      at={0.1}
      rot={-send * 3}
      color="#f2f4e9"
    >
      <div style={{ ...tag, marginBottom: 17 }}>AI WORKFLOW / 你的目标</div>
      <div
        style={{
          fontSize: 27 - send * 9,
          fontWeight: 500,
          lineHeight: 1.55,
          minHeight: 80,
        }}
      >
        {typed}
        {t < 3.5 ? <span style={{ color: c.muted }}>│</span> : null}
      </div>
      <div style={{ position: "absolute", left: 20, bottom: 20 }}>
        <Chip>企业 IT 助手</Chip>
      </div>
      <div
        style={{
          position: "absolute",
          right: 20,
          bottom: 17,
          width: 34,
          height: 34,
          borderRadius: "50%",
          background: "#839b74",
          color: "white",
          textAlign: "center",
          fontSize: 24,
        }}
      >
        ↑
      </div>
      {t > 3.2 && t < 4.5 && (
        <Pointer
          x={Math.min(750, 750 - send * 470)}
          y={190 - send * 80}
          click={t > 3.65}
        />
      )}
    </Pop>
  );
};
const Intro: React.FC<{ t: number }> = ({ t }) => {
  const assemble = smooth(t, 4.2, 6.3);
  return (
    <>
      {["设备台账", "软件问题", "工作简报"].map((v, i) => (
        <Pop
          key={v}
          x={120 + i * 360 + (640 - (120 + i * 360 + 130)) * assemble * 0.58}
          y={235 - (i % 2) * 22 + assemble * 40}
          w={260}
          h={205}
          t={t}
          at={0.5 + i * 0.5}
          rot={[-7, 3, 8][i] * (1 - assemble)}
          fold={1 - assemble}
          color={[c.sage, c.lilac, c.yellow][i]}
        >
          <div style={tag}>INPUT / 0{i + 1}</div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginTop: 13,
            }}
          >
            <Icon i={[0, 1, 2][i]} size={110} />
            <div style={{ fontSize: 24 }}>{v}</div>
          </div>
        </Pop>
      ))}
      <Pop
        x={485}
        y={315 - assemble * 105}
        w={310}
        h={200}
        t={t}
        at={4.7}
        color="#e0e9d4"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
          }}
        >
          <Icon i={5} size={95} />
          <div style={{ fontSize: 30, fontWeight: 600 }}>AI 智能体</div>
        </div>
        <div style={{ textAlign: "center", fontSize: 17 }}>
          理解需求 · 使用工具 · 交付结果
        </div>
      </Pop>
      {[
        "数据整理",
        "培训 PPT",
        "演示视频",
        "海报物料",
        "权限审核",
        "AI 对话",
      ].map((v, i) => {
        const a = smooth(t, 7.1 + i * 0.12, 8 + i * 0.12);
        return (
          <Pop
            key={v}
            x={80 + i * 184}
            y={442 - a * 55}
            w={170}
            h={147}
            t={t}
            at={7.1 + i * 0.12}
            rot={(i - 2.5) * 1.5}
            color={[c.sage, c.lilac, c.yellow][i % 3]}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Icon i={i} size={56} />
              <div style={{ fontSize: 16, whiteSpace: "nowrap" }}>{v}</div>
            </div>
            <div style={{ ...tag, marginTop: 5, textAlign: "center" }}>
              OUTPUT / 0{i + 1}
            </div>
          </Pop>
        );
      })}
    </>
  );
};
const Task: React.FC<{ t: number }> = ({ t }) => (
  <>
    <Prompt id={1} t={t} />
    {["读取 3 份台账", "统一字段与日期", "交付汇总和异常"].map((v, i) => (
      <Pop
        key={v}
        x={465 + i * 240}
        y={225 + i * 65}
        w={230}
        h={170}
        t={t}
        at={4.4 + i * 1.0}
        rot={(i - 1) * 3}
        color={[c.sage, c.lilac, c.yellow][i]}
      >
        <div style={tag}>STEP / 0{i + 1}</div>
        <div style={{ fontSize: 23, marginTop: 20, fontWeight: 500 }}>{v}</div>
        <div style={{ marginTop: 20, fontSize: 16, color: c.muted }}>
          {t > 8 + i * 0.6 ? "✓ 已完成" : "准备执行…"}
        </div>
      </Pop>
    ))}
    <svg
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 1280,
        height: 630,
        pointerEvents: "none",
      }}
    >
      <path
        d="M380 395Q420 420 465 400M690 330l16 7M930 390l15 8"
        stroke="#9aa88b"
        strokeWidth="2"
        strokeDasharray="6 5"
        fill="none"
        opacity={smooth(t, 4.4, 5.2)}
      />
    </svg>
    {t > 10 && (
      <Pop x={470} y={459} w={490} h={85} t={t} at={9.7} color="#e0e9d4">
        <div style={{ fontSize: 23 }}>
          设备汇总.xlsx{" "}
          <span style={{ float: "right", color: "#718b5c" }}>✓</span>
        </div>
        <div style={{ fontSize: 14, color: c.muted, marginTop: 5 }}>
          授权范围内使用工具 · 担当者检查结果
        </div>
      </Pop>
    )}
  </>
);
const Data: React.FC<{ t: number }> = ({ t }) => {
  const clean = smooth(t, 4.5, 7.2),
    graph = smooth(t, 9, 11.3);
  return (
    <>
      {[0, 1, 2].map((i) => (
        <Pop
          key={i}
          x={100 + i * 90 - clean * i * 40}
          y={205 + i * 42}
          w={300}
          h={245}
          t={t}
          at={0.4 + i * 0.45}
          rot={(-8 + i * 7) * (1 - clean)}
          fold={1 - graph}
          color={i === 1 ? c.lilac : c.paper}
        >
          <div style={tag}>部门台账 / 0{i + 1}</div>
          <div style={{ fontSize: 21, margin: "13px 0" }}>
            设备 · 型号 · 使用状态
          </div>
          {[0, 1, 2, 3].map((r) => (
            <div
              key={r}
              style={{
                height: 24,
                marginTop: 6,
                borderRadius: 3,
                background: r === 2 && i === 1 ? "#efddc8" : "#e4e9df",
                width: `${80 - r * 5}%`,
              }}
            />
          ))}
        </Pop>
      ))}
      <Pop
        x={505}
        y={235}
        w={295}
        h={225}
        t={t}
        at={3.5}
        fold={1 - graph}
        color={c.sage}
      >
        <div style={{ textAlign: "center" }}>
          <Icon i={0} size={115} />
          <div style={{ fontSize: 24 }}>格式统一 · 去重校验</div>
          <div style={{ fontSize: 16, color: c.muted, marginTop: 8 }}>
            重复 / 缺失 / 过期
          </div>
        </div>
      </Pop>
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const p = progress(t, 5 + i * 0.3, 6.8 + i * 0.3);
        return t < 10 ? (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 350 + p * 480,
              top: 280 + Math.sin(p * Math.PI) * -70 + i * 20,
              width: 86,
              height: 16,
              borderRadius: 3,
              background: [c.sage, c.lilac, c.yellow][i % 3],
              opacity: Math.sin(p * Math.PI),
            }}
          />
        ) : null;
      })}
      {["232 台设备", "6 个部门", "8 项待确认"].map((v, i) => (
        <Pop
          key={v}
          x={330 + i * 225}
          y={180}
          w={210}
          h={78}
          t={t}
          at={9.2 + i * 0.2}
          color={[c.sage, c.lilac, c.yellow][i]}
        >
          <div style={{ fontSize: 23, textAlign: "center" }}>{v}</div>
        </Pop>
      ))}
      {[24, 67, 38, 52, 19, 32].map((v, i) => {
        const height = 35 + v * 3.1;
        return (
          <React.Fragment key={i}>
            <Pop
              x={340 + i * 103}
              y={520 - height}
              w={73}
              h={height}
              t={t}
              at={10 + i * 0.18}
              turn={-10}
              color={[c.sage, c.lilac, c.yellow][i % 3]}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 3,
                  borderRadius: 10,
                  background:
                    "repeating-linear-gradient(90deg,#ffffff00 0px,#ffffff00 12px,#ffffff50 13px,#61704412 16px)",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  fontSize: 19,
                  textAlign: "center",
                  position: "relative",
                }}
              >
                {v}
              </div>
            </Pop>
            <div
              style={{
                position: "absolute",
                left: 326 + i * 103,
                top: 547,
                width: 101,
                textAlign: "center",
                fontSize: 16,
                ...txt,
                opacity: smooth(t, 10 + i * 0.18, 10.8 + i * 0.18),
              }}
            >
              {["管理", "生产", "销售", "研发", "采购", "IT"][i]}
            </div>
          </React.Fragment>
        );
      })}
      <Pop
        x={980}
        y={400}
        w={215}
        h={135}
        t={t}
        at={14.0}
        rot={7}
        color={c.yellow}
      >
        <div style={tag}>PULL TAB / 检查</div>
        <div style={{ fontSize: 22, marginTop: 12 }}>异常清单 ↗</div>
        <div style={{ fontSize: 14, marginTop: 9 }}>8 项 · 等待人工确认</div>
      </Pop>
    </>
  );
};
const Training: React.FC<{ t: number }> = ({ t }) => {
  const page = Math.min(2, Math.max(0, Math.floor((t - 9.3) / 2.1)));
  const flip = [11.1, 13.2].reduce((angle, start) => {
    const phase = progress(t, start, start + 0.6);
    return angle - 90 * Math.sin(phase * Math.PI);
  }, 0);
  const heads = ["登录与通讯录", "群聊与文件协作", "会议与安全规范"];
  return (
    <>
      <Prompt id={3} t={t} />
      {[0, 1, 2].map((i) => (
        <Pop
          key={i}
          x={440 + i * 25}
          y={190 + i * 10}
          w={665}
          h={335}
          t={t}
          at={5 + i * 0.55}
          rot={i === 2 ? 0 : -3 + i * 2}
          color={[c.lilac, c.yellow, c.paper][i]}
          fold={1}
          z={i * 16}
          turn={i === 2 ? flip : 0}
        >
          <div style={tag}>TRAINING / 方案生成 · 10 页</div>
          {i === 2 && (
            <>
              <div style={{ fontSize: 25, marginTop: 12 }}>
                企业微信新同事培训.pptx
              </div>
              <div style={{ fontSize: 32, fontWeight: 600, marginTop: 23 }}>
                {String(page + 1).padStart(2, "0")} {heads[page]}
              </div>
              <div
                style={{ height: 2, background: "#a3b693", margin: "13px 0" }}
              />
              {[
                [
                  "账号登录与身份验证",
                  "查找同事，建立通讯录",
                  "15 分钟快速上手",
                ],
                [
                  "建立群聊并设置规范",
                  "共享文档，查看文件",
                  "整理重复操作步骤",
                ],
                [
                  "发起会议与屏幕共享",
                  "确认权限与企业数据",
                  "遇到问题，联系 IT 支持",
                ],
              ][page].map((v, j) => (
                <div key={v} style={{ fontSize: 20, marginTop: 13 }}>
                  <span
                    style={{
                      display: "inline-block",
                      width: 25,
                      color: "#82986d",
                    }}
                  >
                    {j + 1}.
                  </span>
                  {v}
                </div>
              ))}
              <div style={{ position: "absolute", right: 22, bottom: 18 }}>
                <Chip color={c.sage}>{page + 1} / 10 页 · 初稿</Chip>
              </div>
            </>
          )}
        </Pop>
      ))}
      {[0, 1, 2].map((i) => (
        <Pop
          key={i}
          x={465 + i * 211}
          y={541}
          w={195}
          h={61}
          t={t}
          at={7 + i * 0.2}
          color={page === i ? c.sage : "#eeece2"}
        >
          <div style={{ fontSize: 17 }}>
            {heads[i]} {page === i ? "✓" : ""}
          </div>
        </Pop>
      ))}
      {t > 10 && t < 14 && (
        <Pointer x={1057} y={475} click={t > 11.1 && t < 11.4} />
      )}
    </>
  );
};
const Video: React.FC<{ t: number }> = ({ t }) => {
  const play = smooth(t, 11, 16.5);
  return (
    <>
      <Pop
        x={90}
        y={205}
        w={285}
        h={270}
        t={t}
        at={0.4}
        rot={-5}
        color={c.paper}
      >
        <div style={tag}>SOURCE / IT 工作简报</div>
        <div style={{ fontSize: 20, marginTop: 15 }}>现状 · 问题 · 下一步</div>
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              background: [c.sage, c.lilac, c.yellow][i % 3],
              height: 11,
              width: `${85 - i * 7}%`,
              marginTop: 20,
              borderRadius: 3,
            }}
          />
        ))}
      </Pop>
      {["现状概览", "关键问题", "改善计划"].map((v, i) => (
        <Pop
          key={v}
          x={445 + i * 235 - (t > 12 ? smooth(t, 12, 14) * 90 : 0)}
          y={210 + (i % 2) * 32}
          w={222}
          h={225}
          t={t}
          at={4.5 + i * 0.6}
          rot={(i - 1) * 3}
          color={[c.sage, c.lilac, c.yellow][i]}
        >
          <div style={tag}>SHOT / 0{i + 1}</div>
          <div
            style={{
              margin: "18px auto",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Icon i={[0, 1, 2][i]} size={85} />
          </div>
          <div style={{ fontSize: 22, textAlign: "center" }}>{v}</div>
          <div
            style={{
              textAlign: "center",
              fontSize: 13,
              marginTop: 10,
              color: c.muted,
            }}
          >
            PPT → 分镜 → 字幕
          </div>
        </Pop>
      ))}
      <Pop x={370} y={486} w={790} h={100} t={t} at={7.3} color="#f4f1e7">
        <div
          style={{
            fontSize: 17,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>演示视频 · 可编辑时间线</span>
          <span>{Math.round(play * 100)}%</span>
        </div>
        <div style={{ display: "flex", gap: 6, marginTop: 14 }}>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div
              key={i}
              style={{
                height: 24,
                width: 83,
                borderRadius: 4,
                background: [c.sage, c.lilac, c.yellow][i % 3],
              }}
            />
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            left: 22 + play * 700,
            top: 44,
            width: 2,
            height: 45,
            background: "#6e865b",
          }}
        />
      </Pop>
      {t > 17 && (
        <div
          style={{
            position: "absolute",
            left: 910,
            top: 150,
            transform: `rotate(-6deg) scale(${0.9 + smooth(t, 17, 17.4) * 0.1})`,
            padding: "10px 22px",
            border: "2px solid #879d75",
            color: "#6d865d",
            fontSize: 24,
            background: "#f4f4eacc",
          }}
        >
          ✓ 担当者检查
        </div>
      )}
    </>
  );
};
const Poster: React.FC<{ t: number }> = ({ t }) => {
  const choose = smooth(t, 8, 10),
    extend = smooth(t, 12, 14.5);
  return (
    <>
      <Prompt id={5} t={t} />
      {[0, 1, 2].map((i) => (
        <Pop
          key={i}
          x={440 + i * 244 + (i === 1 ? -150 * extend : 0)}
          y={185 + (i % 2 ? 0 : 30)}
          w={210}
          h={330}
          t={t}
          at={4.6 + i * 0.6}
          fold={i !== 1 ? 1 - choose : 0.999}
          rot={(i - 1) * 6}
          color={[c.sage, c.lilac, c.yellow][i]}
        >
          <div style={tag}>DIRECTION / {String.fromCharCode(65 + i)}</div>
          <div style={{ fontSize: 25, marginTop: 16, fontWeight: 600 }}>
            IT 担当者
            <br />
            大会
          </div>
          <svg
            width="170"
            height="140"
            viewBox="0 0 170 140"
            style={{ marginTop: 15 }}
          >
            <rect
              x="5"
              y="5"
              width="150"
              height="125"
              rx="20"
              fill={[c.lilac, c.yellow, c.sage][i]}
            />
            <circle cx="58" cy="55" r="32" fill="#b3c1a2" />
            <path d="M75 55h64v62H75Z" fill="#a295b8" />
            <path d="M15 95l40-35 35 35Z" fill="#f0e6b7" />
          </svg>
          <div style={{ fontSize: 14, color: c.muted }}>协作 · 创新 · 改善</div>
        </Pop>
      ))}
      <Pop
        x={800 - extend * 45}
        y={245}
        w={440}
        h={260}
        t={t}
        at={12}
        color="#f4f2e8"
      >
        <svg width="400" height="200" viewBox="0 0 800 450">
          <SoftArtwork variant="banner" x={0} y={0} w={800} h={450} />
        </svg>
        <div style={{ textAlign: "center", fontSize: 18 }}>会场屏幕 / 16:9</div>
      </Pop>
      <Pop x={640} y={532} w={500} h={61} t={t} at={15} color={c.sage}>
        <div style={{ fontSize: 18 }}>✓ 统一品牌文字与尺寸 → 担当者审核</div>
      </Pop>
      {t > 7 && t < 10 && <Pointer x={820} y={459} click={t > 8.1} />}
      <div
        style={{
          position: "absolute",
          left: 465,
          top: 556,
          opacity: extend,
          fontSize: 17,
          ...txt,
        }}
      >
        海报 / 通知图
      </div>
    </>
  );
};
const Review: React.FC<{ t: number }> = ({ t }) => (
  <>
    <Pop x={465} y={176} w={350} h={175} t={t} at={0.6} color={c.sage}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
        }}
      >
        <Icon i={4} size={110} />
        <div style={{ fontSize: 28 }}>执行前审核</div>
      </div>
    </Pop>
    {["工具权限", "数据范围", "操作记录"].map((v, i) => (
      <Pop
        key={v}
        x={200 + i * 305}
        y={370 + (i % 2) * 30}
        w={280}
        h={174}
        t={t}
        at={2 + i * 1.1}
        color={[c.sage, c.lilac, c.yellow][i]}
      >
        <div style={tag}>GATE / 0{i + 1}</div>
        <div style={{ fontSize: 25, marginTop: 18 }}>{v}</div>
        <div style={{ fontSize: 17, color: c.muted, marginTop: 16 }}>
          {["仅使用已授权工具", "示例台账 · 确认口径", "保留日志 · 可追溯"][i]}
        </div>
        <div
          style={{
            position: "absolute",
            right: 20,
            top: 17,
            fontSize: 25,
            color: "#779267",
            opacity: smooth(t, 7 + i * 0.6, 7.5 + i * 0.6),
          }}
        >
          ✓
        </div>
      </Pop>
    ))}
    <Pop x={390} y={551} w={505} h={60} t={t} at={10} color={c.paper}>
      <div style={{ fontSize: 18, textAlign: "center" }}>
        从小任务试起，确认价值，再逐步扩大。
      </div>
    </Pop>
  </>
);
const Closing: React.FC<{ t: number }> = ({ t }) => (
  <>
    {["判断", "协作", "改善"].map((v, i) => (
      <Pop
        key={v}
        x={210 + i * 300}
        y={233 + (i % 2) * 35}
        w={270}
        h={220}
        t={t}
        at={0.3 + i * 0.5}
        fold={1 - smooth(t, 8.4, 9.7) * 0.95}
        rot={(i - 1) * 5}
        color={[c.sage, c.lilac, c.yellow][i]}
      >
        <div style={tag}>IT VALUE / 0{i + 1}</div>
        <div style={{ fontSize: 54, marginTop: 18, textAlign: "center" }}>
          {v}
        </div>
        <div
          style={{
            fontSize: 17,
            marginTop: 18,
            textAlign: "center",
            color: c.muted,
          }}
        >
          {["确认目标与事实", "连接同事与工具", "把时间用于价值"][i]}
        </div>
      </Pop>
    ))}
    <div
      style={{
        position: "absolute",
        left: 340,
        top: 521,
        fontSize: 25,
        ...txt,
        opacity: smooth(t, 4, 5) * (1 - smooth(t, 8.7, 9.7)),
      }}
    >
      让智能体承担重复步骤，把时间留给价值。
    </div>
  </>
);
const makers = [Intro, Task, Data, Training, Video, Poster, Review, Closing];
export const BookExplainer: React.FC = () => {
  const [fontHandle] = useState(() =>
    delayRender("Load Chinese font before rendering"),
  );
  useEffect(() => {
    document.fonts
      .load("500 32px CN", "企业微信使用教程培训")
      .then(() => document.fonts.ready)
      .then(() => continueRender(fontHandle));
  }, [fontHandle]);
  const frame = useCurrentFrame(),
    global = frame / 30;
  const scene =
    scenes.find((s) => global >= s.start && global < s.start + s.duration) ||
    scenes[scenes.length - 1];
  const t = global - scene.start,
    id = scene.id;
  const Content = makers[id - 1];
  const cue = scene.captions.find(
    (s) => t >= s.start && t < s.start + s.duration,
  );
  const intro = smooth(global, 0, 1.3),
    end = smooth(t, scene.duration - 0.8, scene.duration);
  const turn = id < 8 ? end : 0;
  const camera =
    smooth(t, 4.3, 6.3) - smooth(t, scene.duration - 2.0, scene.duration - 0.8);
  const yaw = 0;
  const foldOut = 1 - smooth(t, scene.duration - 1.2, scene.duration - 0.6);
  return (
    <AbsoluteFill style={{ background: "#c6bcaa", overflow: "hidden", ...txt }}>
      <FontStyles />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 37%,#f2ecdfff 0%,#d3c9b7 57%,#ada08a 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 1280,
          height: 720,
          transform: "scale(1.5)",
          transformOrigin: "0 0",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 40,
            top: 28,
            fontSize: 13,
            letterSpacing: 2,
            color: "#7c786c",
          }}
        >
          YAMAHA · IT 担当者大会 / AI WORKFLOW BOOK
        </div>
        <div
          style={{
            position: "absolute",
            right: 40,
            top: 28,
            fontSize: 13,
            color: "#7c786c",
          }}
        >
          CHAPTER {String(id).padStart(2, "0")} / 08
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 72,
            width: "100%",
            textAlign: "center",
            fontSize: id === 1 || id === 8 ? 36 : 32,
            fontWeight: 600,
            opacity: Math.min(smooth(t, 0, 0.6), 1 - end),
          }}
        >
          {titles[id - 1]}
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            perspective: 1600,
            perspectiveOrigin: "50% 67%",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              transformStyle: "preserve-3d",
              transformOrigin: "50% 66%",
              transform: `translateX(${(id % 2 ? 1 : -1) * camera * 14}px) scale(1) rotateY(${yaw}deg)`,
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 82,
                top: 396,
                width: 1116,
                height: 250,
                background: "#8d9278",
                borderRadius: 17,
                transform: "rotateX(58deg)",
                transformOrigin: "50% 85%",
                boxShadow: "0 14px 0 #aaa389, 0 42px 45px #463e3259",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 90,
                top: 389,
                width: 1100,
                height: 246,
                background:
                  "linear-gradient(90deg,#f8f4e7 0%,#eee9db 47%,#d3cebf 50%,#f9f5e9 54%,#f6f1e4 100%)",
                borderRadius: 14,
                border: "1px solid #fff5",
                transform: "rotateX(58deg)",
                transformOrigin: "50% 85%",
                boxShadow: "0 6px 0 #dbd4c4",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 30,
                  bottom: 24,
                  fontSize: 13,
                  color: "#9a927f",
                }}
              >
                THE IT WORKFLOW BOOK
              </div>
              <div
                style={{
                  position: "absolute",
                  right: 30,
                  bottom: 24,
                  fontSize: 13,
                  color: "#9a927f",
                }}
              >
                {String(id).padStart(2, "0")}
              </div>
            </div>
            <div
              style={{
                position: "absolute",
                inset: 0,
                transformStyle: "preserve-3d",
                opacity: foldOut * intro,
                transform: `translateY(${(1 - foldOut) * 65}px) rotateX(${(1 - foldOut) * -10}deg)`,
                transformOrigin: "50% 76%",
              }}
            >
              <Content t={t} />
            </div>
            <div
              style={{
                position: "absolute",
                left: 640,
                top: 180,
                width: 550,
                height: 390,
                background: "linear-gradient(95deg,#e9e6d9,#fcf8ed)",
                border: "1px solid #fff8",
                borderRadius: "0 12px 12px 0",
                transformOrigin: "0 100%",
                transform: `rotateY(${-turn * 175}deg) rotateX(${turn * 8}deg)`,
                opacity: turn > 0.01 ? Math.sin(turn * Math.PI) : 0,
                boxShadow: "0 15px 25px #30281a33",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 430,
                top: 330,
                width: 420,
                height: 220,
                borderRadius: 14,
                background: "#cbd6bd",
                border: "2px solid #edeedd",
                transform: `rotateX(${90 * (1 - intro)}deg) scale(${1 + smooth(t, 8.4, 9.7) * 0.08})`,
                transformOrigin: "50% 100%",
                opacity:
                  id === 1 ? 1 - intro : id === 8 ? smooth(t, 8.3, 9.5) : 0,
                boxShadow: "0 15px 30px #30281a33",
                textAlign: "center",
                paddingTop: 42,
              }}
            >
              <div style={tag}>A PRACTICAL GUIDE</div>
              <div style={{ fontSize: 34, marginTop: 18 }}>
                AI × IT 工作立体书
              </div>
            </div>
          </div>
        </div>
        {cue && (
          <div
            style={{
              position: "absolute",
              left: 80,
              bottom: 18,
              width: 1120,
              textAlign: "center",
              fontSize: 22,
              lineHeight: "40px",
              padding: "0 18px",
              background: "#f9f6eced",
              border: "1px solid #fff8",
              boxShadow: "0 3px 10px #514d3d0b",
              borderRadius: 5,
            }}
          >
            {cue.text}
          </div>
        )}
        {global > 124.2 && (
          <div
            style={{
              position: "absolute",
              right: 32,
              bottom: 70,
              fontSize: 9,
              color: "#8a887c",
              textAlign: "right",
            }}
          >
            Music: Almost in F — Kevin MacLeod (incompetech.com)
            <br />
            CC BY 4.0 · creativecommons.org/licenses/by/4.0/
          </div>
        )}
      </div>
      <Audio src={staticFile("audio/approved-ambient-mix.m4a")} />
    </AbsoluteFill>
  );
};
