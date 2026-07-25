"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, Sparkles } from "lucide-react";

export const CtaBlock: React.FC = () => {
  const { content } = useLanguage();
  const { cta, meta } = content;

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 text-white p-10 sm:p-16 text-center shadow-xl">
          
          {/* Subtle background glow decorative circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-900/80 border border-brand-500/40 text-brand-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-brand-300" strokeWidth={2} />
              <span>{meta.fullName}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
              {cta.title}
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
              {cta.description}
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-brand-800 hover:bg-brand-700 text-white font-bold text-base transition-all shadow-lg hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              >
                <span>{cta.registerBtn}</span>
                <ArrowRight className="w-5 h-5" strokeWidth={2} />
              </Link>

              <Link
                href="/rules"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-slate-700 bg-slate-800/60 hover:bg-slate-800 text-slate-200 font-semibold text-base transition-all"
              >
                <span>{cta.rulesBtn}</span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
