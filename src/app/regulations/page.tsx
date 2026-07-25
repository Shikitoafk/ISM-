"use client";

import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RegulationsSection } from "@/components/RegulationsSection";
import { useLanguage } from "@/context/LanguageContext";
import { FileText } from "lucide-react";

export default function RegulationsPage() {
  const { content } = useLanguage();
  const { nav, regulationsSection } = content;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-brand-800 selection:text-white">
      <Header />

      <main className="flex-grow pt-24">
        <section className="relative bg-slate-900 text-white py-14 md:py-16 overflow-hidden border-b border-slate-800">
          <div
            className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#7298c3_1px,transparent_1px)] [background-size:18px_18px]"
            aria-hidden="true"
          />
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-900 border border-brand-500/40 text-brand-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <FileText className="w-4 h-4 text-brand-400" strokeWidth={2} />
              <span>{nav.regulations}</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
              {regulationsSection.title}
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {regulationsSection.description}
            </p>
          </div>
        </section>

        <RegulationsSection />
      </main>

      <Footer />
    </div>
  );
}
