export function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}
