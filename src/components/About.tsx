import React from "react";
import { OLYMPIAD_CONTENT } from "../data/content";
import { Layers, Target, BookOpen, Users, Shield, Building2 } from "lucide-react";

export const About: React.FC = () => {
  const { aboutCards, organizers } = OLYMPIAD_CONTENT;

  const getIcon = (id: string) => {
    switch (id) {
      case "format":
        return <Layers className="w-5 h-5 text-brand-800" strokeWidth={1.75} />;
      case "goals":
        return <Target className="w-5 h-5 text-brand-800" strokeWidth={1.75} />;
      case "disciplines":
        return <BookOpen className="w-5 h-5 text-brand-800" strokeWidth={1.75} />;
      case "team-structure":
      default:
        return <Users className="w-5 h-5 text-brand-800" strokeWidth={1.75} />;
    }
  };

  return (
    <section id="about" className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="text-xs font-semibold text-brand-800 uppercase tracking-widest mb-2">
            О турнире
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900 mb-3">
            Основная информация об ISM
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Командное научное соревнование по лабораторным исследованиям, физико-химическому синтезу и решению практических исследовательских кейсов.
          </p>
        </div>

        {/* 4 Cards Grid (as in reference) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {aboutCards.map((card) => (
            <div
              key={card.id}
              className="p-6 rounded-xl border border-slate-200 bg-white shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center mb-4">
                  {getIcon(card.id)}
                </div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  {card.subtitle}
                </div>
                <h3 className="font-serif text-lg font-bold text-slate-900 mb-2">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Organizers & Institutional Support Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          
          <div className="lg:col-span-2 p-6 sm:p-8 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">
                Сопредседатели оргкомитета
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-6">
                Организацию и научное руководство олимпиады осуществляют сопредседатели оргкомитета ISM:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {organizers.coChairs.map((chair, idx) => (
                  <div key={idx} className="p-4 rounded-lg border border-slate-200 bg-white">
                    <div className="font-serif font-bold text-slate-900 text-sm">
                      {chair.name}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {chair.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-brand-800 font-semibold text-xs uppercase tracking-wider mb-2">
                <Building2 className="w-4 h-4" strokeWidth={1.75} />
                <span>Институциональная поддержка</span>
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900 mb-2">
                {organizers.institutionalSupport.name}
              </h3>
              <p className="text-xs text-slate-600 mb-4">
                {organizers.institutionalSupport.role}
              </p>
            </div>
            
            <div className="p-3 rounded-lg border border-slate-200 bg-white text-[11px] text-slate-500 leading-relaxed">
              <Shield className="w-3.5 h-3.5 text-slate-400 inline mr-1" strokeWidth={1.75} />
              {organizers.institutionalSupport.disclaimer}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
