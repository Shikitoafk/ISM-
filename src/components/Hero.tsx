import React from "react";
import { OLYMPIAD_CONTENT } from "../data/content";
import { GraduationCap, Users, MapPin, Award, FileText, ArrowRight, Calendar } from "lucide-react";

export const Hero: React.FC = () => {
  const { meta, organizers } = OLYMPIAD_CONTENT;

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-300 bg-white text-brand-800 text-xs font-semibold uppercase tracking-wider mb-6 shadow-sm">
            <span>Международная научная олимпиада ISM</span>
          </div>

          {/* Title */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-tight mb-6">
            Team Interdisciplinary Olympiad in Laboratory Research & Case-Based Science{" "}
            <span className="text-brand-800">"ISM"</span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-xl text-slate-600 font-sans max-w-3xl mx-auto mb-10 leading-relaxed">
            {meta.tagline} по лабораторным исследованиям, физико-химическому синтезу и научным кейсам (биология, химия, физика).
          </p>

          {/* 3 Fact Cards (like reference) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-10 text-left">
            <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm flex items-center gap-3">
              <div className="p-2 rounded-lg bg-slate-100 text-brand-800 shrink-0">
                <GraduationCap className="w-5 h-5" strokeWidth={1.75} />
              </div>
              <div>
                <div className="text-[11px] text-slate-500 uppercase font-semibold">Участники</div>
                <div className="text-sm font-bold text-slate-900">{meta.targetGrades}</div>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm flex items-center gap-3">
              <div className="p-2 rounded-lg bg-slate-100 text-brand-800 shrink-0">
                <Users className="w-5 h-5" strokeWidth={1.75} />
              </div>
              <div>
                <div className="text-[11px] text-slate-500 uppercase font-semibold">Состав</div>
                <div className="text-sm font-bold text-slate-900">{meta.teamSize}</div>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm flex items-center gap-3">
              <div className="p-2 rounded-lg bg-slate-100 text-brand-800 shrink-0">
                <MapPin className="w-5 h-5" strokeWidth={1.75} />
              </div>
              <div>
                <div className="text-[11px] text-slate-500 uppercase font-semibold">Площадка</div>
                <div className="text-sm font-bold text-slate-900">{meta.location}</div>
              </div>
            </div>
          </div>

          {/* Prize Fund / Awards Placeholder Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-brand-200 bg-brand-50 text-brand-800 text-xs sm:text-sm font-medium mb-10">
            <Award className="w-4 h-4 text-brand-800" strokeWidth={1.75} />
            <span>{meta.prizeFundNotice}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a
              href="#registration"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-brand-800 hover:bg-brand-900 text-white font-semibold text-sm transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-800"
            >
              <span>Зарегистрировать команду</span>
              <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
            </a>

            <a
              href={meta.regulationsPdfRu}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-medium text-sm transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
            >
              <FileText className="w-4 h-4 text-slate-500" strokeWidth={1.75} />
              <span>Положение об олимпиаде (PDF)</span>
            </a>
          </div>

          {/* Date Note */}
          <div className="inline-flex items-center gap-2 text-xs text-slate-500">
            <Calendar className="w-4 h-4 text-slate-400" strokeWidth={1.75} />
            <span>{meta.dateAnnouncementNote}</span>
          </div>

        </div>
      </div>
    </section>
  );
};
