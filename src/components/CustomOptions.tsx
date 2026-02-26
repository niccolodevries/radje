"use client";

import { useState } from "react";

interface CustomOptionsProps {
  options: string[];
  onAdd: (option: string) => void;
  onAddBulk: (options: string[]) => void;
  onRemove: (index: number) => void;
  onClearAll: () => void;
  minOptions?: number;
}

export default function CustomOptions({
  options,
  onAdd,
  onAddBulk,
  onRemove,
  onClearAll,
  minOptions = 2,
}: CustomOptionsProps) {
  const [input, setInput] = useState("");
  const [bulkInput, setBulkInput] = useState("");
  const [showBulk, setShowBulk] = useState(false);

  const handleAdd = () => {
    const trimmed = input.trim();
    if (trimmed && options.length < 30) {
      onAdd(trimmed);
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  const handleBulkAdd = () => {
    const lines = bulkInput
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.length > 0);
    if (lines.length > 0) {
      onAddBulk(lines.slice(0, 30 - options.length));
      setBulkInput("");
      setShowBulk(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto space-y-3">
      {/* Single add */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Voeg optie toe..."
          maxLength={30}
          className="flex-1 px-4 py-2 rounded-full border border-gray-200 bg-white text-sm
                     focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300"
        />
        <button
          onClick={handleAdd}
          disabled={!input.trim() || options.length >= 30}
          className="px-4 py-2 rounded-full bg-gray-900 text-white text-sm font-semibold
                     hover:bg-gray-800 disabled:bg-gray-200 disabled:text-gray-400
                     disabled:cursor-not-allowed transition-colors shrink-0"
        >
          Toevoegen
        </button>
      </div>

      {/* Toggle bulk paste */}
      <button
        onClick={() => setShowBulk(!showBulk)}
        className="text-xs text-gray-400 hover:text-gray-600 transition-colors w-full text-center"
      >
        {showBulk ? "Verberg plak-veld" : "Meerdere opties tegelijk plakken"}
      </button>

      {/* Bulk paste textarea */}
      {showBulk && (
        <div className="space-y-2">
          <textarea
            value={bulkInput}
            onChange={(e) => setBulkInput(e.target.value)}
            placeholder={"Plak hier meerdere opties,\nelke optie op een nieuwe regel...\n\nBijv:\nPizza Margherita\nPasta Carbonara\nRisotto"}
            rows={6}
            className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white text-sm
                       focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300
                       resize-none"
          />
          <button
            onClick={handleBulkAdd}
            disabled={!bulkInput.trim() || options.length >= 30}
            className="w-full px-4 py-2 rounded-full bg-gray-900 text-white text-sm font-semibold
                       hover:bg-gray-800 disabled:bg-gray-200 disabled:text-gray-400
                       disabled:cursor-not-allowed transition-colors"
          >
            Alles toevoegen
          </button>
        </div>
      )}

      {/* Chips */}
      {options.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center">
          {options.map((option, i) => (
            <span
              key={`${option}-${i}`}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100
                         text-sm text-gray-700"
            >
              {option}
              <button
                onClick={() => onRemove(i)}
                className="w-4 h-4 rounded-full flex items-center justify-center
                           text-gray-400 hover:text-gray-700 hover:bg-gray-200 transition-colors
                           text-xs leading-none"
                aria-label={`Verwijder ${option}`}
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Clear all + min hint */}
      <div className="flex items-center justify-center gap-4">
        {options.length < minOptions && (
          <p className="text-xs text-gray-400">
            Voeg minimaal {minOptions} {minOptions === 1 ? "optie" : "opties"} toe om te draaien
          </p>
        )}
        {options.length > 0 && (
          <button
            onClick={onClearAll}
            className="text-xs text-red-400 hover:text-red-600 transition-colors"
          >
            Alles verwijderen
          </button>
        )}
      </div>
    </div>
  );
}
