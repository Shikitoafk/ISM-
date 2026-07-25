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
import { resolveHeroImage } from "@/lib/heroImage";

export default function Home() {
  // Resolved on the server so the hero works with whatever extension the
  // photo was saved under, and renders its gradient if there is no photo.
  const heroImage = resolveHeroImage();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-brand-800 selection:text-white">
      <Header />
      {/* Narrative order: what it is → how it runs → what you do →
          when → what you win → who backs it → sign up. */}
      <main className="flex-grow">
        <Hero heroImage={heroImage} />
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
