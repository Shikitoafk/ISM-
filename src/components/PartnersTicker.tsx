"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export const PartnersTicker: React.FC = () => {
  const { content } = useLanguage();
  const { partners } = content;

  const hasPartners = partners.list && partners.list.length > 0;

  return (
    <section
      id="partners"
      className="py-12 bg-slate-900 border-b border-slate-800 text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="text-xs font-bold uppercase tracking-widest text-brand-300 mb-2">
          {partners.title}
        </div>
        <p className="text-sm text-slate-400 mb-8">{partners.subtitle}</p>
      </div>

      {hasPartners ? (
        // Duplicated once so the -50% keyframe wraps seamlessly.
        <div className="relative">
          <div className="animate-marquee gap-12 pr-12">
            {[...partners.list, ...partners.list].map((partner, index) => (
              <span
                key={index}
                aria-hidden={index >= partners.list.length}
                className="shrink-0 text-base font-serif font-semibold text-slate-300 whitespace-nowrap"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-10 border border-dashed border-slate-700 rounded-2xl bg-slate-950/40 flex items-center justify-center min-h-[120px]">
            <span className="text-slate-500 text-xs font-medium">
              {partners.emptySlot}
            </span>
          </div>
        </div>
      )}
    </section>
  );
};
