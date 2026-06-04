import { Button } from "../ui/Button";
import { Pill } from "../ui/SectionLabel";
import { Reveal } from "../ui/Reveal";
import { LiveCounter } from "../ui/LiveCounter";
import { HeroArt } from "../illustrations/HeroArt";
import { LaunchAppButton } from "../web3/LaunchAppButton";

export function HeroSection() {
  return (
    <section className="relative px-6 pt-14 pb-10 sm:px-10 sm:pt-20 md:pb-16 lg:px-16">
      {/* faint orbital backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-24 -z-0 h-[640px] w-[640px] bg-[url('/assets/patterns/rings.svg')] bg-contain bg-no-repeat opacity-70"
      />

      <div className="relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        {/* ── Copy column ─────────────────────────────────────────── */}
        <div className="max-w-xl">
          <Reveal>
            <Pill dot className="mb-6">
              Live on Celo Mainnet
            </Pill>
          </Reveal>

          <Reveal delay={60}>
            <h1 className="text-[2.2rem] leading-[1.0] sm:text-6xl sm:leading-[0.98] lg:text-[4.2rem]">
              Salary that streams{" "}
              <span className="relative whitespace-nowrap">
                <span className="relative z-10">by the second</span>
                <span
                  aria-hidden
                  className="absolute inset-x-[-4px] bottom-1.5 -z-0 h-4 -rotate-1 rounded bg-lime sm:bottom-2.5 sm:h-5"
                />
              </span>
              .
            </h1>
          </Reveal>

          <Reveal delay={130}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
              Trickle is non-custodial payroll for the stablecoin economy.
              Deposit once, open a per-second stream, and let your team withdraw
              earnings the moment they&rsquo;re earned — on Celo, inside MiniPay.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <LaunchAppButton variant="dark" size="lg" />
              <Button href="#how-it-works" variant="outline" size="lg">
                See how it works
              </Button>
            </div>
          </Reveal>

          <Reveal delay={280}>
            <p className="mt-7 text-sm text-muted">
              Inspired by LlamaPay — shipped where the next billion users
              already are.
            </p>
          </Reveal>
        </div>

        {/* ── Visual column ───────────────────────────────────────── */}
        <Reveal delay={120} className="relative">
          <div className="relative mx-auto max-w-[460px]">
            <HeroArt className="w-full" />

            {/* floating live-balance card */}
            <div className="absolute -bottom-2 left-0 w-[230px] rounded-2xl border border-ink/10 bg-surface/90 p-4 shadow-lift backdrop-blur-md sm:-left-4">
              <div className="flex items-center gap-2">
                <span className="relative inline-flex size-2">
                  <span className="live-dot absolute inset-0 rounded-full bg-lime-deep" />
                </span>
                <span className="text-xs font-medium uppercase tracking-wide text-muted-2">
                  Streaming now
                </span>
              </div>
              <LiveCounter className="mt-2 block text-2xl font-semibold tracking-tight" />
              <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-line">
                {/* ~mid-month: $497.31 of a ~$1,000/mo stream ≈ 50% (README) */}
                <div className="h-full w-1/2 rounded-full bg-lime" />
              </div>
              <p className="mt-2 text-xs text-muted">
                USDC accrued · $1,000/mo stream
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
