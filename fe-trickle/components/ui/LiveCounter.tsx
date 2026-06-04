"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A salary balance that ticks upward every frame — the literal "get paid every
 * second" thesis, made tangible. Starts from `start` USDC and accrues at
 * `ratePerSec`. Grounded in the README example: ~$1,000/mo ≈ 0.0003858 USDC/s,
 * mid-month accrued ≈ $497.31.
 *
 * Respects prefers-reduced-motion: shows the static starting value, no rAF loop.
 */
export function LiveCounter({
  start = 497.314802,
  ratePerSec = 0.000385802,
  decimals = 6,
  className = "",
}: {
  start?: number;
  ratePerSec?: number;
  decimals?: number;
  className?: string;
}) {
  const [value, setValue] = useState(start);
  const frame = useRef<number | undefined>(undefined);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const t0 = performance.now();
    const loop = (now: number) => {
      const elapsed = (now - t0) / 1000;
      setValue(start + elapsed * ratePerSec);
      frame.current = requestAnimationFrame(loop);
    };
    frame.current = requestAnimationFrame(loop);
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [start, ratePerSec]);

  const [whole, fraction] = value
    .toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })
    .split(".");

  return (
    <span className={`font-mono tabular-nums ${className}`}>
      <span className="text-ink">${whole}</span>
      <span className="text-muted-2">.{fraction}</span>
    </span>
  );
}
