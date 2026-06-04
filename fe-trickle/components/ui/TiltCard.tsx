"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";

/**
 * Pointer-reactive tilt + glare for cards. Subtle (max ~5deg). Disabled for
 * coarse pointers (touch) and reduced-motion users — they get a static card.
 */
export function TiltCard({
  children,
  className = "",
  max = 5,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  const allowed = () => {
    if (typeof window === "undefined") return false;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return false;
    if (window.matchMedia("(pointer: coarse)").matches) return false;
    return true;
  };

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node || !allowed()) return;
    const r = node.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    node.style.transform = `perspective(900px) rotateX(${(-py * max).toFixed(
      2,
    )}deg) rotateY(${(px * max).toFixed(2)}deg)`;
    node.style.setProperty("--mx", `${(px + 0.5) * 100}%`);
    node.style.setProperty("--my", `${(py + 0.5) * 100}%`);
  };

  const reset = () => {
    const node = ref.current;
    if (!node) return;
    node.style.transform = "";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={`transition-transform duration-300 ease-[var(--ease-out-expo)] [transform-style:preserve-3d] ${className}`}
    >
      {children}
    </div>
  );
}
