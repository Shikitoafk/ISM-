import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Format } from "@/components/Format";
import { PartnersTicker } from "@/components/PartnersTicker";
import { CaseSection } from "@/components/CaseSection";
import { ScheduleSection } from "@/components/ScheduleSection";
import { AwardsSection } from "@/components/AwardsSection";
import { CtaBlock } from "@/components/CtaBlock";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-brand-800 selection:text-white">
      <Header />
      {/* Narrative order: what it is → how it runs → what you do →
          when → what you win → who backs it → sign up. */}
      <main className="flex-grow">
        <Hero />
        <About />
        <Format />
        <CaseSection />
        <ScheduleSection />
        <AwardsSection />
        <PartnersTicker />
        <CtaBlock />
      </main>
      <Footer />
    </div>
  );
}
