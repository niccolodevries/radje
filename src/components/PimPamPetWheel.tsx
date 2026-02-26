import { WHEEL_SIZE, WHEEL_CENTER, WHEEL_RADIUS } from "@/lib/constants";
import { describeArc } from "@/lib/wheel-math";
import type { Segment } from "@/types/wheel";

interface PimPamPetWheelProps {
  segments: Segment[];
  rotation: number;
}

export default function PimPamPetWheel({ segments, rotation }: PimPamPetWheelProps) {
  const segmentAngle = 360 / segments.length;
  const cx = WHEEL_CENTER;
  const cy = WHEEL_CENTER;
  const r = WHEEL_RADIUS;

  // Window: narrow enough to show only one segment, no neighbor bleed.
  // At radius 122 (window bottom), segment width ≈ 30px, so 26px window is safe.
  const windowW = 26;
  const windowH = 38;
  const windowX = cx - windowW / 2;
  const windowY = cy - r + 20;

  // Label radius matched to window's vertical center:
  // window center y = windowY + windowH/2 = 59, radius from center = 200 - 59 = 141
  const labelRadius = 141;

  const outerR = r + 10;
  const innerR = 44;

  return (
    <div className="relative w-full max-w-[400px] mx-auto aspect-square">
      <svg
        viewBox={`0 0 ${WHEEL_SIZE} ${WHEEL_SIZE}`}
        className="w-full h-full overflow-visible"
        role="img"
        aria-label="Draairad"
      >
        <defs>
          <filter id="ppp-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.2" />
          </filter>
          <filter id="hub-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3" />
          </filter>
          <filter id="window-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#000" floodOpacity="0.4" />
          </filter>
          <radialGradient id="cover-gradient" cx="40%" cy="35%">
            <stop offset="0%" stopColor="white" stopOpacity="0.25" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          {/* Cover mask: white = solid cover, black = holes */}
          <mask id="cover-mask">
            <circle cx={cx} cy={cy} r={outerR} fill="white" />
            <circle cx={cx} cy={cy} r={innerR} fill="black" />
            <rect
              x={windowX}
              y={windowY}
              width={windowW}
              height={windowH}
              rx={6}
              fill="black"
            />
          </mask>
        </defs>

        {/* Warm brown outer rim (fixed) */}
        <circle
          cx={cx} cy={cy} r={outerR + 8}
          fill="#3E2723"
          filter="url(#ppp-shadow)"
        />
        <circle
          cx={cx} cy={cy} r={outerR + 3}
          fill="#4E342E"
        />

        {/* FIXED letter wheel — does not rotate */}
        <g>
          <circle cx={cx} cy={cy} r={r + 2} fill="#555" />

          {segments.map((seg, i) => {
            const startA = i * segmentAngle;
            const endA = (i + 1) * segmentAngle;
            const path = describeArc(startA, endA);
            const midAngle = (startA + endA) / 2;
            const rad = ((midAngle - 90) * Math.PI) / 180;
            const lx = Math.round((cx + labelRadius * Math.cos(rad)) * 100) / 100;
            const ly = Math.round((cy + labelRadius * Math.sin(rad)) * 100) / 100;
            const textColor = seg.color === "#FDD835" ? "#333" : "#fff";

            return (
              <g key={seg.id}>
                <path d={path} fill={seg.color} stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                <text
                  x={lx}
                  y={ly}
                  fill={textColor}
                  fontSize={26}
                  fontWeight="900"
                  textAnchor="middle"
                  dominantBaseline="central"
                  transform={`rotate(${midAngle}, ${lx}, ${ly})`}
                  style={{ pointerEvents: "none", userSelect: "none" }}
                >
                  {seg.label}
                </text>
              </g>
            );
          })}
        </g>

        {/* ROTATING orange cover with window */}
        <g transform={`rotate(${rotation}, ${cx}, ${cy})`}>
          {/* Orange cover disc */}
          <circle
            cx={cx} cy={cy} r={outerR}
            fill="#FB8C00"
            mask="url(#cover-mask)"
          />
          {/* 3D gradient overlay */}
          <circle
            cx={cx} cy={cy} r={outerR}
            fill="url(#cover-gradient)"
            mask="url(#cover-mask)"
          />

          {/* Window frame */}
          <rect
            x={windowX - 3}
            y={windowY - 3}
            width={windowW + 6}
            height={windowH + 6}
            rx={8}
            fill="none"
            stroke="#4E342E"
            strokeWidth="4"
            filter="url(#window-glow)"
          />

          {/* Center hub (rotates with cover) */}
          <circle cx={cx} cy={cy} r={innerR} fill="#F57F17" stroke="#4E342E" strokeWidth="2" />
          <circle cx={cx} cy={cy} r={22} fill="#FB8C00" filter="url(#hub-shadow)" />
          <circle cx={cx} cy={cy} r={14} fill="#F9A825" />
          <circle cx={cx} cy={cy} r={6} fill="#5D4037" />
        </g>
      </svg>
    </div>
  );
}
