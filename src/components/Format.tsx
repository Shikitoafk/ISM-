import React from "react";
import { OLYMPIAD_CONTENT } from "../data/content";
import { Calendar, MapPin, Check, Layers, Cpu, Flame, FlaskConical, Award } from "lucide-react";

export const Format: React.FC = () => {
  const { stages } = OLYMPIAD_CONTENT;

  return (
    <section id="format" className="py-20 md:py-28 bg-navy-950 text-slate-100 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-medium uppercase tracking-wider mb-3">
            <Layers className="w-4 h-4" />
            <span>Структура испытаний</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
            Формат проведения олимпиады
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Олимпиада ISM состоит из двух взаимодополняющих этапов — отборочного онлайн-раунда и очного лабораторного финала.
          </p>
        </div>

        {/* Timeline Cards Container */}
        <div className="space-y-12">
          {stages.map((stage, sIdx) => (
            <div
              key={stage.id}
              className="relative p-6 sm:p-10 rounded-3xl border border-slate-800 bg-navy-900/60 backdrop-blur-md shadow-xl overflow-hidden"
            >
              {/* Header badge strip */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800 mb-8">
                <div className="flex items-center gap-4">
                  <div className="px-4 py-1.5 rounded-xl bg-amber-500 text-navy-950 font-serif font-bold text-lg">
                    {stage.number}
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                      {stage.title}
                    </h3>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900 text-slate-300">
                    <Calendar className="w-4 h-4 text-amber-400" />
                    <span>{stage.timeframe}</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900 text-slate-300">
                    <MapPin className="w-4 h-4 text-cyan-400" />
                    <span>{stage.location}</span>
                  </div>
                </div>
              </div>

              {/* Stage Description */}
              <p className="text-slate-300 text-base mb-8 max-w-4xl">
                {stage.description}{" "}
                <span className="text-amber-400/90 text-xs font-semibold block sm:inline mt-1 sm:mt-0">
                  ({stage.dateNote})
                </span>
              </p>

              {/* Sub-phases grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {stage.subPhases.map((sub, subIdx) => (
                  <div
                    key={subIdx}
                    className="p-6 rounded-2xl border border-slate-800/90 bg-navy-950/80 hover:border-amber-500/30 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div>
                          <span className="text-xs text-amber-400 uppercase font-semibold tracking-wide">
                            {sub.subtitle}
                          </span>
                          <h4 className="font-serif text-xl font-bold text-white mt-1">
                            {sub.title}
                          </h4>
                        </div>
                        {sub.points && (
                          <span className="shrink-0 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                            {sub.points}
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                        {sub.description}
                      </p>

                      <ul className="space-y-2 mb-4">
                        {sub.details.map((detail, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2 text-xs text-slate-400">
                            <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-3 border-t border-slate-800/60 text-[11px] text-slate-500">
                      {sIdx === 0 && subIdx === 0 && "Требует полного научного цитирования первоисточников."}
                      {sIdx === 0 && subIdx === 1 && "Отбор финалистов производится по суммарному рейтингу."}
                      {sIdx === 1 && subIdx === 0 && "Элиминационный этап научных дебатов."}
                      {sIdx === 1 && subIdx === 1 && "Практика в оборудованных лабораториях Satbayev University."}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
