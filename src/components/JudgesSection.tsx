import React from "react";
import { OLYMPIAD_CONTENT } from "../data/content";
import { UserCheck, Award } from "lucide-react";

export const JudgesSection: React.FC = () => {
  const { judges } = OLYMPIAD_CONTENT;

  return (
    <section id="judges" className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="text-xs font-semibold text-brand-800 uppercase tracking-widest mb-2">
            Экспертный совет
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900 mb-3">
            Оргкомитет и Научное Жюри
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Состав методической комиссии, академических экспертов и сопредседателей олимпиады ISM.
          </p>
        </div>

        {/* Flat Grid of Judges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {judges.map((judge, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl border border-slate-200 bg-white shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-brand-800">
                    <UserCheck className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                  {judge.badge && (
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-600">
                      {judge.badge}
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-lg font-bold text-slate-900 mb-1">
                  {judge.name}
                </h3>
                <div className="text-xs font-semibold text-brand-800 mb-2">
                  {judge.role}
                </div>
                <div className="text-xs text-slate-500">
                  {judge.organization}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
