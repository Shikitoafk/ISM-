import React from "react";
import { OLYMPIAD_CONTENT } from "../data/content";
import { Layers, Target, BookOpen, Users, Shield, Building2 } from "lucide-react";

export const About: React.FC = () => {
  const { aboutCards, organizers } = OLYMPIAD_CONTENT;

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
            About the Tournament
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900 mb-3">
            Core ISM Overview
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            A premier team science competition integrating theoretical research, experimental laboratory synthesis, and interdisciplinary problem solving.
          </p>
        </div>

        {/* 4 Cards Grid with Darker Borders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
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

        {/* Co-Chairs Summary & Institutional Support */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          
          <div className="lg:col-span-2 p-6 sm:p-8 rounded-xl border-2 border-slate-900 bg-slate-50 flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">
                Co-Chairs of the Organizing Committee
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-6">
                The academic leadership and operational management of the ISM Olympiad are headed by:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {organizers.coChairs.map((chair, idx) => (
                  <div key={idx} className="p-4 rounded-lg border-2 border-slate-900 bg-white">
                    <div className="font-serif font-bold text-slate-900 text-sm">
                      {chair.name}
                    </div>
                    <div className="text-xs text-slate-600 mt-0.5 font-semibold">
                      {chair.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-xl border-2 border-slate-900 bg-slate-50 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-brand-800 font-bold text-xs uppercase tracking-wider mb-2">
                <Building2 className="w-4 h-4" strokeWidth={2} />
                <span>Institutional Support</span>
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900 mb-2">
                {organizers.institutionalSupport.name}
              </h3>
              <p className="text-xs text-slate-600 mb-4 font-normal">
                {organizers.institutionalSupport.role}
              </p>
            </div>
            
            <div className="p-3 rounded-lg border border-slate-300 bg-white text-[11px] text-slate-600 leading-relaxed font-normal">
              <Shield className="w-3.5 h-3.5 text-slate-500 inline mr-1" strokeWidth={2} />
              {organizers.institutionalSupport.disclaimer}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
