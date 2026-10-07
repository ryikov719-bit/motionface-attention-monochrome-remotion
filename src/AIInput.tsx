import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import {
  Buddy,
  FontStyles,
  InkBox,
  Label,
  palette,
  progress,
  Star,
} from "./design";

export const AIInputPanel: React.FC<{
  t: number;
  text: string;
  reference?: boolean;
  clear?: boolean;
  title?: string;
}> = ({ t, text, reference = false, clear = true, title }) => {
  const submitted = t >= 4;
  const shown =
    clear && submitted
      ? ""
      : text.slice(0, Math.floor(progress(t, 0.65, 3.15) * text.length));
  const ink = reference ? "#272727" : palette.ink;
  const cx = interpolate(t, [0, 3.1, 3.7, 4, 6], [866, 866, 1062, 1062, 1062], {
    extrapolateRight: "clamp",
  });
  const cy = interpolate(t, [0, 3.1, 3.7, 4, 6], [566, 566, 384, 384, 384], {
    extrapolateRight: "clamp",
  });
  return (
    <g fontFamily={reference ? "CN,sans-serif" : "Paper,CN,sans-serif"}>
      <Star x={446} y={174} s={11} fill={palette.orange} />
      <text
        x={470}
        y={180}
        fill={reference ? "#ededed" : ink}
        fontSize={reference ? 32 : 30}
        fontWeight={700}
      >
        {title ||
          (reference
            ? "How can I help you today?"
            : "今天，想让 AI 帮你做什么？")}
      </text>
      {reference ? (
        <rect
          x={189}
          y={255}
          width={902}
          height={157}
          rx={19}
          fill="#dedede"
          style={{ filter: "drop-shadow(0 18px 22px #17130d55)" }}
        />
      ) : (
        <InkBox
          x={189}
          y={255}
          w={902}
          h={157}
          radius={19}
          fill="#191b1d"
          strokeWidth={3}
        />
      )}
      <text
        x={210}
        y={292}
        fontFamily={reference ? "CN,sans-serif" : "CN,sans-serif"}
        fontSize={reference ? 19 : 24}
        fontWeight={reference ? 700 : 500}
        fill={ink}
      >
        {shown}
        {!submitted && Math.floor(t * 2.6) % 2 === 0 ? "│" : ""}
      </text>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <circle
            cx={220 + i * 37}
            cy={385}
            r={14}
            fill="#dedede"
            stroke={reference ? "#e1e1df" : palette.ink}
            strokeWidth={reference ? 1.8 : 2}
          />
          {i === 0 ? (
            <path d="M216 385h8m-4-4v8" stroke="#89877d" />
          ) : i === 1 ? (
            <>
              <path
                d="M253 381h8m-8 4h8m-8 4h8m-5-9v2m3 2v2m-5 2v2"
                stroke="#89877d"
              />
            </>
          ) : (
            <>
              <circle cx="294" cy="385" r="4.5" fill="none" stroke="#89877d" />
              <path
                d="M290 385h8m-4-5q-3 5 0 10m0-10q3 5 0 10"
                fill="none"
                stroke="#89877d"
              />
            </>
          )}
        </g>
      ))}
      <rect
        x={318}
        y={371}
        width={reference ? 138 : 154}
        height={28}
        rx={14}
        fill="#dedede"
        stroke={reference ? "#e1e1df" : palette.ink}
        strokeWidth={reference ? 1 : 1.8}
      />
      <text
        x={330}
        y={390}
        fill="#aaaeb3"
        fontSize={reference ? 12 : 15}
        fontWeight={reference ? 700 : 400}
      >
        {reference ? "Claude Sonnet 4.5 ⌄" : "企业 AI 工作助手 ⌄"}
      </text>
      <circle cx="1060" cy="384" r="16" fill={palette.orange} />
      <path
        d="M1060 391v-14m-5 5l5-5l5 5"
        fill="none"
        stroke="#dedede"
        strokeWidth="1.8"
      />
      {t >= 3.1 && t < 4.15 && (
        <g transform={`translate(${cx} ${cy})`}>
          <path
            d="M0 0v25l6-6l7 12l6-3l-8-12l11-1Z"
            fill="#dedede"
            stroke={reference ? "#333" : palette.ink}
            strokeWidth="1.3"
          />
          {t >= 3.9 && (
            <circle
              cx="0"
              cy="0"
              r={6 + progress(t, 3.9, 4.15) * 20}
              stroke={palette.orange}
              strokeWidth="2"
              fill="none"
              opacity={1 - progress(t, 3.9, 4.15)}
            />
          )}
        </g>
      )}
      {!reference && <Buddy x={1137} y={379} t={t} scale={0.8} />}
    </g>
  );
};
export const AIInput: React.FC<{ reference?: boolean; text?: string }> = ({
  reference = false,
  text = "帮我做一个企业微信使用教程培训",
}) => {
  const t = useCurrentFrame() / 30;
  return (
    <AbsoluteFill style={{ background: reference ? "#08090a" : palette.paper }}>
      <FontStyles />
      <svg viewBox="0 0 1280 720" width="100%" height="100%">
        <AIInputPanel t={t} text={text} reference={reference} />
        {!reference && t >= 4.15 && (
          <g opacity={progress(t, 4.15, 4.6)}>
            <InkBox x={318} y={455} w={640} h={89} fill="#26302e" />
            <Label x={340} y={489} size={22}>
              ✓ 任务已发送，开始生成培训 PPT 方案
            </Label>
            <Label x={340} y={523} size={18}>
              新同事入门 → 通讯录与群聊 → 文件与会议 → 安全设置
            </Label>
          </g>
        )}
      </svg>
    </AbsoluteFill>
  );
};
