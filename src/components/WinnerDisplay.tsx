"use client";

import { useEffect, useRef } from "react";
import type { Segment } from "@/types/wheel";
import type { WheelMode } from "@/types/wheel";

interface WinnerDisplayProps {
  winner: Segment | null;
  mode: WheelMode;
  onDismiss: () => void;
}

export default function WinnerDisplay({ winner, mode, onDismiss }: WinnerDisplayProps) {
  const dismissRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!winner || mode === "keuze-rad") return;

    dismissRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onDismiss();
        return;
      }
      if (e.key === "Tab") {
        // Focus trap: keep focus on the dismiss button
        e.preventDefault();
        dismissRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [winner, mode, onDismiss]);

  if (!winner || mode === "keuze-rad") return null;

  const message =
    mode === "alfabet"
      ? "De letter is:"
      : "Het resultaat is:";

  const displayColor = winner.color === "#FDD835" ? "#D4A017" : winner.color;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 animate-[fade-in_0.2s_ease-out]"
      role="dialog"
      aria-modal="true"
      aria-label={`${message} ${winner.label}`}
      onClick={onDismiss}
    >
      <div
        className="bg-white rounded-3xl px-10 py-8 shadow-2xl text-center animate-[pop-in_0.3s_ease-out] max-w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-gray-500 text-sm">{message}</p>
        <p
          className="text-5xl sm:text-6xl font-extrabold mt-2"
          style={{ color: displayColor }}
        >
          {winner.label}
        </p>
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
