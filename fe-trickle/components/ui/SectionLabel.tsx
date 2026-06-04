import type { ReactNode } from "react";

/**
 * The lime highlighter-pen label from the reference ("Services", "Case study").
 * Marks the start of a section.
 */
export function SectionLabel({
  children,
  tone = "lime",
  className = "",
}: {
  children: ReactNode;
  tone?: "lime" | "ink" | "outline";
  className?: string;
}) {
  const tones = {
    lime: "bg-lime text-ink",
    ink: "bg-ink text-on-dark",
    outline: "border border-ink/20 text-ink",
  } as const;

  return (
    <span
      className={`inline-flex w-fit items-center rounded-lg px-2.5 py-1 text-sm font-medium tracking-tight ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

/**
 * Small status pill (e.g. "Live on Celo Mainnet") with an optional pulsing dot.
 */
export function Pill({
  children,
  dot = false,
  className = "",
}: {
  children: ReactNode;
  dot?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex w-fit items-center gap-2 rounded-full border border-ink/12 bg-surface/70 px-3.5 py-1.5 text-[0.8rem] font-medium text-muted backdrop-blur ${className}`}
    >
      {dot && (
        <span className="relative inline-flex size-1.5">
          <span className="live-dot absolute inset-0 rounded-full bg-lime-deep" />
        </span>
      )}
      {children}
    </span>
  );
}
