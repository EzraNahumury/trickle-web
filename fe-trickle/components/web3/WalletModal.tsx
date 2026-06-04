"use client";

import { useEffect, useMemo, useState } from "react";
import { formatUnits } from "viem";
import {
  useAccount,
  useBalance,
  useChainId,
  useConnect,
  useDisconnect,
  useSwitchChain,
  type Connector,
} from "wagmi";
import { Close, Check, ArrowUpRight, Copy, Logout } from "../ui/icons";
import { LINKS } from "../site-data";

const EXPLORERS: Record<number, string> = {
  42220: "https://celoscan.io",
  11142220: "https://sepolia.celoscan.io",
};
const CHAIN_NAMES: Record<number, string> = {
  42220: "Celo Mainnet",
  11142220: "Celo Sepolia",
};
const SUPPORTED = [42220, 11142220];

function Spinner({ className = "" }: { className?: string }) {
  return (
    <svg className={`animate-spin ${className}`} viewBox="0 0 24 24" width="18" height="18" aria-hidden>
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2.5" opacity="0.25" />
      <path d="M21 12a9 9 0 0 0-9-9" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function WalletGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" className={className} aria-hidden>
      <rect x="3" y="6" width="18" height="13" rx="3" />
      <path d="M3 10h18M16 13.5h.01" strokeLinecap="round" />
    </svg>
  );
}

function ConnectorRow({
  connector,
  pending,
  onClick,
}: {
  connector: Connector;
  pending: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={pending}
      className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-surface-2 disabled:opacity-60"
    >
      <span className="grid size-10 shrink-0 place-items-center overflow-hidden rounded-[11px] bg-surface-2 ring-1 ring-ink/[0.05]">
        {connector.icon ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={connector.icon} alt="" className="size-10 object-cover" />
        ) : (
          <WalletGlyph className="size-5 text-muted-2" />
        )}
      </span>
      <span className="flex-1 text-[0.95rem] font-medium text-ink">
        {connector.name}
      </span>
      {pending ? (
        <span className="flex items-center gap-1.5 text-xs font-medium text-muted">
          <Spinner className="text-ink" /> Connecting
        </span>
      ) : (
        <ArrowUpRight className="size-4 -translate-x-1 text-muted-2 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
      )}
    </button>
  );
}

