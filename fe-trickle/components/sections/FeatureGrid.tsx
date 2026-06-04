import { SectionLabel } from "../ui/SectionLabel";
import { Reveal } from "../ui/Reveal";
import { TiltCard } from "../ui/TiltCard";
import { ArrowUpRight } from "../ui/icons";
import { CARD_ART, type CardArtKey } from "../illustrations/cards";
import { FEATURES, type Feature } from "../site-data";

function FeatureCard({ feature }: { feature: Feature }) {
  const dark = feature.tone === "dark";
  const Art = CARD_ART[feature.art as CardArtKey];
  const external = feature.href.startsWith("http");

  return (
    <TiltCard className="h-full">
      <article
        className={`group card-hover relative flex h-full min-h-[300px] flex-col justify-between overflow-hidden rounded-card border p-7 ${
          dark
            ? "border-line-dark bg-ink-2 text-on-dark hover:border-white/20 hover:shadow-lift"
            : "border-line bg-surface text-ink hover:border-ink/25 hover:shadow-lift"
        }`}
      >
        {dark && (
          <div
            aria-hidden
            className="bg-grid-dark pointer-events-none absolute inset-0 opacity-60"
          />
        )}

        <div className="relative flex items-start justify-between gap-4">
          <SectionLabel tone="lime">{feature.badge}</SectionLabel>
          <Art
            aria-hidden
            className="h-auto w-[150px] shrink-0 -translate-y-1 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-2 group-hover:translate-x-1"
          />
        </div>

        <div className="relative mt-6">
          <h3 className="text-[1.6rem] leading-tight">{feature.title}</h3>
          <p
            className={`mt-3 max-w-sm text-[0.95rem] leading-relaxed ${
              dark ? "text-on-dark-muted" : "text-muted"
            }`}
          >
            {feature.body}
          </p>
        </div>

        <div className="relative mt-7 inline-flex items-center gap-2.5">
          <span
            className={`grid size-9 place-items-center rounded-full border transition-colors duration-300 ${
              dark
                ? "border-white/20 text-on-dark group-hover:border-lime group-hover:bg-lime group-hover:text-ink"
                : "border-ink/15 text-ink group-hover:border-ink group-hover:bg-ink group-hover:text-on-dark"
            }`}
          >
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
          <span
            className={`text-sm font-medium ${
              dark ? "text-on-dark-muted" : "text-muted"
            }`}
          >
            Learn more
          </span>
        </div>

        {/* stretched accessible link covers the whole card */}
        <a
          href={feature.href}
          aria-label={`${feature.title} — learn more`}
          className="absolute inset-0 z-10"
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        />
      </article>
    </TiltCard>
  );
}

export function FeatureGrid() {
  return (
    <section
      id="features"
      className="scroll-mt-28 px-6 py-16 sm:px-10 sm:py-24 lg:px-16"
    >
      <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <Reveal>
            <SectionLabel tone="lime" className="mb-4">
              Features
            </SectionLabel>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="text-3xl sm:text-[2.6rem]">
              One primitive. The whole payroll surface.
            </h2>
          </Reveal>
        </div>
        <Reveal delay={120}>
          <p className="max-w-sm text-base leading-relaxed text-muted">
            A per-second stream of an ERC-20 is the only moving part. Everything
            below is built on top of it — and ships today.
          </p>
        </Reveal>
      </div>

      <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
        {FEATURES.map((feature, i) => (
          <Reveal key={feature.title} delay={(i % 2) * 80}>
            <FeatureCard feature={feature} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
