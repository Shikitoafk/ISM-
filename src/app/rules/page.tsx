"use client";

import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { FileText, ShieldCheck, Users, Layers, Sparkles, CheckCircle2, Download } from "lucide-react";

export default function RulesPage() {
  const { content } = useLanguage();
  const { rulesPage, meta, formatDetails, rulesPageItems } = content;

  const sections = [
    {
      icon: Users,
      badge: rulesPage.teamTitle,
      title: rulesPage.teamTitle,
      items: rulesPage.teamRequirements,
    },
    {
      icon: Layers,
      badge: rulesPage.stage1Title,
      title: rulesPage.stage1Title,
      description: rulesPage.stage1Desc,
      items: rulesPageItems.stage1Items,
    },
    {
      icon: Sparkles,
      badge: rulesPage.stage2Title,
      title: rulesPage.stage2Title,
      description: rulesPage.stage2Desc,
      items: rulesPageItems.stage2Items,
    },
    {
      icon: ShieldCheck,
      badge: rulesPage.integrityTitle,
      title: rulesPage.integrityTitle,
      description: rulesPage.integrityDesc,
      items: rulesPageItems.integrityItems,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-brand-800 selection:text-white">
      <Header />

      <main className="flex-grow pt-24">
        {/* Compact Accent Hero Banner with Geometric Background */}
        <section className="relative bg-slate-900 text-white py-16 md:py-20 overflow-hidden border-b border-slate-800">
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-900 border border-brand-500/40 text-brand-300 text-xs font-semibold uppercase tracking-wider mb-4">
              <ShieldCheck className="w-4 h-4 text-brand-400" strokeWidth={2} />
              <span>{rulesPage.badge}</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
              {rulesPage.title}
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {rulesPage.subtitle}
            </p>
          </div>
        </section>

        {/* 2-Column Grid of Numbered Rule Cards with Tag Badges */}
        <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {sections.map((sec, idx) => {
              const Icon = sec.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
                      <div className="inline-flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-brand-50 text-brand-800 border border-brand-200">
                          <Icon className="w-5 h-5" strokeWidth={2} />
                        </div>
                      </div>
                      <span className="font-serif text-2xl font-bold text-slate-300">
                        0{idx + 1}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-slate-900 mb-3">
                      {sec.title}
                    </h3>
                    {sec.description && (
                      <p className="text-xs sm:text-sm text-slate-600 mb-4 font-normal leading-relaxed">
                        {sec.description}
                      </p>
                    )}

                    <ul className="space-y-2.5">
                      {sec.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-brand-700 shrink-0 mt-0.5" strokeWidth={2} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          {/* PDF Download Section */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center max-w-4xl mx-auto shadow-sm">
            <h3 className="font-serif text-2xl font-bold text-slate-900 mb-2">
              {rulesPage.downloadsTitle}
            </h3>
            <p className="text-slate-600 text-sm mb-6">
              {rulesPageItems.downloadSubtitle}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              {content.regulationsSection.downloads.map((dl, idx) => (
                <a
                  key={idx}
                  href={dl.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-300 bg-slate-50 hover:bg-white text-slate-800 font-bold text-xs sm:text-sm transition-all shadow-xs"
                >
                  <Download className="w-4 h-4 text-slate-600" strokeWidth={2} />
                  <span>{dl.lang}</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
