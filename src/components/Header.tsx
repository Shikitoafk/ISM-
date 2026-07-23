"use client";

import React, { useState, useEffect } from "react";
import { Logo } from "./Logo";
import { Menu, X, ArrowRight, ShieldCheck } from "lucide-react";

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Об олимпиаде", href: "#about" },
    { label: "Формат", href: "#format" },
    { label: "Честность и правила", href: "#integrity" },
    { label: "Награды", href: "#awards" },
    { label: "Требования", href: "#eligibility" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-navy-950/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20 py-3"
          : "bg-gradient-to-b from-navy-950/90 via-navy-950/60 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-amber-400 rounded-md p-1">
          <Logo size="md" />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Main Navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors py-1 focus:outline-none focus:ring-1 focus:ring-amber-400 rounded"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Header Right CTA */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href="#registration"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-amber-500 hover:bg-amber-400 text-navy-950 font-semibold text-sm transition-all shadow-md shadow-amber-500/20 hover:shadow-amber-500/30 focus:outline-none focus:ring-2 focus:ring-amber-300"
          >
            <span>Регистрация</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-400 rounded-md"
          aria-expanded={mobileMenuOpen}
          aria-label="Переключить меню"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-navy-950/98 backdrop-blur-xl border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-slate-200 hover:text-amber-400 py-2 border-b border-slate-800/50"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="pt-2">
            <a
              href="#registration"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-md bg-amber-500 text-navy-950 font-bold text-base shadow-lg"
            >
              <span>Зарегистрировать команду</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
