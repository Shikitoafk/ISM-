"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { UserCheck, GraduationCap } from "lucide-react";

export const JudgesSection: React.FC = () => {
  const { content } = useLanguage();
  const { organizers } = content;

  return (
    <section id="judges" className="py-16 md:py-24 bg-white border-b-2 border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="text-xs font-bold text-brand-800 uppercase tracking-widest mb-2">
            Leadership & Governance
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900 mb-3">
            {content.nav.judges}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-normal">
            The executive committee and scientific jury governing the ISM Olympiad.
          </p>
        </div>

        {/* Executive Organizing Committee Members */}
        <div className="mb-14">
          <h3 className="font-serif text-xl font-bold text-slate-900 mb-6 text-center sm:text-left flex items-center justify-center sm:justify-start gap-2">
            <UserCheck className="w-5 h-5 text-brand-800" strokeWidth={2} />
            <span>ISM Executive Board & Organizing Committee</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {organizers.committeeMembers.map((member, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl border-2 border-slate-900 bg-white shadow-sm hover:border-brand-800 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-300 flex items-center justify-center text-brand-800">
                      <UserCheck className="w-4 h-4" strokeWidth={2} />
                    </div>
                    {member.badge && (
                      <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold ${
                        member.badge.includes("Chair") || member.badge.includes("председатель") || member.badge.includes("төраға")
                          ? "bg-brand-800 text-white"
                          : "bg-slate-100 border border-slate-300 text-slate-800"
                      }`}>
                        {member.badge}
                      </span>
                    )}
                  </div>

                  <h4 className="font-serif font-bold text-slate-900 text-base mb-1">
                    {member.name}
                  </h4>
                  <div className="text-xs font-semibold text-brand-800 mb-1">
                    {member.role}
                  </div>
                  <div className="text-xs text-slate-500 font-normal">
                    {member.organization}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scientific Committee & Jury Announcement Box */}
        <div className="p-6 sm:p-8 rounded-xl border-2 border-slate-900 bg-slate-50 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-white border border-slate-300 text-brand-800 shrink-0">
              <GraduationCap className="w-6 h-6" strokeWidth={2} />
            </div>
            <div>
              <h4 className="font-serif text-lg font-bold text-slate-900 mb-1">
                {organizers.juryInfo.title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {organizers.juryInfo.description}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
