import { WHEEL_CENTER } from "@/lib/constants";

export default function WheelPointer() {
  const cx = WHEEL_CENTER;
  const tipY = WHEEL_CENTER - 190;
  const baseY = tipY - 28;
  const halfWidth = 14;

  return (
    <g filter="url(#pointer-shadow)">
      <defs>
        <filter id="pointer-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.3" />
        </filter>
      </defs>
      <polygon
        points={`${cx},${tipY} ${cx - halfWidth},${baseY} ${cx + halfWidth},${baseY}`}
        fill="#333"
        stroke="#fff"
        strokeWidth="2"
      />
    </g>
  );
}
