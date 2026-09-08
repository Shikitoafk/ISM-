"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  Award,
  Building2,
  CalendarClock,
  CheckCircle2,
  DoorOpen,
  KeyRound,
  Loader2,
  LogOut,
  MapPin,
  RefreshCw,
  ShieldCheck,
  Swords,
  Trophy,
  Users,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { formatTeamCode } from "@/lib/teamAccess";
import { useLanguage } from "@/context/LanguageContext";
import { portalTranslations } from "@/data/portalTranslations";

const STORAGE_KEY = "ism_team_access_code";
const REFRESH_MS = 30_000;

type Team = {
  id: string;
  team_name: string;
  school: string;
  city: string;
  grade: string;
  members: Array<{ full_name: string; grade: string; role_or_notes: string }>;
  victory_points: number;
  total_score: number;
  yellow_cards: number;
  arrived: boolean;
  competition_status: string;
  rank: number;
};

type RankingRow = {
  rank: number;
  team_name: string;
  victory_points: number;
  total_score: number;
};

type Round = {
  id: string;
  round_number: number;
  room: string | null;
  team_role: string | null;
  judges: string[];
  opponents: string[];
  starts_at: string | null;
};

type RoundScore = {
  round_number: number;
  room: string | null;
  team_role: string | null;
  /** null while the judges have not scored the round yet. */
  score: number | null;
  is_current: boolean;
};

type Challenge = {
  id: string;
  title: string;
  description: string | null;
  status: string;
};

type DashboardData = {
  team: Team;
  ranking: RankingRow[];
  round: Round | null;
  rounds: RoundScore[];
  challenges: Challenge[];
};

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{label}</span>
        <span className="text-brand-800">{icon}</span>
      </div>
      <div className="font-serif text-3xl font-bold text-slate-950">{value}</div>
    </div>
  );
}

