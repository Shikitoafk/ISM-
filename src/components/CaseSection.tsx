"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Download, CheckCircle, Calendar } from "lucide-react";

export const CaseSection: React.FC = () => {
  const { content } = useLanguage();
  const { currentCase, regulationsSection } = content;

  return (
    <section id="case" className="py-16 md:py-24 bg-white border-b-2 border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="text-xs font-bold text-brand-800 uppercase tracking-widest mb-2">
            {content.nav.caseSection}
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900 mb-3">
            {currentCase.title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-normal">
            Stage I tasks are published ~10 days prior to the submission deadline. Below is an overview of the case format.
          </p>
        </div>

        {/* Research Case Card */}
        <div className="max-w-4xl mx-auto p-6 sm:p-10 rounded-xl border-2 border-slate-900 bg-slate-50 shadow-sm mb-12">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-300 mb-6">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded bg-brand-800 text-white font-mono text-xs font-bold">
                {currentCase.code}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                {currentCase.title}
              </h3>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-200 border border-slate-400 text-slate-800">
              {currentCase.status}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">
            {currentCase.description}
          </p>

          <div className="mb-6">
            <h4 className="font-serif font-bold text-slate-900 text-sm mb-3">
              Submission Guidelines & Formatting:
            </h4>
            <ul className="space-y-2">
              {currentCase.requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 font-normal">
                  <CheckCircle className="w-4 h-4 text-brand-800 shrink-0 mt-0.5" strokeWidth={2} />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-white border border-slate-300 text-xs text-slate-600 flex items-center gap-2 font-semibold">
            <Calendar className="w-4 h-4 text-brand-800 shrink-0" strokeWidth={2} />
            <span>The exact release date for the Stage I Research Case will be announced on the website.</span>
          </div>
        </div>

        {/* Download Regulations in 3 Languages */}
        <div className="max-w-4xl mx-auto p-6 rounded-xl border-2 border-slate-900 bg-white shadow-sm text-center">
          <h4 className="font-serif font-bold text-slate-900 text-base mb-1">
            Download ISM Regulations & Guidelines (3 Languages)
          </h4>
          <p className="text-xs text-slate-500 mb-6 font-normal">
            Official tournament documents are available in PDF format
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {regulationsSection.downloads.map((d, i) => (
              <a
                key={i}
                href={d.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 border-slate-900 bg-slate-50 hover:bg-slate-100 text-slate-900 text-xs font-bold transition-colors"
              >
                <Download className="w-4 h-4 text-brand-800" strokeWidth={2} />
                <span>{d.lang}</span>
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
