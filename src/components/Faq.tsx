"use client";

import React, { useState } from "react";
import { OLYMPIAD_CONTENT } from "../data/content";
import { HelpCircle, ChevronDown } from "lucide-react";

export const Faq: React.FC = () => {
  const { faqs } = OLYMPIAD_CONTENT;
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-navy-950 text-slate-100 border-t border-slate-800/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-medium uppercase tracking-wider mb-3">
            <HelpCircle className="w-4 h-4" />
            <span>Ответы на вопросы</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
            Часто задаваемые вопросы (FAQ)
          </h2>
          <p className="text-slate-300 text-base">
            Основные ответы по правилам, проживанию, заменам и техническим вопросам олимпиады.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-4">
          {faqs.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-800 bg-navy-900/60 overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif font-bold text-white text-base sm:text-lg">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-amber-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-slate-300 text-sm sm:text-base leading-relaxed border-t border-slate-800/50 pt-4">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
