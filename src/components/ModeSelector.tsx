import type { WheelMode } from "@/types/wheel";

interface ModeSelectorProps {
  mode: WheelMode;
  onModeChange: (mode: WheelMode) => void;
}

export default function ModeSelector({ mode, onModeChange }: ModeSelectorProps) {
  return (
    <div
      className="flex justify-center gap-1 bg-gray-100 rounded-full p-1 max-w-sm mx-auto"
      role="radiogroup"
      aria-label="Modus"
    >
      <button
        onClick={() => onModeChange("alfabet")}
        role="radio"
        aria-checked={mode === "alfabet"}
        className={`flex-1 px-3 py-2 rounded-full text-sm font-semibold transition-all ${
          mode === "alfabet"
            ? "bg-white text-gray-900 shadow-sm"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        Alfabet
      </button>
      <button
        onClick={() => onModeChange("eigen-rad")}
        role="radio"
        aria-checked={mode === "eigen-rad"}
        className={`flex-1 px-3 py-2 rounded-full text-sm font-semibold transition-all ${
          mode === "eigen-rad"
            ? "bg-white text-gray-900 shadow-sm"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        Eigen Rad
      </button>
      <button
        onClick={() => onModeChange("keuze-rad")}
        role="radio"
        aria-checked={mode === "keuze-rad"}
        className={`flex-1 px-3 py-2 rounded-full text-sm font-semibold transition-all ${
          mode === "keuze-rad"
            ? "bg-white text-gray-900 shadow-sm"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        Keuze Rad
      </button>
    </div>
  );
}
