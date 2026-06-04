import { SectionLabel } from "../ui/SectionLabel";
import { Reveal } from "../ui/Reveal";
import { STATS } from "../site-data";

export function StatsSection() {
  return (
    <section
      id="numbers"
      className="scroll-mt-28 px-4 py-6 sm:px-6 sm:py-10 lg:px-8"
    >
      <div className="bg-grid-dark relative overflow-hidden rounded-section bg-ink px-7 py-14 text-on-dark sm:px-12 sm:py-16 lg:px-16">
        {/* lime glow accent */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-lime/15 blur-3xl"
        />

        <div className="relative max-w-2xl">
          <Reveal>
            <SectionLabel tone="lime" className="mb-4">
              By the numbers
            </SectionLabel>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="text-3xl text-on-dark sm:text-[2.6rem]">
              The reach and economics that make streaming viable.
            </h2>
          </Reveal>
        </div>

        <div className="relative mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 80}
              className={`px-1 sm:px-7 ${
                i !== 0 ? "lg:border-l lg:border-white/10" : ""
              }`}
            >
              <div className="font-display text-3xl font-semibold tracking-tight text-lime sm:text-5xl">
                {stat.value}
              </div>
              <p className="mt-3 max-w-[15rem] text-sm leading-relaxed text-on-dark-muted">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>

        {/* worked example — straight from the README */}
        <Reveal delay={120}>
          <div className="relative mt-14 rounded-xl2 border border-white/12 bg-white/[0.03] p-6 sm:p-8">
            <p className="text-xs font-medium uppercase tracking-wider text-on-dark-muted">
              Worked example
            </p>
            <p className="mt-3 max-w-3xl text-lg leading-relaxed text-on-dark sm:text-xl">
              Company ABC funds the vault with{" "}
              <span className="font-mono text-lime">5,000 USDC</span> and opens{" "}
              <span className="text-lime">5 streams</span> of{" "}
              <span className="font-mono">$1,000/mo</span> each. Mid-month an
              engineer opens MiniPay and sees{" "}
              <span className="font-mono text-lime">$497.31</span> already
              accrued — the withdrawal settles in{" "}
              <span className="font-mono">~5s</span>, gas paid in stablecoins,
              fee <span className="font-mono">&lt; $0.01</span>.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
