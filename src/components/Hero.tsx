"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, FileText, Atom, Trophy, Users, BookOpen, Layers, MapPin } from "lucide-react";

export const Hero: React.FC = () => {
  const { content } = useLanguage();
  const { meta, hero, statsBar } = content;

  const stats = [
    { value: statsBar.disciplinesCount, label: statsBar.disciplinesLabel, icon: BookOpen },
    { value: statsBar.teamSizeCount, label: statsBar.teamSizeLabel, icon: Users },
    { value: statsBar.stagesCount, label: statsBar.stagesLabel, icon: Layers },
    { value: statsBar.targetCount, label: statsBar.targetLabel, icon: Trophy },
    { value: statsBar.venueCount, label: statsBar.venueLabel, icon: MapPin },
  ];

  return (
    <section className="relative pt-24 border-b border-slate-200 overflow-hidden">
      {/* Hero Banner Container with Photo/Pattern Dark Gradient Background */}
      <div className="relative min-h-[520px] md:min-h-[600px] bg-slate-950 flex items-end">
        {/* Background Image / Overlay Gradient */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105 transition-transform duration-1000"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1920&q=80')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-900/40" />

        {/* Hero Content Container */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 w-full">
          <div className="max-w-3xl">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand-400/30 bg-brand-900/60 backdrop-blur-md text-brand-200 text-xs font-semibold uppercase tracking-wider mb-6">
              <Atom className="w-4 h-4 text-brand-300 shrink-0" strokeWidth={2} />
              <span>{hero.badge}</span>
            </div>

            {/* Large White Title in Bottom-Left */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-none mb-4">
              ISM
            </h1>
            <p className="text-xl sm:text-2xl font-serif text-slate-200 mb-4 font-semibold">
              {meta.fullName}
            </p>

            {/* Short Description */}
            <p className="text-sm sm:text-base text-slate-300 font-sans max-w-2xl mb-8 leading-relaxed font-normal">
              {hero.description}
            </p>

            {/* Action Buttons: Primary Filled + Outline Secondary */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-800 hover:bg-brand-700 text-white font-bold text-sm transition-all shadow-md hover:shadow-lg focus:outline-none"
              >
                <span>{hero.registerBtn}</span>
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </Link>

              <Link
                href="/rules"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-slate-400/40 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold text-sm transition-all focus:outline-none"
              >
                <FileText className="w-4 h-4 text-slate-300" strokeWidth={2} />
                <span>{hero.regulationsBtn}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Solid Accent Facts/Stats Bar immediately under Hero */}
      <div className="bg-brand-800 text-white py-6 border-t border-brand-700 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center divide-x-0 md:divide-x divide-brand-700/60">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="px-2 py-1 flex flex-col items-center justify-center">
                  <div className="flex items-center gap-1.5 mb-1 text-brand-200">
                    <Icon className="w-4 h-4 shrink-0" strokeWidth={2} />
                    <span className="text-2xl sm:text-3xl font-extrabold font-serif tracking-tight text-white">
                      {stat.value}
                    </span>
                  </div>
                  <span className="text-xs font-medium text-brand-100 uppercase tracking-wide">
                    {stat.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
