"use client";

import React, { useMemo, useState } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabase";
import { useLanguage } from "@/context/LanguageContext";
import { Trash2, Send, CheckCircle, AlertCircle, UserCheck, Plus } from "lucide-react";

interface Member {
  full_name: string;
  grade: string;
  role_or_notes: string;
}

function createDefaultMembers(
  grades: string[],
  roles: { required2: string; required3: string; required4: string }
): Member[] {
  const defaultGrade = grades[1] ?? grades[0] ?? "";
  return [
    { full_name: "", grade: defaultGrade, role_or_notes: roles.required2 },
    { full_name: "", grade: defaultGrade, role_or_notes: roles.required3 },
    { full_name: "", grade: defaultGrade, role_or_notes: roles.required4 },
  ];
}

export const RegistrationBlock: React.FC = () => {
  const { content } = useLanguage();
  const { nav, registrationFormUI: form } = content;
  const { grades, memberRoles, errors } = form;

  const defaultGrade = grades[1] ?? grades[0] ?? "";

  const initialMembers = useMemo(
    () => createDefaultMembers(grades, memberRoles),
    [grades, memberRoles]
  );

  const [teamName, setTeamName] = useState("");
  const [school, setSchool] = useState("");
  const [city, setCity] = useState("");
  const [grade, setGrade] = useState(defaultGrade);

  const [captainName, setCaptainName] = useState("");
  const [captainEmail, setCaptainEmail] = useState("");
  const [captainContact, setCaptainContact] = useState("");

  const [leaderName, setLeaderName] = useState("");
  const [leaderEmail, setLeaderEmail] = useState("");
  const [leaderContact, setLeaderContact] = useState("");

  const [members, setMembers] = useState<Member[]>(initialMembers);

  const [hasFifthMember, setHasFifthMember] = useState(false);
  const [fifthMember, setFifthMember] = useState<Member>({
    full_name: "",
    grade: defaultGrade,
    role_or_notes: memberRoles.optional5,
  });

  const [consent, setConsent] = useState(false);
  const [labSafetyConsent, setLabSafetyConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const updateMember = (index: number, field: keyof Member, value: string) => {
    const updated = [...members];
    updated[index][field] = value;
    setMembers(updated);
  };

  const resetForm = () => {
    setTeamName("");
    setCaptainName("");
    setCaptainEmail("");
    setCaptainContact("");
    setLeaderName("");
    setLeaderEmail("");
    setLeaderContact("");
    setSchool("");
    setCity("");
    setGrade(defaultGrade);
    setMembers(createDefaultMembers(grades, memberRoles));
    setHasFifthMember(false);
    setFifthMember({
      full_name: "",
      grade: defaultGrade,
      role_or_notes: memberRoles.optional5,
    });
    setConsent(false);
    setLabSafetyConsent(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    if (!isSupabaseConfigured()) {
      setStatusMessage({ type: "error", text: errors.dbError });
      return;
    }

    if (!consent) {
      setStatusMessage({ type: "error", text: errors.consentRequired });
      return;
    }

    if (!labSafetyConsent) {
      setStatusMessage({ type: "error", text: errors.labSafetyRequired });
      return;
    }

    if (!leaderName.trim() || !leaderEmail.trim() || !leaderContact.trim()) {
      setStatusMessage({ type: "error", text: errors.supervisorRequired });
      return;
    }

    for (let i = 0; i < members.length; i++) {
      if (!members[i].full_name.trim()) {
        setStatusMessage({
          type: "error",
          text: `${errors.memberRequired}${i + 2}.`,
        });
        return;
      }
    }

    if (hasFifthMember && !fifthMember.full_name.trim()) {
      setStatusMessage({ type: "error", text: errors.fifthMemberRequired });
      return;
    }

    const allMembersPayload = [...members];
    if (hasFifthMember) {
      allMembersPayload.push(fifthMember);
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
          members: allMembersPayload,
          consent_confirmed: consent,
          lab_safety_confirmed: labSafetyConsent,
        },
      ]);

      if (error) {
        console.error("Supabase insert error:", error);
        setStatusMessage({
          type: "error",
          text: `${errors.submitError} ${error.message}.`,
        });
      } else {
        setStatusMessage({ type: "success", text: errors.submitSuccess });
        resetForm();
      }
    } catch (err) {
      console.error(err);
      setStatusMessage({ type: "error", text: errors.dbError });
    } finally {
      setLoading(false);
    }
  };

  const requiredMemberLabels = [memberRoles.required2, memberRoles.required3, memberRoles.required4];

  return (
    <section id="registration" className="py-16 md:py-24 bg-slate-50 border-b-2 border-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="text-xs font-bold text-brand-800 uppercase tracking-widest mb-2">
            {form.eyebrow}
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900 mb-3">
            {form.title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto font-normal">
            {form.subtitle}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 sm:p-10 rounded-2xl border-2 border-slate-900 bg-white shadow-md space-y-8"
        >
          {statusMessage && (
            <div
              className={`p-4 rounded-xl border-2 text-xs sm:text-sm font-semibold flex items-start gap-3 ${
                statusMessage.type === "success"
                  ? "bg-emerald-50 border-emerald-700 text-emerald-900"
                  : "bg-red-50 border-red-700 text-red-900"
              }`}
            >
              {statusMessage.type === "success" ? (
                <CheckCircle className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" strokeWidth={2} />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-700 shrink-0 mt-0.5" strokeWidth={2} />
              )}
              <span>{statusMessage.text}</span>
            </div>
          )}

          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-slate-900 pb-2 border-b-2 border-slate-900">
              {form.section1Title}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase mb-1">
                  {form.teamNameLabel}
                </label>
                <input
                  type="text"
                  required
                  placeholder={form.teamNamePlaceholder}
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-900 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-brand-800 focus:outline-none text-xs sm:text-sm font-semibold bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase mb-1">
                  {form.cityLabel}
                </label>
                <input
                  type="text"
                  required
                  placeholder={form.cityPlaceholder}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-900 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-brand-800 focus:outline-none text-xs sm:text-sm font-semibold bg-slate-50/50"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-900 uppercase mb-1">
                  {form.schoolLabel}
                </label>
                <input
                  type="text"
                  required
                  placeholder={form.schoolPlaceholder}
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-900 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-brand-800 focus:outline-none text-xs sm:text-sm font-semibold bg-slate-50/50"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-slate-900 pb-2 border-b-2 border-slate-900 flex items-center justify-between">
              <span>{form.section2Title}</span>
              <span className="text-xs font-bold text-brand-800 bg-brand-50 px-2.5 py-0.5 rounded-md border border-brand-200 uppercase">
                {form.captainBadge}
              </span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase mb-1">
                  {form.captainNameLabel}
                </label>
                <input
                  type="text"
                  required
                  placeholder={form.captainNamePlaceholder}
                  value={captainName}
                  onChange={(e) => setCaptainName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-900 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-brand-800 focus:outline-none text-xs sm:text-sm font-semibold bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase mb-1">
                  {form.captainEmailLabel}
                </label>
                <input
                  type="email"
                  required
                  placeholder={form.captainEmailPlaceholder}
                  value={captainEmail}
                  onChange={(e) => setCaptainEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-900 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-brand-800 focus:outline-none text-xs sm:text-sm font-semibold bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase mb-1">
                  {form.captainPhoneLabel}
                </label>
                <input
                  type="text"
                  required
                  placeholder={form.captainPhonePlaceholder}
                  value={captainContact}
                  onChange={(e) => setCaptainContact(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-900 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-brand-800 focus:outline-none text-xs sm:text-sm font-semibold bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase mb-1">
                  {form.gradeLabel}
                </label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-900 text-slate-900 focus:ring-2 focus:ring-brand-800 focus:outline-none text-xs sm:text-sm font-semibold bg-slate-50/50"
                >
                  {grades.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl border-2 border-slate-900 bg-slate-50/80 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b-2 border-slate-900">
              <UserCheck className="w-5 h-5 text-brand-800" strokeWidth={2} />
              <h3 className="font-serif text-lg font-bold text-slate-900">
                {form.section3Title}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase mb-1">
                  {form.supervisorNameLabel}
                </label>
                <input
                  type="text"
                  required
                  placeholder={form.supervisorNamePlaceholder}
                  value={leaderName}
                  onChange={(e) => setLeaderName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border-2 border-slate-900 bg-white text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-brand-800 focus:outline-none text-xs sm:text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase mb-1">
                  {form.supervisorEmailLabel}
                </label>
                <input
                  type="email"
                  required
                  placeholder={form.supervisorEmailPlaceholder}
                  value={leaderEmail}
                  onChange={(e) => setLeaderEmail(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border-2 border-slate-900 bg-white text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-brand-800 focus:outline-none text-xs sm:text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase mb-1">
                  {form.supervisorPhoneLabel}
                </label>
                <input
                  type="text"
                  required
                  placeholder={form.supervisorPhonePlaceholder}
                  value={leaderContact}
                  onChange={(e) => setLeaderContact(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border-2 border-slate-900 bg-white text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-brand-800 focus:outline-none text-xs sm:text-sm font-semibold"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b-2 border-slate-900">
              <h3 className="font-serif text-lg font-bold text-slate-900">
                {form.section4Title}
              </h3>
              {!hasFifthMember && (
                <button
                  type="button"
                  onClick={() => setHasFifthMember(true)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-brand-800 bg-brand-50 hover:bg-brand-100 px-3 py-1 rounded-lg border border-brand-300 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" strokeWidth={2} />
                  <span>{form.addFifthMember}</span>
                </button>
              )}
            </div>

            <div className="space-y-3">
              {members.map((m, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border-2 border-slate-900 bg-white shadow-xs flex flex-col sm:flex-row items-center gap-3"
                >
                  <div className="flex items-center justify-between w-full sm:w-auto gap-2">
                    <span className="text-xs font-bold text-slate-900 shrink-0 sm:w-28">
                      {requiredMemberLabels[idx]}
                    </span>
                  </div>

                  <input
                    type="text"
                    required
                    placeholder={form.fullNamePlaceholder}
                    value={m.full_name}
                    onChange={(e) => updateMember(idx, "full_name", e.target.value)}
                    className="flex-grow w-full px-3.5 py-2 rounded-lg border-2 border-slate-900 text-xs sm:text-sm bg-slate-50/50 font-semibold focus:ring-1 focus:ring-brand-800"
                  />

                  <select
                    value={m.grade}
                    onChange={(e) => updateMember(idx, "grade", e.target.value)}
                    className="w-full sm:w-36 px-3 py-2 rounded-lg border-2 border-slate-900 text-xs sm:text-sm bg-slate-50/50 font-semibold focus:ring-1 focus:ring-brand-800"
                  >
                    {grades.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>
              ))}

              {hasFifthMember && (
                <div className="p-4 rounded-xl border-2 border-brand-800 bg-brand-50/40 shadow-xs flex flex-col sm:flex-row items-center gap-3">
                  <div className="flex items-center justify-between w-full sm:w-auto gap-2">
                    <span className="text-xs font-bold text-brand-900 shrink-0 sm:w-28">
                      {memberRoles.optional5}
                    </span>
                  </div>

                  <input
                    type="text"
                    placeholder={form.fifthMemberPlaceholder}
                    value={fifthMember.full_name}
                    onChange={(e) => setFifthMember({ ...fifthMember, full_name: e.target.value })}
                    className="flex-grow w-full px-3.5 py-2 rounded-lg border-2 border-slate-900 text-xs sm:text-sm bg-white font-semibold focus:ring-1 focus:ring-brand-800"
                  />

                  <select
                    value={fifthMember.grade}
                    onChange={(e) => setFifthMember({ ...fifthMember, grade: e.target.value })}
                    className="w-full sm:w-36 px-3 py-2 rounded-lg border-2 border-slate-900 text-xs sm:text-sm bg-white font-semibold focus:ring-1 focus:ring-brand-800"
                  >
                    {grades.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    onClick={() => {
                      setHasFifthMember(false);
                      setFifthMember({
                        full_name: "",
                        grade: defaultGrade,
                        role_or_notes: memberRoles.optional5,
                      });
                    }}
                    className="text-slate-500 hover:text-red-600 p-1.5 shrink-0"
                    title={form.removeFifthMemberTitle}
                  >
                    <Trash2 className="w-4 h-4" strokeWidth={2} />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-xl border-2 border-slate-900 bg-slate-50">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 w-4 h-4 text-brand-800 rounded border-slate-900 focus:ring-brand-800 shrink-0"
                />
                <span className="text-xs text-slate-700 font-semibold leading-relaxed">
                  {form.consentData}
                </span>
              </label>
            </div>

            <div className="p-4 rounded-xl border-2 border-slate-900 bg-amber-50/60">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={labSafetyConsent}
                  onChange={(e) => setLabSafetyConsent(e.target.checked)}
                  className="mt-0.5 w-4 h-4 text-brand-800 rounded border-slate-900 focus:ring-brand-800 shrink-0"
                />
                <span className="text-xs text-slate-800 font-semibold leading-relaxed">
                  {form.consentLabSafety}
                </span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-brand-800 hover:bg-brand-900 disabled:bg-slate-400 text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>{form.submitting}</span>
            ) : (
              <>
                <Send className="w-4 h-4" strokeWidth={2} />
                <span>{nav.registerBtn}</span>
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
};
