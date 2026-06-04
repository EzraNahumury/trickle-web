/**
 * CTA orb — animated inline version of /public/assets/illustrations/cta-orb.svg.
 * Two tilted rings counter-orbit around a floating droplet core; the lime and
 * ink nodes ride the rings, the core pulses, sparkles twinkle. Pure SVG + CSS.
 * Decorative (the CTA conveys meaning in text), so marked aria-hidden.
 */
const INK = "#0a0a0a";
const LIME = "#c8f94c";

// Rotate each ring group exactly around the orb centre (130,110).
const ring = {
  transformBox: "view-box",
  transformOrigin: "130px 110px",
} as const;

export function CtaOrb({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 -26 260 262" className={className} aria-hidden>
      <g
        className="animate-float"
        stroke={INK}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        {/* ring A — clockwise, carries the lime node */}
        <g className="animate-spin-slow" style={ring}>
          <ellipse cx="130" cy="110" rx="118" ry="46" transform="rotate(-20 130 110)" />
          <circle cx="232" cy="92" r="8" fill={LIME} stroke="none" />
        </g>

        {/* ring B — counter-clockwise, carries the ink node */}
        <g className="animate-spin-reverse" style={ring}>
          <ellipse cx="130" cy="110" rx="118" ry="46" transform="rotate(28 130 110)" />
          <circle cx="28" cy="128" r="6" fill={INK} stroke="none" />
        </g>

        {/* droplet core */}
        <g className="animate-float-soft">
          <path
            d="M130 64c18 22 26 34 26 47a26 26 0 1 1-52 0c0-13 8-25 26-47Z"
            fill="#ffffff"
          />
          <circle cx="130" cy="116" r="9" fill={LIME} className="art-pulse" />
        </g>

        {/* sparkles */}
        <path
          d="M210 150c1.2 6 2.4 7.2 8.4 8.4-6 1.2-7.2 2.4-8.4 8.4-1.2-6-2.4-7.2-8.4-8.4 6-1.2 7.2-2.4 8.4-8.4Z"
          fill={INK}
          stroke="none"
          className="art-twinkle"
        />
        <path
          d="M44 60c1 5 2 6 7 7-5 1-6 2-7 7-1-5-2-6-7-7 5-1 6-2 7-7Z"
          fill={INK}
          stroke="none"
          className="art-twinkle"
          style={{ animationDelay: "0.9s" }}
        />
      </g>
    </svg>
  );
}
