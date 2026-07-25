"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { Menu, X, Globe, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Language } from "@/data/translations";

const FOCUS_RING =
  "focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white";

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, setLang, content } = useLanguage();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the drawer on route changes, so tapping a link never leaves it open.
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // While the drawer is open: lock background scroll and let Escape close it.
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  // Every section of the site is reachable from here. Registration is
  // intentionally absent — the CTA button beside the nav already covers it.
  const navItems = [
    { label: content.nav.about, href: "/#about" },
    { label: content.nav.format, href: "/#format" },
    { label: content.nav.caseSection, href: "/#case" },
    { label: content.nav.schedule, href: "/#schedule" },
    { label: content.nav.rules, href: "/rules" },
    { label: content.nav.team, href: "/team" },
  ];

  const isCurrentPage = (href: string) =>
    !href.startsWith("/#") && pathname === href;

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
        <Link
          href="/"
          className={`flex items-center gap-2 rounded-md shrink-0 ${FOCUS_RING}`}
        >
          <Logo size="md" />
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden lg:flex items-center gap-5 xl:gap-7"
          aria-label="Main Navigation"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isCurrentPage(item.href) ? "page" : undefined}
              className={`text-[13px] xl:text-sm font-semibold transition-colors py-1 whitespace-nowrap rounded-md ${FOCUS_RING} ${
                isCurrentPage(item.href)
                  ? "text-brand-800"
                  : "text-slate-700 hover:text-brand-800"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Header Right Actions — same breakpoint as the nav, so the desktop
            controls and the hamburger never show at the same time. */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          {/* Language Selector Pills */}
          <div
            className="inline-flex items-center rounded-lg border border-slate-300 p-0.5 bg-slate-100 text-xs font-bold shadow-xs"
            role="group"
            aria-label="Language"
          >
            {languages.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={`px-2.5 py-1 rounded-md transition-all ${FOCUS_RING} ${
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
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-800 hover:bg-brand-900 text-white font-bold text-sm transition-colors shadow-sm whitespace-nowrap ${FOCUS_RING}`}
          >
            <span>{content.nav.registerBtn}</span>
            <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
          </Link>
        </div>

        {/* Mobile menu toggle button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`lg:hidden p-2 text-slate-900 hover:text-brand-800 rounded-md ${FOCUS_RING}`}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" strokeWidth={2} />
          ) : (
            <Menu className="w-6 h-6" strokeWidth={2} />
          )}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav"
          className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-4 shadow-lg animate-drawer-in max-h-[calc(100vh-5rem)] overflow-y-auto"
        >
          <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                aria-current={isCurrentPage(item.href) ? "page" : undefined}
                className={`text-sm font-semibold py-2.5 border-b border-slate-100 rounded-md ${FOCUS_RING} ${
                  isCurrentPage(item.href)
                    ? "text-brand-800"
                    : "text-slate-800 hover:text-brand-800"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            <div
              className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-900 bg-slate-100"
              role="group"
              aria-label="Language"
            >
              <Globe className="w-4 h-4 text-slate-700" strokeWidth={2} />
              {languages.map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l)}
                  aria-pressed={lang === l}
                  className={`px-3 py-1 rounded transition-all ${FOCUS_RING} ${
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
              className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-brand-800 text-white font-bold text-sm shadow-sm ${FOCUS_RING}`}
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