export default function CabinetPage() {
  const { lang } = useLanguage();
  const t = portalTranslations[lang];
  const [code, setCode] = useState("");
  const [activeCode, setActiveCode] = useState<string | null>(null);
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [arrivalLoading, setArrivalLoading] = useState(false);

  const loadDashboard = useCallback(async (accessCode: string, quiet = false) => {
    if (!isSupabaseConfigured()) {
      setError(t.cabinet.setupError);
      return false;
    }
    quiet ? setRefreshing(true) : setLoading(true);
    setError(null);
    try {
      const { data: result, error: rpcError } = await supabase.rpc("get_team_dashboard", {
        p_code: accessCode,
      });
      if (rpcError) throw rpcError;
      if (!result) {
        setError(t.cabinet.notFound);
        return false;
      }
      setData(result as DashboardData);
      setActiveCode(accessCode);
      window.localStorage.setItem(STORAGE_KEY, accessCode);
      return true;
    } catch (requestError) {
      console.error(requestError);
      setError(t.cabinet.loadError);
      return false;
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [t.cabinet.loadError, t.cabinet.notFound, t.cabinet.setupError]);

  useEffect(() => {
    const savedCode = window.localStorage.getItem(STORAGE_KEY);
    if (savedCode) {
      setCode(savedCode);
      void loadDashboard(savedCode);
    }
  }, [loadDashboard]);

  useEffect(() => {
    if (!activeCode) return;
    const timer = window.setInterval(() => void loadDashboard(activeCode, true), REFRESH_MS);
    return () => window.clearInterval(timer);
  }, [activeCode, loadDashboard]);

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    const formatted = formatTeamCode(code);
    setCode(formatted);
    if (formatted.length !== 9) {
      setError(t.cabinet.fullCode);
      return;
    }
    await loadDashboard(formatted);
  };

  const logout = () => {
    window.localStorage.removeItem(STORAGE_KEY);
    setActiveCode(null);
    setData(null);
    setCode("");
    setError(null);
  };

  const confirmArrival = async () => {
    if (!activeCode || !data) return;
    setArrivalLoading(true);
    setError(null);
    const { data: confirmed, error: rpcError } = await supabase.rpc("confirm_team_arrival", {
      p_code: activeCode,
    });
    if (rpcError || !confirmed) {
      setError(t.cabinet.arrivalError);
    } else {
      setData({ ...data, team: { ...data.team, arrived: true } });
    }
    setArrivalLoading(false);
  };

  if (!data) {
    return (
      <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
        <Header />
        <main className="flex flex-1 items-center justify-center px-4 pb-16 pt-32">
          <div className="w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
            <div className="bg-slate-950 px-7 py-8 text-white">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-700">
                <KeyRound className="h-6 w-6" />
              </div>
              <h1 className="font-serif text-3xl font-bold">{t.cabinet.title}</h1>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                {t.cabinet.loginHint}
              </p>
            </div>
            <form onSubmit={handleLogin} className="space-y-5 p-7">
              <div>
                <label htmlFor="team-code" className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">
                  {t.cabinet.code}
                </label>
                <input
                  id="team-code"
                  value={code}
                  onChange={(event) => setCode(formatTeamCode(event.target.value))}
                  placeholder="ABCD-2345"
                  autoComplete="one-time-code"
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 text-center font-mono text-xl font-bold uppercase tracking-[0.15em] outline-none focus:border-brand-700 focus:ring-2 focus:ring-brand-700/20"
                />
              </div>
              {error && (
                <div className="flex gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-800">
                  <AlertCircle className="h-4 w-4 shrink-0" /> {error}
                </div>
              )}
              <button disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-800 px-5 py-3.5 text-sm font-bold text-white hover:bg-brand-900 disabled:bg-slate-400">
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <><span>{t.cabinet.login}</span><ArrowRight className="h-4 w-4" /></>}
              </button>
              <p className="text-center text-xs leading-relaxed text-slate-500">
                {t.cabinet.noCode} <Link href="/register" className="font-bold text-brand-800 hover:underline">{t.cabinet.register}</Link>
              </p>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const { team, ranking, round, challenges } = data;
  const roundScores = data.rounds ?? [];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="pb-20 pt-24">
        <section className="border-b border-slate-800 bg-slate-950 text-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-end md:justify-between lg:px-8">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-900 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-200">
                <ShieldCheck className="h-4 w-4" /> {t.cabinet.badge}
              </div>
              <h1 className="font-serif text-3xl font-bold sm:text-4xl">{team.team_name}</h1>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-300">
                <span className="flex items-center gap-1.5"><Building2 className="h-4 w-4" />{team.school}</span>
                <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" />{team.city}</span>
                <span className="flex items-center gap-1.5"><Users className="h-4 w-4" />{team.grade}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => activeCode && loadDashboard(activeCode, true)} disabled={refreshing} className="flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-xs font-bold text-slate-200 hover:bg-slate-800">
                <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} /> {t.common.refresh}
              </button>
              <button onClick={logout} className="flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-xs font-bold text-slate-200 hover:bg-slate-800">
                <LogOut className="h-4 w-4" /> {t.common.logout}
              </button>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
          {error && <div className="flex gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-800"><AlertCircle className="h-5 w-5 shrink-0" />{error}</div>}

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard icon={<Trophy className="h-5 w-5" />} label={t.cabinet.place} value={`#${team.rank}`} />
            <StatCard icon={<Award className="h-5 w-5" />} label={t.cabinet.victoryPoints} value={team.victory_points} />
            <StatCard icon={<Swords className="h-5 w-5" />} label={t.cabinet.totalScore} value={team.total_score} />
            <StatCard icon={<AlertCircle className="h-5 w-5" />} label={t.cabinet.yellowCards} value={team.yellow_cards} />
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center gap-3 border-b border-slate-200 p-5">
                <div className="rounded-xl bg-brand-50 p-2 text-brand-800"><CalendarClock className="h-5 w-5" /></div>
                <div><h2 className="font-serif text-xl font-bold">{t.cabinet.currentRound}</h2><p className="text-xs text-slate-500">{t.cabinet.autoUpdate}</p></div>
              </div>
              {round ? (
                <div className="grid gap-4 p-5 sm:grid-cols-2">
                  <div className="rounded-xl bg-slate-50 p-4"><div className="text-xs font-bold uppercase text-slate-500">{t.cabinet.round}</div><div className="mt-1 text-xl font-bold">{round.round_number}</div></div>
                  <div className="rounded-xl bg-slate-50 p-4"><div className="text-xs font-bold uppercase text-slate-500">{t.cabinet.room}</div><div className="mt-1 text-xl font-bold">{round.room || t.cabinet.pending}</div></div>
                  <div className="rounded-xl bg-slate-50 p-4"><div className="text-xs font-bold uppercase text-slate-500">{t.cabinet.role}</div><div className="mt-1 font-bold">{round.team_role || t.cabinet.pending}</div></div>
                  <div className="rounded-xl bg-slate-50 p-4"><div className="text-xs font-bold uppercase text-slate-500">{t.cabinet.starts}</div><div className="mt-1 font-bold">{round.starts_at ? new Date(round.starts_at).toLocaleString(lang === "RU" ? "ru-RU" : lang === "KZ" ? "kk-KZ" : "en-GB") : t.cabinet.pending}</div></div>
                  <div className="sm:col-span-2"><div className="text-xs font-bold uppercase text-slate-500">{t.cabinet.roomTeams}</div><div className="mt-2 flex flex-wrap gap-2">{round.opponents.length ? round.opponents.map((name) => <span key={name} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold">{name}</span>) : <span className="text-sm text-slate-500">{t.cabinet.opponentsPending}</span>}</div></div>
                  <div className="sm:col-span-2"><div className="text-xs font-bold uppercase text-slate-500">{t.cabinet.judges}</div><p className="mt-1 text-sm font-semibold text-slate-700">{round.judges.length ? round.judges.join(", ") : t.cabinet.judgesPending}</p></div>
                </div>
              ) : (
                <div className="p-10 text-center"><CalendarClock className="mx-auto h-10 w-10 text-slate-300" /><h3 className="mt-3 font-bold">{t.cabinet.noRound}</h3><p className="mt-1 text-sm text-slate-500">{t.cabinet.noRoundHint}</p></div>
              )}
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="font-serif text-xl font-bold">{t.cabinet.arrival}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{t.cabinet.arrivalHint}</p>
              {team.arrived ? (
                <div className="mt-5 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 font-bold text-emerald-800"><CheckCircle2 className="h-6 w-6" />{t.cabinet.arrived}</div>
              ) : (
                <button onClick={confirmArrival} disabled={arrivalLoading} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 text-sm font-bold text-white hover:bg-emerald-800 disabled:bg-slate-400">{arrivalLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <><DoorOpen className="h-5 w-5" />{t.cabinet.confirmArrival}</>}</button>
              )}
            </section>
          </div>

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 p-5">
              <div>
                <h2 className="font-serif text-xl font-bold">{t.cabinet.roundScores}</h2>
                <p className="text-xs text-slate-500">{t.cabinet.roundScoresHint}</p>
              </div>
              <div className="text-right">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">{t.cabinet.totalScore}</div>
                <div className="font-serif text-2xl font-bold text-brand-800">{team.total_score}</div>
              </div>
            </div>
            {roundScores.length ? (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[520px] text-left text-sm">
                  <thead className="bg-slate-50 text-xs uppercase text-slate-600">
                    <tr>
                      <th className="w-24 px-4 py-3">{t.cabinet.round}</th>
                      <th className="px-4 py-3">{t.cabinet.room}</th>
                      <th className="px-4 py-3">{t.cabinet.role}</th>
                      <th className="px-4 py-3 text-right">{t.cabinet.score}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {roundScores.map((item) => (
                      <tr key={item.round_number} className={item.is_current ? "bg-brand-50 font-bold" : ""}>
                        <td className="px-4 py-3 font-bold">{item.round_number}</td>
                        <td className="px-4 py-3 text-slate-600">{item.room || t.cabinet.pending}</td>
                        <td className="px-4 py-3 text-slate-600">{item.team_role || t.cabinet.pending}</td>
                        <td className="px-4 py-3 text-right font-mono font-bold text-slate-900">
                          {item.score ?? <span className="font-sans text-xs font-semibold text-slate-400">{t.cabinet.notScored}</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-10 text-center">
                <Trophy className="mx-auto h-10 w-10 text-slate-300" />
                <h3 className="mt-3 font-bold">{t.cabinet.noRoundScores}</h3>
                <p className="mt-1 text-sm text-slate-500">{t.cabinet.noRoundScoresHint}</p>
              </div>
            )}
          </section>

          <div className="grid gap-6 lg:grid-cols-2">
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 p-5"><h2 className="font-serif text-xl font-bold">🏆 {t.cabinet.ranking}</h2></div>
              <div className="max-h-[440px] overflow-auto">
                <table className="w-full text-left text-sm">
                  <thead className="sticky top-0 bg-slate-100 text-xs uppercase text-slate-600"><tr><th className="px-4 py-3">#</th><th className="px-4 py-3">{t.cabinet.team}</th><th className="px-4 py-3 text-right">VP</th><th className="px-4 py-3 text-right">{t.cabinet.score}</th></tr></thead>
                  <tbody>{ranking.map((row) => <tr key={`${row.rank}-${row.team_name}`} className={`border-t border-slate-100 ${row.team_name === team.team_name ? "bg-brand-50 font-bold" : ""}`}><td className="px-4 py-3">{row.rank}</td><td className="px-4 py-3">{row.team_name}</td><td className="px-4 py-3 text-right">{row.victory_points}</td><td className="px-4 py-3 text-right">{row.total_score}</td></tr>)}</tbody>
                </table>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="font-serif text-xl font-bold">{t.cabinet.challenges}</h2>
              {challenges.length ? <div className="mt-4 space-y-3">{challenges.map((challenge) => <div key={challenge.id} className="rounded-xl border border-slate-200 p-4"><div className="flex items-center justify-between gap-3"><h3 className="font-bold">{challenge.title}</h3><span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold uppercase text-emerald-700">{challenge.status}</span></div>{challenge.description && <p className="mt-2 text-sm text-slate-600">{challenge.description}</p>}</div>)}</div> : <div className="py-10 text-center"><Swords className="mx-auto h-10 w-10 text-slate-300" /><h3 className="mt-3 font-bold">{t.cabinet.noChallenges}</h3><p className="mt-1 text-sm text-slate-500">{t.cabinet.noChallengesHint}</p></div>}
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
