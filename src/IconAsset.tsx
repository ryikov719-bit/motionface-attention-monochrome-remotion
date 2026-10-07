import React from "react";
import { staticFile } from "remotion";
export const IconAsset: React.FC<{
  index: number;
  x: number;
  y: number;
  size?: number;
}> = ({ index, x, y, size = 150 }) => (
  <svg
    x={x - size / 2}
    y={y - size / 2}
    width={size}
    height={size}
    viewBox={`${(index % 3) * 512} ${Math.floor(index / 3) * 512} 512 512`}
    style={{ overflow: "hidden" }}
  >
    <image
      href={staticFile("icons/it-metal-sprite.png")}
      x="0"
      y="0"
      width="1536"
      height="1024"
    />
  </svg>
);
