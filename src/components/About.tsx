"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Layers, Target, BookOpen, Users } from "lucide-react";

export const About: React.FC = () => {
  const { content } = useLanguage();
  const { aboutCards } = content;

  const getIcon = (id: string) => {
    switch (id) {
      case "format":
        return <Layers className="w-5 h-5 text-brand-800" strokeWidth={2} />;
      case "goals":
        return <Target className="w-5 h-5 text-brand-800" strokeWidth={2} />;
      case "disciplines":
        return <BookOpen className="w-5 h-5 text-brand-800" strokeWidth={2} />;
      case "team-structure":
      default:
        return <Users className="w-5 h-5 text-brand-800" strokeWidth={2} />;
    }
  };

  return (
    <section id="about" className="py-16 md:py-24 bg-white border-b-2 border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="text-xs font-bold text-brand-800 uppercase tracking-widest mb-2">
            {content.nav.about}
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900 mb-3">
            {content.meta.shortName} — Core Overview
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
            {content.hero.description}
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {aboutCards.map((card) => (
            <div
              key={card.id}
              className="p-6 rounded-xl border-2 border-slate-900 bg-white shadow-sm hover:border-brand-800 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center mb-4 border border-slate-300">
                  {getIcon(card.id)}
                </div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  {card.subtitle}
                </div>
                <h3 className="font-serif text-lg font-bold text-slate-900 mb-2">
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
    </section>
  );
};
