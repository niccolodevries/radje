"use client";

import { useEffect, useRef } from "react";
import type { RouletteResult } from "@/types/wheel";

interface RouletteWinnerDisplayProps {
  result: RouletteResult | null;
  onDismiss: () => void;
}

export default function RouletteWinnerDisplay({
  result,
  onDismiss,
}: RouletteWinnerDisplayProps) {
  const dismissRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!result) return;

    dismissRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onDismiss();
        return;
      }
      if (e.key === "Tab") {
        e.preventDefault();
        dismissRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [result, onDismiss]);

  if (!result) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 animate-[fade-in_0.2s_ease-out]"
      role="dialog"
      aria-modal="true"
      aria-label={`De letter is: ${result.letter}`}
      onClick={onDismiss}
    >
      <div
        className="bg-white rounded-3xl px-10 py-8 shadow-2xl text-center animate-[pop-in_0.3s_ease-out] max-w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-gray-500 text-sm">De letter is:</p>
        <p className="text-5xl sm:text-6xl font-extrabold mt-2 text-orange-500">
          {result.letter}
        </p>
        <div className="mt-4 px-4 py-3 bg-gray-50 rounded-2xl">
          <p className="text-gray-500 text-xs mb-1">
            {result.strategy === "meeste-letters"
              ? "Meeste letters"
              : "Begint met"}
          </p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900">
            {result.matchedOption}
          </p>
        </div>
        <button
          ref={dismissRef}
          onClick={onDismiss}
          className="mt-6 px-6 py-2 rounded-full bg-gray-900 text-white text-sm font-semibold
                     hover:bg-gray-800 transition-colors"
        >
          Nog een keer
        </button>
      </div>
    </div>
  );
}
