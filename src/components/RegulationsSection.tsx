"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { FileText, Download, ShieldAlert, FileCheck } from "lucide-react";

export const RegulationsSection: React.FC = () => {
  const { content } = useLanguage();
  const { regulationsSection, waivers, labSafety, regulationsSectionUI } = content;

  return (
    <section id="regulations" className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Regulations downloads. The page header above already carries the
            title and description, so this box is the documents only. */}
        <div className="max-w-4xl mx-auto p-8 sm:p-10 rounded-xl border border-slate-200 bg-slate-50 shadow-sm mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-brand-800 shrink-0">
              <FileText className="w-5 h-5" strokeWidth={2} />
            </div>
            <h2 className="font-serif text-xl font-bold text-slate-900">
              {regulationsSectionUI.downloadFormBtn}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {regulationsSection.downloads.map((doc, idx) => (
              <a
                key={idx}
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 transition-colors flex items-center justify-between gap-2 group shadow-xs"
              >
                <div className="text-xs font-bold text-slate-900">
                  {doc.lang}
                </div>
                <Download className="w-4 h-4 text-brand-800 group-hover:translate-y-0.5 transition-transform" strokeWidth={2} />
              </a>
            ))}
          </div>
        </div>

        {/* Waivers & Consents Box */}
        <div className="max-w-4xl mx-auto p-8 sm:p-10 rounded-xl border border-slate-200 bg-white shadow-sm mb-12">
          <div className="flex items-center gap-3 mb-3 pb-3 border-b border-slate-200">
            <FileCheck className="w-6 h-6 text-brand-800" strokeWidth={2} />
            <div>
              <h3 className="font-serif text-xl font-bold text-slate-900">
                {waivers.title}
              </h3>
              <p className="text-xs text-slate-500 font-normal">
                {waivers.subtitle}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-3">
            {waivers.docs.map((item, i) => (
              <div key={i} className="p-5 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
                <div>
                  <h4 className="font-serif font-bold text-slate-900 text-sm mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-600 mb-4 font-normal leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-brand-800 hover:bg-brand-900 text-white font-bold text-xs transition-colors shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" strokeWidth={2} />
                  <span>{regulationsSectionUI.downloadFormBtn}</span>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Laboratory Safety Box */}
        <div className="max-w-4xl mx-auto p-8 sm:p-10 rounded-xl border border-slate-200 bg-amber-50/50 shadow-sm">
          <div className="flex items-start gap-4 mb-4">
            <div className="p-2.5 rounded-lg bg-amber-100 border border-amber-400 text-amber-900 shrink-0 mt-0.5">
              <ShieldAlert className="w-6 h-6" strokeWidth={2} />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-slate-900 mb-1">
                {labSafety.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-normal">
                {labSafety.subtitle}
              </p>
            </div>
          </div>

          <ul className="space-y-3 mb-6 pt-2">
            {labSafety.rules.map((rule, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 font-medium">
                <span className="w-2 h-2 rounded-full bg-brand-800 mt-2 shrink-0"></span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>

          <div className="p-4 rounded-lg bg-white border border-amber-300 text-xs text-slate-700 font-semibold leading-relaxed">
            <span className="font-bold text-brand-800">{regulationsSectionUI.disclaimerLabel}</span>
            {labSafety.disclaimer}
          </div>
        </div>

      </div>
    </section>
  );
};
