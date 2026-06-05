import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { LogoCloud } from "@/components/sections/LogoCloud";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { WorkflowSection } from "@/components/sections/WorkflowSection";
import { UseCasesSection } from "@/components/sections/UseCasesSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { OnchainSection } from "@/components/sections/OnchainSection";
import { CTASection } from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-on-dark"
      >
        Skip to content
      </a>

      <Navbar />

      <main
        id="main-content"
        tabIndex={-1}
        className="px-3 pb-3 pt-3 outline-none sm:px-5 sm:pb-6 sm:pt-5"
      >
        <div className="mx-auto max-w-[1280px] overflow-hidden rounded-[26px] border border-line bg-surface shadow-soft sm:rounded-[40px]">
          <HeroSection />
          <LogoCloud />
          <FeatureGrid />
          <WorkflowSection />
          <UseCasesSection />
          <StatsSection />
          <OnchainSection />
          <CTASection />
        </div>
      </main>

      <Footer />
    </>
  );
}
