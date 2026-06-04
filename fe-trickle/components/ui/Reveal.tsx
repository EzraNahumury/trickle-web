"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

/**
 * Scroll-reveal wrapper. Adds the `.reveal` class (defined in globals.css) and
 * flips `data-visible` once the element scrolls into view — a one-shot fade +
 * rise. Honours prefers-reduced-motion via the CSS rule, and reveals
 * immediately if IntersectionObserver is unavailable.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
  amount = 0.18,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
  amount?: number;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      // Defensive fallback for environments without IO — reveal on the next
      // frame so we never leave content hidden (and never setState inline).
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: amount, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [amount]);

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      data-visible={visible}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
