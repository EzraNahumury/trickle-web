import { SectionLabel } from "../ui/SectionLabel";
import { Reveal } from "../ui/Reveal";
import { USE_CASES } from "../site-data";

export function UseCasesSection() {
  return (
    <section
      id="use-cases"
      className="scroll-mt-28 px-6 py-16 sm:px-10 sm:py-24 lg:px-16"
    >
      <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <Reveal>
            <SectionLabel tone="lime" className="mb-4">
              Use cases
            </SectionLabel>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="text-3xl sm:text-[2.6rem]">
              Built for how people actually get paid.
            </h2>
          </Reveal>
        </div>
        <Reveal delay={120}>
          <p className="max-w-sm text-base leading-relaxed text-muted">
            The protocol is identical across all of them. The difference is
            distribution and cost — and Celo + MiniPay win both.
          </p>
        </Reveal>
      </div>

      <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
        {USE_CASES.map((u, i) => (
          <Reveal key={u.title} delay={(i % 2) * 80}>
            <article className="card-hover group flex h-full items-start gap-5 rounded-card border border-line bg-surface p-7 hover:border-ink/25 hover:shadow-soft">
              <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-ink font-mono text-sm text-on-dark transition-colors duration-300 group-hover:bg-lime group-hover:text-ink">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-xl">{u.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
                  {u.body}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
