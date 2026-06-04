/**
 * Feature-card illustrations as inline SVG so strokes inherit `currentColor` —
 * this lets the same art read correctly on both light and dark cards. Lime
 * accents are fixed; marks that sit *on* a lime fill use ink (#0a0a0a) so they
 * stay legible on either card tone. Pure line art, no library.
 *
 * Each piece animates continuously (CSS classes from globals.css): dots flow
 * along stream lines, the clock hand ticks, coins bob, nodes pulse, the droplet
 * drips, sparkles twinkle. All motion collapses under prefers-reduced-motion.
 *
 * Standalone, swappable copies also live in /public/assets/illustrations/*.svg.
 */
import type { SVGProps } from "react";

const LIME = "#c8f94c";
const INK = "#0a0a0a";

const wrap = {
  viewBox: "0 0 240 168",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function CardStream(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...wrap} {...props}>
      {/* clock face + ticks */}
      <circle cx="56" cy="84" r="27" />
      <path d="M56 51v4M56 113v4M24 84h4M84 84h4" />
      {/* ticking hand */}
      <path
        d="M56 67v17l11 8"
        className="art-tick"
        style={{ transformOrigin: "56px 84px" }}
      />
      {/* flowing stream of value */}
      <path d="M92 84h120" strokeDasharray="2 9" className="art-flow" />
      <circle cx="120" cy="84" r="11" className="art-bob" />
      <circle
        cx="160"
        cy="84"
        r="8.5"
        className="art-bob"
        style={{ animationDelay: "0.9s" }}
      />
      <circle cx="198" cy="84" r="6.5" fill={LIME} stroke="none" className="art-pulse" />
      {/* dripping droplet */}
      <path
        d="M120 124c4 5 5.5 8 5.5 10.5a5.5 5.5 0 1 1-11 0c0-2.5 1.5-5.5 5.5-10.5Z"
        fill={LIME}
        stroke="none"
        className="art-drip"
      />
      <path
        d="M214 36c1 5 2 6 7 7-5 1-6 2-7 7-1-5-2-6-7-7 5-1 6-2 7-7Z"
        fill="currentColor"
        stroke="none"
        className="art-twinkle"
      />
    </svg>
  );
}

export function CardBatch(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...wrap} {...props}>
      <rect x="26" y="56" width="46" height="56" rx="8" />
      <path d="M36 72h26M36 84h26M36 96h18" strokeWidth="1.8" />
      {/* flowing connectors fanning out to payees */}
      <path
        d="M72 84c34 0 40-44 78-44M72 84h78M72 84c34 0 40 44 78 44"
        strokeDasharray="2 9"
        className="art-flow"
      />
      <g className="art-pulse">
        <circle cx="166" cy="40" r="14" />
        <circle cx="166" cy="40" r="4.5" />
        <path d="M158.5 49a7.5 7.5 0 0 1 15 0" />
      </g>
      <g className="art-pulse" style={{ animationDelay: "0.5s" }}>
        <circle cx="166" cy="84" r="14" fill={LIME} stroke="currentColor" />
        <circle cx="166" cy="80" r="4.5" stroke={INK} />
        <path d="M158.5 93a7.5 7.5 0 0 1 15 0" stroke={INK} />
      </g>
      <g className="art-pulse" style={{ animationDelay: "1s" }}>
        <circle cx="166" cy="128" r="14" />
        <circle cx="166" cy="128" r="4.5" />
        <path d="M158.5 137a7.5 7.5 0 0 1 15 0" />
      </g>
      <path
        d="M206 60c1 5 2 6 7 7-5 1-6 2-7 7-1-5-2-6-7-7 5-1 6-2 7-7Z"
        fill="currentColor"
        stroke="none"
        className="art-twinkle"
      />
    </svg>
  );
}

