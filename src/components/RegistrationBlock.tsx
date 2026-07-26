"use client";

import React, { useMemo, useRef, useState } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabase";
import { useLanguage } from "@/context/LanguageContext";
import { Trash2, Send, CheckCircle, AlertCircle, UserCheck, Plus, Upload, FileText, X, Download } from "lucide-react";

/** Signed consent scans: what the storage bucket and the form will accept. */
const CONSENT_BUCKET = "consents";
const MAX_FILE_BYTES = 10 * 1024 * 1024;
const ACCEPTED_TYPES = ["application/pdf", "image/jpeg", "image/png"];
const ACCEPT_ATTR = ".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png";

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

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
  const { nav, meta, registrationFormUI: form } = content;
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

  const [consentFiles, setConsentFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [consent, setConsent] = useState(false);
  const [labSafetyConsent, setLabSafetyConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const addConsentFiles = (picked: FileList | null) => {
    if (!picked) return;
    // Same file picked twice (two separate "choose" clicks) should not double up.
    const incoming = Array.from(picked);
    setConsentFiles((current) => {
      const seen = new Set(current.map((f) => `${f.name}:${f.size}`));
      return [...current, ...incoming.filter((f) => !seen.has(`${f.name}:${f.size}`))];
    });
    // Clear the input so re-picking the same file still fires onChange.
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeConsentFile = (index: number) =>
    setConsentFiles((current) => current.filter((_, i) => i !== index));

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
    setConsentFiles([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
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

    if (consentFiles.length === 0) {
      setStatusMessage({ type: "error", text: errors.filesRequired });
      return;
    }

    const oversized = consentFiles.find((f) => f.size > MAX_FILE_BYTES);
    if (oversized) {
      setStatusMessage({ type: "error", text: `${errors.fileTooLarge}${oversized.name}` });
      return;
    }

    const wrongType = consentFiles.find((f) => !ACCEPTED_TYPES.includes(f.type));
    if (wrongType) {
      setStatusMessage({ type: "error", text: `${errors.fileTypeInvalid}${wrongType.name}` });
      return;
    }

    const allMembersPayload = [...members];
    if (hasFifthMember) {
      allMembersPayload.push(fifthMember);
    }

    setLoading(true);

    try {
      // Upload the scans first, then record their paths on the row. Doing it in
      // this order means a failed upload never leaves a team registered without
      // its consent forms.
      const submissionId =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

      const uploaded: { name: string; path: string; size: number; type: string }[] = [];

      for (let index = 0; index < consentFiles.length; index++) {
        const file = consentFiles[index];
        const safeName = file.name.replace(/[^\w.\-]+/g, "_").slice(-80);
        const path = `${submissionId}/${index + 1}-${safeName}`;
        const { error: uploadError } = await supabase.storage
          .from(CONSENT_BUCKET)
          .upload(path, file, { contentType: file.type, upsert: false });

        if (uploadError) {
          console.error("Consent upload error:", uploadError);
          setStatusMessage({ type: "error", text: errors.uploadFailed });
          setLoading(false);
          return;
        }
        uploaded.push({ name: file.name, path, size: file.size, type: file.type });
      }

      const { error } = await supabase.from("teams").insert([
        {
          consent_folder: submissionId,
          consent_files: uploaded,
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
    <section id="registration" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
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
          className="p-6 sm:p-10 rounded-2xl border border-slate-200 bg-white shadow-md space-y-8"
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
            <h3 className="font-serif text-lg font-bold text-slate-900 pb-2 border-b border-slate-200">
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
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/30 text-xs sm:text-sm font-semibold bg-slate-50/50"
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
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/30 text-xs sm:text-sm font-semibold bg-slate-50/50"
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
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/30 text-xs sm:text-sm font-semibold bg-slate-50/50"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-slate-900 pb-2 border-b border-slate-200 flex items-center justify-between">
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
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/30 text-xs sm:text-sm font-semibold bg-slate-50/50"
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
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/30 text-xs sm:text-sm font-semibold bg-slate-50/50"
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
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/30 text-xs sm:text-sm font-semibold bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase mb-1">
                  {form.gradeLabel}
                </label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/30 text-xs sm:text-sm font-semibold bg-slate-50/50"
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

          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/80 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
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
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/30 text-xs sm:text-sm font-semibold"
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
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/30 text-xs sm:text-sm font-semibold"
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
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/30 text-xs sm:text-sm font-semibold"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
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
                  className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs flex flex-col sm:flex-row items-center gap-3"
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
                    className="flex-grow w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm bg-slate-50/50 font-semibold focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/30"
                  />

                  <select
                    value={m.grade}
                    onChange={(e) => updateMember(idx, "grade", e.target.value)}
                    className="w-full sm:w-36 px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm bg-slate-50/50 font-semibold focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/30"
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
                    className="flex-grow w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm bg-white font-semibold focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/30"
                  />

                  <select
                    value={fifthMember.grade}
                    onChange={(e) => setFifthMember({ ...fifthMember, grade: e.target.value })}
                    className="w-full sm:w-36 px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm bg-white font-semibold focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/30"
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

          {/* Signed consent scans */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-slate-900 pb-2 border-b border-slate-200">
              {form.documents.sectionTitle}
            </h3>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/80 space-y-4">
              <div>
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
                  {form.documents.templatesIntro}
                </p>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={meta.parentalConsentPdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-brand-800" strokeWidth={2} />
                    <span>{form.documents.parentalTemplate}</span>
                  </a>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200">
                <label
                  htmlFor="consent-files"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1"
                >
                  {form.documents.label}
                </label>
                <p className="text-xs text-slate-500 mb-3 leading-relaxed">
                  {form.documents.hint}
                </p>

                <input
                  id="consent-files"
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept={ACCEPT_ATTR}
                  onChange={(e) => addConsentFiles(e.target.files)}
                  className="sr-only"
                />
                <div className="flex items-center gap-3 flex-wrap">
                  <label
                    htmlFor="consent-files"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-brand-800 hover:bg-brand-900 text-white text-xs font-bold cursor-pointer transition-colors"
                  >
                    <Upload className="w-4 h-4" strokeWidth={2} />
                    <span>{form.documents.chooseBtn}</span>
                  </label>
                  <span className="text-xs text-slate-500 font-medium">
                    {consentFiles.length === 0
                      ? form.documents.noFiles
                      : form.documents.selectedCount.replace(
                          "{n}",
                          String(consentFiles.length)
                        )}
                  </span>
                </div>

                {consentFiles.length > 0 && (
                  <ul className="mt-3 space-y-2">
                    {consentFiles.map((file, idx) => (
                      <li
                        key={`${file.name}-${file.size}-${idx}`}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white"
                      >
                        <FileText className="w-4 h-4 text-brand-800 shrink-0" strokeWidth={2} />
                        <span className="text-xs font-semibold text-slate-800 truncate flex-grow min-w-0">
                          {file.name}
                        </span>
                        <span className="text-[11px] text-slate-500 shrink-0">
                          {formatBytes(file.size)}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeConsentFile(idx)}
                          title={form.documents.removeTitle}
                          aria-label={`${form.documents.removeTitle}: ${file.name}`}
                          className="p-1 rounded text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors shrink-0"
                        >
                          <X className="w-4 h-4" strokeWidth={2} />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 w-4 h-4 text-brand-800 rounded border-slate-300 focus:ring-brand-800 shrink-0"
                />
                <span className="text-xs text-slate-700 font-semibold leading-relaxed">
                  {form.consentData}
                </span>
              </label>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-amber-50/60">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={labSafetyConsent}
                  onChange={(e) => setLabSafetyConsent(e.target.checked)}
                  className="mt-0.5 w-4 h-4 text-brand-800 rounded border-slate-300 focus:ring-brand-800 shrink-0"
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
