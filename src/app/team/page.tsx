"use client";

import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PartnersTicker } from "@/components/PartnersTicker";
import { useLanguage } from "@/context/LanguageContext";
import { Users, User, Award, Building2 } from "lucide-react";

export default function TeamPage() {
  const { content } = useLanguage();
  const { teamPage, organizers, teamJury } = content;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-brand-800 selection:text-white">
      <Header />

      <main className="flex-grow pt-24">
        {/* Accent Hero Banner */}
        <section className="relative bg-slate-900 text-white py-14 md:py-16 overflow-hidden border-b border-slate-800">
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-900 border border-brand-500/40 text-brand-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <Users className="w-4 h-4 text-brand-400" strokeWidth={2} />
              <span>{teamPage.badge}</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
              {teamPage.title}
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {teamPage.subtitle}
            </p>
          </div>
        </section>

        {/* Section: Organizers (Cards with Avatar Placeholders) */}
        <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <div className="text-xs font-bold text-brand-800 uppercase tracking-widest mb-2">
              {teamPage.organizersTitle}
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900 mb-3">
              {organizers.juryInfo.title}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base font-normal">
              {teamPage.organizersSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {organizers.committeeMembers.map((member, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all text-center flex flex-col items-center justify-between"
              >
                <div className="w-full flex flex-col items-center">
                  {/* Avatar Placeholder */}
                  <div className="w-20 h-20 rounded-full bg-slate-100 border-2 border-brand-200 flex items-center justify-center text-slate-400 mb-4 shadow-xs">
                    <User className="w-10 h-10 text-brand-800" strokeWidth={1.5} />
                  </div>

                  {/* Badge */}
                  {member.badge && (
                    <span className="px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-800 text-[11px] font-bold uppercase tracking-wider mb-2 border border-brand-200">
                      {member.badge}
                    </span>
                  )}

                  {/* Name */}
                  <h3 className="font-serif text-lg font-bold text-slate-900 mb-1">
                    {member.name}
                  </h3>

                  {/* Role */}
                  <div className="text-xs font-semibold text-slate-600 mb-2">
                    {member.role}
                  </div>

                  {/* Organization */}
                  <div className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                    <Building2 className="w-3 h-3 text-slate-400 shrink-0" strokeWidth={2} />
                    <span>{member.organization}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Section: Jury Information Note */}
          <div className="max-w-4xl mx-auto p-8 rounded-2xl border border-slate-200 bg-white shadow-sm text-center">
            <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">
              {teamJury.juryTitle}
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed max-w-2xl mx-auto">
              {organizers.juryInfo.description}
            </p>
          </div>
        </section>

        {/* Section: Partners */}
        <PartnersTicker />
      </main>

      <Footer />
    </div>
  );
}
