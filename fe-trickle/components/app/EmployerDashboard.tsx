"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAccount, useReadContract, useReadContracts } from "wagmi";
import {
  ERC20_ABI,
  TOKENS,
  TRICKLE_VAULT_ABI,
  TRICKLE_VAULT_ADDRESS,
  celoscan,
  isAddress,
  monthlyToRatePerSec,
  parseAmount,
  ratePerSecToMonthly,
  runwayDays,
  shortenAddress,
  type TokenSymbol,
} from "trickle-sdk";
import { useTx, txLabel } from "./useTx";
import {
  Field,
  TokenSelect,
  TxNote,
  fmt,
  isDecimalInput,
  tokenByAddress,
} from "./shared";

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

/** Fire `onDone` exactly once per successful tx hash. */
function useTxDone(
  status: string,
  hash: string | undefined,
  onDone: () => void,
) {
  const handled = useRef<string | null>(null);
  useEffect(() => {
    if (status === "success" && hash && handled.current !== hash) {
      handled.current = hash;
      onDone();
    }
  }, [status, hash, onDone]);
}

export function EmployerDashboard() {
  const { address } = useAccount();
  const [sym, setSym] = useState<TokenSymbol>("USDC");
  const token = TOKENS[sym];

  // ── Reads ────────────────────────────────────────────────────────────
  const balance = useReadContract({
    ...VAULT,
    functionName: "balances",
    args: address ? [address, token.address as `0x${string}`] : undefined,
    query: { enabled: !!address },
  });

  const streamIds = useReadContract({
    ...VAULT,
    functionName: "getPayerStreamIds",
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
        // cancelled streams keep their id but zero out — skip empty entries
        if (s.amountPerSec > 0n) out.push(s);
      }
    }
    return out;
  }, [streamReads.data]);

  const totalRate = useMemo(
    () =>
      streams
        .filter((s) => s.token.toLowerCase() === token.address.toLowerCase())
        .reduce((acc, s) => acc + s.amountPerSec, 0n),
    [streams, token.address],
  );

  const refetchAll = useCallback(() => {
    balance.refetch();
    streamIds.refetch();
    streamReads.refetch();
  }, [balance, streamIds, streamReads]);

  const bal = (balance.data ?? 0n) as bigint;
  const runway = totalRate > 0n ? runwayDays(bal, totalRate) : Infinity;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-3xl">Employer vault</h1>
        <TokenSelect value={sym} onChange={setSym} />
      </div>

      {/* ── Balance overview ─────────────────────────────────────────── */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-card border border-line bg-surface-2/50 p-6">
          <p className="text-xs font-medium uppercase tracking-wider text-muted">
            Vault balance
          </p>
          <p className="mt-2 font-mono text-3xl font-semibold tracking-tight text-ink">
            {fmt(bal, token.decimals)}{" "}
            <span className="text-base text-muted">{sym}</span>
          </p>
        </div>
        <div className="rounded-card border border-line bg-surface-2/50 p-6">
          <p className="text-xs font-medium uppercase tracking-wider text-muted">
            Streaming out
          </p>
          <p className="mt-2 font-mono text-3xl font-semibold tracking-tight text-ink">
            {fmt(ratePerSecToMonthly(totalRate), token.decimals, 2)}{" "}
            <span className="text-base text-muted">{sym}/mo</span>
          </p>
        </div>
        <div className="rounded-card border border-line bg-surface-2/50 p-6">
          <p className="text-xs font-medium uppercase tracking-wider text-muted">
            Runway
          </p>
          <p className="mt-2 font-mono text-3xl font-semibold tracking-tight text-ink">
            {totalRate === 0n
              ? "∞"
              : runway > 3650
                ? ">10y"
                : `${Math.floor(runway)}d`}
          </p>
        </div>
      </div>

      {/* ── Actions ──────────────────────────────────────────────────── */}
      <div className="grid gap-4 lg:grid-cols-2">
        <DepositCard sym={sym} onDone={refetchAll} />
        <WithdrawCard sym={sym} max={bal} onDone={refetchAll} />
      </div>

      <CreateStreamCard sym={sym} onDone={refetchAll} />

      {/* ── Active streams ───────────────────────────────────────────── */}
      <section>
        <h2 className="mb-3 text-xl">Active streams</h2>
        {streams.length === 0 ? (
          <p className="rounded-card border border-dashed border-line-2 p-8 text-center text-muted">
            No streams yet — fund the vault and open your first stream above.
          </p>
        ) : (
          <ul className="flex flex-col gap-2.5">
            {streams.map((s) => (
              <StreamRow
                key={`${s.payee}-${s.token}-${s.amountPerSec}`}
                stream={s}
                onDone={refetchAll}
              />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

// ── Deposit (approve → deposit) ─────────────────────────────────────────
function DepositCard({
  sym,
  onDone,
}: {
  sym: TokenSymbol;
  onDone: () => void;
}) {
  const { address } = useAccount();
  const token = TOKENS[sym];
  const [amount, setAmount] = useState("");
  const tx = useTx();

  const allowance = useReadContract({
    address: token.address as `0x${string}`,
    abi: ERC20_ABI,
    functionName: "allowance",
    args: address ? [address, TRICKLE_VAULT_ADDRESS as `0x${string}`] : undefined,
    query: { enabled: !!address },
  });

  const parsed =
    isDecimalInput(amount) ? parseAmount(amount, token.decimals) : null;
  const needsApprove =
    parsed !== null && ((allowance.data ?? 0n) as bigint) < parsed;

  const done = useCallback(() => {
    allowance.refetch();
    onDone();
    tx.reset();
    setAmount("");
  }, [allowance, onDone, tx]);
  useTxDone(tx.status, tx.hash, done);

  const submit = () => {
    if (parsed === null || parsed === 0n) return;
    if (needsApprove) {
      tx.writeContract({
        address: token.address as `0x${string}`,
        abi: ERC20_ABI,
        functionName: "approve",
        args: [TRICKLE_VAULT_ADDRESS as `0x${string}`, parsed],
      });
    } else {
      tx.writeContract({
        ...VAULT,
        functionName: "deposit",
        args: [token.address as `0x${string}`, parsed],
      });
    }
  };

  const busy = tx.status === "wallet" || tx.status === "confirming";

  return (
    <div className="rounded-card border border-line p-6">
      <h2 className="text-xl">Deposit</h2>
      <p className="mt-1 text-sm text-muted">
        Fund the vault once — streams draw from this balance.
      </p>
      <div className="mt-4 flex flex-col gap-3">
        <Field
          label={`Amount (${sym})`}
          inputMode="decimal"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button
          type="button"
          onClick={submit}
          disabled={busy || parsed === null || parsed === 0n}
          className="h-12 rounded-full bg-ink font-medium text-on-dark transition-transform hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
        >
          {txLabel(tx.status, needsApprove ? `Approve ${sym}` : "Deposit")}
        </button>
        <TxNote status={tx.status} error={tx.errorMessage} />
      </div>
    </div>
  );
}

// ── Withdraw unstreamed balance ─────────────────────────────────────────
function WithdrawCard({
  sym,
  max,
  onDone,
}: {
  sym: TokenSymbol;
  max: bigint;
  onDone: () => void;
}) {
  const token = TOKENS[sym];
  const [amount, setAmount] = useState("");
  const tx = useTx();

  const done = useCallback(() => {
    onDone();
    tx.reset();
    setAmount("");
  }, [onDone, tx]);
  useTxDone(tx.status, tx.hash, done);

  const parsed =
    isDecimalInput(amount) ? parseAmount(amount, token.decimals) : null;

  const submit = () => {
    if (parsed === null || parsed === 0n) return;
    tx.writeContract({
      ...VAULT,
      functionName: "withdrawBalance",
      args: [token.address as `0x${string}`, parsed],
    });
  };

  const busy = tx.status === "wallet" || tx.status === "confirming";

  return (
    <div className="rounded-card border border-line p-6">
      <div className="flex items-baseline justify-between">
        <h2 className="text-xl">Withdraw balance</h2>
        <button
          type="button"
          onClick={() => setAmount(fmt(max, token.decimals, token.decimals))}
          className="text-sm font-medium text-muted underline-offset-2 hover:text-ink hover:underline"
        >
          Max
        </button>
      </div>
      <p className="mt-1 text-sm text-muted">
        Pull back any unstreamed funds — it&rsquo;s your money, non-custodial.
      </p>
      <div className="mt-4 flex flex-col gap-3">
        <Field
          label={`Amount (${sym})`}
          inputMode="decimal"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button
          type="button"
          onClick={submit}
          disabled={busy || parsed === null || parsed === 0n}
          className="h-12 rounded-full border border-ink/15 font-medium text-ink transition-colors hover:bg-ink hover:text-on-dark disabled:opacity-50"
        >
          {txLabel(tx.status, "Withdraw")}
        </button>
        <TxNote status={tx.status} error={tx.errorMessage} />
      </div>
    </div>
  );
}

// ── Create stream ───────────────────────────────────────────────────────
function CreateStreamCard({
  sym,
  onDone,
}: {
  sym: TokenSymbol;
  onDone: () => void;
}) {
  const token = TOKENS[sym];
  const [payee, setPayee] = useState("");
  const [monthly, setMonthly] = useState("");
  const tx = useTx();

  const done = useCallback(() => {
    onDone();
    tx.reset();
    setPayee("");
    setMonthly("");
  }, [onDone, tx]);
  useTxDone(tx.status, tx.hash, done);

  const rate = isDecimalInput(monthly)
    ? monthlyToRatePerSec(parseAmount(monthly, token.decimals))
    : null;
  const valid = isAddress(payee) && rate !== null && rate > 0n;

  const submit = () => {
    if (!valid || rate === null) return;
    tx.writeContract({
      ...VAULT,
      functionName: "createStream",
      args: [payee as `0x${string}`, token.address as `0x${string}`, rate],
    });
  };

  const busy = tx.status === "wallet" || tx.status === "confirming";

  return (
    <div className="rounded-card border border-line bg-ink p-6 text-on-dark">
      <h2 className="text-xl text-on-dark">Open a stream</h2>
      <p className="mt-1 text-sm text-on-dark-muted">
        Quote a monthly salary — Trickle converts it to a per-second rate
        on-chain.
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_220px_auto]">
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-on-dark-muted">
            Employee address
          </span>
          <input
            value={payee}
            onChange={(e) => setPayee(e.target.value)}
            placeholder="0x…"
            className="h-12 w-full rounded-xl border border-white/15 bg-white/5 px-4 font-mono text-[0.95rem] text-on-dark outline-none transition-colors placeholder:text-on-dark-muted/60 focus:border-lime"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-on-dark-muted">
            Monthly ({sym})
          </span>
          <input
            value={monthly}
            onChange={(e) => setMonthly(e.target.value)}
            inputMode="decimal"
            placeholder="1000"
            className="h-12 w-full rounded-xl border border-white/15 bg-white/5 px-4 font-mono text-[0.95rem] text-on-dark outline-none transition-colors placeholder:text-on-dark-muted/60 focus:border-lime"
          />
        </label>
        <div className="flex items-end">
          <button
            type="button"
            onClick={submit}
            disabled={busy || !valid}
            className="h-12 w-full rounded-full bg-lime px-6 font-medium text-ink transition-transform hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 sm:w-auto"
          >
            {txLabel(tx.status, "Start stream")}
          </button>
        </div>
      </div>
      {rate !== null && rate > 0n && (
        <p className="mt-3 font-mono text-xs text-on-dark-muted">
          ≈ {rate.toString()} wei/sec, accruing every block
        </p>
      )}
      <TxNote status={tx.status} error={tx.errorMessage} />
    </div>
  );
}

// ── Stream row + cancel ─────────────────────────────────────────────────
function StreamRow({
  stream,
  onDone,
}: {
  stream: Stream;
  onDone: () => void;
}) {
  const token = tokenByAddress(stream.token);
  const tx = useTx();
  const done = useCallback(() => {
    onDone();
    tx.reset();
  }, [onDone, tx]);
  useTxDone(tx.status, tx.hash, done);

  const busy = tx.status === "wallet" || tx.status === "confirming";
  const monthly = ratePerSecToMonthly(stream.amountPerSec);

  return (
    <li className="flex flex-col gap-3 rounded-card border border-line p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <span className="relative inline-flex size-2 shrink-0">
          <span className="live-dot absolute inset-0 rounded-full bg-lime-deep" />
        </span>
        <div>
          <a
            href={celoscan("address", stream.payee)}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm font-medium text-ink underline-offset-2 hover:underline"
          >
            {shortenAddress(stream.payee)}
          </a>
          <p className="text-sm text-muted">
            {token ? fmt(monthly, token.decimals, 2) : monthly.toString()}{" "}
            {token?.symbol ?? "?"}/mo · streaming since{" "}
            {new Date(stream.startTime * 1000).toLocaleDateString("en-GB")}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <TxNote status={tx.status} error={tx.errorMessage} />
        <button
          type="button"
          onClick={() =>
            tx.writeContract({
              ...VAULT,
              functionName: "cancelStream",
              args: [stream.payee, stream.token, stream.amountPerSec],
            })
          }
          disabled={busy}
          className="rounded-full border border-line px-4 py-2 text-sm font-medium text-muted transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
        >
          {txLabel(tx.status, "Cancel")}
        </button>
      </div>
    </li>
  );
}
