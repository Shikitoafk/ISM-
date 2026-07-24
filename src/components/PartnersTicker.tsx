"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export const PartnersTicker: React.FC = () => {
  const { content } = useLanguage();
  const { partners } = content;

  const hasPartners = partners.list && partners.list.length > 0;

  if (!hasPartners) {
    return (
      <section className="py-8 bg-slate-900 border-b border-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className="py-10 border-2 border-dashed border-slate-700 rounded-2xl bg-slate-950/40 flex flex-col items-center justify-center gap-2 min-h-[120px]"
            aria-label={partners.emptySlot}
          >
            <span className="text-slate-500 text-xs font-semibold uppercase tracking-widest">
              {partners.title}
            </span>
            <span className="text-slate-600 text-[11px] font-medium">
              {partners.emptySlot}
            </span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 bg-slate-900 border-b border-slate-800 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="py-6 border-2 border-dashed border-slate-800 rounded-2xl bg-slate-950/40 text-slate-400 text-xs font-bold uppercase tracking-widest">
          {partners.title} • {partners.subtitle}
        </div>
      </div>
    </section>
  );
};
