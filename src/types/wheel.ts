export interface Segment {
  id: string;
  label: string;
  color: string;
}

export type WheelMode = "alfabet" | "eigen-rad" | "keuze-rad";

export type MatchStrategy = "meeste-letters" | "begint-met";

export interface RouletteResult {
  letter: string;
  matchedOption: string;
  strategy: MatchStrategy;
}

export interface SpinResult {
  segment: Segment;
  finalAngle: number;
}
