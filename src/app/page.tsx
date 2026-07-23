import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Format } from "@/components/Format";
import { CaseSection } from "@/components/CaseSection";
import { ScheduleSection } from "@/components/ScheduleSection";
import { JudgesSection } from "@/components/JudgesSection";
import { AwardsSection } from "@/components/AwardsSection";
import { RegulationsSection } from "@/components/RegulationsSection";
import { RegistrationBlock } from "@/components/RegistrationBlock";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Header />
      <main className="flex-grow">
        <Hero />
        <About />
        <Format />
        <CaseSection />
        <ScheduleSection />
        <JudgesSection />
        <AwardsSection />
        <RegulationsSection />
        <RegistrationBlock />
      </main>
      <Footer />
    </div>
  );
}
