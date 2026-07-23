import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Format } from "@/components/Format";
import { Integrity } from "@/components/Integrity";
import { Awards } from "@/components/Awards";
import { Eligibility } from "@/components/Eligibility";
import { RegistrationBlock } from "@/components/RegistrationBlock";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-navy-950 text-slate-100">
      <Header />
      <main className="flex-grow">
        <Hero />
        <About />
        <Format />
        <Integrity />
        <Awards />
        <Eligibility />
        <RegistrationBlock />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
