/**
 * Single source of truth for site copy + links. Everything here is grounded in
 * the Trickle README — no invented customers, no fabricated metrics.
 */

import {
  celoscan,
  TRICKLE_VAULT_ADDRESS,
  STREAM_REGISTRY_ADDRESS,
} from "trickle-sdk";

export const LINKS = {
  github: "https://github.com/EzraNahumury/trickle-web",
  // Contract addresses + explorer links come straight from the trickle-sdk
  // package — single source of truth shared with the dApp and any integrator.
  mainnet: celoscan("address", TRICKLE_VAULT_ADDRESS),
  registry: celoscan("address", STREAM_REGISTRY_ADDRESS),
  sepolia:
    "https://sepolia.celoscan.io/address/0x42cADdd47E795A6e04d820A6c140AF04159C7542",
  proofOfShip: "https://talent.app/~/earn/celo-proof-of-ship",
  celoDocs: "https://docs.celo.org/",
  minipayDocs: "https://docs.celo.org/developer/build-on-minipay/overview",
  llamapay: "https://llamapay.io/",
  telegram: "https://t.me/proofofship",
} as const;

export const NAV_LINKS = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Use cases", href: "#use-cases" },
  { label: "By the numbers", href: "#numbers" },
  { label: "On-chain", href: "#onchain" },
] as const;

/**
 * The live, verified contracts behind Trickle on Celo Mainnet. Addresses come
 * from the trickle-sdk package so the site, the dApp and any integrator always
 * agree on what's deployed. Rendered by the On-chain section with a live block
 * feed — "don't trust, verify".
 */
export const ONCHAIN_CONTRACTS = [
  {
    name: "TrickleVault",
    role: "Deposits, per-second streams & withdrawals",
    address: TRICKLE_VAULT_ADDRESS,
    href: LINKS.mainnet,
  },
  {
    name: "StreamRegistry",
    role: "On-chain payslip attestations",
    address: STREAM_REGISTRY_ADDRESS,
    href: LINKS.registry,
  },
] as const;

/** Trust / tech strip — the real stack, not logos we don't have rights to. */
export const STACK = [
  "Celo",
  "MiniPay",
  "USDC",
  "Mento USDm",
  "Foundry",
  "wagmi",
  "viem",
  "Celoscan",
] as const;

import type { CardArtKey } from "./illustrations/cards";

export type Feature = {
  title: string;
  body: string;
  art: CardArtKey;
  tone: "light" | "dark";
  badge: string;
  href: string;
};

export const FEATURES: Feature[] = [
  {
    title: "Per-second salary streams",
    body: "Open a stream at a flat per-second rate. The vault accrues earnings on every block — no payday, no batch run, no keeper.",
    art: "stream",
    tone: "light",
    badge: "Core",
    href: "#how-it-works",
  },
  {
    title: "Batch payroll",
    body: "Add every payee in one flow — CSV import and a single multi-stream review screen. One treasury, many streams.",
    art: "batch",
    tone: "dark",
    badge: "Employer",
    href: "#features",
  },
  {
    title: "Payslips with PDF export",
    body: "Employees get earnings history backed by on-chain receipts and explorer links — exportable as a clean PDF payslip.",
    art: "payslip",
    tone: "dark",
    badge: "Employee",
    href: "#features",
  },
  {
    title: "Payment request links",
    body: "Generate a shareable URL for a one-off invoice. The payer lands on a page with the amount, token and recipient pre-filled.",
    art: "request",
    tone: "light",
    badge: "Employee",
    href: "#features",
  },
  {
    title: "Multi-token by default",
    body: "Stream USDC, Mento USDm (18-dec) or a mock tUSDC on testnet. Decimals are handled per token, end to end.",
    art: "tokens",
    tone: "light",
    badge: "Tokens",
    href: "#features",
  },
  {
    title: "Non-custodial vault",
    body: "Funds never leave your control. Withdraw the unstreamed balance anytime; cancelling a stream always settles pending pay first.",
    art: "vault",
    tone: "dark",
    badge: "Security",
    href: LINKS.mainnet,
  },
];

export type Step = {
  no: string;
  title: string;
  body: string;
};

export const STEPS: Step[] = [
  {
    no: "01",
    title: "Deposit stablecoins",
    body: "The employer funds the TrickleVault once with USDC, USDm or tUSDC. One approval, one deposit.",
  },
  {
    no: "02",
    title: "Open a per-second stream",
    body: "Pick a payee and a monthly rate. Trickle converts it to a flat per-second rate and opens the stream.",
  },
  {
    no: "03",
    title: "Salary accrues on-chain",
    body: "The vault records lastPaid and accrues rate × elapsed every block — fully on-chain, no oracle or cron.",
  },
  {
    no: "04",
    title: "Withdraw anytime",
    body: "The employee opens Trickle in MiniPay and pulls whatever has accrued. Settles in ~5s, fee under a cent.",
  },
];

export type UseCase = {
  title: string;
  body: string;
};

export const USE_CASES: UseCase[] = [
  {
    title: "Remote payroll in emerging markets",
    body: "Pay engineers, designers and support staff in USDC. No IBAN, no SWIFT, no FX desk — withdraw to MiniPay anytime.",
  },
  {
    title: "Freelancers & long contracts",
    body: "Replace the 50/50 upfront dance. The client streams for the engagement; cancelling settles work up to that second.",
  },
  {
    title: "DAO contributor pay",
    body: "One treasury, many streams. Runway becomes legible: balance ÷ total per-second rate = seconds of payroll left.",
  },
  {
    title: "Grants, scholarships & vesting",
    body: "A grant becomes a stream with an end date instead of a milestone PDF chase. Doubles as linear, revocable vesting.",
  },
];

export type Stat = {
  value: string;
  label: string;
};

export const STATS: Stat[] = [
  { value: "14M+", label: "MiniPay users reachable on day one" },
  { value: "~5s", label: "Celo block finality — close enough to real-time" },
  { value: "< $0.01", label: "Typical withdrawal fee, gas payable in stablecoins" },
  {
    value: "Live",
    label: "Deployed on Celo Mainnet & Sepolia, mainnet-verified on Celoscan",
  },
];

export const FOOTER_GROUPS = [
  {
    title: "Product",
    links: [
      { label: "How it works", href: "#how-it-works" },
      { label: "Features", href: "#features" },
      { label: "Use cases", href: "#use-cases" },
      { label: "By the numbers", href: "#numbers" },
    ],
  },
  {
    title: "On-chain",
    links: [
      { label: "TrickleVault", href: LINKS.mainnet },
      { label: "StreamRegistry", href: LINKS.registry },
      { label: "Sepolia contract", href: LINKS.sepolia },
      { label: "Proof of Ship", href: LINKS.proofOfShip },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Celo docs", href: LINKS.celoDocs },
      { label: "MiniPay docs", href: LINKS.minipayDocs },
      { label: "LlamaPay (reference)", href: LINKS.llamapay },
      { label: "GitHub", href: LINKS.github },
    ],
  },
] as const;
