import type { SVGProps } from "react";

/**
 * Minimal inline stroke-icon set (currentColor, 1.7px) so the project stays
 * dependency-free — no icon library. Consistent weight = consistent feel.
 */
type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export function ArrowUpRight(props: IconProps) {
  return (
    <svg width="20" height="20" {...base} {...props}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export function ArrowRight(props: IconProps) {
  return (
    <svg width="20" height="20" {...base} {...props}>
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function Plus(props: IconProps) {
  return (
    <svg width="20" height="20" {...base} {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function Check(props: IconProps) {
  return (
    <svg width="20" height="20" {...base} {...props}>
      <path d="m5 12.5 4.5 4.5L19 7" />
    </svg>
  );
}

export function Menu(props: IconProps) {
  return (
    <svg width="22" height="22" {...base} {...props}>
      <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />
    </svg>
  );
}

export function Close(props: IconProps) {
  return (
    <svg width="22" height="22" {...base} {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function Bolt(props: IconProps) {
  return (
    <svg width="20" height="20" {...base} {...props}>
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
    </svg>
  );
}

export function Github(props: IconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.2-3.37-1.2-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.57 2.34 1.12 2.91.85.09-.66.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.05 0-1.12.39-2.03 1.03-2.74-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05A9.3 9.3 0 0 1 12 6.84c.85 0 1.71.12 2.51.34 1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.71 1.03 1.62 1.03 2.74 0 3.92-2.34 4.78-4.57 5.04.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.6.69.49A10.04 10.04 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

export function Telegram(props: IconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M21.94 4.6 18.6 20.3c-.25 1.1-.9 1.37-1.83.86l-5.05-3.72-2.43 2.34c-.27.27-.5.5-1 .5l.36-5.1L17.9 6.8c.4-.36-.09-.56-.62-.2L5.93 13.7l-4.98-1.56c-1.08-.34-1.1-1.08.23-1.6L20.55 3c.9-.34 1.69.2 1.39 1.6Z" />
    </svg>
  );
}

export function Spark(props: IconProps) {
  return (
    <svg width="20" height="20" {...base} {...props}>
      <path d="M12 3c.4 4.5 1.5 5.6 6 6-4.5.4-5.6 1.5-6 6-.4-4.5-1.5-5.6-6-6 4.5-.4 5.6-1.5 6-6Z" />
    </svg>
  );
}

export function Copy(props: IconProps) {
  return (
    <svg width="20" height="20" {...base} {...props}>
      <rect x="9" y="9" width="11" height="11" rx="2.5" />
      <path d="M5 15V6a2 2 0 0 1 2-2h8" />
    </svg>
  );
}

export function Logout(props: IconProps) {
  // Power symbol — reads clearly as "disconnect".
  return (
    <svg width="20" height="20" {...base} {...props}>
      <path d="M12 3.5v8" />
      <path d="M7.1 6.7a7.5 7.5 0 1 0 9.8 0" />
    </svg>
  );
}
