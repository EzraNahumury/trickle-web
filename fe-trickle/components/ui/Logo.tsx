/**
 * Trickle wordmark + mark. The mark reads as droplets trickling down — value
 * accruing drip by drip — with the final, smallest drop accented.
 *
 * `variant="light"` is for dark surfaces (footer): lime mark, ink droplets,
 * light wordmark.
 */
export function Logo({
  className = "",
  showWord = true,
  variant = "default",
}: {
  className?: string;
  showWord?: boolean;
  variant?: "default" | "light";
}) {
  const light = variant === "light";
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 32 32" className="size-8 shrink-0" aria-hidden>
        <rect width="32" height="32" rx="9" fill={light ? "#c8f94c" : "#0a0a0a"} />
        <circle cx="12" cy="11" r="3.4" fill={light ? "#0a0a0a" : "#ffffff"} />
        <circle
          cx="18.4"
          cy="17.4"
          r="2.6"
          fill={light ? "#0a0a0a" : "#ffffff"}
          opacity="0.7"
        />
        <circle cx="21.8" cy="23" r="2" fill={light ? "#0a0a0a" : "#c8f94c"} />
      </svg>
      {showWord && (
        <span
          className={`font-display text-[1.35rem] font-semibold tracking-tight ${
            light ? "text-on-dark" : "text-ink"
          }`}
        >
          Trickle
        </span>
      )}
    </span>
  );
}
