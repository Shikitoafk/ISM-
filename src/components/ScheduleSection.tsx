"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Clock, MapPin, Calendar } from "lucide-react";

export const ScheduleSection: React.FC = () => {
  const { content } = useLanguage();
  const { scheduleDays } = content;
  const [activeDayIdx, setActiveDayIdx] = useState(0);

  const safeActiveIdx = activeDayIdx < scheduleDays.length ? activeDayIdx : 0;

  return (
    <section id="schedule" className="py-16 md:py-24 bg-slate-50 border-b-2 border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200 border border-slate-400 text-slate-800 text-xs font-bold uppercase mb-2">
            <Calendar className="w-3.5 h-3.5 text-brand-800" strokeWidth={2} />
            <span>October 25 – November 1</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900 mb-3">
            Tournament Schedule ({content.organizers.finalVenue.name})
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-normal">
            8-day official program for the on-site final round in Almaty.
          </p>
        </div>

        {/* Day Selector Tabs with spacing */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
          {scheduleDays.map((day, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveDayIdx(idx)}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                safeActiveIdx === idx
                  ? "bg-brand-800 text-white shadow-sm font-black"
                  : "bg-white border-2 border-slate-900 text-slate-900 hover:bg-slate-100"
              }`}
            >
              <span>{day.dayNumber}</span>
              <span className="ml-1 opacity-90 font-semibold">({day.date})</span>
            </button>
          ))}
        </div>

        {/* Active Day Table */}
        <div className="max-w-4xl mx-auto bg-white rounded-xl border-2 border-slate-900 shadow-sm overflow-hidden">
          <div className="p-4 sm:p-6 bg-slate-100 border-b-2 border-slate-900 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-brand-800 uppercase tracking-wide">
                {scheduleDays[safeActiveIdx].dayNumber} • {scheduleDays[safeActiveIdx].date}
              </span>
              <h3 className="font-serif text-lg font-bold text-slate-900 mt-0.5">
                {scheduleDays[safeActiveIdx].title}
              </h3>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-300 text-[11px] font-bold uppercase text-slate-600 tracking-wider">
                  <th className="py-3 px-4 sm:px-6 w-36">Time</th>
                  <th className="py-3 px-4 sm:px-6">Event / Activity</th>
                  <th className="py-3 px-4 sm:px-6 w-64">Venue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs sm:text-sm text-slate-800">
                {scheduleDays[safeActiveIdx].rows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-mono font-bold text-slate-900 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" strokeWidth={2} />
                        <span>{row.time}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 font-semibold text-slate-900">
                      {row.event}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-slate-600 font-normal">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-brand-800 shrink-0" strokeWidth={2} />
                        <span>{row.location}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
