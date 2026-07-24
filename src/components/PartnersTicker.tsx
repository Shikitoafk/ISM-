"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export const PartnersTicker: React.FC = () => {
  const { content } = useLanguage();
  const { partners } = content;

  // Duplicate items to ensure smooth infinite loop
  const items = [...partners.list, ...partners.list];

  return (
    <section className="py-12 bg-slate-900 border-b border-slate-800 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
        <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
          {partners.title} — {partners.subtitle}
        </h3>
      </div>

      {/* Marquee Track */}
      <div className="relative w-full overflow-hidden flex items-center">
        <div className="flex gap-8 whitespace-nowrap animate-marquee py-2">
          {items.map((partner, index) => (
            <div
              key={index}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-200 font-semibold text-sm sm:text-base shrink-0 hover:bg-slate-800 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-brand-400"></span>
              <span>{partner}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
