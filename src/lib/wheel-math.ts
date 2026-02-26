import { WHEEL_CENTER, WHEEL_RADIUS } from "./constants";
import type { Segment } from "@/types/wheel";

function polarToCartesian(
  cx: number,
  cy: number,
  r: number,
  angleDeg: number
): { x: number; y: number } {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: Math.round((cx + r * Math.cos(rad)) * 100) / 100,
    y: Math.round((cy + r * Math.sin(rad)) * 100) / 100,
  };
}

export function describeArc(
  startAngle: number,
  endAngle: number,
  radius: number = WHEEL_RADIUS,
  cx: number = WHEEL_CENTER,
  cy: number = WHEEL_CENTER
): string {
  const start = polarToCartesian(cx, cy, radius, endAngle);
  const end = polarToCartesian(cx, cy, radius, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    `M ${cx} ${cy}`,
    `L ${start.x} ${start.y}`,
    `A ${radius} ${radius} 0 ${largeArc} 0 ${end.x} ${end.y}`,
    "Z",
  ].join(" ");
}

export function getLabelPosition(
  startAngle: number,
  endAngle: number,
  radius: number = WHEEL_RADIUS,
  cx: number = WHEEL_CENTER,
  cy: number = WHEEL_CENTER
): { x: number; y: number; rotation: number } {
  const midAngle = (startAngle + endAngle) / 2;
  const labelRadius = radius * 0.65;
  const pos = polarToCartesian(cx, cy, labelRadius, midAngle);
  return {
    x: pos.x,
    y: pos.y,
    rotation: midAngle,
  };
}

export function getWinningSegmentIndex(
  currentAngle: number,
  segmentCount: number,
  coverSpins: boolean = false
): number {
  const normalized = ((currentAngle % 360) + 360) % 360;
  const segmentAngle = 360 / segmentCount;

  if (coverSpins) {
    // Cover rotates over fixed wheel. Window starts at top (0°).
    // After rotating R° clockwise, the window points at segment at angle R°.
    const index = Math.floor(normalized / segmentAngle);
    return index % segmentCount;
  }

  // Wheel rotates, pointer fixed at top.
  const pointerAngleInWheel = ((360 - normalized) % 360 + 360) % 360;
  const index = Math.floor(pointerAngleInWheel / segmentAngle);
  return index % segmentCount;
}

export function buildSegments(
  labels: string[],
  colors: readonly string[]
): Segment[] {
  return labels.map((label, i) => ({
    id: `${label}-${i}`,
    label,
    color: colors[i % colors.length],
  }));
}
