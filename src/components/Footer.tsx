"use client";

import React from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { useLanguage } from "@/context/LanguageContext";
import { Mail, MapPin, Phone, FileText } from "lucide-react";

export const Footer: React.FC = () => {
  const { content } = useLanguage();
  const { meta, nav } = content;

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800">

          {/* Left Column: Logo + Description */}
          <div className="md:col-span-6 space-y-4">
            <Link href="/" className="inline-block bg-white p-2 rounded-xl">
              <Logo size="md" />
            </Link>
            <p className="text-sm text-slate-300 max-w-md leading-relaxed font-normal">
              {meta.fullName} — {meta.tagline}.
            </p>
            <div className="text-xs text-slate-400 font-medium">
              {meta.targetGrades} • {meta.disciplines}
            </div>
          </div>

          {/* Right Column 1: Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-white text-sm uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-300">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  {nav.home}
                </Link>
              </li>
              <li>
                <Link href="/#format" className="hover:text-white transition-colors">
                  {nav.format}
                </Link>
              </li>
              <li>
                <Link href="/#case" className="hover:text-white transition-colors">
                  {nav.caseSection}
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-white transition-colors">
                  {nav.team}
                </Link>
              </li>
              <li>
                <Link href="/rules" className="hover:text-white transition-colors">
                  {nav.rules}
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-white transition-colors">
                  {nav.registerBtn}
                </Link>
              </li>
            </ul>
          </div>

          {/* Right Column 2: Contacts & Regulations */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-white text-sm uppercase tracking-wider">
              Contacts & Info
            </h4>
            <div className="text-xs space-y-2.5 text-slate-300 font-medium">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-400 shrink-0" strokeWidth={2} />
                <span>{meta.contactPhone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-400 shrink-0" strokeWidth={2} />
                <span>{meta.contactEmail}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" strokeWidth={2} />
                <span>{meta.location}</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={meta.regulationsPdfEn}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-brand-300 hover:text-white font-semibold transition-colors"
              >
                <FileText className="w-3.5 h-3.5" strokeWidth={2} />
                <span>Download Regulations (PDF)</span>
              </a>
            </div>
          </div>

        </div>

        {/* Copyright Bottom Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} {meta.shortName} — International Science Movement. All rights reserved.
          </div>
          <div className="text-slate-500">
            Bilim Innovation Lyceum • Oskemen, Kazakhstan
          </div>
        </div>

      </div>
    </footer>
  );
};
