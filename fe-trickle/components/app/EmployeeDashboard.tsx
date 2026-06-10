"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import { useAccount, useReadContract, useReadContracts } from "wagmi";
import {
  TRICKLE_VAULT_ABI,
  TRICKLE_VAULT_ADDRESS,
  celoscan,
  ratePerSecToMonthly,
  shortenAddress,
} from "trickle-sdk";
import { useTx, txLabel } from "./useTx";
import { TxNote, fmt, tokenByAddress, useNowSec } from "./shared";

type Stream = {
  payer: `0x${string}`;
  payee: `0x${string}`;
  token: `0x${string}`;
  amountPerSec: bigint;
  lastPaid: number;
  startTime: number;
};

const VAULT = {
  address: TRICKLE_VAULT_ADDRESS as `0x${string}`,
  abi: TRICKLE_VAULT_ABI,
} as const;

export function EmployeeDashboard() {
  const { address } = useAccount();

  const streamIds = useReadContract({
    ...VAULT,
    functionName: "getPayeeStreamIds",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  const ids = useMemo(
    () => (streamIds.data ?? []) as readonly `0x${string}`[],
    [streamIds.data],
  );

  const streamReads = useReadContracts({
    contracts: ids.map((id) => ({
      ...VAULT,
      functionName: "getStream" as const,
      args: [id] as const,
    })),
    query: { enabled: ids.length > 0 },
  });

  const streams = useMemo(() => {
    const out: Stream[] = [];
    for (const r of streamReads.data ?? []) {
      if (r.status === "success" && r.result) {
        const s = r.result as unknown as Stream;
        if (s.amountPerSec > 0n) out.push(s);
      }
    }
    return out;
  }, [streamReads.data]);

  const refetchAll = useCallback(() => {
    streamIds.refetch();
    streamReads.refetch();
  }, [streamIds, streamReads]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl">Your earnings</h1>
        <p className="mt-2 max-w-md text-muted">
          {streams.length > 0
            ? `${streams.length} live stream${streams.length > 1 ? "s" : ""} paying you by the second. Withdraw whenever you like.`
            : "Salary streams sent to your address will appear here, accruing every second."}
        </p>
      </div>

      {streams.length === 0 ? (
        <p className="rounded-card border border-dashed border-line-2 p-10 text-center text-muted">
          No incoming streams yet. Share your address with your employer to get
          paid in real time.
        </p>
      ) : (
        <ul className="flex flex-col gap-4">
          {streams.map((s) => (
            <EarningRow
              key={`${s.payer}-${s.token}-${s.amountPerSec}`}
              stream={s}
              onDone={refetchAll}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

function EarningRow({
  stream,
  onDone,
}: {
  stream: Stream;
  onDone: () => void;
}) {
  const { address } = useAccount();
  const token = tokenByAddress(stream.token);
  const now = useNowSec();
  const tx = useTx();

  // On-chain truth, refreshed periodically; the UI ticks smoothly in between.
  const withdrawable = useReadContract({
    ...VAULT,
    functionName: "withdrawable",
    args: address
      ? [stream.payer, address, stream.token, stream.amountPerSec]
      : undefined,
    query: { enabled: !!address, refetchInterval: 12_000 },
  });

  const handled = useRef<string | null>(null);
  useEffect(() => {
    if (tx.status === "success" && tx.hash && handled.current !== tx.hash) {
      handled.current = tx.hash;
      withdrawable.refetch();
      onDone();
      tx.reset();
    }
  }, [tx, withdrawable, onDone]);

  const base = (withdrawable.data ?? 0n) as bigint;
  const fetchedAtSec = Math.floor(withdrawable.dataUpdatedAt / 1000);
  const elapsed = Math.max(0, now - fetchedAtSec);
  // Live estimate between refreshes — the contract clamps at the vault
  // balance, so the periodic refetch corrects any over-extrapolation.
  const live = base + stream.amountPerSec * BigInt(elapsed);

  const busy = tx.status === "wallet" || tx.status === "confirming";
  const monthly = ratePerSecToMonthly(stream.amountPerSec);

  return (
    <li className="rounded-card border border-line bg-surface-2/40 p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted">
            Withdrawable now
          </p>
          <p className="mt-1 font-mono text-4xl font-semibold tracking-tight text-ink">
            {token ? fmt(live, token.decimals, 6) : live.toString()}{" "}
            <span className="text-lg text-muted">{token?.symbol ?? "?"}</span>
          </p>
          <p className="mt-2 text-sm text-muted">
            from{" "}
            <a
              href={celoscan("address", stream.payer)}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono underline-offset-2 hover:text-ink hover:underline"
            >
              {shortenAddress(stream.payer)}
            </a>{" "}
            · {token ? fmt(monthly, token.decimals, 2) : "?"}{" "}
            {token?.symbol ?? ""}/mo
          </p>
        </div>
        <div className="flex flex-col items-stretch gap-2 sm:items-end">
          <button
            type="button"
            onClick={() =>
              tx.writeContract({
                ...VAULT,
                functionName: "withdraw",
                args: [stream.payer, stream.token, stream.amountPerSec],
              })
            }
            disabled={busy || live === 0n}
            className="h-12 rounded-full bg-lime px-7 font-medium text-ink transition-transform hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
          >
            {txLabel(tx.status, "Withdraw all")}
          </button>
          <TxNote
            status={tx.status}
            error={tx.errorMessage}
            success="Withdrawn — funds are in your wallet."
          />
        </div>
      </div>
    </li>
  );
}
