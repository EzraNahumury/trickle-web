"use client";

import { useBlockNumber } from "wagmi";
import { CELO_CHAIN_ID, shortenAddress } from "trickle-sdk";
import { SectionLabel, Pill } from "../ui/SectionLabel";
import { Reveal } from "../ui/Reveal";
import { ONCHAIN_CONTRACTS } from "../site-data";

/**
 * On-chain section — "don't trust, verify". Reads the live Celo Mainnet block
 * straight from the chain (via wagmi) and lists the deployed, verified Trickle
 * contracts (addresses from trickle-sdk). No fabricated metrics: the block
 * number ticks because it's real, and every address links to Celoscan.
 */
export function OnchainSection() {
  // Live head block on Celo Mainnet — `watch` re-reads on each new block (~5s).
  const { data: blockNumber } = useBlockNumber({
    chainId: CELO_CHAIN_ID,
    watch: true,
  });

  return (
    <section
      id="onchain"
      className="scroll-mt-28 px-6 py-16 sm:px-10 sm:py-24 lg:px-16"
    >
      <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <Reveal>
            <SectionLabel tone="lime" className="mb-4">
              On-chain
            </SectionLabel>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="text-3xl sm:text-[2.6rem]">
              Don&apos;t trust — verify it on Celo.
            </h2>
          </Reveal>
        </div>
        <Reveal delay={120}>
          <div className="flex flex-col items-start gap-3">
            <Pill dot>
              {blockNumber
                ? `Celo Mainnet · block #${blockNumber.toString()}`
                : "Connecting to Celo Mainnet…"}
            </Pill>
            <p className="max-w-sm text-base leading-relaxed text-muted">
              Both contracts are deployed and verified on Celo Mainnet
              (chain {CELO_CHAIN_ID}). The block above is read live from the
              chain — open Celoscan and check the source yourself.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
        {ONCHAIN_CONTRACTS.map((c, i) => (
          <Reveal key={c.address} delay={(i % 2) * 80}>
            <a
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="card-hover group flex h-full flex-col rounded-card border border-line bg-surface p-7 hover:border-ink/25 hover:shadow-soft"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-xl">{c.name}</h3>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-lime/15 px-2.5 py-1 text-xs font-medium text-lime-deep">
                  Verified
                </span>
              </div>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
                {c.role}
              </p>
              <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
                <span className="font-mono text-sm text-ink">
                  {shortenAddress(c.address)}
                </span>
                <span className="text-sm text-muted transition-colors group-hover:text-ink">
                  Celoscan ↗
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
