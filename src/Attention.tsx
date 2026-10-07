import React from "react";
import {
  AbsoluteFill,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
const p = (t: number, a: number, b: number) =>
  interpolate(t, [a, b], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
const ease = (t: number, a: number, b: number) => {
  const v = p(t, a, b);
  return v * v * (3 - 2 * v);
};
const alpha = (t: number, a: number, b: number) =>
  p(t, a, a + 0.22) * (1 - p(t, b - 0.22, b));
const Coin: React.FC<{ x: number; y: number; r?: number; tilt?: number }> = ({
  x,
  y,
  r = 70,
  tilt = 0.3,
}) => (
  <g transform={`translate(${x} ${y})`}>
    <ellipse cy={r * 0.15} rx={r} ry={r * tilt} fill="url(#metalSide)" />
    <path
      d={`M${-r} 0v${r * 0.15}q${r} ${r * tilt * 2} ${r * 2} 0V0Z`}
      fill="url(#metalSide)"
    />
    <ellipse
      rx={r}
      ry={r * tilt}
      fill="url(#metal)"
      stroke="#aaa"
      strokeWidth={1.2}
    />
    <ellipse
      rx={r * 0.87}
      ry={r * tilt * 0.86}
      fill="none"
      stroke="#eee"
      strokeWidth="1"
      opacity=".48"
    />
  </g>
);
const Phone: React.FC<{
  x: number;
  y: number;
  s: number;
  rotation: number;
  count: string;
}> = ({ x, y, s, rotation, count }) => (
  <g transform={`translate(${x} ${y}) rotate(${rotation}) scale(${s})`}>
    <path
      d="M-63-120l12-6h106q9 0 9 12v223q0 11-12 14l-104 4q-14-1-14-14Z"
      fill="url(#metalSide)"
      filter="url(#glow)"
    />
    <rect
      x="-52"
      y="-123"
      width="111"
      height="248"
      rx="13"
      fill="url(#glass)"
      stroke="#d5d5d5"
      strokeWidth="2"
    />
    <path d="M-40-109h70L9 22h-49Z" fill="url(#reflection)" />
    <rect x="-42" y="-110" width="69" height="77" rx="7" fill="url(#silver)" />
    <text x="-38" y="-6" fill="#eee" fontSize="19" fontWeight="800">
      {count}
    </text>
    <text x="-38" y="11" fill="#ddd" fontSize="10">
      Views
    </text>
    <path
      d="M-39 66h61m-61 12h39"
      stroke="#bbb"
      strokeWidth="1"
      opacity=".24"
    />
  </g>
);
const GraphCard: React.FC<{ t: number }> = ({ t }) => (
  <g transform={`translate(960 525) scale(${0.8 + ease(t, 4.25, 4.8) * 0.2})`}>
    <ellipse
      cy="255"
      rx="370"
      ry="29"
      fill="#222"
      opacity=".3"
      filter="url(#blur)"
    />
    <rect
      x="-365"
      y="-211"
      width="730"
      height="413"
      rx="34"
      fill="url(#silver)"
    />
    <rect
      x="-356"
      y="-219"
      width="714"
      height="414"
      rx="31"
      fill="url(#graphGlass)"
      stroke="#c9c9c9"
      strokeWidth="3"
    />
    <path
      d="M-327 182L145-203h191v174L-112 182Z"
      fill="url(#reflection)"
      opacity=".24"
    />
    {Array.from({ length: 9 }, (_, i) => (
      <path
        key={i}
        d={`M${-240 + i * 60} -132v254M-260 ${-126 + i * 31}H260`}
        stroke="#bbb"
        opacity=".06"
      />
    ))}
    <text x="-294" y="-12" fill="#ddd" fontSize="24">
      Money
    </text>
    <text x="-11" y="153" fill="#ddd" fontSize="24">
      Reach
    </text>
    <path
      d="M-225 104L-96 88L-18 40L49 37L116-21L194-47L244-116"
      fill="none"
      stroke="#eee"
      strokeWidth="5"
      strokeDasharray="700"
      strokeDashoffset={700 * (1 - ease(t, 4.75, 5.8))}
    />
    <path
      d="M-225 105L-96 89L-18 41L49 38L116-20L194-46L244-115V106Z"
      fill="url(#chart)"
      opacity={ease(t, 4.7, 5.8)}
    />
  </g>
);
const Person: React.FC<{ x: number; y: number; s: number }> = ({ x, y, s }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity=".6">
    <circle cy="-61" r="25" fill="url(#silver)" />
    <path
      d="M-53 44v-26q0-41 36-41h34q36 0 36 41v26H30V0H22v113H1V47h-9v66h-22V0h-7v44Z"
      fill="url(#person)"
    />
  </g>
);
const Wheel: React.FC<{ t: number }> = ({ t }) => {
  const spin = interpolate(
    t,
    [7, 7.6, 8.6, 9.8, 10.6],
    [0, 80, 500, 665, 682],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  return (
    <g transform={`translate(960 445) scale(${0.7 + ease(t, 7, 8) * 0.3})`}>
      <circle r="229" fill="#aaa" opacity=".18" filter="url(#glow)" />
      <g transform={`rotate(${spin})`}>
        <circle r="214" fill="url(#metal)" stroke="#888" strokeWidth="3" />
        {Array.from({ length: 10 }, (_, i) => {
          const a = (i * Math.PI) / 5,
            b = ((i + 1) * Math.PI) / 5;
          return (
            <g key={i}>
              <path
                d={`M0 0L${Math.cos(a) * 210} ${Math.sin(a) * 210}A210 210 0 0 1 ${Math.cos(b) * 210} ${Math.sin(b) * 210}Z`}
                fill={i % 2 ? "#cecece" : "#8f8f8f"}
                opacity=".46"
              />
              <g transform={`rotate(${i * 36 + 18})`}>
                <circle cx="164" cy="0" r={i % 3 ? 7 : 10} fill="#111" />
                {i % 2 ? (
                  <path d="M154 0h20m-10-10v20" stroke="#111" strokeWidth="3" />
                ) : (
                  <path
                    d="M151-3l9 10l21-18"
                    fill="none"
                    stroke="#eee"
                    strokeWidth="4"
                  />
                )}
              </g>
              <path
                d={`M0 0L${Math.cos(a) * 210} ${Math.sin(a) * 210}`}
                stroke="#fff"
                opacity=".12"
              />
            </g>
          );
        })}
        <circle r="21" fill="url(#glass)" stroke="#222" />
        <circle
          r="203"
          fill="none"
          stroke="#ddd"
          strokeWidth="2"
          opacity=".2"
        />
      </g>
      <path d="M-16-261h32l-16 47Z" fill="#080808" />
      <circle cy="-268" r="27" fill="#030303" />
    </g>
  );
};
export const Attention: React.FC = () => {
  const t = useCurrentFrame() / 30;
  const white = ease(t, 1.75, 2.5) * (1 - ease(t, 6.7, 7.2));
  const count =
    t < 1.5
      ? Math.floor(interpolate(t, [0, 1.5], [15038, 390977])).toString()
      : `${Math.floor(interpolate(t, [1.5, 3.4], [1, 58], { extrapolateRight: "clamp" }))}million+`;
  return (
    <AbsoluteFill
      style={{ background: "#030303", fontFamily: "MonoSans,sans-serif" }}
    >
      <style>{`@font-face{font-family:MonoSans;src:url('${staticFile("fonts/notosanssc-font.ttf")}')}`}</style>
      <svg width="100%" height="100%" viewBox="0 0 1920 1080">
        <defs>
          <linearGradient id="metal" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#0b0b0b" />
            <stop offset=".35" stopColor="#606060" />
            <stop offset=".73" stopColor="#dadada" />
            <stop offset="1" stopColor="#fafafa" />
          </linearGradient>
          <linearGradient id="silver">
            <stop stopColor="#fafafa" />
            <stop offset=".24" stopColor="#979797" />
            <stop offset=".49" stopColor="#dadada" />
            <stop offset=".72" stopColor="#777" />
            <stop offset="1" stopColor="#eee" />
          </linearGradient>
          <linearGradient id="metalSide">
            <stop stopColor="#555" />
            <stop offset=".25" stopColor="#ccc" />
            <stop offset=".6" stopColor="#777" />
            <stop offset="1" stopColor="#eee" />
          </linearGradient>
          <linearGradient id="glass" x2=".7" y2="1">
            <stop stopColor="#101010" />
            <stop offset=".52" stopColor="#252525" />
            <stop offset="1" stopColor="#656565" />
          </linearGradient>
          <linearGradient id="graphGlass" x2="1" y2="1">
            <stop stopColor="#080808" />
            <stop offset=".72" stopColor="#272727" />
            <stop offset="1" stopColor="#565656" />
          </linearGradient>
          <linearGradient id="reflection" x2="1" y2="1">
            <stop stopColor="#fff" stopOpacity=".72" />
            <stop offset=".55" stopColor="#fff" stopOpacity=".03" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="person" x2="0" y2="1">
            <stop stopColor="#aaa" />
            <stop offset="1" stopColor="#111" />
          </linearGradient>
          <linearGradient id="chart" x2="0" y2="1">
            <stop stopColor="#dedede" stopOpacity=".6" />
            <stop offset="1" stopColor="#dedede" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="halo">
            <stop offset=".6" stopColor="#000" />
            <stop offset=".92" stopColor="#222" />
            <stop offset="1" stopColor="#888" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="vignette">
            <stop offset=".65" stopColor="#777" stopOpacity="0" />
            <stop offset="1" stopColor="#222" stopOpacity=".4" />
          </radialGradient>
          <filter id="blur">
            <feGaussianBlur stdDeviation="22" />
          </filter>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="10" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency=".68"
              numOctaves="3"
              seed="13"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
        <rect width="1920" height="1080" fill="#fff" opacity={white} />
        <g opacity={alpha(t, 0, 2.2)}>
          <circle cx="1040" cy="1030" r="640" fill="url(#halo)" />
          <circle cx="1480" cy="0" r="550" fill="url(#halo)" />
          <g transform={`translate(${(1 - ease(t, 0, 0.7)) * 120} 0)`}>
            {[
              { x: 330, y: 290, s: 1.13, r: -12 },
              { x: 630, y: 680, s: 1.46, r: 8 },
              { x: 165, y: 870, s: 0.64, r: -7 },
              { x: 1080, y: 850, s: 0.87, r: 12 },
              { x: 1280, y: 140, s: 0.56, r: -3 },
            ].map((v, i) => (
              <Phone
                key={i}
                x={v.x + Math.sin(t * 1.4 + i) * 18}
                y={v.y + Math.cos(t * 1.2 + i) * 27}
                s={v.s}
                rotation={v.r + t * 2}
                count={count}
              />
            ))}
          </g>
          <text
            x="1100"
            y="462"
            fontSize="115"
            fontWeight="800"
            fill="#ddd"
            filter="url(#glow)"
            textAnchor="middle"
          >
            {count}
          </text>
          <text x="1100" y="528" fontSize="49" fill="#aaa" textAnchor="middle">
            Views
          </text>
        </g>
        <g opacity={alpha(t, 2.05, 4.35)}>
          <text
            x="1310"
            y="365"
            fontSize="113"
            fill="#c7c7c7"
            fontWeight="800"
            textAnchor="middle"
          >
            {count}
          </text>
          <text x="1310" y="430" fontSize="47" fill="#ccc" textAnchor="middle">
            Views
          </text>
          <g transform="translate(210 85)">
            <path
              d="M-230 765L-70 686Q65 670 173 629Q219 614 286 614L456 593Q531 592 503 619Q483 638 424 653Q380 668 412 691Q443 712 506 697L619 662Q656 652 681 676Q604 736 477 772Q445 783 410 778L145 770L-157 864Z"
              fill="url(#metal)"
            />
            <g
              transform={`translate(412 ${-35 + (1 - ease(t, 2.2, 3.8)) * -190})`}
            >
              <Coin x={0} y={625} r={105} />
              <Coin x={0} y={603} r={105} />
              <Coin x={0} y={581} r={105} />
            </g>
            {[0, 1, 2].map((i) => (
              <g
                key={i}
                transform={`translate(${515 + i * 100} ${380 + i * 77 + Math.sin(t * 3 + i) * 20}) rotate(${t * 70 + i * 18})`}
                opacity={1 - ease(t, 3.4, 4)}
              >
                <circle
                  r={i === 0 ? 107 : 78}
                  fill="url(#metal)"
                  stroke="#aaa"
                  strokeWidth="1"
                />
              </g>
            ))}
          </g>
        </g>
        <g opacity={alpha(t, 4.15, 7.15)}>
          <path
            d="M245 862L545 594L743 652L999 359L1077 439L1537 87"
            stroke="#555"
            strokeWidth="18"
            fill="none"
            strokeDasharray="1800"
            strokeDashoffset={1800 * (1 - ease(t, 4.2, 5.4))}
          />
          <GraphCard t={t} />
          {[0, 1, 2].map((i) => (
            <g
              key={i}
              opacity={ease(t, 5.4 + i * 0.16, 6.15 + i * 0.16)}
              transform={`translate(${i === 0 ? 195 : i === 1 ? 1630 : 1750} ${i === 2 ? 925 : 840})`}
            >
              <ellipse
                cy="36"
                rx="103"
                ry="21"
                fill="#777"
                opacity=".24"
                filter="url(#blur)"
              />
              {Array.from({ length: i === 2 ? 3 : 10 }, (_, j) => (
                <Coin key={j} x={0} y={-j * 22} r={i === 2 ? 88 : 83} />
              ))}
            </g>
          ))}
        </g>
        <g opacity={alpha(t, 7.0, 10.6)}>
          <circle cx="960" cy="-145" r="680" fill="url(#halo)" />
          {[0, 1, 2, 3, 4].map((i) => (
            <Person
              key={i}
              x={480 + i * 280 + Math.sin(t + i) * 15}
              y={990 + (i % 2) * 80}
              s={i === 2 ? 1.4 : 0.8 + (i % 2) * 0.25}
            />
          ))}
          <Wheel t={t} />
        </g>
        <g opacity={ease(t, 10.25, 10.8)}>
          <circle
            cx={interpolate(t, [10.25, 12.25], [350, 1150], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}
            cy="5"
            r="610"
            fill="url(#halo)"
          />
          <text
            x="960"
            y="470"
            textAnchor="middle"
            fontSize="67"
            fontWeight="700"
            fill="#e5e5e5"
          >
            CREATE
          </text>
          <text
            x="960"
            y="564"
            textAnchor="middle"
            fontSize="57"
            fontWeight="500"
            fill="#aaa"
            opacity={ease(t, 10.65, 11.2)}
          >
            TO
          </text>
          <text
            x="960"
            y="668"
            textAnchor="middle"
            fontSize="77"
            fontWeight="700"
            fill="#e5e5e5"
            opacity={ease(t, 11, 11.6)}
          >
            EARN
          </text>
        </g>
        <rect width="1920" height="1080" fill="url(#vignette)" />
        <rect
          width="1920"
          height="1080"
          filter="url(#grain)"
          opacity=".028"
          style={{ mixBlendMode: "soft-light" }}
        />
      </svg>
    </AbsoluteFill>
  );
};
