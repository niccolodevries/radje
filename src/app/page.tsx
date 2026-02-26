"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import ModeSelector from "@/components/ModeSelector";
import CustomOptions from "@/components/CustomOptions";
import StrategySelector from "@/components/StrategySelector";
import SpinningWheel from "@/components/SpinningWheel";
import PimPamPetWheel from "@/components/PimPamPetWheel";
import SpinButton from "@/components/SpinButton";
import WinnerDisplay from "@/components/WinnerDisplay";
import RouletteWinnerDisplay from "@/components/RouletteWinnerDisplay";
import NoMatchToast from "@/components/NoMatchToast";
import { useWheelSpin } from "@/hooks/useWheelSpin";
import { buildSegments } from "@/lib/wheel-math";
import { buildRouletteResult } from "@/lib/menu-roulette";
import { ALPHABET, COLORS } from "@/lib/constants";
import type { WheelMode, MatchStrategy, RouletteResult } from "@/types/wheel";

export default function Home() {
  const [mode, setMode] = useState<WheelMode>("alfabet");
  const [customOptions, setCustomOptions] = useState<string[]>([]);
  const [strategy, setStrategy] = useState<MatchStrategy>("meeste-letters");
  const [rouletteResult, setRouletteResult] = useState<RouletteResult | null>(null);
  const [noMatchLetter, setNoMatchLetter] = useState<string | null>(null);
  const [noMatchCount, setNoMatchCount] = useState(0);
  const [exhausted, setExhausted] = useState(false);
  const reSpin = useRef<(() => void) | null>(null);

  const segments = useMemo(() => {
    if (mode === "alfabet" || mode === "keuze-rad") {
      return buildSegments(ALPHABET, COLORS);
    }
    return buildSegments(customOptions, COLORS);
  }, [mode, customOptions]);

  const coverSpins = mode === "alfabet" || mode === "keuze-rad";
  const { rotation, isSpinning, winner, spin, reset, clearWinner } =
    useWheelSpin(segments, coverSpins);

  // Store spin ref for auto re-spin
  reSpin.current = spin;

  // Handle keuze-rad winner matching
  useEffect(() => {
    if (mode !== "keuze-rad" || !winner) return;

    const result = buildRouletteResult(winner.label, customOptions, strategy);
    if (result) {
      setRouletteResult(result);
      setNoMatchLetter(null);
      setNoMatchCount(0);
    } else {
      const newCount = noMatchCount + 1;
      setNoMatchCount(newCount);
      clearWinner();

      if (newCount >= 5) {
        setExhausted(true);
        setNoMatchLetter(null);
        return;
      }

      setNoMatchLetter(winner.label);
      const timer = setTimeout(() => {
        setNoMatchLetter(null);
        reSpin.current?.();
      }, 1500);
      return () => clearTimeout(timer);
    }
    // noMatchCount is intentionally excluded to avoid re-triggering
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [winner, mode, customOptions, strategy, clearWinner]);

  const handleModeChange = useCallback(
    (newMode: WheelMode) => {
      if (newMode !== mode) {
        setMode(newMode);
        reset();
        setRouletteResult(null);
        setNoMatchLetter(null);
        setNoMatchCount(0);
        setExhausted(false);
      }
    },
    [mode, reset]
  );

  const handleDismissRoulette = useCallback(() => {
    setRouletteResult(null);
    clearWinner();
  }, [clearWinner]);

  const handleAddOption = useCallback((option: string) => {
    setCustomOptions((prev) => {
      if (prev.length >= 30) return prev;
      return [...prev, option];
    });
  }, []);

  const handleAddBulk = useCallback((options: string[]) => {
    setCustomOptions((prev) => {
      const remaining = 30 - prev.length;
      return [...prev, ...options.slice(0, remaining)];
    });
  }, []);

  const handleRemoveOption = useCallback(
    (index: number) => {
      setCustomOptions((prev) => prev.filter((_, i) => i !== index));
      reset();
    },
    [reset]
  );

  const handleClearAll = useCallback(() => {
    setCustomOptions([]);
    reset();
  }, [reset]);

  const canSpin =
    mode === "keuze-rad"
      ? customOptions.length >= 1 && !isSpinning && !exhausted
      : segments.length >= 2 && !isSpinning;

  const showCustomOptions = mode === "eigen-rad" || mode === "keuze-rad";
  const showPPPWheel = mode === "alfabet" || mode === "keuze-rad";

  return (
    <main className="min-h-screen bg-[#FAFAFA] flex flex-col items-center px-4 pt-6 pb-12">
      <div className="w-full max-w-2xl flex flex-col items-center gap-6">
        <ModeSelector mode={mode} onModeChange={handleModeChange} />

        {showCustomOptions && (
          <CustomOptions
            options={customOptions}
            onAdd={handleAddOption}
            onAddBulk={handleAddBulk}
            onRemove={handleRemoveOption}
            onClearAll={handleClearAll}
            minOptions={mode === "keuze-rad" ? 1 : 2}
          />
        )}

        {mode === "keuze-rad" && (
          <StrategySelector strategy={strategy} onStrategyChange={setStrategy} />
        )}

        {segments.length >= 2 ? (
          <>
            {showPPPWheel ? (
              <PimPamPetWheel segments={segments} rotation={rotation} />
            ) : (
              <SpinningWheel segments={segments} rotation={rotation} />
            )}

            <SpinButton
              onClick={spin}
              disabled={!canSpin}
              isSpinning={isSpinning}
            />
          </>
        ) : (
          showCustomOptions && (
            <div className="w-full max-w-[400px] aspect-square mx-auto flex items-center justify-center rounded-full border-2 border-dashed border-gray-200">
              <p className="text-gray-400 text-sm text-center px-8">
                Voeg opties toe om je rad te zien
              </p>
            </div>
          )
        )}
      </div>

      <WinnerDisplay winner={winner} mode={mode} onDismiss={clearWinner} />
      <RouletteWinnerDisplay result={rouletteResult} onDismiss={handleDismissRoulette} />
      <NoMatchToast letter={noMatchLetter} exhausted={exhausted} />
    </main>
  );
}
