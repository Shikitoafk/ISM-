import React from "react";
import { OLYMPIAD_CONTENT } from "../data/content";
import { Users, GraduationCap, DollarSign, Home, Plane, UserCheck, CheckCircle } from "lucide-react";

export const Eligibility: React.FC = () => {
  const { eligibility, logistics } = OLYMPIAD_CONTENT;

  return (
    <section id="eligibility" className="py-20 md:py-28 bg-navy-950 text-slate-100 border-t border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-medium uppercase tracking-wider mb-3">
            <GraduationCap className="w-4 h-4" />
            <span>Правила и условия</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
            Требования к участникам и логистика
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Всё, что необходимо знать перед подачей заявки на участие в олимпиаде ISM.
          </p>
        </div>

        {/* Requirements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {eligibility.requirements.map((req, idx) => (
            <div key={idx} className="p-6 sm:p-8 rounded-3xl border border-slate-800 bg-navy-900/70 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="w-5 h-5 text-amber-400 shrink-0" />
                <h3 className="font-serif text-lg font-bold text-white">
                  {req.label}
                </h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed pl-8">
                {req.val}
              </p>
            </div>
          ))}
        </div>

        {/* Logistics Cards */}
        <div className="p-8 sm:p-10 rounded-3xl border border-slate-800 bg-gradient-to-br from-navy-900 via-slate-900 to-navy-950">
          <div className="flex items-center gap-3 mb-8">
            <Plane className="w-6 h-6 text-amber-400" />
            <h3 className="font-serif text-2xl font-bold text-white">
              {logistics.title}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {logistics.items.map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl border border-slate-800 bg-navy-950/80">
                <div className="text-xs text-amber-400 font-medium uppercase tracking-wider mb-1">
                  {item.title}
                </div>
                <div className="font-serif text-2xl font-bold text-white mb-3">
                  {item.status}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
