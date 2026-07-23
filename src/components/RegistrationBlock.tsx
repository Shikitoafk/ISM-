"use client";

import React, { useState } from "react";
import { supabase } from "../lib/supabase";
import { UserPlus, Trash2, Send, CheckCircle, AlertCircle, ShieldAlert, UserCheck } from "lucide-react";

interface Member {
  full_name: string;
  grade: string;
  role_or_notes: string;
}

export const RegistrationBlock: React.FC = () => {
  // Team info
  const [teamName, setTeamName] = useState("");
  const [school, setSchool] = useState("");
  const [city, setCity] = useState("");
  const [grade, setGrade] = useState("10 класс");

  // Captain info
  const [captainName, setCaptainName] = useState("");
  const [captainEmail, setCaptainEmail] = useState("");
  const [captainContact, setCaptainContact] = useState("");

  // SEPARATE MANDATORY BLOCK: Team Leader / Supervisor info
  const [leaderName, setLeaderName] = useState("");
  const [leaderEmail, setLeaderEmail] = useState("");
  const [leaderContact, setLeaderContact] = useState("");

  // Additional members (2 or 3 members for total 3-4 team size including Captain)
  const [members, setMembers] = useState<Member[]>([
    { full_name: "", grade: "10 класс", role_or_notes: "Участник 2" },
    { full_name: "", grade: "10 класс", role_or_notes: "Участник 3" },
  ]);

  const [consent, setConsent] = useState(false);
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
        text: "Пожалуйста, подтвердите согласие на обработку персональных данных и правила Академической честности (Статья 8).",
      });
      return;
    }

    if (!leaderName.trim() || !leaderEmail.trim() || !leaderContact.trim()) {
      setStatusMessage({
        type: "error",
        text: "Пожалуйста, заполните все данные руководителя/наставника команды.",
      });
      return;
    }

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
      const { error } = await supabase.from("teams").insert([
        {
          team_name: teamName,
          captain_name: captainName,
          captain_email: captainEmail,
          captain_contact: captainContact,
          leader_name: leaderName,
          leader_email: leaderEmail,
          leader_contact: leaderContact,
          school,
          city,
          grade,
          members,
          consent_confirmed: consent,
        },
      ]);

      if (error) {
        console.error("Supabase insert error:", error);
        setStatusMessage({
          type: "error",
          text: `Ошибка при сохранении заявки: ${error.message}.`,
        });
      } else {
        setStatusMessage({
          type: "success",
          text: "Заявка вашей команды успешно отправлена! Подтверждение выслано на email капитана и руководителя.",
        });
        // Reset form
        setTeamName("");
        setCaptainName("");
        setCaptainEmail("");
        setCaptainContact("");
        setLeaderName("");
        setLeaderEmail("");
        setLeaderContact("");
        setSchool("");
        setCity("");
        setConsent(false);
      }
    } catch (err: any) {
      console.error(err);
      setStatusMessage({
        type: "error",
        text: "Ошибка подключения к базе данных. Проверьте переменные Supabase.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="registration" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center mb-12">
          <div className="text-xs font-semibold text-brand-800 uppercase tracking-widest mb-2">
            Подача заявки
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900 mb-3">
            Регистрация команды на ISM
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            Форма заполняется Капитаном команды. Заполнение данных Руководителя (учителя/наставника) является обязательным.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 sm:p-10 rounded-xl border border-slate-200 bg-white shadow-sm space-y-8"
        >
          {/* Feedback Status Alert */}
          {statusMessage && (
            <div
              className={`p-4 rounded-lg border text-xs sm:text-sm flex items-start gap-3 ${
                statusMessage.type === "success"
                  ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                  : "bg-red-50 border-red-200 text-red-800"
              }`}
            >
              {statusMessage.type === "success" ? (
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" strokeWidth={1.75} />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" strokeWidth={1.75} />
              )}
              <span>{statusMessage.text}</span>
            </div>
          )}

          {/* Block 1: Team & School Info */}
          <div>
            <h3 className="font-serif text-lg font-bold text-slate-900 pb-2 border-b border-slate-100 mb-4">
              1. Данные команды и учебного заведения
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  Название команды *
                </label>
                <input
                  type="text"
                  required
                  placeholder='Например, "Quantum Catalyst"'
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-brand-800 focus:outline-none text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  Город / Населённый пункт *
                </label>
                <input
                  type="text"
                  required
                  placeholder='Например, "г. Усть-Каменогорск"'
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-brand-800 focus:outline-none text-xs sm:text-sm"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  Школа / Лицей / Гимназия *
                </label>
                <input
                  type="text"
                  required
                  placeholder='Например, "Өскемен ұлдарға арналған лицейі"'
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-brand-800 focus:outline-none text-xs sm:text-sm"
                />
              </div>
            </div>
          </div>

          {/* Block 2: Team Captain */}
          <div>
            <h3 className="font-serif text-lg font-bold text-slate-900 pb-2 border-b border-slate-100 mb-4">
              2. Данные Капитана команды (Team Captain)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  ФИО Капитана *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Фамилия Имя Отчество"
                  value={captainName}
                  onChange={(e) => setCaptainName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-brand-800 focus:outline-none text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  Email Капитана *
                </label>
                <input
                  type="email"
                  required
                  placeholder="captain@example.com"
                  value={captainEmail}
                  onChange={(e) => setCaptainEmail(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-brand-800 focus:outline-none text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  Телефон / Telegram Капитана *
                </label>
                <input
                  type="text"
                  required
                  placeholder="+7 (707) 000-00-00"
                  value={captainContact}
                  onChange={(e) => setCaptainContact(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-brand-800 focus:outline-none text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  Класс обучения *
                </label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-slate-900 focus:ring-2 focus:ring-brand-800 focus:outline-none text-xs sm:text-sm"
                >
                  <option value="9 класс">9 класс</option>
                  <option value="10 класс">10 класс</option>
                  <option value="11 класс">11 класс</option>
                  <option value="8 класс (по заявке)">8 класс (в порядке исключения)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Block 3: MANDATORY Team Leader / Supervisor */}
          <div className="p-5 rounded-lg border border-brand-200 bg-brand-50/40">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-brand-200">
              <UserCheck className="w-5 h-5 text-brand-800" strokeWidth={1.75} />
              <h3 className="font-serif text-lg font-bold text-slate-900">
                3. Руководитель / Наставник команды (Обязательный блок)
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  ФИО Руководителя *
                </label>
                <input
                  type="text"
                  required
                  placeholder="ФИО учителя / наставника"
                  value={leaderName}
                  onChange={(e) => setLeaderName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-brand-800 focus:outline-none text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  Email Руководителя *
                </label>
                <input
                  type="email"
                  required
                  placeholder="teacher@school.edu"
                  value={leaderEmail}
                  onChange={(e) => setLeaderEmail(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-brand-800 focus:outline-none text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  Телефон / Контакт *
                </label>
                <input
                  type="text"
                  required
                  placeholder="+7 (777) 000-00-00"
                  value={leaderContact}
                  onChange={(e) => setLeaderContact(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-brand-800 focus:outline-none text-xs sm:text-sm"
                />
              </div>
            </div>
          </div>

          {/* Block 4: Other Members */}
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-4">
              <h3 className="font-serif text-lg font-bold text-slate-900">
                4. Остальные участники команды ({members.length + 1} из 4)
              </h3>
              {members.length < 3 && (
                <button
                  type="button"
                  onClick={addMember}
                  className="text-xs font-semibold text-brand-800 hover:underline"
                >
                  + Добавить 4-го участника
                </button>
              )}
            </div>

            <div className="space-y-3">
              {members.map((m, idx) => (
                <div key={idx} className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center gap-3">
                  <span className="text-xs font-bold text-slate-500 shrink-0 w-24">
                    Участник #{idx + 2}
                  </span>

                  <input
                    type="text"
                    required
                    placeholder="ФИО Участника"
                    value={m.full_name}
                    onChange={(e) => updateMember(idx, "full_name", e.target.value)}
                    className="flex-grow w-full px-3 py-1.5 rounded border border-slate-200 text-xs sm:text-sm bg-white focus:ring-1 focus:ring-brand-800"
                  />

                  <select
                    value={m.grade}
                    onChange={(e) => updateMember(idx, "grade", e.target.value)}
                    className="w-full sm:w-36 px-2.5 py-1.5 rounded border border-slate-200 text-xs sm:text-sm bg-white focus:ring-1 focus:ring-brand-800"
                  >
                    <option value="9 класс">9 класс</option>
                    <option value="10 класс">10 класс</option>
                    <option value="11 класс">11 класс</option>
                    <option value="8 класс (по заявке)">8 класс</option>
                  </select>

                  {members.length > 2 && (
                    <button
                      type="button"
                      onClick={() => removeMember(idx)}
                      className="text-slate-400 hover:text-red-500 p-1"
                      title="Удалить участника"
                    >
                      <Trash2 className="w-4 h-4" strokeWidth={1.75} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Block 5: Consent Checkbox */}
          <div className="p-4 rounded-lg border border-slate-200 bg-slate-50">
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 w-4 h-4 text-brand-800 rounded border-slate-300 focus:ring-brand-800"
              />
              <span className="text-xs text-slate-600 leading-relaxed">
                Подтверждаю согласие на обработку персональных данных и гарантию соблюдения Положения олимпиады ISM, включая правила Академической честности (Статья 8 — запрет на использование генеративного ИИ).
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-lg bg-brand-800 hover:bg-brand-900 disabled:bg-slate-400 text-white font-semibold text-sm transition-all shadow-sm flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>Сохранение заявки...</span>
            ) : (
              <>
                <Send className="w-4 h-4" strokeWidth={1.75} />
                <span>Отправить заявку команды</span>
              </>
            )}
          </button>
        </form>

      </div>
    </section>
  );
};
