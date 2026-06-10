"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useAccount, useChainId, useSwitchChain } from "wagmi";
import { CELO_CHAIN_ID, shortenAddress } from "trickle-sdk";
import { Logo } from "../ui/Logo";
import { ArrowRight } from "../ui/icons";
import { useWalletModal } from "../web3/WalletProvider";
import { useMounted } from "../web3/useMounted";

/**
 * Shell for all /app pages: connection + network guards, app header with the
 * account chip, and the white content sheet. Children only render once the
 * wallet is connected on Celo Mainnet.
 */
export function AppShell({
  title,
  children,
  backHref,
}: {
  title: string;
  children: ReactNode;
  backHref?: string;
}) {
  const mounted = useMounted();
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain, isPending: switching } = useSwitchChain();
  const { open } = useWalletModal();

  const connected = mounted && isConnected && !!address;
  const wrongChain = connected && chainId !== CELO_CHAIN_ID;

  return (
    <div className="px-3 pb-3 pt-3 sm:px-5 sm:pb-6 sm:pt-5">
      <div className="mx-auto min-h-[calc(100dvh-3rem)] max-w-[1080px] rounded-[26px] border border-line bg-surface shadow-soft sm:rounded-[36px]">
        {/* app header */}
        <header className="flex items-center justify-between gap-3 border-b border-line px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <Link href="/" aria-label="Trickle — back to site">
              <Logo />
            </Link>
            <span aria-hidden className="hidden h-5 w-px bg-line sm:block" />
            <div className="hidden items-center gap-2 sm:flex">
              {backHref && (
                <Link
                  href={backHref}
                  className="rounded-full px-2 py-1 text-sm font-medium text-muted transition-colors hover:bg-ink/5 hover:text-ink"
                >
                  ← Back
                </Link>
              )}
              <span className="text-sm font-medium text-muted">{title}</span>
            </div>
          </div>

          {connected ? (
            <button
              type="button"
              onClick={open}
              className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 font-mono text-sm font-medium text-ink transition-colors hover:border-ink/30 hover:bg-surface-2"
              aria-label="Open account"
            >
              <span className="relative inline-flex size-2">
                <span className="live-dot absolute inset-0 rounded-full bg-lime-deep" />
              </span>
              {shortenAddress(address)}
            </button>
          ) : (
            <span className="text-sm text-muted-2">Not connected</span>
          )}
        </header>

        {/* guards */}
        {!connected ? (
          <GuardCard
            title="Connect your wallet"
            body="Trickle needs a connected wallet on Celo to read your streams and balances."
            action={
              mounted ? (
                <button
                  type="button"
                  onClick={open}
                  className="inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 font-medium text-on-dark transition-transform hover:-translate-y-0.5"
                >
                  Connect wallet <ArrowRight className="size-4" />
                </button>
              ) : null
            }
          />
        ) : wrongChain ? (
          <GuardCard
            title="Wrong network"
            body={`Trickle runs on Celo Mainnet (chain ${CELO_CHAIN_ID}). Switch network to continue.`}
            action={
              <button
                type="button"
                onClick={() => switchChain({ chainId: CELO_CHAIN_ID })}
                disabled={switching}
                className="inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 font-medium text-on-dark transition-transform hover:-translate-y-0.5 disabled:opacity-60"
              >
                {switching ? "Switching…" : "Switch to Celo"}
              </button>
            }
          />
        ) : (
          <div className="px-5 py-8 sm:px-8 sm:py-10">{children}</div>
        )}
      </div>
    </div>
  );
}

function GuardCard({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action: ReactNode;
}) {
  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center px-6 py-16 text-center">
      <h1 className="text-3xl">{title}</h1>
      <p className="mt-3 max-w-sm text-base leading-relaxed text-muted">
        {body}
      </p>
      <div className="mt-7">{action}</div>
    </div>
  );
}
