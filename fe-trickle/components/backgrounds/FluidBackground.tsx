"use client";

import { useSyncExternalStore } from "react";
import Ferrofluid from "./Ferrofluid";

/**
 * Site-wide ambient background: the Ferrofluid shader pinned behind the page.
 * Brand-tuned — lime + warm-taupe rims drifting over the warm-gray page, calm
 * and low-contrast so the white content sheet stays the focus. The fluid is
 * visible in the gutters around the main container and behind the blurred nav.
 *
 * Skipped entirely for prefers-reduced-motion users (it's purely decorative),
 * and DPR is capped to keep the full-viewport WebGL pass cheap.
 */
const subscribeReducedMotion = (cb: () => void) => {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

export function FluidBackground() {
  const reduced = usePrefersReducedMotion();
  if (reduced) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <Ferrofluid
        colors={["#b9b6a6", "#a9e61c", "#c8f94c"]}
        speed={0.22}
        scale={1.7}
        turbulence={0.8}
        fluidity={0.12}
        rimWidth={0.18}
        sharpness={3}
        shimmer={0.8}
        glow={1.15}
        flowDirection="down"
        opacity={0.55}
        mouseInteraction
        mouseStrength={0.8}
        mouseRadius={0.28}
        dpr={
          typeof window !== "undefined"
            ? Math.min(window.devicePixelRatio || 1, 1.5)
            : 1
        }
        mixBlendMode="multiply"
      />
    </div>
  );
}