export function CardPayslip(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...wrap} {...props}>
      <path d="M70 28h70l30 30v82a8 8 0 0 1-8 8H70a8 8 0 0 1-8-8V36a8 8 0 0 1 8-8Z" />
      <path d="M140 28v22a8 8 0 0 0 8 8h22" />
      <path d="M80 74h60M80 90h60M80 106h36" strokeWidth="1.8" />
      <rect x="80" y="116" width="50" height="14" rx="4" fill={LIME} stroke="none" />
      {/* verified badge pops */}
      <g className="art-pulse">
        <circle cx="150" cy="120" r="17" fill={LIME} stroke="currentColor" />
        <path d="M142 120.5l5 5 9-10" stroke={INK} strokeWidth="2.6" fill="none" />
      </g>
      <path
        d="M196 44c1 5 2 6 7 7-5 1-6 2-7 7-1-5-2-6-7-7 5-1 6-2 7-7Z"
        fill="currentColor"
        stroke="none"
        className="art-twinkle"
      />
    </svg>
  );
}

export function CardRequest(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...wrap} {...props}>
      <rect x="30" y="44" width="92" height="80" rx="10" />
      <path d="M44 66h40M44 80h64M44 94h28" strokeWidth="1.8" />
      <rect x="44" y="104" width="34" height="10" rx="3" fill={LIME} stroke="none" />
      <path d="M150 70a16 16 0 0 1 0 28h-10M150 70h10a16 16 0 0 1 0 28" />
      <path d="M150 84h26" strokeDasharray="2 8" className="art-flow" />
      {/* outbound share arrow lifts */}
      <path d="M168 116l28-28M180 86h16v16" className="art-bob" />
      <circle cx="206" cy="120" r="6" fill={LIME} stroke="none" className="art-pulse" />
      <path
        d="M118 30c1 5 2 6 7 7-5 1-6 2-7 7-1-5-2-6-7-7 5-1 6-2 7-7Z"
        fill="currentColor"
        stroke="none"
        className="art-twinkle"
      />
    </svg>
  );
}

export function CardTokens(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...wrap} {...props}>
      <g className="art-bob">
        <circle cx="86" cy="84" r="34" />
        <path
          d="M86 64v40M77 71h12a7 7 0 0 1 0 14h-8a7 7 0 0 0 0 14h13"
          strokeWidth="2"
        />
      </g>
      <g className="art-pulse">
        <circle cx="120" cy="84" r="34" fill={LIME} stroke="currentColor" />
        <path
          d="M120 64v40M111 71h12a7 7 0 0 1 0 14h-8a7 7 0 0 0 0 14h13"
          strokeWidth="2"
          stroke={INK}
        />
      </g>
      <g className="art-bob" style={{ animationDelay: "1.1s" }}>
        <circle cx="154" cy="84" r="34" />
        <path
          d="M154 64v40M145 71h12a7 7 0 0 1 0 14h-8a7 7 0 0 0 0 14h13"
          strokeWidth="2"
        />
      </g>
      <path
        d="M196 44c1 5 2 6 7 7-5 1-6 2-7 7-1-5-2-6-7-7 5-1 6-2 7-7Z"
        fill="currentColor"
        stroke="none"
        className="art-twinkle"
      />
      <circle cx="48" cy="120" r="5" fill={INK} className="art-pulse" style={{ animationDelay: "0.6s" }} />
    </svg>
  );
}

export function CardVault(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...wrap} {...props}>
      <path d="M120 26l46 16v34c0 30-20 48-46 62-26-14-46-32-46-62V42l46-16Z" />
      <circle cx="120" cy="82" r="11" fill={LIME} stroke="currentColor" className="art-pulse" />
      <path d="M120 93v18" strokeWidth="3" stroke={INK} />
      {/* withdraw-anytime flow */}
      <path d="M150 120c14-6 22-18 22-34" strokeDasharray="2 8" className="art-flow" />
      <path d="M166 88l8-2 2 8" />
      <circle cx="180" cy="48" r="5" fill={LIME} stroke="none" className="art-pulse" style={{ animationDelay: "0.7s" }} />
    </svg>
  );
}

export const CARD_ART = {
  stream: CardStream,
  batch: CardBatch,
  payslip: CardPayslip,
  request: CardRequest,
  tokens: CardTokens,
  vault: CardVault,
} as const;

export type CardArtKey = keyof typeof CARD_ART;
