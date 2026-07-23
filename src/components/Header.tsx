"use client";

import React, { useState, useEffect } from "react";
import { Logo } from "./Logo";
import { Menu, X, Globe, ArrowRight } from "lucide-react";

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<"EN" | "RU" | "KZ">("EN");

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
    { label: "About", href: "#about" },
    { label: "Format", href: "#format" },
    { label: "Case", href: "#case" },
    { label: "Schedule", href: "#schedule" },
    { label: "Committee & Jury", href: "#judges" },
    { label: "Regulations", href: "#regulations" },
  ];

  const cycleLang = () => {
    if (currentLang === "EN") setCurrentLang("RU");
    else if (currentLang === "RU") setCurrentLang("KZ");
    else setCurrentLang("EN");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-slate-900 shadow-sm py-3"
          : "bg-white/80 backdrop-blur-sm border-b border-slate-300 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-brand-800 rounded-md">
          <Logo size="md" />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6" aria-label="Main Navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-xs sm:text-sm font-semibold text-slate-800 hover:text-brand-800 transition-colors py-1 focus:outline-none"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Header Right Actions */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Language Switcher */}
          <button
            type="button"
            onClick={cycleLang}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-slate-900 text-xs font-bold text-slate-900 hover:bg-slate-100 transition-colors"
            title="Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-slate-900" strokeWidth={2} />
            <span>{currentLang}</span>
          </button>

          {/* Registration CTA */}
          <a
            href="#registration"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-800 hover:bg-brand-900 text-white font-bold text-xs sm:text-sm transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-800"
          >
            <span>Register Team</span>
            <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
          </a>
        </div>

        {/* Mobile menu button */}
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

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b-2 border-slate-900 px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-bold text-slate-900 hover:text-brand-800 py-2 border-b border-slate-200"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={cycleLang}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border-2 border-slate-900 text-xs font-bold text-slate-900"
            >
              <Globe className="w-4 h-4 text-slate-900" strokeWidth={2} />
              <span>Language: {currentLang}</span>
            </button>

            <a
              href="#registration"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-800 text-white font-bold text-sm shadow-sm"
            >
              <span>Register Team</span>
              <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
