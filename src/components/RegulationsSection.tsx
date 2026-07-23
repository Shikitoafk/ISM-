import React from "react";
import { OLYMPIAD_CONTENT } from "../data/content";
import { FileText, Download } from "lucide-react";

export const RegulationsSection: React.FC = () => {
  const { regulationsSection } = OLYMPIAD_CONTENT;

  return (
    <section id="regulations" className="py-16 md:py-24 bg-white border-b-2 border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-4xl mx-auto p-8 sm:p-10 rounded-xl border-2 border-slate-900 bg-slate-50 shadow-sm">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-xl bg-white border-2 border-slate-900 text-brand-800 shrink-0">
              <FileText className="w-6 h-6" strokeWidth={2} />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-slate-900 mb-2">
                {regulationsSection.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {regulationsSection.description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t-2 border-slate-900">
            {regulationsSection.downloads.map((doc, idx) => (
              <a
                key={idx}
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-lg border-2 border-slate-900 bg-white hover:bg-slate-100 transition-colors flex items-center justify-between gap-2 group"
              >
                <div className="text-xs font-bold text-slate-900">
                  {doc.lang}
                </div>
                <Download className="w-4 h-4 text-brand-800 group-hover:translate-y-0.5 transition-transform" strokeWidth={2} />
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
