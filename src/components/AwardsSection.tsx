"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Trophy, Info } from "lucide-react";

export const AwardsSection: React.FC = () => {
  const { content } = useLanguage();
  const { awardsTiers } = content;

  return (
    <section id="awards" className="py-16 md:py-24 bg-slate-50 border-b-2 border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="text-xs font-bold text-brand-800 uppercase tracking-widest mb-2">
            Awards & Results
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900 mb-3">
            Tournament Tiers & Official Medals
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-normal">
            Official recognition structure for the top-performing teams of the ISM Olympiad.
          </p>
        </div>

        {/* Real HTML Table for Awards Tiers */}
        <div className="max-w-4xl mx-auto bg-white rounded-xl border-2 border-slate-900 shadow-sm overflow-hidden mb-8">
          <div className="p-4 bg-slate-100 border-b-2 border-slate-900 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-brand-800" strokeWidth={2} />
            <span className="font-serif font-bold text-slate-900 text-sm">
              Official ISM Season Awards Structure
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-300 text-[11px] font-bold uppercase text-slate-600 tracking-wider">
                  <th className="py-3 px-4 sm:px-6 w-52">Tier / Category</th>
                  <th className="py-3 px-4 sm:px-6 w-36">Teams Count</th>
                  <th className="py-3 px-4 sm:px-6">Diploma & Medals</th>
                  <th className="py-3 px-4 sm:px-6 w-56">Winning Team</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs sm:text-sm text-slate-800">
                {awardsTiers.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900">
                      {item.tier}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 font-semibold text-slate-600">
                      {item.teamsCount}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-brand-800">
                      {item.reward}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 italic text-slate-400 font-normal">
                      {item.winnerTeamPlaceholder || "TBD (To Be Announced)"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty Results Placeholder Note */}
        <div className="max-w-4xl mx-auto p-4 rounded-xl border-2 border-slate-900 bg-white text-xs text-slate-700 flex items-center justify-center gap-2 font-semibold">
          <Info className="w-4 h-4 text-brand-800 shrink-0" strokeWidth={2} />
          <span>Official tournament results will be published after the completion of the final round.</span>
        </div>

      </div>
    </section>
  );
};
