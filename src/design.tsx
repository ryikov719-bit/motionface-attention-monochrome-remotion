import React from "react";
import { interpolate, staticFile } from "remotion";
import { IconAsset } from "./IconAsset";
export const palette = {
  paper: "#08090a",
  ink: "#ededed",
  orange: "#727679",
  yellow: "#343638",
  mint: "#30383a",
  pink: "#39363a",
  violet: "#363a40",
  muted: "#aaaeb3",
};
export const progress = (t: number, a: number, b: number) =>
  interpolate(t, [a, b], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
export const smooth = (t: number, a: number, b: number) => {
  const p = progress(t, a, b);
  return p * p * (3 - 2 * p);
};
export const FontStyles = () => (
  <style>{`@font-face{font-family:CN;src:url('${staticFile("fonts/notosanssc-font.ttf")}')}@font-face{font-family:Paper;src:url('${staticFile("fonts/notosanssc-font.ttf")}')}*{box-sizing:border-box}svg image{filter:grayscale(1)}`}</style>
);
export const InkBox: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  fill?: string;
  radius?: number;
  children?: React.ReactNode;
  strokeWidth?: number;
}> = ({ x, y, w, h, fill = "#181a1c", radius = 10, children }) => {
  const id = React.useId().replace(/:/g, "");
  const normalized =
    fill.startsWith("#") &&
    fill.length === 7 &&
    (parseInt(fill.slice(1, 3), 16) +
      parseInt(fill.slice(3, 5), 16) +
      parseInt(fill.slice(5, 7), 16)) /
      3 >
      130
      ? "#24282d"
      : fill;
  return (
    <g>
      <defs>
        <linearGradient id={id} x2=".8" y2="1">
          <stop stopColor="#404347" />
          <stop offset=".32" stopColor={normalized} />
          <stop offset="1" stopColor="#101112" />
        </linearGradient>
      </defs>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={radius}
        fill={`url(#${id})`}
        stroke="#686c70"
        strokeWidth={1.2}
      />
      <path
        d={`M${x + radius} ${y + 1}h${w - radius * 2}`}
        stroke="#b4b7b9"
        strokeWidth=".7"
        opacity=".5"
      />
      {children}
    </g>
  );
};
export const Label: React.FC<{
  x: number;
  y: number;
  size?: number;
  fill?: string;
  weight?: number;
  anchor?: "start" | "middle" | "end";
  children: React.ReactNode;
}> = ({
  x,
  y,
  size = 18,
  fill = palette.ink,
  weight = 400,
  anchor = "start",
  children,
}) => (
  <text
    x={x}
    y={y}
    fontFamily="CN,sans-serif"
    fontSize={size}
    fill={fill}
    fontWeight={weight}
    textAnchor={anchor}
  >
    {children}
  </text>
);
export const Star: React.FC<{
  x: number;
  y: number;
  s?: number;
  fill?: string;
}> = ({ x, y, s = 8, fill = "#bbb" }) => (
  <path
    d={`M${x} ${y - s}Q${x} ${y} ${x + s} ${y}Q${x} ${y} ${x} ${y + s}Q${x} ${y} ${x - s} ${y}Q${x} ${y} ${x} ${y - s}`}
    fill={fill}
  />
);
export const Buddy: React.FC<{
  x: number;
  y: number;
  t: number;
  scale?: number;
  glasses?: boolean;
}> = ({ x, y, t, scale = 1 }) => (
  <g opacity=".9">
    <IconAsset index={5} x={x} y={y + Math.sin(t * 2) * 4} size={100 * scale} />
  </g>
);
