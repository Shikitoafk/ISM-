"use client";

import React, { useState } from "react";
import { supabase } from "../lib/supabase";
import { UserPlus, Trash2, Send, CheckCircle2, AlertCircle, ExternalLink, ShieldCheck, HelpCircle } from "lucide-react";

interface Member {
  full_name: string;
  grade: string;
  role_or_notes: string;
}

export const RegistrationBlock: React.FC = () => {
  const mode = process.env.NEXT_PUBLIC_REGISTRATION_MODE || "supabase";
  const googleFormUrl = process.env.NEXT_PUBLIC_GOOGLE_FORM_URL || "https://docs.google.com/forms/";

  // Supabase Form state
  const [teamName, setTeamName] = useState("");
  const [captainName, setCaptainName] = useState("");
  const [captainEmail, setCaptainEmail] = useState("");
  const [captainContact, setCaptainContact] = useState("");
  const [school, setSchool] = useState("");
  const [city, setCity] = useState("");
  const [grade, setGrade] = useState("10 класс");
  const [consent, setConsent] = useState(false);

  // Additional members (2 or 3 members for total 3-4 team size including Captain)
  const [members, setMembers] = useState<Member[]>([
    { full_name: "", grade: "10 класс", role_or_notes: "Участник 2" },
    { full_name: "", grade: "10 класс", role_or_notes: "Участник 3" },
  ]);

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const addMember = () => {
    if (members.length < 3) {
      setMembers([...members, { full_name: "", grade: "10 класс", role_or_notes: `Участник ${members.length + 2}` }]);
    }
  };

  const removeMember = (index: number) => {
    if (members.length > 2) {
      setMembers(members.filter((_, i) => i !== index));
    }
  };

  const updateMember = (index: number, field: keyof Member, value: string) => {
    const updated = [...members];
    updated[index][field] = value;
    setMembers(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    if (!consent) {
      setStatusMessage({
        type: "error",
        text: "Пожалуйста, подтвердите согласие с Положением об олимпиаде и правилами академической честности.",
      });
      return;
    }

    // Check member names
    for (let i = 0; i < members.length; i++) {
      if (!members[i].full_name.trim()) {
        setStatusMessage({
          type: "error",
          text: `Пожалуйста, укажите ФИО для Участника ${i + 2}.`,
        });
        return;
      }
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.from("teams").insert([
        {
          team_name: teamName,
          captain_name: captainName,
          captain_email: captainEmail,
          captain_contact: captainContact,
          school,
          city,
          grade,
          members,
          consent_confirmed: consent,
        },
      ]);

      if (error) {
        console.error("Supabase registration error:", error);
        setStatusMessage({
          type: "error",
          text: `Ошибка при сохранении заявки: ${error.message}. Проверьте настройки Supabase.`,
        });
      } else {
        setStatusMessage({
          type: "success",
          text: "Заявка вашей команды успешно зарегистрирована! Инструкции по отборочному этапу отправлены капитану.",
        });
        // Reset form
        setTeamName("");
        setCaptainName("");
        setCaptainEmail("");
        setCaptainContact("");
        setSchool("");
        setCity("");
        setConsent(false);
      }
    } catch (err: any) {
      console.error(err);
      setStatusMessage({
        type: "error",
        text: "Не удалось подключиться к серверу Supabase. Проверьте переменные окружения.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="registration" className="py-20 md:py-28 bg-navy-900 text-slate-100 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-medium uppercase tracking-wider mb-3">
            <UserPlus className="w-4 h-4" />
            <span>Онлайн-регистрация</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-3">
            Регистрация команды ISM
          </h2>
          <p className="text-slate-300 text-base max-w-2xl mx-auto">
            В составе команды должно быть строго 3–4 человека. Капитан заполняет данные команды и подтверждает согласие с регламентом.
          </p>
        </div>

        {/* REGISTRATION RENDER MODE */}
        {mode === "google_form" ? (
          /* GOOGLE FORM MODE */
          <div className="p-8 sm:p-12 rounded-3xl border border-amber-500/30 bg-navy-950 text-center shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto mb-6">
              <ExternalLink className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-white mb-3">
              Регистрация через Google Forms
            </h3>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-8">
              Регистрация текущего сезона ISM производится через официальную форме Google. Нажмите кнопку ниже, чтобы открыть форму в новом окне.
            </p>
            
            <a
              href={googleFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-navy-950 font-bold text-base transition-all shadow-lg shadow-amber-500/25"
            >
              <span>Перейти к форме Google</span>
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        ) : (
          /* SUPABASE MODE */
          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-10 rounded-3xl border border-slate-800 bg-navy-950/90 shadow-2xl space-y-8"
          >
            {/* Status Messages */}
            {statusMessage && (
              <div
                className={`p-4 rounded-2xl border flex items-start gap-3 text-sm ${
                  statusMessage.type === "success"
                    ? "bg-emerald-950/60 border-emerald-500/40 text-emerald-300"
                    : "bg-red-950/60 border-red-500/40 text-red-300"
                }`}
              >
                {statusMessage.type === "success" ? (
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                )}
                <span>{statusMessage.text}</span>
              </div>
            )}

            {/* Block 1: Team & School Information */}
            <div>
              <h3 className="font-serif text-xl font-bold text-white mb-4 pb-2 border-b border-slate-800 flex items-center gap-2">
                <span>1. Данные команды и учебного заведения</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                    Название команды *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder='Например, "Quantum Synthesis"'
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-navy-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                    Город / Населённый пункт *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder='Например, "г. Усть-Каменогорск"'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-navy-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                    Полное название школы / лицея / гимназии *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder='Например, "Өскемен ұлдарға арналған лицейі"'
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-navy-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Block 2: Team Captain */}
            <div>
              <h3 className="font-serif text-xl font-bold text-white mb-4 pb-2 border-b border-slate-800 flex items-center gap-2">
                <span>2. Данные Капитана команды (Team Captain)</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                    ФИО Капитана *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Фамилия Имя Отчество"
                    value={captainName}
                    onChange={(e) => setCaptainName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-navy-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                    Email Капитана *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="captain@example.com"
                    value={captainEmail}
                    onChange={(e) => setCaptainEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-navy-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                    Телефон / Telegram для связи *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="+7 (707) 000-00-00"
                    value={captainContact}
                    onChange={(e) => setCaptainContact(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-navy-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                    Класс обучения Капитана *
                  </label>
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-navy-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
                  >
                    <option value="9 класс">9 класс</option>
                    <option value="10 класс">10 класс</option>
                    <option value="11 класс">11 класс</option>
                    <option value="8 класс (по заявке)">8 класс (в виде исключения)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Block 3: Other Members */}
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-4">
                <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                  <span>3. Остальные участники команды ({members.length + 1} из 4)</span>
                </h3>
                {members.length < 3 && (
                  <button
                    type="button"
                    onClick={addMember}
                    className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 focus:outline-none"
                  >
                    + Добавить 4-го участника
                  </button>
                )}
              </div>

              <div className="space-y-4">
                {members.map((m, idx) => (
                  <div key={idx} className="p-4 rounded-2xl border border-slate-800 bg-navy-900/60 relative">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-amber-400 uppercase">
                        Участник #{idx + 2}
                      </span>
                      {members.length > 2 && (
                        <button
                          type="button"
                          onClick={() => removeMember(idx)}
                          className="text-slate-500 hover:text-red-400 p-1"
                          title="Удалить участника"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <input
                          type="text"
                          required
                          placeholder="ФИО Участника"
                          value={m.full_name}
                          onChange={(e) => updateMember(idx, "full_name", e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-slate-700 text-white text-sm placeholder-slate-500 focus:ring-1 focus:ring-amber-400"
                        />
                      </div>
                      <div>
                        <select
                          value={m.grade}
                          onChange={(e) => updateMember(idx, "grade", e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-slate-700 text-white text-sm focus:ring-1 focus:ring-amber-400"
                        >
                          <option value="9 класс">9 класс</option>
                          <option value="10 класс">10 класс</option>
                          <option value="11 класс">11 класс</option>
                          <option value="8 класс (по заявке)">8 класс (в виде исключения)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Block 4: Academic Integrity Acknowledgment */}
            <div className="p-4 rounded-2xl border border-red-500/20 bg-red-950/20 space-y-3">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded text-amber-500 focus:ring-amber-400 bg-navy-900 border-slate-700"
                />
                <span className="text-xs text-slate-300 leading-relaxed">
                  Наша команда изучила Положение олимпиады ISM и гарантирует соблюдение правил Академической честности (включая абсолютный запрет на использование генеративных ИИ-инструментов ChatGPT, Claude, Gemini и внешнюю помощь).
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:bg-slate-700 text-navy-950 font-bold text-base transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Отправка заявки...</span>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Отправить заявку команды</span>
                </>
              )}
            </button>
          </form>
        )}

      </div>
    </section>
  );
};
