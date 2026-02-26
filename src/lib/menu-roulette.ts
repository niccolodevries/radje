import type { MatchStrategy, RouletteResult } from "@/types/wheel";

function countLetter(option: string, letter: string): number {
  const lower = letter.toLowerCase();
  return [...option.toLowerCase()].filter((c) => c === lower).length;
}

function begintMetScore(option: string, letter: string): number {
  const lower = letter.toLowerCase();
  return [...option.toLowerCase()].reduce(
    (score, c, i) => (c === lower ? score + 1 / (i + 1) : score),
    0
  );
}

export function matchOption(
  letter: string,
  options: string[],
  strategy: MatchStrategy
): string | null {
  if (options.length === 0) return null;

  if (strategy === "meeste-letters") {
    let best: string | null = null;
    let bestCount = 0;
    for (const opt of options) {
      const count = countLetter(opt, letter);
      if (count > bestCount) {
        bestCount = count;
        best = opt;
      }
    }
    return best;
  }

  // begint-met: only options starting with the letter
  const lower = letter.toLowerCase();
  const starting = options.filter(
    (opt) => opt.toLowerCase().startsWith(lower)
  );
  if (starting.length === 0) return null;

  let best = starting[0];
  let bestScore = begintMetScore(best, letter);
  for (let i = 1; i < starting.length; i++) {
    const score = begintMetScore(starting[i], letter);
    if (score > bestScore) {
      bestScore = score;
      best = starting[i];
    }
  }
  return best;
}

export function buildRouletteResult(
  letter: string,
  options: string[],
  strategy: MatchStrategy
): RouletteResult | null {
  const matched = matchOption(letter, options, strategy);
  if (!matched) return null;
  return { letter, matchedOption: matched, strategy };
}