function ConnectPanel({ onClose }: { onClose: () => void }) {
  const { connect, connectors } = useConnect();
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Build the wallet list automatically from wagmi: prefer EIP-6963-discovered
  // wallets; only fall back to the generic injected entry when nothing was
  // discovered (single-provider webviews like MiniPay). No hardcoded names.
  const wallets = useMemo(() => {
    const discovered = connectors.filter(
      (c) => c.type === "injected" && c.id !== "injected",
    );
    const generic = connectors.find((c) => c.id === "injected");
    const others = connectors.filter((c) => c.type !== "injected");
    const ordered = [
      ...discovered,
      ...(discovered.length === 0 && generic ? [generic] : []),
      ...others,
    ];
    const seen = new Set<string>();
    return ordered.filter((c) => (seen.has(c.id) ? false : (seen.add(c.id), true)));
  }, [connectors]);

  const handleConnect = (connector: Connector) => {
    setError(null);
    setPendingId(connector.id);
    connect(
      { connector },
      {
        onSuccess: () => onClose(),
        onError: (err) => setError(err.message),
        onSettled: () => setPendingId(null),
      },
    );
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* wallet list */}
      <div className="flex w-full flex-col border-line p-5 md:w-[300px] md:border-r">
        <h2 className="px-3 text-lg font-semibold tracking-tight text-ink">
          Connect a wallet
        </h2>
        <p className="mb-3 mt-2 px-3 text-xs font-medium uppercase tracking-wider text-muted-2">
          Installed
        </p>
        <div className="scrollbar-slim -mr-2 flex max-h-[300px] flex-col gap-0.5 overflow-y-auto pr-2">
          {wallets.length === 0 && (
            <p className="px-3 py-6 text-sm text-muted">
              No wallet detected. Install a Celo-compatible wallet (or open
              Trickle inside MiniPay) to continue.
            </p>
          )}
          {wallets.map((c) => (
            <ConnectorRow
              key={c.uid}
              connector={c}
              pending={pendingId === c.id}
              onClick={() => handleConnect(c)}
            />
          ))}
        </div>
        {error && (
          <p className="mt-2 px-3 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>

      {/* info panel */}
      <div className="hidden flex-1 flex-col justify-center bg-surface-2/60 p-10 md:flex">
        <h3 className="text-center text-xl font-semibold tracking-tight text-ink">
          What is a wallet?
        </h3>
        <div className="mt-8 flex flex-col gap-7">
          <InfoRow
            title="A home for your stablecoins"
            body="Your wallet holds the USDC, USDm and CELO your salary streams into — and lets you withdraw anytime."
          />
          <InfoRow
            title="Sign in without passwords"
            body="Connect once and approve actions with a tap. No new account, no password to remember."
          />
        </div>
        <div className="mt-9 flex flex-col items-center gap-3">
          <a
            href="https://ethereum.org/en/wallets/find-wallet/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center rounded-full bg-ink px-6 text-sm font-medium text-on-dark transition-transform hover:-translate-y-0.5"
          >
            Get a wallet
          </a>
          <a
            href={LINKS.minipayDocs}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-muted transition-colors hover:text-ink"
          >
            Learn more
          </a>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ title, body }: { title: string; body: string }) {
  return (
    <div className="flex items-start gap-3.5">
      <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl bg-lime text-ink">
        <Check className="size-5" />
      </span>
      <div>
        <p className="font-medium text-ink">{title}</p>
        <p className="mt-1 text-sm leading-relaxed text-muted">{body}</p>
      </div>
    </div>
  );
}

function AccountPanel({ onClose }: { onClose: () => void }) {
  const { address } = useAccount();
  const chainId = useChainId();
  const { disconnect } = useDisconnect();
  const { switchChain, isPending: switching } = useSwitchChain();
  const { data: balance } = useBalance({ address });
  const [copied, setCopied] = useState(false);

  const wrongNetwork = !SUPPORTED.includes(chainId);
  const explorer = EXPLORERS[chainId] ?? EXPLORERS[42220];
  const short = address
    ? `${address.slice(0, 6)}…${address.slice(-4)}`
    : "";

  const copy = async () => {
    if (!address) return;
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  // Panda avatar with a per-address gradient, so each wallet stays distinct.
  const avatar = useMemo(() => {
    if (!address) return { bg: "", emoji: "🐼" };
    const h = parseInt(address.slice(2, 10), 16);
    const a = h % 360;
    const b = (a + 72) % 360;
    return {
      bg: `linear-gradient(135deg, hsl(${a} 78% 64%), hsl(${b} 82% 52%))`,
      emoji: "🐼",
    };
  }, [address]);

  const bal = balance
    ? `${Number(formatUnits(balance.value, balance.decimals)).toFixed(4)} ${balance.symbol}`
    : null;

  return (
    <div className="w-full p-7">
      <div className="flex justify-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-2 px-3 py-1 text-xs font-medium text-muted">
          <span className="relative inline-flex size-1.5">
            <span className="live-dot absolute inset-0 rounded-full bg-lime-deep" />
          </span>
          Connected
        </span>
      </div>

      <div className="mt-6 flex flex-col items-center">
        <div aria-hidden className="relative size-[76px]">
          <span
            className="grid size-full place-items-center overflow-hidden rounded-full ring-4 ring-surface shadow-[0_10px_30px_-8px_rgba(10,10,10,0.45)]"
            style={{ background: avatar.bg }}
          >
            <span className="text-[2.1rem] leading-none drop-shadow-sm">
              {avatar.emoji}
            </span>
          </span>
          <span className="absolute bottom-0 right-0 size-[18px] rounded-full border-[3px] border-surface bg-lime" />
        </div>
        <p className="mt-4 font-mono text-2xl font-semibold tracking-tight text-ink">
          {short}
        </p>
        <p className="mt-1.5 text-sm text-muted-2">
          {bal ?? "—"} · {CHAIN_NAMES[chainId] ?? `Chain ${chainId}`}
        </p>
      </div>

      {wrongNetwork && (
        <button
          type="button"
          onClick={() => switchChain({ chainId: 42220 })}
          disabled={switching}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border border-ink/15 py-3 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-on-dark disabled:opacity-60"
        >
          {switching && <Spinner />} Switch to Celo Mainnet
        </button>
      )}

      <div className="mt-7 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={copy}
          className="group flex flex-col items-center gap-2.5 rounded-2xl border border-line bg-surface px-3 py-5 text-sm font-medium text-ink transition-all duration-200 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-soft"
        >
          <span className="grid size-10 place-items-center rounded-full bg-surface-2 text-ink transition-colors duration-200 group-hover:bg-lime">
            {copied ? <Check className="size-5" /> : <Copy className="size-5" />}
          </span>
          {copied ? "Copied!" : "Copy address"}
        </button>
        <button
          type="button"
          onClick={() => {
            disconnect();
            onClose();
          }}
          className="group flex flex-col items-center gap-2.5 rounded-2xl border border-line bg-surface px-3 py-5 text-sm font-medium text-ink transition-all duration-200 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-soft"
        >
          <span className="grid size-10 place-items-center rounded-full bg-surface-2 text-ink transition-colors duration-200 group-hover:bg-ink group-hover:text-on-dark">
            <Logout className="size-5" />
          </span>
          Disconnect
        </button>
      </div>

      <div className="mt-6 border-t border-line pt-5">
        <p className="text-sm text-muted-2">Your transactions will appear here…</p>
        <a
          href={`${explorer}/address/${address}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-3 flex items-center justify-between text-sm font-medium text-ink"
        >
          View more on explorer
          <span className="grid size-9 place-items-center rounded-full border border-line text-muted transition-all duration-200 group-hover:border-ink group-hover:bg-ink group-hover:text-on-dark">
            <ArrowUpRight className="size-4" />
          </span>
        </a>
      </div>
    </div>
  );
}

export function WalletModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { isConnected } = useAccount();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`fixed inset-0 z-[70] flex items-center justify-center p-4 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      inert={!isOpen || undefined}
    >
      <div
        onClick={onClose}
        className="absolute inset-0 bg-ink/35 backdrop-blur-sm"
        aria-hidden
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Connect a wallet"
        className={`relative max-h-[90vh] w-full overflow-hidden rounded-3xl border border-line bg-surface shadow-lift transition-all duration-300 ease-[var(--ease-out-expo)] ${
          isConnected ? "max-w-[400px]" : "max-w-[680px]"
        } ${isOpen ? "translate-y-0 scale-100" : "translate-y-3 scale-[0.98]"}`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 grid size-9 place-items-center rounded-full border border-line bg-surface/80 text-muted transition-colors hover:bg-surface-2 hover:text-ink"
        >
          <Close className="size-4" />
        </button>

        {isConnected ? (
          <AccountPanel onClose={onClose} />
        ) : (
          <ConnectPanel onClose={onClose} />
        )}
      </div>
    </div>
  );
}
