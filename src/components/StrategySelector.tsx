import type { MatchStrategy } from "@/types/wheel";

interface StrategySelectorProps {
  strategy: MatchStrategy;
  onStrategyChange: (strategy: MatchStrategy) => void;
}

export default function StrategySelector({
  strategy,
  onStrategyChange,
}: StrategySelectorProps) {
  return (
    <div
      className="flex justify-center gap-1 bg-gray-100 rounded-full p-1 max-w-xs mx-auto"
      role="radiogroup"
      aria-label="Strategie"
    >
      <button
        onClick={() => onStrategyChange("meeste-letters")}
        role="radio"
        aria-checked={strategy === "meeste-letters"}
        className={`flex-1 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
          strategy === "meeste-letters"
            ? "bg-white text-gray-900 shadow-sm"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        Meeste letters
      </button>
      <button
        onClick={() => onStrategyChange("begint-met")}
        role="radio"
        aria-checked={strategy === "begint-met"}
        className={`flex-1 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
          strategy === "begint-met"
            ? "bg-white text-gray-900 shadow-sm"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        Begint met
      </button>
    </div>
  );
}
