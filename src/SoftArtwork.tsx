import React from "react";
import { InkBox, Label, palette } from "./design";
import { IconAsset } from "./IconAsset";
export const SoftArtwork: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  variant: string;
}> = ({ x, y, w, h, variant }) => {
  const poster = variant === "poster";
  const banner = variant === "banner";
  return (
    <svg
      x={x}
      y={y}
      width={w}
      height={h}
      viewBox={poster ? "0 0 400 600" : "0 0 800 450"}
    >
      <rect
        width={poster ? 400 : 800}
        height={poster ? 600 : 450}
        rx="24"
        fill={poster ? "#e2e9d9" : "#f3f1e9"}
      />
      {poster || banner ? (
        <>
          <Label
            x={poster ? 35 : 45}
            y={poster ? 58 : 48}
            size={14}
            fill={palette.orange}
          >
            YAMAHA / IT SUMMIT
          </Label>
          <Label
            x={poster ? 35 : 45}
            y={poster ? 128 : 137}
            size={poster ? 40 : 49}
            weight={600}
          >
            IT 担当者大会
          </Label>
          <Label
            x={poster ? 35 : 45}
            y={poster ? 163 : 181}
            size={poster ? 18 : 22}
            fill={palette.muted}
          >
            协作 · 创新 · 改善
          </Label>
          <g
            transform={
              poster
                ? "translate(40 225) scale(.95)"
                : "translate(490 78) scale(.8)"
            }
          >
            <rect width="320" height="320" rx="30" fill="#e7def1" />
            <path d="M20 170V100Q20 20 100 20H170V170Z" fill="#a296bd" />
            <path d="M170 20h70q60 0 60 70v80H170Z" fill="#eee6aa" />
            <path d="M20 170h150v130H85q-65 0-65-65Z" fill="#f3f1e9" />
            <path d="M170 170h130v65q0 65-65 65h-65Z" fill="#7d8f71" />
          </g>
          <Label
            x={poster ? 35 : 45}
            y={poster ? 573 : 386}
            size={16}
            fill="#77866e"
          >
            让 IT 价值更大
          </Label>
          {banner && <IconAsset index={5} x={174} y={283} size={112} />}
        </>
      ) : (
        <>
          <Label x={40} y={48} size={28} weight={600}>
            {variant === "training"
              ? "企业微信 · 新同事培训"
              : "AI 智能体 · IT 工作流"}
          </Label>
          {["数据", "需求", "工具"].map((v, i) => (
            <g key={v}>
              <InkBox
                x={55 + i * 230}
                y={83}
                w={200}
                h={120}
                fill={["#e3eddc", "#e7def1", "#f0e7c8"][i]}
                radius={18}
              />
              <IconAsset
                index={[0, 5, 1][i]}
                x={155 + i * 230}
                y={132}
                size={82}
              />
              <Label x={155 + i * 230} y={186} size={16} anchor="middle">
                {v}
              </Label>
              <path
                d={`M${155 + i * 230} 203v18q0 10 ${i === 0 ? 10 : i === 2 ? -10 : 0} 10H385v19`}
                fill="none"
                stroke="#a1b095"
              />
            </g>
          ))}
          <InkBox x={288} y={248} w={200} h={61} fill="#e1ead6" radius={20} />
          <Label x={388} y={287} size={25} weight={600} anchor="middle">
            AI 智能体
          </Label>
          {["报告与图表", "培训 PPT", "演示与物料"].map((v, i) => (
            <g key={v}>
              <path
                d={`M388 309v12q0 10 ${i === 0 ? -10 : i === 2 ? 10 : 0} 10H${155 + i * 230}v20`}
                fill="none"
                stroke="#a1b095"
              />
              <InkBox
                x={55 + i * 230}
                y={351}
                w={200}
                h={66}
                fill={["#e3eddc", "#e7def1", "#f0e7c8"][i]}
                radius={18}
              />
              <Label x={155 + i * 230} y={391} size={19} anchor="middle">
                {v} ✓
              </Label>
            </g>
          ))}
        </>
      )}
    </svg>
  );
};
