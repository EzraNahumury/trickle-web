"use client";

import { useEffect, useState } from "react";
import { TOKENS, formatAmount, type TokenSymbol } from "trickle-sdk";

/** Map a token contract address back to its TOKENS entry. */
export function tokenByAddress(address: string) {
  const match = Object.values(TOKENS).find(
    (t) => t.address.toLowerCase() === address.toLowerCase(),
  );
  return match ?? null;
}

/** Trimmed display formatting: full-precision SDK string cut to `dp` places. */
export function fmt(value: bigint, decimals: number, dp = 4): string {
  const s = formatAmount(value, decimals);
  const [whole, frac] = s.split(".");
  if (!frac || dp === 0) return whole;
  return `${whole}.${frac.slice(0, dp).padEnd(Math.min(dp, frac.length), "0")}`;
}

/** Loose decimal-input guard before handing to parseAmount. */
export function isDecimalInput(v: string): boolean {
  return /^\d+(\.\d+)?$/.test(v.trim());
}

/** Unix seconds, ticking once per second (starts at mount). */
export function useNowSec() {
  const [now, setNow] = useState(() => Math.floor(Date.now() / 1000));
  useEffect(() => {
    const id = setInterval(() => {
      setNow(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

/** Token pill selector. */
export function TokenSelect({
  value,
  onChange,
}: {
  value: TokenSymbol;
  onChange: (s: TokenSymbol) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Token"
      className="inline-flex rounded-full border border-line bg-surface-2/60 p-1"
    >
      {(Object.keys(TOKENS) as TokenSymbol[]).map((sym) => (
        <button
          key={sym}
          role="tab"
          aria-selected={value === sym}
          onClick={() => onChange(sym)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            value === sym
              ? "bg-ink text-on-dark"
              : "text-muted hover:text-ink"
          }`}
        >
          {sym}
        </button>
      ))}
    </div>
  );
}

/** Labelled input row shared by the app forms. */
export function Field({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted">
        {label}
      </span>
      <input
        {...props}
        className="h-12 w-full rounded-xl border border-line bg-surface px-4 font-mono text-[0.95rem] text-ink outline-none transition-colors placeholder:text-muted-2 focus:border-ink"
      />
    </label>
  );
}

/** Status line under a tx button. */
export function TxNote({
  status,
  error,
  success,
}: {
  status: string;
  error: string | null;
  success?: string;
}) {
  if (status === "error" && error)
    return (
      <p className="mt-2 text-sm text-red-600" role="alert">
        {error}
      </p>
    );
  if (status === "success" && success)
    return <p className="mt-2 text-sm font-medium text-lime-deep">{success}</p>;
  return null;
}
