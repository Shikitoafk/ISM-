import React from "react";
import { OLYMPIAD_CONTENT } from "../data/content";
import { Trophy, Info } from "lucide-react";

export const AwardsSection: React.FC = () => {
  const { awardsTiers } = OLYMPIAD_CONTENT;

  return (
    <section id="awards" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="text-xs font-semibold text-brand-800 uppercase tracking-widest mb-2">
            Результаты и награды
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900 mb-3">
            Таблица призовых мест и результатов
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Итоговая структура наградных категорий олимпиады ISM.
          </p>
        </div>

        {/* Real HTML Table for Results / Awards Tiers */}
        <div className="max-w-4xl mx-auto bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-8">
          <div className="p-4 bg-slate-100 border-b border-slate-200 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-brand-800" strokeWidth={1.75} />
            <span className="font-serif font-bold text-slate-900 text-sm">
              Награды и призовые категории сезона
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-semibold uppercase text-slate-500 tracking-wider">
                  <th className="py-3 px-4 sm:px-6 w-48">Категория / Ярус</th>
                  <th className="py-3 px-4 sm:px-6 w-36">Количество</th>
                  <th className="py-3 px-4 sm:px-6">Диплом и награды</th>
                  <th className="py-3 px-4 sm:px-6 w-56">Команда-победитель</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm text-slate-700">
                {awardsTiers.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900">
                      {item.tier}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-slate-600">
                      {item.teamsCount}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 font-medium text-brand-800">
                      {item.reward}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 italic text-slate-400">
                      {item.winnerTeamPlaceholder || "TBD (Будет определено)"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty Results Placeholder Note */}
        <div className="max-w-4xl mx-auto p-4 rounded-xl border border-slate-200 bg-white text-xs text-slate-500 flex items-center justify-center gap-2">
          <Info className="w-4 h-4 text-brand-800 shrink-0" strokeWidth={1.75} />
          <span>Официальные результаты появится после проведения финала олимпиады.</span>
        </div>

      </div>
    </section>
  );
};
