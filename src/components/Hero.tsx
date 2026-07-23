"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { GraduationCap, Users, MapPin, Award, FileText, ArrowRight, Calendar, Atom } from "lucide-react";

export const Hero: React.FC = () => {
  const { content } = useLanguage();
  const { meta, hero } = content;

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-slate-50 border-b-2 border-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border-2 border-slate-900 bg-white text-brand-800 text-xs font-extrabold uppercase tracking-wider mb-6 shadow-sm">
            <Atom className="w-4 h-4 text-brand-800 shrink-0" strokeWidth={2} />
            <span>{hero.badge}</span>
          </div>

          {/* Main Title: IISM - International Science Movement */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight mb-4">
            {hero.title}
          </h1>

          {/* Subtitle: Normal font, not all caps */}
          <h2 className="text-lg sm:text-2xl font-semibold text-brand-800 font-sans max-w-3xl mx-auto mb-6 leading-relaxed">
            {hero.subtitle}
          </h2>

          {/* Detailed Description */}
          <p className="text-sm sm:text-base text-slate-600 font-sans max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            {hero.description}
          </p>

          {/* 4 Fact Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-10 text-left">
            <div className="p-4 rounded-xl border-2 border-slate-900 bg-white shadow-sm flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-slate-100 text-brand-800 shrink-0 border border-slate-300">
                <GraduationCap className="w-5 h-5" strokeWidth={2} />
              </div>
              <div>
                <div className="text-[11px] text-slate-500 uppercase font-bold tracking-wider">{hero.targetLabel}</div>
                <div className="text-xs sm:text-sm font-bold text-slate-900">{meta.targetGrades}</div>
              </div>
            </div>

            <div className="p-4 rounded-xl border-2 border-slate-900 bg-white shadow-sm flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-slate-100 text-brand-800 shrink-0 border border-slate-300">
                <Users className="w-5 h-5" strokeWidth={2} />
              </div>
              <div>
                <div className="text-[11px] text-slate-500 uppercase font-bold tracking-wider">{hero.teamSizeLabel}</div>
                <div className="text-xs sm:text-sm font-bold text-slate-900">{meta.teamSize}</div>
              </div>
            </div>

            <div className="p-4 rounded-xl border-2 border-slate-900 bg-white shadow-sm flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-slate-100 text-brand-800 shrink-0 border border-slate-300">
                <MapPin className="w-5 h-5" strokeWidth={2} />
              </div>
              <div>
                <div className="text-[11px] text-slate-500 uppercase font-bold tracking-wider">{hero.venueLabel}</div>
                <div className="text-xs sm:text-sm font-bold text-slate-900">{meta.location}</div>
              </div>
            </div>
          </div>

          {/* Disciplines Bar */}
          <div className="max-w-3xl mx-auto mb-10 p-3.5 rounded-xl border-2 border-slate-900 bg-white text-xs sm:text-sm font-bold text-slate-800 flex items-center justify-center gap-2 shadow-xs">
            <span className="text-brand-800 font-extrabold uppercase tracking-wider text-[11px]">Disciplines:</span>
            <span>{meta.disciplines}</span>
          </div>

          {/* Awards Notice */}
          <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-brand-800 bg-brand-50 text-brand-800 text-xs sm:text-sm font-bold mb-10 shadow-sm">
            <Award className="w-4 h-4 text-brand-800" strokeWidth={2} />
            <span>{meta.awardsNotice}</span>
          </div>

          {/* Action Buttons with Spacing */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-8 max-w-xl mx-auto">
            <a
              href="#registration"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-brand-800 hover:bg-brand-900 text-white font-bold text-sm transition-all shadow-sm focus:outline-none"
            >
              <span>{hero.registerBtn}</span>
              <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </a>

            <a
              href={meta.regulationsPdfEn}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border-2 border-slate-900 bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm transition-all shadow-sm focus:outline-none"
            >
              <FileText className="w-4 h-4 text-slate-700" strokeWidth={2} />
              <span>{hero.regulationsBtn}</span>
            </a>
          </div>

          {/* Date Note */}
          <div className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 bg-slate-200/70 px-3.5 py-1.5 rounded-lg border border-slate-300">
            <Calendar className="w-4 h-4 text-brand-800" strokeWidth={2} />
            <span>{meta.dateAnnouncementNote}</span>
          </div>

        </div>
      </div>
    </section>
  );
};
