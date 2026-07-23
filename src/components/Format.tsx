"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ShieldAlert, CheckCircle, Presentation, Users, ArrowUpRight, Award, ShieldCheck, Scale, FileSpreadsheet, HelpCircle } from "lucide-react";

export const Format: React.FC = () => {
  const { content } = useLanguage();
  const { formatDetails, evaluationCriteria } = content;

  const getCriterionIcon = (id: string) => {
    switch (id) {
      case "ethics":
        return <ShieldCheck className="w-5 h-5 text-brand-800" strokeWidth={2} />;
      case "presentation":
        return <Presentation className="w-5 h-5 text-brand-800" strokeWidth={2} />;
      case "speaker":
        return <Users className="w-5 h-5 text-brand-800" strokeWidth={2} />;
      case "experiment":
        return <FileSpreadsheet className="w-5 h-5 text-brand-800" strokeWidth={2} />;
      case "questions":
      default:
        return <HelpCircle className="w-5 h-5 text-brand-800" strokeWidth={2} />;
    }
  };

  return (
    <section id="format" className="py-16 md:py-24 bg-slate-50 border-b-2 border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="text-xs font-bold text-brand-800 uppercase tracking-widest mb-2">
            {content.nav.format}
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900 mb-3">
            {formatDetails.title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-normal">
            {formatDetails.subtitle}
          </p>
        </div>

        {/* Stage Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {formatDetails.stages.map((stage) => (
            <div
              key={stage.id}
              className="p-6 sm:p-8 rounded-xl border-2 border-slate-900 bg-white shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200">
                  <span className="px-2.5 py-1 rounded bg-brand-800 text-white font-serif font-bold text-xs uppercase">
                    {stage.number}
                  </span>
                  <span className="text-xs font-bold text-slate-600">
                    {stage.timeframe}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">
                  {stage.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mb-6 font-normal">
                  {stage.description}
                </p>

                <div className="space-y-4">
                  {stage.parts.map((part, idx) => (
                    <div key={idx} className="p-3.5 rounded-lg border border-slate-300 bg-slate-50">
                      <div className="font-bold text-xs text-brand-800 mb-1">
                        {part.name}
                      </div>
                      <div className="text-xs text-slate-600 leading-relaxed font-normal">
                        {part.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* General Evaluation Criteria Section (NO Point Rubrics) */}
        <div className="mb-16">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-800 text-brand-800 text-xs font-bold uppercase mb-2">
              <Scale className="w-3.5 h-3.5" strokeWidth={2} />
              <span>Assessment Principles</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-slate-900 mb-2">
              {evaluationCriteria.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              {evaluationCriteria.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {evaluationCriteria.items.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-xl border-2 border-slate-900 bg-white shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-300 flex items-center justify-center mb-4">
                    {getCriterionIcon(item.id)}
                  </div>
                  <h4 className="font-serif text-base font-bold text-slate-900 mb-2">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Role Rules & Presentation Requirements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Role Rules Card */}
          <div className="p-6 sm:p-8 rounded-xl border-2 border-slate-900 bg-white shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-brand-800" strokeWidth={2} />
              <h3 className="font-serif text-lg font-bold text-slate-900">
                Debate Roles in Battle Rounds
              </h3>
            </div>
            <div className="space-y-3">
              {formatDetails.roleRules.map((r, i) => (
                <div key={i} className="text-xs sm:text-sm leading-relaxed">
                  <span className="font-bold text-slate-900">{r.role}: </span>
                  <span className="text-slate-600 font-normal">{r.rule}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Presentation Requirements Card */}
          <div className="p-6 sm:p-8 rounded-xl border-2 border-slate-900 bg-white shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Presentation className="w-5 h-5 text-brand-800" strokeWidth={2} />
              <h3 className="font-serif text-lg font-bold text-slate-900">
                Presentation & Defense Guidelines
              </h3>
            </div>
            <ul className="space-y-2.5">
              {formatDetails.presentationRequirements.map((req, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 font-normal">
                  <CheckCircle className="w-4 h-4 text-brand-800 shrink-0 mt-0.5" strokeWidth={2} />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Dedicated Card: Academic Integrity & GenAI (Article 8) */}
        <div className="p-6 sm:p-8 rounded-xl border-2 border-slate-900 bg-white shadow-sm relative">
          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-lg bg-slate-100 border border-slate-300 text-brand-800 shrink-0 mt-0.5">
              <ShieldAlert className="w-6 h-6" strokeWidth={2} />
            </div>
            <div className="flex-grow">
              <div className="flex items-center justify-between gap-2 mb-2">
                <h3 className="font-serif text-lg font-bold text-slate-900">
                  {formatDetails.integrityArticle8.title}
                </h3>
                <a
                  href="/docs/ism-regulations-en.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-brand-800 hover:underline inline-flex items-center gap-1 shrink-0"
                >
                  <span>Full Rules</span>
                  <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
                </a>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {formatDetails.integrityArticle8.text}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
