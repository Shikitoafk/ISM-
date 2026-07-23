import React from "react";
import { OLYMPIAD_CONTENT } from "../data/content";
import { FileText, Users, Award, MapPin, Calendar, CheckCircle2, ArrowRight } from "lucide-react";

export const Hero: React.FC = () => {
  const { meta, organizers } = OLYMPIAD_CONTENT;

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-navy-950 text-slate-100">
      {/* Background aesthetics */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Academic Badge Header */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs sm:text-sm font-medium mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>Международный научный сезон | ISM 2024–2025</span>
          </div>

          {/* Title */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15] mb-6">
            Team Interdisciplinary Olympiad in Laboratory Research & Case-Based Science{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 font-serif italic">
              "ISM"
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-lg sm:text-xl text-slate-300 font-sans max-w-3xl mx-auto mb-8 leading-relaxed">
            {meta.tagline} по лабораторным исследованиям, физико-химическому синтезу и научным кейсам (биология, химия, физика).
          </p>

          {/* Key Stat Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto mb-10 text-left">
            <div className="p-3.5 rounded-xl border border-slate-800 bg-navy-900/80 backdrop-blur-sm flex items-center gap-3">
              <Users className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <div className="text-xs text-slate-400 uppercase font-medium">Формат</div>
                <div className="text-sm font-semibold text-white">{meta.teamSize}</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-800 bg-navy-900/80 backdrop-blur-sm flex items-center gap-3">
              <Award className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <div className="text-xs text-slate-400 uppercase font-medium">Участники</div>
                <div className="text-sm font-semibold text-white">{meta.targetGrades}</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-800 bg-navy-900/80 backdrop-blur-sm flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <div className="text-xs text-slate-400 uppercase font-medium">Оргвзнос</div>
                <div className="text-sm font-semibold text-emerald-400">{meta.cost}</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-800 bg-navy-900/80 backdrop-blur-sm flex items-center gap-3">
              <MapPin className="w-5 h-5 text-cyan-400 shrink-0" />
              <div>
                <div className="text-xs text-slate-400 uppercase font-medium">Очный финал</div>
                <div className="text-sm font-semibold text-white">Satbayev Univ.</div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <a
              href="#registration"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-navy-950 font-bold text-base transition-all transform hover:-translate-y-0.5 shadow-lg shadow-amber-500/25 focus:outline-none focus:ring-2 focus:ring-amber-300"
            >
              <span>Зарегистрировать команду</span>
              <ArrowRight className="w-5 h-5" />
            </a>

            <a
              href={meta.regulationsPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl border border-slate-700 bg-navy-900/70 hover:bg-slate-800/80 text-slate-200 hover:text-white font-medium text-base transition-all focus:outline-none focus:ring-2 focus:ring-slate-500"
            >
              <FileText className="w-5 h-5 text-amber-400" />
              <span>Положение об олимпиаде (PDF)</span>
            </a>
          </div>

          {/* Date Note Banner */}
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-400 bg-navy-900/60 px-4 py-2 rounded-lg border border-slate-800">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>{meta.dateAnnouncementNote}</span>
          </div>

          {/* Institutional Support note */}
          <div className="mt-10 pt-6 border-t border-slate-800/60 text-xs text-slate-400 max-w-2xl mx-auto">
            Официальная организационная и институциональная поддержка:{" "}
            <span className="text-slate-300 font-semibold">{organizers.institutionalSupport.name}</span>
          </div>

        </div>
      </div>
    </section>
  );
};
