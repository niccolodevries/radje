import WheelSegment from "./WheelSegment";
import WheelPointer from "./WheelPointer";
import { WHEEL_SIZE, WHEEL_CENTER } from "@/lib/constants";
import type { Segment } from "@/types/wheel";

interface SpinningWheelProps {
  segments: Segment[];
  rotation: number;
}

export default function SpinningWheel({ segments, rotation }: SpinningWheelProps) {
  const segmentAngle = 360 / segments.length;

  return (
    <div className="relative w-full max-w-[400px] mx-auto aspect-square">
      <svg
        viewBox={`0 0 ${WHEEL_SIZE} ${WHEEL_SIZE}`}
        className="w-full h-full overflow-visible"
        role="img"
        aria-label="Draairad"
      >
        {/* Shadow filter for wheel */}
        <defs>
          <filter id="wheel-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* Rotating wheel group */}
        <g
          transform={`rotate(${rotation}, ${WHEEL_CENTER}, ${WHEEL_CENTER})`}
          filter="url(#wheel-shadow)"
        >
          {/* Outer ring */}
          <circle
            cx={WHEEL_CENTER}
            cy={WHEEL_CENTER}
            r={188}
            fill="#333"
          />
          {segments.map((seg, i) => (
            <WheelSegment
              key={seg.id}
              startAngle={i * segmentAngle}
              endAngle={(i + 1) * segmentAngle}
              color={seg.color}
              label={seg.label}
              segmentCount={segments.length}
            />
          ))}
          {/* Center circle */}
          <circle
            cx={WHEEL_CENTER}
            cy={WHEEL_CENTER}
            r={24}
            fill="#fff"
            stroke="#e5e7eb"
            strokeWidth="3"
          />
          <circle
            cx={WHEEL_CENTER}
            cy={WHEEL_CENTER}
            r={8}
            fill="#333"
          />
        </g>

        {/* Fixed pointer */}
        <WheelPointer />
      </svg>
    </div>
  );
}
