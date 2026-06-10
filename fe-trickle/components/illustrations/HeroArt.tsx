/**
 * Hero illustration — custom line-art, monochrome + lime.
 *
 * A stablecoin disc at the centre streams droplets downward (the per-second
 * accrual), wrapped by two tilted orbital rings carrying small payroll glyphs
 * (clock, droplet, wallet, bolt). Rings counter-rotate, the whole piece floats,
 * the lime node pulses. Pure SVG + CSS — no animation library.
 *
 * All motion sits in classes that collapse under prefers-reduced-motion.
 */
const INK = "#0a0a0a";
const LIME = "#c8f94c";
const LIME_DEEP = "#a9e61c";

const ringStyle = {
  transformBox: "fill-box",
  transformOrigin: "center",
} as const;

export function HeroArt({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 360 360"
      className={className}
      role="img"
      aria-label="A Celo coin streaming payroll by the second, orbited by clock, droplet and wallet glyphs"
    >
      <g className="animate-float">
        {/* faint backdrop halo */}
        <circle cx="180" cy="180" r="150" fill={LIME} opacity="0.07" />

        {/* ── Orbital ring A (counter-clockwise) ─────────────────────── */}
        <g className="animate-spin-reverse" style={ringStyle}>
          <ellipse
            cx="180"
            cy="180"
            rx="150"
            ry="64"
            fill="none"
            stroke={INK}
            strokeWidth="2"
            transform="rotate(-22 180 180)"
            opacity="0.85"
          />
          {/* lime node */}
          <circle cx="312" cy="150" r="9" fill={LIME} className="animate-pulse-ring" />
          {/* wallet node */}
          <g transform="translate(40 196)">
            <rect x="-13" y="-10" width="26" height="20" rx="5" fill="#fff" stroke={INK} strokeWidth="2" />
            <path d="M -13 -3 H 13" stroke={INK} strokeWidth="2" />
            <circle cx="7" cy="3.5" r="1.8" fill={INK} />
          </g>
        </g>

        {/* ── Orbital ring B (clockwise) ─────────────────────────────── */}
        <g className="animate-spin-slow" style={ringStyle}>
          <ellipse
            cx="180"
            cy="180"
            rx="146"
            ry="60"
            fill="none"
            stroke={INK}
            strokeWidth="2"
            transform="rotate(28 180 180)"
            opacity="0.85"
          />
          {/* clock node */}
          <g transform="translate(300 214)">
            <circle r="13" fill="#fff" stroke={INK} strokeWidth="2" />
            <path d="M0 -7 V0 L5 4" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" />
          </g>
          {/* droplet node */}
          <g transform="translate(58 132)">
            <path
              d="M0 -12 C 8 -2 11 3 11 7 a 11 11 0 1 1 -22 0 c 0 -4 3 -9 11 -19 Z"
              fill="#fff"
              stroke={INK}
              strokeWidth="2"
            />
            <circle cx="0" cy="6" r="3" fill={LIME} />
          </g>
          {/* small ink node */}
          <circle cx="180" cy="118" r="5" fill={INK} />
        </g>

        {/* ── Centre coin — 3D glass Celo coin ───────────────────────── */}
        <g className="animate-float-soft">
          {/* soft ground shadow so the 3D coin sits in the line-art scene */}
          <ellipse cx="180" cy="246" rx="44" ry="9" fill={INK} opacity="0.08" />
          <image
            href="/celo-glass-crypto-coin-3d-illustration-free-png-removebg-preview.png"
            x="108"
            y="106"
            width="144"
            height="144"
          />
        </g>

        {/* ── Streaming droplets falling from the coin ───────────────── */}
        <g>
          <circle cx="180" cy="246" r="4" fill={INK} className="animate-float-soft" />
          <circle cx="166" cy="266" r="3" fill={LIME} className="animate-float" />
          <circle cx="196" cy="276" r="2.5" fill={INK} opacity="0.65" className="animate-float-soft" />
          <circle cx="180" cy="294" r="2" fill={INK} opacity="0.4" />
        </g>

        {/* ── Sparkles ───────────────────────────────────────────────── */}
        <path
          d="M300 88 c1 5 2 6 7 7 -5 1 -6 2 -7 7 -1 -5 -2 -6 -7 -7 5 -1 6 -2 7 -7Z"
          fill={INK}
          className="animate-pulse-ring"
        />
        <path
          d="M58 264 c.8 4 1.6 4.8 5.6 5.6 -4 .8 -4.8 1.6 -5.6 5.6 -.8 -4 -1.6 -4.8 -5.6 -5.6 4 -.8 4.8 -1.6 5.6 -5.6Z"
          fill={LIME_DEEP}
        />
      </g>
    </svg>
  );
}
