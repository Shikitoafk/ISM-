import React from "react";
import { OLYMPIAD_CONTENT } from "../data/content";
import { ShieldAlert, Ban, CheckCircle2, AlertTriangle, AlertCircle, FileX } from "lucide-react";

export const Integrity: React.FC = () => {
  const { integrity } = OLYMPIAD_CONTENT;

  return (
    <section id="integrity" className="py-20 md:py-28 bg-gradient-to-b from-navy-950 via-slate-950 to-navy-950 text-slate-100 relative overflow-hidden border-t border-b border-red-500/20">
      
      {/* Background Warning Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-red-950/20 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider mb-4">
            <ShieldAlert className="w-4 h-4" />
            <span>Фундаментальный принцип ISM</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
            {integrity.title}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {integrity.subtitle}
          </p>
        </div>

        {/* Prohibitions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          {/* AI Restrictions Card */}
          <div className="p-8 rounded-3xl border border-red-500/30 bg-navy-900/90 backdrop-blur-sm relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-red-500/15 text-red-400 flex items-center justify-center">
                <Ban className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-white">
                  Запрет ИИ-инструментов (GenAI)
                </h3>
                <span className="text-xs text-red-400 font-semibold">Строгое ограничение</span>
              </div>
            </div>

            <ul className="space-y-4 mb-6">
              {integrity.prohibitedAi.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0 mt-2" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/20 text-xs text-red-300">
              Включает ChatGPT, Claude, Gemini, GitHub Copilot, Midjourney и иные генеративные LLM/нейросети.
            </div>
          </div>

          {/* External Help & Plagiarism Card */}
          <div className="p-8 rounded-3xl border border-amber-500/30 bg-navy-900/90 backdrop-blur-sm relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
                <FileX className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-white">
                  Внешняя помощь и Плагиат
                </h3>
                <span className="text-xs text-amber-400 font-semibold">Научное цитирование</span>
              </div>
            </div>

            <ul className="space-y-4 mb-6">
              {integrity.prohibitedExternal.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-2" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/20 text-xs text-amber-300">
              {integrity.plagiarismDefinition}
            </div>
          </div>

        </div>

        {/* Escalation Sanctions Banner */}
        <div className="p-8 rounded-3xl border border-slate-800 bg-navy-950">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-6 h-6 text-amber-400" />
            <h3 className="font-serif text-xl font-bold text-white">
              Шкала санкций за нарушения правил
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {integrity.sanctions.map((sanction) => (
              <div key={sanction.step} className="p-5 rounded-2xl border border-slate-800 bg-navy-900/80 relative">
                <div className="w-8 h-8 rounded-full bg-slate-800 text-amber-400 font-bold text-sm flex items-center justify-center mb-3">
                  {sanction.step}
                </div>
                <h4 className="font-serif font-bold text-white text-base mb-1">
                  {sanction.title}
                </h4>
                <p className="text-xs text-slate-400">
                  {sanction.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
