"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { Menu, X, Globe, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Language } from "@/data/translations";

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, setLang, content } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: content.nav.home, href: "/" },
    { label: content.nav.format, href: "/#format" },
    { label: content.nav.caseSection, href: "/#case" },
    { label: content.nav.team, href: "/team" },
    { label: content.nav.registerBtn, href: "/register" },
  ];

  const languages: Language[] = ["EN", "RU", "KZ"];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm py-3"
          : "bg-white/90 backdrop-blur-sm border-b border-slate-200/80 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 focus:outline-none rounded-md shrink-0">
          <Logo size="md" />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8" aria-label="Main Navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs sm:text-sm font-semibold text-slate-700 hover:text-brand-800 transition-colors py-1 focus:outline-none whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Header Right Actions */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          {/* Language Selector Pills */}
          <div className="inline-flex items-center rounded-lg border border-slate-300 p-0.5 bg-slate-100 text-xs font-bold shadow-xs">
            {languages.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  lang === l
                    ? "bg-brand-800 text-white font-bold shadow-xs"
                    : "text-slate-700 hover:text-slate-900 hover:bg-slate-200"
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Registration CTA Button */}
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-800 hover:bg-brand-900 text-white font-bold text-xs sm:text-sm transition-colors shadow-sm focus:outline-none whitespace-nowrap"
          >
            <span>{content.nav.registerBtn}</span>
            <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
          </Link>
        </div>

        {/* Mobile menu toggle button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-900 hover:text-brand-800 focus:outline-none rounded-md"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" strokeWidth={2} /> : <Menu className="w-6 h-6" strokeWidth={2} />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-4 shadow-lg animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold text-slate-800 hover:text-brand-800 py-2 border-b border-slate-100"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            <div className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-900 bg-slate-100">
              <Globe className="w-4 h-4 text-slate-700" strokeWidth={2} />
              {languages.map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l)}
                  className={`px-3 py-1 rounded transition-all ${
                    lang === l ? "bg-brand-800 text-white font-bold" : "text-slate-700"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            <Link
              href="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-brand-800 text-white font-bold text-sm shadow-sm"
            >
              <span>{content.nav.registerBtn}</span>
              <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
