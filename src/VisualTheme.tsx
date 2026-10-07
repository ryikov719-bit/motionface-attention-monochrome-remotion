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
        <stop stopColor="#fafbf5" />
        <stop offset="1" stopColor="#f5f3ee" />
      </radialGradient>
      <linearGradient id="accentEdge">
        <stop stopColor="#95ad89" />
        <stop offset="1" stopColor="#95ad89" stopOpacity="0" />
      </linearGradient>
    </defs>
    <rect width="1280" height="720" fill="url(#sceneBackground)" />
    <g
      fill="none"
      stroke="#a9b7a0"
      strokeWidth=".8"
      opacity=".16"
      transform={`translate(0 ${Math.sin(t * 0.25) * 2})`}
    >
      <path d="M70 140v330q0 20 20 20h160M1210 170v300q0 20-20 20h-150" />
      <circle cx="70" cy="140" r="3" />
      <circle cx="1210" cy="170" r="3" />
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
          fill={["#e4eddc", "#e5dff0", "#f0e7c8"][i]}
          stroke="#fff"
        />
        <circle cx={229 + i * 275} cy={462} r={3} fill={palette.orange} />
        <Label x={243 + i * 275} y={468} size={13} fill="#6c7961">
          {text}
        </Label>
        <path
          d={`M${335 + i * 275} 479v13q0 12 ${i === 0 ? 12 : i === 2 ? -12 : 0} 12H640v17`}
          fill="none"
          stroke="#a9baa0"
          strokeWidth="1"
        />
      </g>
    ))}
    <rect
      x={530}
      y={521}
      width={220}
      height={50}
      rx={14}
      fill="#e4eddc"
      stroke="#fff"
      strokeWidth="1.5"
    />
    <Label x={640} y={552} size={19} weight={600} anchor="middle">
      AI 智能体 · 任务中枢
    </Label>
    <circle cx="640" cy="521" r="3" fill="#a9bd98" />
  </g>
);
