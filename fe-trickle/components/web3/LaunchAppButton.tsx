"use client";

import Link from "next/link";
import { useAccount } from "wagmi";
import { getButtonClasses, type Size, type Variant } from "../ui/Button";
import { ArrowRight } from "../ui/icons";
import { useWalletModal } from "./WalletProvider";
import { useMounted } from "./useMounted";

/**
 * Primary CTA. Disconnected → "Launch app" opens the wallet modal (connecting
 * then routes into /app). Connected → links straight into the app.
 * Mounted-gated so SSR and first client render agree.
 */
export function LaunchAppButton({
  variant = "dark",
  size = "md",
  className = "",
  onActivate,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
  onActivate?: () => void;
}) {
  const { open } = useWalletModal();
  const { address, isConnected } = useAccount();
  const mounted = useMounted();

  const connected = mounted && isConnected && !!address;
  const cls = getButtonClasses(variant, size, className);

  const shine = variant === "lime" && (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-white/40 opacity-0 blur-md group-hover:opacity-100 group-hover:[animation:shine_0.9s_ease]"
    />
  );

  if (connected) {
    return (
      <Link
        href="/app"
        className={cls}
        onClick={onActivate}
        aria-label="Open the Trickle app"
      >
        {shine}
        <span
          aria-hidden
          className="relative z-10 inline-flex size-2 rounded-full bg-lime"
        />
        <span className="relative z-10">Open app</span>
        <ArrowRight className="relative z-10 size-[1.05em] transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-1" />
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        onActivate?.();
        open();
      }}
      className={cls}
      aria-label="Launch app"
    >
      {shine}
      <span className="relative z-10">Launch app</span>
      <ArrowRight className="relative z-10 size-[1.05em] transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-1" />
    </button>
  );
}
