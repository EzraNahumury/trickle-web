import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { WalletProvider } from "@/components/web3/WalletProvider";
import { FluidBackground } from "@/components/backgrounds/FluidBackground";

// Editorial display face — distinctive grotesque for big headlines.
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

// Clean neutral body / UI face.
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

// Mono for on-chain numbers (per-second rates, balances, addresses).
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Honest, env-driven canonical URL — set NEXT_PUBLIC_SITE_URL on deploy.
// Falls back to localhost for local dev rather than claiming an unowned domain.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Trickle — Real-time payroll streaming on Celo",
    template: "%s · Trickle",
  },
  description:
    "Non-custodial payroll that streams by the second. Deposit stablecoins once, open a per-second salary stream, and let employees withdraw their earnings anytime — live on Celo, inside MiniPay.",
  keywords: [
    "Trickle",
    "payroll streaming",
    "Celo",
    "MiniPay",
    "stablecoin payroll",
    "USDC",
    "real-time salary",
    "money streaming",
  ],
  openGraph: {
    title: "Trickle — Real-time payroll streaming on Celo",
    description:
      "Salary that accrues by the second, not by the month. Non-custodial streaming payroll on Celo, in front of 14M+ MiniPay users.",
    type: "website",
    siteName: "Trickle",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trickle — Real-time payroll streaming on Celo",
    description:
      "Salary that accrues by the second, not by the month. Streaming payroll on Celo, inside MiniPay.",
  },
};

export const viewport: Viewport = {
  themeColor: "#e7e6e1",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${bricolage.variable} ${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-dvh antialiased">
        <FluidBackground />
        <WalletProvider>{children}</WalletProvider>
      </body>
    </html>
  );
}
