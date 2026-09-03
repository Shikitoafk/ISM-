"use client";

import Link from "next/link";
import { Atom, BookOpen, CalendarDays, ChevronRight, CircleCheck, Microscope, Scale, ShieldCheck, Swords, Users } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { generalInfo } from "@/data/generalInfo";

export default function GeneralInfoPage() {
  const { lang } = useLanguage();
  const info = generalInfo[lang];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="pt-20">
        <section className="relative overflow-hidden bg-slate-950 py-16 text-white sm:py-20">
          <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(#60a5fa_1px,transparent_1px)] [background-size:18px_18px]" />
          <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-900/70 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-200"><Atom className="h-4 w-4" />{info.badge}</div>
            <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-6xl">{info.title}</h1>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg">{info.intro}</p>
          </div>
        </section>

        <section className="relative z-10 mx-auto -mt-7 max-w-6xl px-4 sm:px-6 lg:px-8"><div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg md:grid-cols-4">{info.highlights.map((item) => <div key={item.label} className="border-b border-r border-slate-100 p-5 text-center last:border-r-0 md:border-b-0"><div className="font-serif text-2xl font-bold text-brand-800">{item.value}</div><div className="mt-1 text-xs font-bold uppercase tracking-wide text-slate-500">{item.label}</div></div>)}</div></section>

        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start"><div><p className="text-xs font-bold uppercase tracking-widest text-brand-800">ISM</p><h2 className="mt-2 font-serif text-3xl font-bold">{info.overviewTitle}</h2><p className="mt-5 leading-relaxed text-slate-600">{info.overview}</p></div><div className="grid gap-4 sm:grid-cols-2"><div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><Microscope className="h-7 w-7 text-brand-800" /><h3 className="mt-4 font-bold">{info.disciplinesTitle}</h3><ul className="mt-3 space-y-2">{info.disciplines.map((item) => <li key={item} className="flex gap-2 text-xs leading-relaxed text-slate-600"><CircleCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-700" />{item}</li>)}</ul></div><div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><Users className="h-7 w-7 text-brand-800" /><h3 className="mt-4 font-bold">{info.eligibilityTitle}</h3><ul className="mt-3 space-y-2">{info.eligibility.map((item) => <li key={item} className="flex gap-2 text-xs leading-relaxed text-slate-600"><CircleCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-700" />{item}</li>)}</ul></div></div></div>
        </section>

        <section className="border-y border-slate-200 bg-white"><div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8"><h2 className="font-serif text-3xl font-bold">{info.stagesTitle}</h2><div className="mt-8 grid gap-5 md:grid-cols-3">{info.stages.map((stage) => <article key={stage.number} className="rounded-2xl border border-slate-200 p-6"><div className="text-sm font-bold text-brand-800">{stage.number}</div><h3 className="mt-5 font-serif text-xl font-bold">{stage.title}</h3><p className="mt-3 text-sm leading-relaxed text-slate-600">{stage.text}</p></article>)}</div></div></section>

        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8"><div className="grid gap-8 lg:grid-cols-2"><div><div className="flex items-center gap-3"><Scale className="h-7 w-7 text-brand-800" /><h2 className="font-serif text-3xl font-bold">{info.scoringTitle}</h2></div><div className="mt-6 space-y-3">{info.scoring.map((item) => <div key={item.title} className="rounded-xl border border-slate-200 bg-white p-4"><h3 className="font-bold">{item.title}</h3><p className="mt-1 text-sm text-slate-600">{item.text}</p></div>)}</div></div><div className="rounded-3xl bg-slate-950 p-7 text-white"><div className="flex items-center gap-3"><Swords className="h-7 w-7 text-brand-300" /><h2 className="font-serif text-3xl font-bold">{info.battleTitle}</h2></div><p className="mt-5 leading-relaxed text-slate-300">{info.battleText}</p><div className="mt-7 space-y-4">{info.roles.map((role) => <div key={role.title} className="border-l-2 border-brand-500 pl-4"><h3 className="font-bold">{role.title}</h3><p className="mt-1 text-sm leading-relaxed text-slate-300">{role.text}</p></div>)}</div></div></div></section>

        <section className="border-y border-slate-200 bg-white"><div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8"><div className="flex items-center gap-3"><CalendarDays className="h-7 w-7 text-brand-800" /><h2 className="font-serif text-3xl font-bold">{info.calendarTitle}</h2></div><div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{info.calendar.map((event) => <article key={`${event.date}-${event.title}`} className="rounded-xl border border-slate-200 p-4"><div className="font-serif text-xl font-bold text-brand-800">{event.date}</div><h3 className="mt-2 font-bold">{event.title}</h3><p className="mt-1 text-xs leading-relaxed text-slate-600">{event.text}</p></article>)}</div></div></section>

        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8"><div className="rounded-3xl border border-amber-200 bg-amber-50 p-7 sm:p-10"><div className="flex items-center gap-3"><ShieldCheck className="h-7 w-7 text-amber-700" /><h2 className="font-serif text-3xl font-bold">{info.integrityTitle}</h2></div><ul className="mt-6 grid gap-3 md:grid-cols-2">{info.integrity.map((item) => <li key={item} className="flex gap-3 rounded-xl bg-white/80 p-4 text-sm leading-relaxed text-slate-700"><CircleCheck className="h-5 w-5 shrink-0 text-amber-700" />{item}</li>)}</ul><Link href="/rules" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800"><BookOpen className="h-4 w-4" />{info.regulations}<ChevronRight className="h-4 w-4" /></Link></div></section>
      </main>
      <Footer />
    </div>
  );
}
