import React from "react";
import { OLYMPIAD_CONTENT } from "../data/content";
import { Target, Compass, Microchip, BookOpen, UserCheck, Shield, Building2 } from "lucide-react";

export const About: React.FC = () => {
  const { mission, organizers } = OLYMPIAD_CONTENT;

  return (
    <section id="about" className="py-20 md:py-28 bg-navy-900 border-t border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-medium uppercase tracking-wider mb-3">
            <Compass className="w-4 h-4" />
            <span>Миссия & Дисциплины</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
            {mission.title}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {mission.description}
          </p>
        </div>

        {/* Goals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {mission.goals.map((goal, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl border border-slate-800 bg-navy-950/70 hover:border-amber-500/40 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4 group-hover:bg-amber-500 group-hover:text-navy-950 transition-colors">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                {goal.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {goal.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Disciplines Card */}
        <div className="p-8 sm:p-10 rounded-3xl border border-slate-800 bg-gradient-to-br from-navy-950 via-slate-900 to-navy-950 mb-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-[90px] pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-6 h-6 text-amber-400" />
              <h3 className="font-serif text-2xl font-bold text-white">
                Академические дисциплины и области
              </h3>
            </div>
            
            <p className="text-slate-300 text-sm sm:text-base mb-8 max-w-3xl">
              Олимпиадные задания требуют междисциплинарного синтеза. Основные дисциплины дополняются методами математического моделирования, статистики и инженерных вычислений.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {mission.disciplines.map((disc, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-800/80 bg-navy-900/60">
                  <div className="text-amber-400 font-serif font-bold text-base mb-1">
                    {disc.name}
                  </div>
                  <div className="text-xs text-slate-400 leading-normal">
                    {disc.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Organizers & Leadership Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* Co-Chairs */}
          <div className="lg:col-span-2 p-8 rounded-3xl border border-slate-800 bg-navy-950/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <UserCheck className="w-6 h-6 text-amber-400" />
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  Оргкомитет олимпиады
                </h3>
              </div>
              <p className="text-sm text-slate-300 mb-6">
                Сопредседатели оргкомитета отвечают за академические стандарты, составление экспертного жюри и координацию этапов проведения олимпиады ISM.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {organizers.coChairs.map((chair, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-slate-800 bg-slate-900/80">
                    <div className="font-serif font-bold text-white text-base">
                      {chair.name}
                    </div>
                    <div className="text-xs text-amber-400/90 mt-0.5">
                      {chair.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-xs text-slate-400 italic pt-4 border-t border-slate-800/60">
              * Полный состав научного жюри и методической комиссии публикуется перед стартом Stage I.
            </div>
          </div>

          {/* Institutional Support */}
          <div className="p-8 rounded-3xl border border-slate-800 bg-navy-950/80 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-6">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="text-xs text-cyan-400 uppercase font-semibold tracking-wider mb-1">
                Институциональная поддержка
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-3">
                {organizers.institutionalSupport.name}
              </h3>
              <p className="text-sm text-slate-300 mb-6">
                {organizers.institutionalSupport.role}
              </p>
            </div>

            {/* Legal Disclaimer Line */}
            <div className="p-3.5 rounded-xl border border-slate-800/80 bg-slate-900/90 text-[11px] text-slate-400 leading-relaxed">
              <Shield className="w-3.5 h-3.5 text-amber-400 inline mr-1.5" />
              {organizers.institutionalSupport.disclaimer}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
