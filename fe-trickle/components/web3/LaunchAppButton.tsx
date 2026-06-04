"use client";

import { useSyncExternalStore } from "react";
import { useAccount } from "wagmi";
import { getButtonClasses, type Size, type Variant } from "../ui/Button";
import { ArrowRight } from "../ui/icons";
import { useWalletModal } from "./WalletProvider";

// SSR-safe "have we hydrated yet" — server returns false, client true after
// mount. Avoids a hydration mismatch from wallet state without setState-in-effect.
const emptySubscribe = () => () => {};
function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

/**
 * Primary CTA. Disconnected → "Launch app" opens the wallet modal. Connected →
 * shows the truncated address (click reopens the modal on its account view).
 * Mounted-gated so SSR and first client render agree (no hydration mismatch
 * from wallet state).
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
  const short = address ? `${address.slice(0, 6)}…${address.slice(-4)}` : "";

  return (
    <button
      type="button"
      onClick={() => {
        onActivate?.();
        open();
      }}
      className={getButtonClasses(variant, size, className)}
      aria-label={connected ? `Wallet ${short} — open account` : "Launch app"}
    >
      {variant === "lime" && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-white/40 opacity-0 blur-md group-hover:opacity-100 group-hover:[animation:shine_0.9s_ease]"
        />
      )}
      {connected ? (
        <>
          <span
            aria-hidden
            className="relative z-10 inline-flex size-2 rounded-full bg-lime"
          />
          <span className="relative z-10 font-mono text-[0.92em]">{short}</span>
        </>
      ) : (
        <>
          <span className="relative z-10">Launch app</span>
          <ArrowRight className="relative z-10 size-[1.05em] transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-1" />
        </>
      )}
    </button>
  );
}
