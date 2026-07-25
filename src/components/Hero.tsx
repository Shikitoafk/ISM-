"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, FileText, Atom, Trophy, Users, BookOpen, Layers, MapPin } from "lucide-react";

const FOCUS_RING =
  "focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";

interface HeroProps {
  /**
   * Background photo path, resolved from /public by the page (see
   * src/lib/heroImage.ts). Null when no photo is present, in which case the
   * hero shows its brand gradient alone.
   */
  heroImage?: string | null;
}

export const Hero: React.FC<HeroProps> = ({ heroImage = null }) => {
  const { content } = useLanguage();
  const { meta, hero, statsBar } = content;

  const stats = [
    { value: statsBar.disciplinesCount, label: statsBar.disciplinesLabel, icon: BookOpen },
    { value: statsBar.teamSizeCount, label: statsBar.teamSizeLabel, icon: Users },
    { value: statsBar.stagesCount, label: statsBar.stagesLabel, icon: Layers },
    { value: statsBar.targetCount, label: statsBar.targetLabel, icon: Trophy },
    { value: statsBar.venueCount, label: statsBar.venueLabel, icon: MapPin },
  ];

  return (
    <section className="relative pt-24 border-b border-slate-200 overflow-hidden">
      <div className="relative min-h-[520px] md:min-h-[600px] bg-slate-950 flex items-end">
        {/* Brand-tinted glows. These sit under the photo and stay visible on
            their own when no photo is present, so the hero degrades to a clean
            gradient instead of a black box. */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(70% 60% at 78% 18%, rgba(79,120,175,0.38) 0%, transparent 60%), radial-gradient(55% 55% at 12% 8%, rgba(30,58,95,0.55) 0%, transparent 65%)",
          }}
          aria-hidden="true"
        />

        {/* Ceremony photo. object-position favours the upper-middle band where
            the people are, cropping the empty stage floor at the bottom. */}
        {heroImage && (
          <Image
            src={heroImage}
            alt=""
            fill
            priority
            sizes="100vw"
            quality={80}
            className="object-cover object-[center_35%]"
            aria-hidden="true"
          />
        )}

        {/* Scrim. The photo is bright and busy in the middle, so the copy needs
            a real gradient behind it: dark from the bottom for the text block,
            and from the left so the headline never sits on faces. */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/55 to-slate-950/10 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* Hero Content Container */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 w-full">
          <div className="max-w-3xl">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand-400/30 bg-brand-900/60 backdrop-blur-md text-brand-200 text-xs font-semibold uppercase tracking-wider mb-6">
              <Atom className="w-4 h-4 text-brand-300 shrink-0" strokeWidth={2} />
              <span>{hero.badge}</span>
            </div>

            {/* Large White Title in Bottom-Left */}
            <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[0.95] mb-4">
              ISM
            </h1>
            <p className="text-xl sm:text-2xl font-serif text-slate-200 mb-4 font-semibold leading-snug">
              {meta.fullName}
            </p>

            {/* Short Description */}
            <p className="text-sm sm:text-base text-slate-300 font-sans max-w-2xl mb-8 leading-relaxed font-normal">
              {hero.description}
            </p>

            {/* Action Buttons: Primary Filled + Outline Secondary */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/register"
                className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-800 hover:bg-brand-700 text-white font-bold text-sm transition-all shadow-md hover:shadow-lg ${FOCUS_RING}`}
              >
                <span>{hero.registerBtn}</span>
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </Link>

              <Link
                href="/rules"
                className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-slate-400/40 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold text-sm transition-all ${FOCUS_RING}`}
              >
                <FileText className="w-4 h-4 text-slate-300" strokeWidth={2} />
                <span>{hero.regulationsBtn}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Solid Accent Facts/Stats Bar immediately under Hero */}
      <div className="bg-brand-800 text-white py-6 border-t border-brand-700 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* items-stretch + justify-between keeps the labels on one baseline
              even when a value wraps to two lines (e.g. "Усть-Каменогорск"). */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-x-4 gap-y-8 text-center items-stretch divide-x-0 md:divide-x divide-brand-700/60">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="px-3 flex flex-col items-center justify-between gap-1.5"
                >
                  <div className="flex items-center justify-center gap-1.5 text-brand-200 flex-grow">
                    <Icon className="w-4 h-4 shrink-0" strokeWidth={2} />
                    <span className="text-xl sm:text-2xl lg:text-3xl font-bold font-serif tracking-tight text-white text-balance leading-tight">
                      {stat.value}
                    </span>
                  </div>
                  <span className="text-[11px] sm:text-xs font-medium text-brand-100 uppercase tracking-wide leading-snug">
                    {stat.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
