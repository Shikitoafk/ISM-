"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  CalendarClock,
  Check,
  Loader2,
  LockKeyhole,
  LogOut,
  Plus,
  RefreshCw,
  Save,
  ShieldCheck,
  Trash2,
  Trophy,
  UserPlus,
  Users,
} from "lucide-react";
import { Header } from "@/components/Header";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

type Team = {
  id: string;
  team_name: string;
  school: string;
  city: string;
  captain_name: string;
  captain_email: string;
  victory_points: number;
  total_score: number;
  yellow_cards: number;
  arrived: boolean;
  competition_status: string;
};

type AdminUser = {
  user_id: string;
  email: string;
  display_name: string | null;
  created_at: string;
};

type Tab = "teams" | "rounds" | "admins";

const inputClass = "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold outline-none focus:border-brand-700 focus:ring-2 focus:ring-brand-700/20";

export default function AdminPage() {
  const [authReady, setAuthReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [tab, setTab] = useState<Tab>("teams");
  const [teams, setTeams] = useState<Team[]>([]);
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [selectedTeamId, setSelectedTeamId] = useState("");
  const [roundNumber, setRoundNumber] = useState("1");
  const [room, setRoom] = useState("");
  const [role, setRole] = useState("");
  const [judges, setJudges] = useState("");
  const [opponents, setOpponents] = useState("");
  const [startsAt, setStartsAt] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminName, setAdminName] = useState("");

  const checkAccess = useCallback(async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) {
      setIsAdmin(false);
      setAuthReady(true);
      return;
    }
    const { data, error: rpcError } = await supabase.rpc("is_admin");
    setIsAdmin(Boolean(data) && !rpcError);
    if (rpcError || !data) setError("Этот аккаунт не входит в команду администраторов.");
    setAuthReady(true);
  }, []);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    const [teamsResult, adminsResult] = await Promise.all([
      supabase.from("teams").select("id,team_name,school,city,captain_name,captain_email,victory_points,total_score,yellow_cards,arrived,competition_status").order("created_at"),
      supabase.from("admin_users").select("user_id,email,display_name,created_at").order("created_at"),
    ]);
    if (teamsResult.error || adminsResult.error) {
      setError(teamsResult.error?.message || adminsResult.error?.message || "Не удалось загрузить данные.");
    } else {
      setTeams((teamsResult.data || []) as Team[]);
      setAdmins((adminsResult.data || []) as AdminUser[]);
      if (!selectedTeamId && teamsResult.data?.[0]) setSelectedTeamId(teamsResult.data[0].id);
    }
    setLoading(false);
  }, [selectedTeamId]);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setError("Supabase не настроен.");
      setAuthReady(true);
      return;
    }
    void checkAccess();
    const { data } = supabase.auth.onAuthStateChange(() => void checkAccess());
    return () => data.subscription.unsubscribe();
  }, [checkAccess]);

  useEffect(() => {
    if (isAdmin) void loadData();
  }, [isAdmin, loadData]);

  const login = async (event: FormEvent) => {
    event.preventDefault();
    setLoginLoading(true);
    setError(null);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) setError("Неверный email или пароль.");
    setLoginLoading(false);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
    setTeams([]);
  };

  const updateLocalTeam = (id: string, field: keyof Team, value: string | number | boolean) => {
    setTeams((current) => current.map((team) => team.id === id ? { ...team, [field]: value } : team));
  };

  const saveTeam = async (team: Team) => {
    setError(null);
    const { error: updateError } = await supabase.from("teams").update({
      victory_points: Number(team.victory_points),
      total_score: Number(team.total_score),
      yellow_cards: Number(team.yellow_cards),
      arrived: team.arrived,
      competition_status: team.competition_status,
    }).eq("id", team.id);
    if (updateError) setError(updateError.message);
    else showNotice(`Данные команды «${team.team_name}» сохранены.`);
  };

  const showNotice = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(null), 3000);
  };

  const saveRound = async (event: FormEvent) => {
    event.preventDefault();
    if (!selectedTeamId) return;
    setError(null);
    const number = Number(roundNumber);
    await supabase.from("round_assignments").update({ is_current: false }).eq("team_id", selectedTeamId);
    const payload = {
      team_id: selectedTeamId,
      round_number: number,
      room: room.trim() || null,
      team_role: role.trim() || null,
      judges: judges.split(",").map((item) => item.trim()).filter(Boolean),
      opponents: opponents.split(",").map((item) => item.trim()).filter(Boolean),
      starts_at: startsAt ? new Date(startsAt).toISOString() : null,
      is_current: true,
    };
    const { error: roundError } = await supabase.from("round_assignments").upsert(payload, { onConflict: "team_id,round_number" });
    if (roundError) setError(roundError.message);
    else showNotice("Текущий раунд назначен.");
  };

  const addAdmin = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    const { data, error: rpcError } = await supabase.rpc("add_admin_by_email", { p_email: adminEmail, p_display_name: adminName || null });
    if (rpcError) setError(rpcError.message);
    else if (!data) setError("Сначала создайте этого пользователя в Supabase Authentication → Users.");
    else {
      setAdminEmail(""); setAdminName(""); showNotice("Администратор добавлен."); void loadData();
    }
  };

  const removeAdmin = async (userId: string) => {
    const { data, error: rpcError } = await supabase.rpc("remove_admin", { p_user_id: userId });
    if (rpcError) setError(rpcError.message);
    else if (!data) setError("Нельзя удалить себя или последнего администратора.");
    else { showNotice("Доступ администратора отозван."); void loadData(); }
  };

  const filteredTeams = useMemo(() => {
    const query = search.toLowerCase().trim();
    return query ? teams.filter((team) => `${team.team_name} ${team.school} ${team.city}`.toLowerCase().includes(query)) : teams;
  }, [search, teams]);

  if (!authReady) return <div className="flex min-h-screen items-center justify-center bg-slate-950"><Loader2 className="h-8 w-8 animate-spin text-white" /></div>;

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-slate-50"><Header /><main className="flex min-h-[calc(100vh-6rem)] items-center justify-center px-4 pb-16 pt-32">
        <form onSubmit={login} className="w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
          <div className="bg-slate-950 p-8 text-white"><LockKeyhole className="mb-5 h-11 w-11 rounded-xl bg-brand-700 p-2.5" /><h1 className="font-serif text-3xl font-bold">Админ-панель</h1><p className="mt-2 text-sm text-slate-300">Вход только для организаторов ISM.</p></div>
          <div className="space-y-4 p-7"><input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@example.com" className={inputClass} /><input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Пароль" className={inputClass} />
          {error && <div className="flex gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-800"><AlertCircle className="h-4 w-4 shrink-0" />{error}</div>}
          <button disabled={loginLoading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-800 py-3 text-sm font-bold text-white disabled:bg-slate-400">{loginLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Войти"}</button></div>
        </form>
      </main></div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Header />
      <main className="pb-20 pt-24">
        <div className="border-b border-slate-800 bg-slate-950 text-white"><div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-8 sm:px-6 lg:px-8"><div><div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-300"><ShieldCheck className="h-4 w-4" />Организаторы</div><h1 className="mt-2 font-serif text-3xl font-bold">Управление соревнованием</h1></div><div className="flex gap-2"><button onClick={() => loadData()} className="rounded-lg border border-slate-700 p-2.5 hover:bg-slate-800" title="Обновить"><RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /></button><button onClick={logout} className="flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-xs font-bold hover:bg-slate-800"><LogOut className="h-4 w-4" />Выйти</button></div></div></div>

        <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
          <div className="mb-6 flex gap-2 overflow-x-auto rounded-xl border border-slate-200 bg-white p-1.5 shadow-sm">{([{ id: "teams", label: "Команды и баллы", icon: Trophy }, { id: "rounds", label: "Раунды", icon: CalendarClock }, { id: "admins", label: "Администраторы", icon: Users }] as const).map((item) => <button key={item.id} onClick={() => setTab(item.id)} className={`flex shrink-0 items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold ${tab === item.id ? "bg-slate-950 text-white" : "text-slate-600 hover:bg-slate-100"}`}><item.icon className="h-4 w-4" />{item.label}</button>)}</div>
          {notice && <div className="mb-5 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-bold text-emerald-800"><Check className="h-5 w-5" />{notice}</div>}
          {error && <div className="mb-5 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-800"><AlertCircle className="h-5 w-5" />{error}</div>}

          {tab === "teams" && <section className="rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="flex flex-col gap-3 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="font-serif text-xl font-bold">Зарегистрированные команды</h2><p className="text-xs text-slate-500">Всего: {teams.length}</p></div><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Поиск команды..." className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-700" /></div><div className="overflow-x-auto"><table className="w-full min-w-[980px] text-sm"><thead className="bg-slate-50 text-left text-xs uppercase text-slate-500"><tr><th className="px-4 py-3">Команда</th><th className="px-3 py-3">VP</th><th className="px-3 py-3">Балл</th><th className="px-3 py-3">Карточки</th><th className="px-3 py-3">Статус</th><th className="px-3 py-3">Прибыла</th><th className="px-4 py-3"></th></tr></thead><tbody>{filteredTeams.map((team) => <tr key={team.id} className="border-t border-slate-100"><td className="px-4 py-3"><div className="font-bold">{team.team_name}</div><div className="text-xs text-slate-500">{team.school} · {team.city}</div></td><td className="px-3 py-3"><input type="number" step="0.5" value={team.victory_points} onChange={(e) => updateLocalTeam(team.id, "victory_points", e.target.value)} className="w-20 rounded border border-slate-300 px-2 py-1.5" /></td><td className="px-3 py-3"><input type="number" step="0.1" value={team.total_score} onChange={(e) => updateLocalTeam(team.id, "total_score", e.target.value)} className="w-24 rounded border border-slate-300 px-2 py-1.5" /></td><td className="px-3 py-3"><input type="number" min="0" value={team.yellow_cards} onChange={(e) => updateLocalTeam(team.id, "yellow_cards", e.target.value)} className="w-16 rounded border border-slate-300 px-2 py-1.5" /></td><td className="px-3 py-3"><select value={team.competition_status} onChange={(e) => updateLocalTeam(team.id, "competition_status", e.target.value)} className="rounded border border-slate-300 px-2 py-1.5"><option value="registered">Зарегистрирована</option><option value="approved">Допущена</option><option value="active">Участвует</option><option value="finished">Завершила</option><option value="disqualified">Дисквалифицирована</option></select></td><td className="px-3 py-3"><input type="checkbox" checked={team.arrived} onChange={(e) => updateLocalTeam(team.id, "arrived", e.target.checked)} className="h-4 w-4" /></td><td className="px-4 py-3"><button onClick={() => saveTeam(team)} className="rounded-lg bg-brand-800 p-2 text-white hover:bg-brand-900" title="Сохранить"><Save className="h-4 w-4" /></button></td></tr>)}</tbody></table>{!filteredTeams.length && <div className="p-10 text-center text-sm text-slate-500">Команды не найдены.</div>}</div></section>}

          {tab === "rounds" && <form onSubmit={saveRound} className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h2 className="font-serif text-2xl font-bold">Назначить текущий раунд</h2><p className="mt-1 text-sm text-slate-500">Новое назначение заменит текущий раунд выбранной команды.</p><div className="mt-6 grid gap-4 sm:grid-cols-2"><label className="text-xs font-bold uppercase text-slate-600">Команда<select required value={selectedTeamId} onChange={(e) => setSelectedTeamId(e.target.value)} className={`${inputClass} mt-1`}><option value="">Выберите команду</option>{teams.map((team) => <option key={team.id} value={team.id}>{team.team_name}</option>)}</select></label><label className="text-xs font-bold uppercase text-slate-600">Номер раунда<input required type="number" min="1" value={roundNumber} onChange={(e) => setRoundNumber(e.target.value)} className={`${inputClass} mt-1`} /></label><label className="text-xs font-bold uppercase text-slate-600">Кабинет<input value={room} onChange={(e) => setRoom(e.target.value)} placeholder="Кабинет 112" className={`${inputClass} mt-1`} /></label><label className="text-xs font-bold uppercase text-slate-600">Роль команды<input value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role 1" className={`${inputClass} mt-1`} /></label><label className="text-xs font-bold uppercase text-slate-600 sm:col-span-2">Команды через запятую<input value={opponents} onChange={(e) => setOpponents(e.target.value)} placeholder="Team A, Team B, Team C" className={`${inputClass} mt-1`} /></label><label className="text-xs font-bold uppercase text-slate-600 sm:col-span-2">Судьи через запятую<input value={judges} onChange={(e) => setJudges(e.target.value)} placeholder="Судья 1, Судья 2" className={`${inputClass} mt-1`} /></label><label className="text-xs font-bold uppercase text-slate-600">Дата и время<input type="datetime-local" value={startsAt} onChange={(e) => setStartsAt(e.target.value)} className={`${inputClass} mt-1`} /></label></div><button className="mt-6 flex items-center gap-2 rounded-xl bg-brand-800 px-5 py-3 text-sm font-bold text-white hover:bg-brand-900"><Save className="h-4 w-4" />Сохранить раунд</button></form>}

          {tab === "admins" && <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]"><form onSubmit={addAdmin} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><UserPlus className="h-9 w-9 rounded-xl bg-brand-50 p-2 text-brand-800" /><h2 className="mt-4 font-serif text-xl font-bold">Добавить администратора</h2><p className="mt-1 text-xs leading-relaxed text-slate-500">Пользователь сначала должен быть создан в Supabase Authentication.</p><div className="mt-5 space-y-3"><input type="email" required value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} placeholder="email@example.com" className={inputClass} /><input value={adminName} onChange={(e) => setAdminName(e.target.value)} placeholder="Имя (необязательно)" className={inputClass} /><button className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-800 py-3 text-sm font-bold text-white"><Plus className="h-4 w-4" />Выдать доступ</button></div></form><section className="rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="border-b border-slate-200 p-5"><h2 className="font-serif text-xl font-bold">Команда администраторов</h2></div><div className="divide-y divide-slate-100">{admins.map((admin) => <div key={admin.user_id} className="flex items-center justify-between gap-4 p-4"><div><div className="font-bold">{admin.display_name || "Администратор"}</div><div className="text-xs text-slate-500">{admin.email}</div></div><button onClick={() => removeAdmin(admin.user_id)} className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-700" title="Отозвать доступ"><Trash2 className="h-4 w-4" /></button></div>)}</div></section></div>}
        </div>
      </main>
    </div>
  );
}
