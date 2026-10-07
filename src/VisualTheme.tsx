import React from "react";
import { Label, palette } from "./design";
export const SceneBackdrop: React.FC<{ id: number; t: number }> = ({
  id,
  t,
}) => (
  <>
    <defs>
      <radialGradient
        id="sceneBackground"
        cx={id % 2 ? ".83" : ".2"}
        cy=".25"
        r=".9"
      >
        <stop stopColor="#142833" />
        <stop offset=".5" stopColor="#0c141c" />
        <stop offset="1" stopColor="#080b10" />
      </radialGradient>
      <pattern
        id="precisionGrid"
        width="40"
        height="40"
        patternUnits="userSpaceOnUse"
      >
        <path
          d="M40 0H0V40"
          fill="none"
          stroke="#7993a1"
          strokeWidth=".35"
          opacity=".1"
        />
      </pattern>
      <linearGradient id="accentEdge">
        <stop stopColor="#64d7e8" />
        <stop offset="1" stopColor="#64d7e8" stopOpacity="0" />
      </linearGradient>
    </defs>
    <rect width="1280" height="720" fill="url(#sceneBackground)" />
    <rect width="1280" height="626" fill="url(#precisionGrid)" />
    <g transform={`translate(1130 365) rotate(${t * 1.4})`} opacity=".12">
      <circle r="258" stroke="#78adbf" strokeWidth=".6" fill="none" />
      <circle
        r="238"
        stroke="#78adbf"
        strokeWidth=".5"
        strokeDasharray="2 14"
        fill="none"
      />
      <path d="M-280 0h560M0-280v560" stroke="#78adbf" strokeWidth=".5" />
    </g>
  </>
);
export const InputDetails: React.FC = () => (
  <g>
    <Label x={210} y={235} size={12} fill={palette.orange}>
      DESCRIBE YOUR TASK / 描述你的任务
    </Label>
    {["企业 IT 场景", "输出可编辑成品", "保留执行记录"].map((text, i) => (
      <g key={text}>
        <rect
          x={210 + i * 275}
          y={445}
          width={250}
          height={34}
          rx={17}
          fill="#111d26"
          stroke="#294350"
        />
        <circle cx={229 + i * 275} cy={462} r={3} fill={palette.orange} />
        <Label x={243 + i * 275} y={468} size={13} fill="#b2c4cf">
          {text}
        </Label>
      </g>
    ))}
    {["01 理解需求", "02 制定计划", "03 交付成品"].map((text, i) => (
      <g key={text}>
        <Label
          x={230 + i * 310}
          y={540}
          size={15}
          fill={i === 0 ? palette.orange : "#68818f"}
        >
          {text}
        </Label>
        {i < 2 && (
          <path
            d={`M${365 + i * 310} 533h100m-5-4l5 4-5 4`}
            fill="none"
            stroke="#395361"
          />
        )}
      </g>
    ))}
  </g>
);
