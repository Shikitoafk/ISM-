"use client";

import { useCallback, useEffect, useState } from "react";
import { AlertCircle, BarChart3, Loader2, RefreshCw, Trophy } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { useLanguage } from "@/context/LanguageContext";
import { portalTranslations } from "@/data/portalTranslations";

const REFRESH_MS = 60_000;

type ScoreboardRow = {
  rank: number;
  team_name: string;
  city: string | null;
  victory_points: number;
  total_score: number;
  /** Round number (as a string key) to the score the team earned in it. */
  scores: Record<string, number>;
};

type Scoreboard = {
  rounds: number[];
  teams: ScoreboardRow[];
};

export default function ResultsPage() {
  const { lang } = useLanguage();
  const t = portalTranslations[lang].results;
  const [board, setBoard] = useState<Scoreboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (quiet = false) => {
    if (!isSupabaseConfigured()) {
      setError(t.setupError);
      setLoading(false);
      return;
    }
    quiet ? setRefreshing(true) : setLoading(true);
    try {
      const { data, error: rpcError } = await supabase.rpc("get_public_scoreboard");
      if (rpcError) throw rpcError;
      setBoard(data as Scoreboard);
      setError(null);
    } catch (requestError) {
      console.error(requestError);
      setError(t.loadError);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [t.loadError, t.setupError]);

  useEffect(() => {
    void load();
  }, [load]);

  // The board is watched while the tournament runs, so it refreshes itself
  // instead of relying on the reader to reload the page.
  useEffect(() => {
    const timer = window.setInterval(() => void load(true), REFRESH_MS);
    return () => window.clearInterval(timer);
  }, [load]);

  const rounds = board?.rounds ?? [];
  const teams = board?.teams ?? [];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-brand-800 selection:text-white">
      <Header />

      <main className="flex-grow pt-24">
        <section className="relative bg-slate-900 text-white py-14 md:py-16 overflow-hidden border-b border-slate-800">
          <div
            className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#7298c3_1px,transparent_1px)] [background-size:18px_18px]"
            aria-hidden="true"
          />
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-900 border border-brand-500/40 text-brand-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <BarChart3 className="w-4 h-4 text-brand-400" strokeWidth={2} />
              <span>{t.badge}</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
              {t.title}
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {t.subtitle}
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-slate-500 font-medium">{t.totalHint}</p>
            <button
              type="button"
              onClick={() => void load(true)}
              disabled={loading || refreshing}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-60"
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} strokeWidth={2} />
              {portalTranslations[lang].common.refresh}
            </button>
          </div>

          {error && (
            <div className="mb-6 flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-900">
              <AlertCircle className="h-5 w-5 shrink-0" strokeWidth={2} />
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-brand-800" />
            </div>
          ) : teams.length ? (
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              {/* The round columns grow with the tournament, so the table
                  scrolls inside this box instead of widening the page. */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-300 text-[11px] font-bold uppercase text-slate-600 tracking-wider">
                      <th className="py-3 px-4 sm:px-6 w-16">{t.rank}</th>
                      <th className="py-3 px-4 sm:px-6">{t.team}</th>
                      <th className="py-3 px-4 sm:px-6 hidden sm:table-cell">{t.city}</th>
                      {rounds.map((round) => (
                        <th key={round} className="py-3 px-3 text-right whitespace-nowrap">
                          {t.round} {round}
                        </th>
                      ))}
                      <th className="py-3 px-3 text-right">{t.vp}</th>
                      <th className="py-3 px-4 sm:px-6 text-right">{t.total}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-xs sm:text-sm text-slate-800">
                    {teams.map((team) => (
                      <tr
                        key={`${team.rank}-${team.team_name}`}
                        className="hover:bg-slate-50 transition-colors"
                      >
                        <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900">
                          <span className="inline-flex items-center gap-1.5">
                            {team.rank <= 3 && (
                              <Trophy className="w-3.5 h-3.5 text-brand-800" strokeWidth={2} />
                            )}
                            {team.rank}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900">
                          {team.team_name}
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-slate-600 font-normal hidden sm:table-cell">
                          {team.city}
                        </td>
                        {rounds.map((round) => {
                          const score = team.scores?.[String(round)];
                          return (
                            <td
                              key={round}
                              className="py-3.5 px-3 text-right font-mono font-semibold text-slate-700"
                            >
                              {score ?? <span className="text-slate-300">{t.notScored}</span>}
                            </td>
                          );
                        })}
                        <td className="py-3.5 px-3 text-right font-semibold text-slate-600">
                          {team.victory_points}
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-right font-bold text-brand-800">
                          {team.total_score}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
              <BarChart3 className="mx-auto h-10 w-10 text-slate-300" strokeWidth={1.5} />
              <h2 className="mt-4 font-serif text-xl font-bold text-slate-900">{t.empty}</h2>
              <p className="mt-2 text-sm text-slate-500">{t.emptyHint}</p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
