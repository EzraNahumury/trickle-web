import { Button } from "../ui/Button";
import { SectionLabel } from "../ui/SectionLabel";
import { Reveal } from "../ui/Reveal";
import { LaunchAppButton } from "../web3/LaunchAppButton";
import { CtaOrb } from "../illustrations/CtaOrb";
import { LINKS } from "../site-data";

export function CTASection() {
  return (
    <section
      id="start"
      className="scroll-mt-28 px-4 py-6 sm:px-6 sm:py-10 lg:px-8"
    >
      <Reveal>
        <div className="relative overflow-hidden rounded-section border border-line bg-surface-2 px-7 py-16 sm:px-12 sm:py-20 lg:px-16">
          <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="max-w-xl">
              <SectionLabel tone="lime" className="mb-5">
                Get started
              </SectionLabel>
              <h2 className="text-[2.3rem] leading-[1.02] sm:text-5xl">
                Stream your first salary today.
              </h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
                No payday. No payroll calendar. Just salary that exists in real
                time — live on Celo Mainnet and Sepolia, and open source.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <LaunchAppButton variant="dark" size="lg" />
                <Button
                  href={LINKS.mainnet}
                  variant="outline"
                  size="lg"
                  icon="up-right"
                >
                  View the contract
                </Button>
              </div>
            </div>

            <div className="relative hidden justify-self-end lg:block">
              <CtaOrb className="w-[280px]" />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
