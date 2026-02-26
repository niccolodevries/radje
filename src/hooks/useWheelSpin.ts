"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { easeOutQuart } from "@/lib/easing";
import {
  SPIN_DURATION_MIN,
  SPIN_DURATION_MAX,
  SPIN_ROTATIONS_MIN,
  SPIN_ROTATIONS_MAX,
} from "@/lib/constants";
import type { Segment } from "@/types/wheel";

export function useWheelSpin(segments: Segment[], coverSpins: boolean = false) {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<Segment | null>(null);
  const rafRef = useRef<number>(0);
  const baseAngleRef = useRef(0);

  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const spin = useCallback(() => {
    if (isSpinning || segments.length < 2) return;

    setIsSpinning(true);
    setWinner(null);

    const duration =
      SPIN_DURATION_MIN +
      Math.random() * (SPIN_DURATION_MAX - SPIN_DURATION_MIN);

    const segmentAngle = 360 / segments.length;

    // Pick a random target segment to land on
    const targetIndex = Math.floor(Math.random() * segments.length);
    const targetMid = (targetIndex + 0.5) * segmentAngle;

    // Calculate the exact remainder we need after full rotations
    let targetRemainder: number;
    if (coverSpins) {
      // Cover rotates over fixed wheel — window at targetMid°
      targetRemainder = targetMid;
    } else {
      // Wheel rotates, pointer fixed at top — need segment midpoint at 0°
      targetRemainder = (360 - targetMid + 360) % 360;
    }

    // Random number of full rotations
    const fullRotations =
      SPIN_ROTATIONS_MIN +
      Math.floor(Math.random() * (SPIN_ROTATIONS_MAX - SPIN_ROTATIONS_MIN + 1));

    // Calculate offset from current position to target
    const startAngle = baseAngleRef.current;
    const baseRemainder = ((startAngle % 360) + 360) % 360;
    let offset = targetRemainder - baseRemainder;
    if (offset < 0) offset += 360;

    const totalDegrees = fullRotations * 360 + offset;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuart(progress);
      const currentAngle = startAngle + totalDegrees * eased;

      setRotation(currentAngle);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        baseAngleRef.current = currentAngle;
        setWinner(segments[targetIndex]);
        setIsSpinning(false);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
  }, [isSpinning, segments, coverSpins]);

  const reset = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    setRotation(0);
    setIsSpinning(false);
    setWinner(null);
    baseAngleRef.current = 0;
  }, []);

  const clearWinner = useCallback(() => {
    setWinner(null);
  }, []);

  return { rotation, isSpinning, winner, spin, reset, clearWinner };
}
