"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const Format: React.FC = () => {
  const { content } = useLanguage();
  const { formatDetails, nav } = content;

  const stage1 = formatDetails.stages[0];
  const stage2 = formatDetails.stages[1];

  const cards = [
    {
      num: "01",
      badge: "ONLINE STAGE",
      title: stage1?.name || "Stage I — Qualification",
      subtitle: stage1?.timeframe || "SEPTEMBER - OCTOBER",
      description: stage1?.description || "Online research stage requiring teams to solve an interdisciplinary scientific case.",
      highlight: false,
    },
    {
      num: "02",
      badge: "MAIN EVENT • OSKEMEN",
      title: stage2?.name || "Stage II — Lab Research",
      subtitle: stage2?.timeframe || "OCTOBER 25 - NOVEMBER 1",
      description: stage2?.description || "Practical laboratory tournament: experiments, data modeling, and defense before expert jury.",
      highlight: true,
    },
    {
      num: "03",
      badge: "ETHICS & STANDARDS",
      title: formatDetails.integrityArticle8?.title || "Academic Integrity",
      subtitle: "SCIENTIFIC HONESTY",
      description: formatDetails.integrityArticle8?.text || "Strict adherence to scientific honesty, safety regulations, and original research.",
      highlight: false,
    },
  ];

  return (
    <section id="format" className="py-20 md:py-28 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-md bg-brand-100 border border-brand-300 text-brand-900 text-xs font-bold uppercase tracking-widest mb-3">
            {nav.format}
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            {formatDetails.title}
          </h2>
          <p className="text-slate-600 text-base font-normal">
            {formatDetails.subtitle}
          </p>
        </div>

        {/* 3 Cards Grid in a Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-2xl transition-all duration-300 flex flex-col justify-between ${
                card.highlight
                  ? "bg-slate-900 text-white shadow-xl ring-2 ring-brand-500 scale-[1.02]"
                  : "bg-white text-slate-900 border border-slate-200 shadow-sm hover:shadow-md"
              }`}
            >
              <div>
                {/* Top Badge + Decorative Number */}
                <div className="flex items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-200/40">
                  <span
                    className={`text-xs font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md ${
                      card.highlight
                        ? "bg-brand-800 text-white"
                        : "bg-slate-100 text-brand-800 border border-slate-200"
                    }`}
                  >
                    {card.badge}
                  </span>
                  <span
                    className={`font-serif text-3xl font-black ${
                      card.highlight ? "text-brand-400" : "text-slate-300"
                    }`}
                  >
                    {card.num}
                  </span>
                </div>

                {/* Title & CAPS Subtitle */}
                <div className={`text-xs font-bold uppercase tracking-widest mb-1 ${card.highlight ? "text-brand-300" : "text-slate-500"}`}>
                  {card.subtitle}
                </div>
                <h3 className="font-serif text-2xl font-bold mb-4">
                  {card.title}
                </h3>

                {/* Description */}
                <p
                  className={`text-sm leading-relaxed mb-8 ${
                    card.highlight ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  {card.description}
                </p>
              </div>

              {/* Action Link: "Full Rules →" */}
              <div className="pt-4 border-t border-slate-200/20">
                <Link
                  href="/rules"
                  className={`inline-flex items-center gap-2 text-sm font-bold transition-all hover:gap-3 ${
                    card.highlight
                      ? "text-brand-300 hover:text-white"
                      : "text-brand-800 hover:text-brand-900"
                  }`}
                >
                  <span>Full Rules →</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
