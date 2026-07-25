"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export const About: React.FC = () => {
  const { content } = useLanguage();
  const { aboutCards, meta, nav, hero, aboutSection } = content;

  return (
    <section id="about" className="py-20 md:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Mission Text (Eyebrow + Header + Paragraphs) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-block px-3 py-1 rounded-md bg-brand-50 border border-brand-200 text-brand-800 text-xs font-bold uppercase tracking-widest">
              {nav.about}
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
              {meta.shortName} — {meta.tagline}
            </h2>

            <p className="text-slate-600 text-base leading-relaxed font-normal">
              {hero.description}
            </p>

            <p className="text-slate-600 text-sm leading-relaxed font-normal">
              {aboutSection.missionParagraph}
            </p>

            <div className="pt-2">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                {aboutSection.targetAudienceLabel}
              </div>
              <div className="text-sm font-semibold text-slate-900">
                {meta.targetGrades} ({meta.teamSize})
              </div>
            </div>
          </div>

          {/* Right Column: 2x2 Grid of Feature Cards (Without Icons) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {aboutCards.map((card, index) => (
              <div
                key={card.id || index}
                className="p-6 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-brand-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-brand-800 uppercase tracking-widest mb-2">
                    {card.subtitle}
                  </div>
                  <h3 className="font-serif text-lg font-bold text-slate-900 mb-3">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
