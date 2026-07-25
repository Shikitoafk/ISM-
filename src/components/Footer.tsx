"use client";

import React from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { useLanguage } from "@/context/LanguageContext";
import { Mail, MapPin, Phone, FileText } from "lucide-react";

const FOCUS_RING =
  "focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 rounded-sm";

export const Footer: React.FC = () => {
  const { content } = useLanguage();
  const { meta, nav, footer: footerContent } = content;

  // Full sitemap — the header nav is trimmed for space, so this is the one
  // place every page and section is linked from.
  const siteLinks = [
    { label: nav.home, href: "/" },
    { label: nav.about, href: "/#about" },
    { label: nav.format, href: "/#format" },
    { label: nav.caseSection, href: "/#case" },
    { label: nav.schedule, href: "/#schedule" },
    { label: nav.awards, href: "/#awards" },
  ];

  const documentLinks = [
    { label: nav.rules, href: "/rules" },
    { label: nav.regulations, href: "/regulations" },
    { label: nav.team, href: "/team" },
    { label: nav.registerBtn, href: "/register" },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800">

          {/* Left Column: Logo + Description */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className={`inline-block ${FOCUS_RING}`}>
              <Logo size="md" tone="dark" />
            </Link>
            <p className="text-sm text-slate-300 max-w-md leading-relaxed font-normal">
              {meta.fullName} — {meta.tagline}.
            </p>
            <div className="text-xs text-slate-400 font-medium">
              {meta.targetGrades} • {meta.disciplines}
            </div>
          </div>

          {/* Sitemap */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-serif font-bold text-white text-sm uppercase tracking-wider">
              {footerContent.navTitle}
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-300">
              {siteLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`hover:text-white transition-colors ${FOCUS_RING}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Documents & pages */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-serif font-bold text-white text-sm uppercase tracking-wider">
              {nav.regulations}
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-300">
              {documentLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`hover:text-white transition-colors ${FOCUS_RING}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-white text-sm uppercase tracking-wider">
              {footerContent.contactsTitle}
            </h4>
            <div className="text-xs space-y-2.5 text-slate-300 font-medium">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-400 shrink-0" strokeWidth={2} />
                <a
                  href={`tel:${meta.contactPhone.replace(/[^+\d]/g, "")}`}
                  className={`hover:text-white transition-colors ${FOCUS_RING}`}
                >
                  {meta.contactPhone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-400 shrink-0" strokeWidth={2} />
                <a
                  href={`mailto:${meta.contactEmail}`}
                  className={`hover:text-white transition-colors break-all ${FOCUS_RING}`}
                >
                  {meta.contactEmail}
                </a>
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
                className={`inline-flex items-center gap-1.5 text-xs text-brand-300 hover:text-white font-semibold transition-colors ${FOCUS_RING}`}
              >
                <FileText className="w-3.5 h-3.5" strokeWidth={2} />
                <span>{footerContent.downloadRegulations}</span>
              </a>
            </div>
          </div>

        </div>

        {/* Copyright Bottom Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} {meta.shortName} — {footerContent.brandName}. {footerContent.copyright}
          </div>
          <div className="text-slate-500">
            {footerContent.locationNote}
          </div>
        </div>

      </div>
    </footer>
  );
};
