import { SectionLabel } from "../ui/SectionLabel";
import { Reveal } from "../ui/Reveal";
import { STEPS } from "../site-data";

export function WorkflowSection() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-28 border-t border-line bg-surface-2/50 px-6 py-16 sm:px-10 sm:py-24 lg:px-16"
    >
      <div className="mb-14 max-w-2xl">
        <Reveal>
          <SectionLabel tone="ink" className="mb-4">
            How it works
          </SectionLabel>
        </Reveal>
        <Reveal delay={60}>
          <h2 className="text-3xl sm:text-[2.6rem]">
            From deposit to withdrawal, in four steps.
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-5 text-base leading-relaxed text-muted">
            The accounting model is one struct and three storage maps. It is
            intentionally boring — boring is what payroll should be.
          </p>
        </Reveal>
      </div>

      <div className="relative">
        {/* horizontal rail (desktop) with a streaming lime value packet */}
        <div
          aria-hidden
          className="absolute inset-x-6 top-6 hidden h-px lg:block"
        >
          <div className="absolute inset-0 bg-line-2" />
          <span className="rail-comet" />
        </div>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {STEPS.map((step, i) => {
            const last = i === STEPS.length - 1;
            return (
              <Reveal key={step.no} delay={i * 90}>
                <div className="group relative">
                  <span className="relative inline-flex">
                    {last && (
                      <span
                        aria-hidden
                        className="absolute -inset-1.5 rounded-full bg-lime/30 animate-ping"
                      />
                    )}
                    <span
                      className={`relative z-10 grid size-12 place-items-center rounded-full border font-mono text-sm font-medium transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:-translate-y-1 ${
                        last
                          ? "border-ink bg-lime text-ink shadow-[0_0_0_4px_color-mix(in_srgb,var(--color-lime)_22%,transparent)]"
                          : "border-ink/15 bg-surface text-ink group-hover:border-ink"
                      }`}
                    >
                      {step.no}
                    </span>
                  </span>
                  <h3 className="mt-5 text-xl">{step.title}</h3>
                  <p className="mt-2.5 text-[0.95rem] leading-relaxed text-muted">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
