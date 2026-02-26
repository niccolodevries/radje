import { describeArc, getLabelPosition } from "@/lib/wheel-math";

interface WheelSegmentProps {
  startAngle: number;
  endAngle: number;
  color: string;
  label: string;
  segmentCount: number;
}

export default function WheelSegment({
  startAngle,
  endAngle,
  color,
  label,
  segmentCount,
}: WheelSegmentProps) {
  const path = describeArc(startAngle, endAngle);
  const labelPos = getLabelPosition(startAngle, endAngle);

  // Scale font based on segment count and label length
  const baseFontSize = segmentCount <= 8 ? 16 : segmentCount <= 16 ? 13 : 10;
  const fontSize = label.length > 10 ? Math.max(baseFontSize - 2, 8) : baseFontSize;

  // Text color: dark on yellow, white on everything else
  const textColor = color === "#FDD835" ? "#333" : "#fff";

  return (
    <g>
      <path
        d={path}
        fill={color}
        stroke="#fff"
        strokeWidth="2"
      />
      <text
        x={labelPos.x}
        y={labelPos.y}
        fill={textColor}
        fontSize={fontSize}
        fontWeight="bold"
        textAnchor="middle"
        dominantBaseline="central"
        transform={`rotate(${labelPos.rotation}, ${labelPos.x}, ${labelPos.y})`}
        style={{ pointerEvents: "none", userSelect: "none" }}
      >
        {label.length > 14 ? label.slice(0, 12) + "…" : label}
      </text>
    </g>
  );
}
