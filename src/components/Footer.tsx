import React from "react";
import { Logo } from "./Logo";
import { OLYMPIAD_CONTENT } from "../data/content";
import { Mail, MapPin, Shield, FileText } from "lucide-react";

export const Footer: React.FC = () => {
  const { meta, organizers } = OLYMPIAD_CONTENT;

  return (
    <footer className="bg-white text-slate-700 border-t-2 border-slate-900 pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b-2 border-slate-900">

          {/* Col 1: Brand */}
          <div className="md:col-span-2 space-y-3">
            <Logo size="md" />
            <p className="text-xs text-slate-600 max-w-md leading-relaxed mt-2 font-medium">
              {meta.fullName}
            </p>
            <div className="text-xs text-slate-500 font-normal">
              Team Interdisciplinary Olympiad in Laboratory Research for High School Students (Grades 9–11).
            </div>
          </div>

          {/* Col 2: Navigation & Documents */}
          <div className="space-y-2.5">
            <h4 className="font-serif font-bold text-slate-900 text-sm">Official Regulations</h4>
            <ul className="space-y-1.5 text-xs font-semibold text-slate-800">
              <li>
                <a
                  href={meta.regulationsPdfEn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-800 inline-flex items-center gap-1.5 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-600" strokeWidth={2} />
                  <span>ISM Regulations (EN)</span>
                </a>
              </li>
              <li>
                <a
                  href={meta.regulationsPdfRu}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-800 inline-flex items-center gap-1.5 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-600" strokeWidth={2} />
                  <span>ISM Regulations (RU)</span>
                </a>
              </li>
              <li>
                <a
                  href={meta.regulationsPdfKz}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-800 inline-flex items-center gap-1.5 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-600" strokeWidth={2} />
                  <span>ISM Regulations (KZ)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Contacts & Leadership */}
          <div className="space-y-2.5">
            <h4 className="font-serif font-bold text-slate-900 text-sm">Contact Info</h4>
            <div className="text-xs space-y-1.5 text-slate-800 font-semibold">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-brand-800 shrink-0" strokeWidth={2} />
                <span>info@ism-olympiad.org</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-brand-800 shrink-0 mt-0.5" strokeWidth={2} />
                <span>{meta.location}</span>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-slate-600">
              <span className="font-bold text-slate-900">Co-Chairs:</span>
              <div className="mt-0.5 space-y-0.5 font-semibold">
                {organizers.coChairs.map((c, i) => (
                  <div key={i}>• {c.name}</div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Legal Disclaimer Line & Copyright */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-600 font-semibold">
          <div className="flex items-center gap-2 text-slate-600 max-w-2xl text-[11px]">
            <Shield className="w-3.5 h-3.5 text-slate-500 shrink-0" strokeWidth={2} />
            <span>
              Institutional Support: {organizers.institutionalSupport.name}. {organizers.institutionalSupport.disclaimer}
            </span>
          </div>

          <div className="text-[11px] text-slate-600 shrink-0">
            © {new Date().getFullYear()} ISM Olympiad. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
};
