"use client";

import React, { useState } from "react";
import { supabase } from "../lib/supabase";
import { useLanguage } from "@/context/LanguageContext";
import { Trash2, Send, CheckCircle, AlertCircle, UserCheck, ShieldAlert, Plus } from "lucide-react";

interface Member {
  full_name: string;
  grade: string;
  role_or_notes: string;
}

export const RegistrationBlock: React.FC = () => {
  const { content } = useLanguage();

  // Team info
  const [teamName, setTeamName] = useState("");
  const [school, setSchool] = useState("");
  const [city, setCity] = useState("");
  const [grade, setGrade] = useState("Grade 10");

  // Captain info (Member #1 - Required)
  const [captainName, setCaptainName] = useState("");
  const [captainEmail, setCaptainEmail] = useState("");
  const [captainContact, setCaptainContact] = useState("");

  // MANDATORY Team Supervisor / Leader info
  const [leaderName, setLeaderName] = useState("");
  const [leaderEmail, setLeaderEmail] = useState("");
  const [leaderContact, setLeaderContact] = useState("");

  // Required Members 2, 3, 4 (Total 4 core members) + Optional Member 5
  const [members, setMembers] = useState<Member[]>([
    { full_name: "", grade: "Grade 10", role_or_notes: "Required Member #2" },
    { full_name: "", grade: "Grade 10", role_or_notes: "Required Member #3" },
    { full_name: "", grade: "Grade 10", role_or_notes: "Required Member #4" },
  ]);

  const [hasFifthMember, setHasFifthMember] = useState(false);
  const [fifthMember, setFifthMember] = useState<Member>({
    full_name: "",
    grade: "Grade 10",
    role_or_notes: "Optional Member #5",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    if (!consent) {
      setStatusMessage({
        type: "error",
        text: "Please confirm your agreement to personal data processing and Article 8 Academic Integrity Rules.",
      });
      return;
    }

    if (!labSafetyConsent) {
      setStatusMessage({
        type: "error",
        text: "Please confirm compliance with Laboratory Safety Regulations (mandatory PPE & personal liability).",
      });
      return;
    }

    if (!leaderName.trim() || !leaderEmail.trim() || !leaderContact.trim()) {
      setStatusMessage({
        type: "error",
        text: "Please complete all fields for the Team Supervisor / Teacher.",
      });
      return;
    }

    for (let i = 0; i < members.length; i++) {
      if (!members[i].full_name.trim()) {
        setStatusMessage({
          type: "error",
          text: `Please enter the Full Name for Required Team Member #${i + 2}.`,
        });
        return;
      }
    }

    if (hasFifthMember && !fifthMember.full_name.trim()) {
      setStatusMessage({
        type: "error",
        text: "Please enter the Full Name for Optional Team Member #5 or remove the 5th member.",
      });
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
          text: `Registration error: ${error.message}.`,
        });
      } else {
        setStatusMessage({
          type: "success",
          text: "Team registration successfully submitted! Confirmation instructions sent to Captain and Supervisor emails.",
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
        setMembers([
          { full_name: "", grade: "Grade 10", role_or_notes: "Required Member #2" },
          { full_name: "", grade: "Grade 10", role_or_notes: "Required Member #3" },
          { full_name: "", grade: "Grade 10", role_or_notes: "Required Member #4" },
        ]);
        setHasFifthMember(false);
        setFifthMember({ full_name: "", grade: "Grade 10", role_or_notes: "Optional Member #5" });
        setConsent(false);
        setLabSafetyConsent(false);
      }
    } catch (err: any) {
      console.error(err);
      setStatusMessage({
        type: "error",
        text: "Database connection error. Please check Supabase credentials.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="registration" className="py-16 md:py-24 bg-slate-50 border-b-2 border-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center mb-12">
          <div className="text-xs font-bold text-brand-800 uppercase tracking-widest mb-2">
            Application Form
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900 mb-3">
            Register Team for {content.meta.shortName}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto font-normal">
            Form to be submitted by the Team Captain. Required team structure: <strong>4 Core Members</strong> (Captain + 3 Members) + <strong>1 Optional 5th Member</strong> + <strong>1 Team Supervisor</strong>.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 sm:p-10 rounded-2xl border-2 border-slate-900 bg-white shadow-md space-y-8"
        >
          {/* Status Alert */}
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

          {/* Block 1: Team & Institution Info */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-slate-900 pb-2 border-b-2 border-slate-900 flex items-center justify-between">
              <span>1. Team & Institution Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase mb-1">
                  Team Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder='e.g., "Quantum Catalyst"'
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-900 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-brand-800 focus:outline-none text-xs sm:text-sm font-semibold bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase mb-1">
                  City / Location *
                </label>
                <input
                  type="text"
                  required
                  placeholder='e.g., "Almaty"'
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-900 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-brand-800 focus:outline-none text-xs sm:text-sm font-semibold bg-slate-50/50"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-900 uppercase mb-1">
                  Full School / Institution Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder='e.g., "Specialized Lyceum No. 165"'
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-900 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-brand-800 focus:outline-none text-xs sm:text-sm font-semibold bg-slate-50/50"
                />
              </div>
            </div>
          </div>

          {/* Block 2: Team Captain (Member #1 Required) */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-slate-900 pb-2 border-b-2 border-slate-900 flex items-center justify-between">
              <span>2. Team Captain (Member #1 - Required)</span>
              <span className="text-xs font-bold text-brand-800 bg-brand-50 px-2.5 py-0.5 rounded-md border border-brand-200 uppercase">Captain</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase mb-1">
                  Captain Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="First & Last Name"
                  value={captainName}
                  onChange={(e) => setCaptainName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-900 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-brand-800 focus:outline-none text-xs sm:text-sm font-semibold bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase mb-1">
                  Captain Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="captain@example.com"
                  value={captainEmail}
                  onChange={(e) => setCaptainEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-900 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-brand-800 focus:outline-none text-xs sm:text-sm font-semibold bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase mb-1">
                  Captain Phone / Contact *
                </label>
                <input
                  type="text"
                  required
                  placeholder="+7 (707) 000-00-00"
                  value={captainContact}
                  onChange={(e) => setCaptainContact(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-900 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-brand-800 focus:outline-none text-xs sm:text-sm font-semibold bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase mb-1">
                  Grade Level *
                </label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-900 text-slate-900 focus:ring-2 focus:ring-brand-800 focus:outline-none text-xs sm:text-sm font-semibold bg-slate-50/50"
                >
                  <option value="Grade 9">Grade 9</option>
                  <option value="Grade 10">Grade 10</option>
                  <option value="Grade 11">Grade 11</option>
                  <option value="Grade 12">Grade 12</option>
                </select>
              </div>
            </div>
          </div>

          {/* Block 3: Team Supervisor / Leader (Required) */}
          <div className="p-5 rounded-xl border-2 border-slate-900 bg-slate-50/80 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b-2 border-slate-900">
              <UserCheck className="w-5 h-5 text-brand-800" strokeWidth={2} />
              <h3 className="font-serif text-lg font-bold text-slate-900">
                3. Team Supervisor / Advisor (Mandatory Role)
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase mb-1">
                  Supervisor Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Teacher Full Name"
                  value={leaderName}
                  onChange={(e) => setLeaderName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border-2 border-slate-900 bg-white text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-brand-800 focus:outline-none text-xs sm:text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase mb-1">
                  Supervisor Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="teacher@school.edu"
                  value={leaderEmail}
                  onChange={(e) => setLeaderEmail(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border-2 border-slate-900 bg-white text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-brand-800 focus:outline-none text-xs sm:text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase mb-1">
                  Supervisor Phone / Contact *
                </label>
                <input
                  type="text"
                  required
                  placeholder="+7 (777) 000-00-00"
                  value={leaderContact}
                  onChange={(e) => setLeaderContact(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border-2 border-slate-900 bg-white text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-brand-800 focus:outline-none text-xs sm:text-sm font-semibold"
                />
              </div>
            </div>
          </div>

          {/* Block 4: Required Core Members (Members #2, #3, #4) & Optional Member #5 */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b-2 border-slate-900">
              <h3 className="font-serif text-lg font-bold text-slate-900">
                4. Core Team Members (3 Required Members)
              </h3>
              {!hasFifthMember && (
                <button
                  type="button"
                  onClick={() => setHasFifthMember(true)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-brand-800 bg-brand-50 hover:bg-brand-100 px-3 py-1 rounded-lg border border-brand-300 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" strokeWidth={2} />
                  <span>Add Optional 5th Member</span>
                </button>
              )}
            </div>

            {/* Required Members #2, #3, #4 */}
            <div className="space-y-3">
              {members.map((m, idx) => (
                <div key={idx} className="p-4 rounded-xl border-2 border-slate-900 bg-white shadow-xs flex flex-col sm:flex-row items-center gap-3">
                  <div className="flex items-center justify-between w-full sm:w-auto gap-2">
                    <span className="text-xs font-bold text-slate-900 shrink-0 sm:w-28">
                      Member #{idx + 2} <span className="text-brand-800 font-extrabold">(Required)</span>
                    </span>
                  </div>

                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={m.full_name}
                    onChange={(e) => updateMember(idx, "full_name", e.target.value)}
                    className="flex-grow w-full px-3.5 py-2 rounded-lg border-2 border-slate-900 text-xs sm:text-sm bg-slate-50/50 font-semibold focus:ring-1 focus:ring-brand-800"
                  />

                  <select
                    value={m.grade}
                    onChange={(e) => updateMember(idx, "grade", e.target.value)}
                    className="w-full sm:w-36 px-3 py-2 rounded-lg border-2 border-slate-900 text-xs sm:text-sm bg-slate-50/50 font-semibold focus:ring-1 focus:ring-brand-800"
                  >
                    <option value="Grade 9">Grade 9</option>
                    <option value="Grade 10">Grade 10</option>
                    <option value="Grade 11">Grade 11</option>
                    <option value="Grade 12">Grade 12</option>
                  </select>
                </div>
              ))}

              {/* Optional Member #5 */}
              {hasFifthMember && (
                <div className="p-4 rounded-xl border-2 border-brand-800 bg-brand-50/40 shadow-xs flex flex-col sm:flex-row items-center gap-3">
                  <div className="flex items-center justify-between w-full sm:w-auto gap-2">
                    <span className="text-xs font-bold text-brand-900 shrink-0 sm:w-28">
                      Member #5 <span className="text-slate-600 font-normal">(Optional)</span>
                    </span>
                  </div>

                  <input
                    type="text"
                    placeholder="Full Name (Optional 5th Member)"
                    value={fifthMember.full_name}
                    onChange={(e) => setFifthMember({ ...fifthMember, full_name: e.target.value })}
                    className="flex-grow w-full px-3.5 py-2 rounded-lg border-2 border-slate-900 text-xs sm:text-sm bg-white font-semibold focus:ring-1 focus:ring-brand-800"
                  />

                  <select
                    value={fifthMember.grade}
                    onChange={(e) => setFifthMember({ ...fifthMember, grade: e.target.value })}
                    className="w-full sm:w-36 px-3 py-2 rounded-lg border-2 border-slate-900 text-xs sm:text-sm bg-white font-semibold focus:ring-1 focus:ring-brand-800"
                  >
                    <option value="Grade 9">Grade 9</option>
                    <option value="Grade 10">Grade 10</option>
                    <option value="Grade 11">Grade 11</option>
                    <option value="Grade 12">Grade 12</option>
                  </select>

                  <button
                    type="button"
                    onClick={() => {
                      setHasFifthMember(false);
                      setFifthMember({ full_name: "", grade: "Grade 10", role_or_notes: "Optional Member #5" });
                    }}
                    className="text-slate-500 hover:text-red-600 p-1.5 shrink-0"
                    title="Remove optional 5th member"
                  >
                    <Trash2 className="w-4 h-4" strokeWidth={2} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Block 5: Consents & Lab Safety Checkboxes */}
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
                  I confirm agreement to personal data processing and guarantee compliance with ISM Regulations, including Article 8 Academic Integrity Rules (strict prohibition of generative AI).
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
                  I confirm that all team members will strictly comply with Laboratory Safety Regulations (mandatory PPE, lab coats, safety goggles) and acknowledge personal responsibility for laboratory conduct.
                </span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-brand-800 hover:bg-brand-900 disabled:bg-slate-400 text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>Submitting Registration...</span>
            ) : (
              <>
                <Send className="w-4 h-4" strokeWidth={2} />
                <span>{content.nav.registerBtn}</span>
              </>
            )}
          </button>
        </form>

      </div>
    </section>
  );
};
