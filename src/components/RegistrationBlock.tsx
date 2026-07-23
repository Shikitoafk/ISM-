"use client";

import React, { useState } from "react";
import { supabase } from "../lib/supabase";
import { Trash2, Send, CheckCircle, AlertCircle, UserCheck } from "lucide-react";

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
  const [grade, setGrade] = useState("Grade 10");

  // Captain info
  const [captainName, setCaptainName] = useState("");
  const [captainEmail, setCaptainEmail] = useState("");
  const [captainContact, setCaptainContact] = useState("");

  // SEPARATE MANDATORY BLOCK: Team Leader / Advisor info
  const [leaderName, setLeaderName] = useState("");
  const [leaderEmail, setLeaderEmail] = useState("");
  const [leaderContact, setLeaderContact] = useState("");

  // Team members: 3 or 4 additional members (total team size: 4 to 5 members including Captain)
  const [members, setMembers] = useState<Member[]>([
    { full_name: "", grade: "Grade 10", role_or_notes: "Member 2" },
    { full_name: "", grade: "Grade 10", role_or_notes: "Member 3" },
    { full_name: "", grade: "Grade 10", role_or_notes: "Member 4" },
  ]);

  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const addMember = () => {
    if (members.length < 4) {
      setMembers([...members, { full_name: "", grade: "Grade 10", role_or_notes: `Member ${members.length + 2}` }]);
    }
  };

  const removeMember = (index: number) => {
    if (members.length > 3) {
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
        text: "Please confirm your agreement to personal data processing and Article 8 Academic Integrity Rules.",
      });
      return;
    }

    if (!leaderName.trim() || !leaderEmail.trim() || !leaderContact.trim()) {
      setStatusMessage({
        type: "error",
        text: "Please complete all fields for the Team Advisor / Teacher.",
      });
      return;
    }

    for (let i = 0; i < members.length; i++) {
      if (!members[i].full_name.trim()) {
        setStatusMessage({
          type: "error",
          text: `Please enter the Full Name for Team Member ${i + 2}.`,
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
          text: `Registration error: ${error.message}.`,
        });
      } else {
        setStatusMessage({
          type: "success",
          text: "Team registration successfully submitted! Confirmation instructions sent to Captain and Advisor emails.",
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
            Register Team for ISM (4–5 Members)
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto font-normal">
            Form to be submitted by the Team Captain. Teams must consist of 4–5 members plus 1 Team Advisor (Teacher).
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 sm:p-10 rounded-xl border-2 border-slate-900 bg-white shadow-sm space-y-8"
        >
          {/* Status Alert */}
          {statusMessage && (
            <div
              className={`p-4 rounded-lg border-2 text-xs sm:text-sm font-semibold flex items-start gap-3 ${
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

          {/* Block 1: Team & School Info */}
          <div>
            <h3 className="font-serif text-lg font-bold text-slate-900 pb-2 border-b-2 border-slate-900 mb-4">
              1. Team & Institution Information
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
                  className="w-full px-3.5 py-2 rounded-lg border-2 border-slate-900 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-brand-800 focus:outline-none text-xs sm:text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase mb-1">
                  City / Location *
                </label>
                <input
                  type="text"
                  required
                  placeholder='e.g., "Ust-Kamenogorsk"'
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border-2 border-slate-900 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-brand-800 focus:outline-none text-xs sm:text-sm font-semibold"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-900 uppercase mb-1">
                  Full School / Institution Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder='e.g., "Oskemen Bilim-Innovation Lyceum"'
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border-2 border-slate-900 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-brand-800 focus:outline-none text-xs sm:text-sm font-semibold"
                />
              </div>
            </div>
          </div>

          {/* Block 2: Team Captain */}
          <div>
            <h3 className="font-serif text-lg font-bold text-slate-900 pb-2 border-b-2 border-slate-900 mb-4">
              2. Team Captain Details (Member #1)
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
                  className="w-full px-3.5 py-2 rounded-lg border-2 border-slate-900 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-brand-800 focus:outline-none text-xs sm:text-sm font-semibold"
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
                  className="w-full px-3.5 py-2 rounded-lg border-2 border-slate-900 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-brand-800 focus:outline-none text-xs sm:text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase mb-1">
                  Captain Phone / Telegram *
                </label>
                <input
                  type="text"
                  required
                  placeholder="+7 (707) 000-00-00"
                  value={captainContact}
                  onChange={(e) => setCaptainContact(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border-2 border-slate-900 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-brand-800 focus:outline-none text-xs sm:text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase mb-1">
                  Grade Level *
                </label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border-2 border-slate-900 text-slate-900 focus:ring-2 focus:ring-brand-800 focus:outline-none text-xs sm:text-sm font-semibold"
                >
                  <option value="Grade 9">Grade 9</option>
                  <option value="Grade 10">Grade 10</option>
                  <option value="Grade 11">Grade 11</option>
                  <option value="Grade 12">Grade 12</option>
                </select>
              </div>
            </div>
          </div>

          {/* Block 3: MANDATORY Team Advisor */}
          <div className="p-5 rounded-xl border-2 border-slate-900 bg-slate-50">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-slate-900">
              <UserCheck className="w-5 h-5 text-brand-800" strokeWidth={2} />
              <h3 className="font-serif text-lg font-bold text-slate-900">
                3. Team Advisor / Teacher (Mandatory)
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase mb-1">
                  Advisor Full Name *
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
                  Advisor Email *
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
                  Advisor Phone / Contact *
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

          {/* Block 4: Other Members */}
          <div>
            <div className="flex items-center justify-between pb-2 border-b-2 border-slate-900 mb-4">
              <h3 className="font-serif text-lg font-bold text-slate-900">
                4. Additional Team Members ({members.length + 1} of 5 total)
              </h3>
              {members.length < 4 && (
                <button
                  type="button"
                  onClick={addMember}
                  className="text-xs font-bold text-brand-800 hover:underline"
                >
                  + Add 5th Member
                </button>
              )}
            </div>

            <div className="space-y-3">
              {members.map((m, idx) => (
                <div key={idx} className="p-3.5 rounded-lg border-2 border-slate-900 bg-slate-50 flex flex-col sm:flex-row items-center gap-3">
                  <span className="text-xs font-bold text-slate-700 shrink-0 w-24">
                    Member #{idx + 2}
                  </span>

                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={m.full_name}
                    onChange={(e) => updateMember(idx, "full_name", e.target.value)}
                    className="flex-grow w-full px-3 py-1.5 rounded border-2 border-slate-900 text-xs sm:text-sm bg-white font-semibold focus:ring-1 focus:ring-brand-800"
                  />

                  <select
                    value={m.grade}
                    onChange={(e) => updateMember(idx, "grade", e.target.value)}
                    className="w-full sm:w-36 px-2.5 py-1.5 rounded border-2 border-slate-900 text-xs sm:text-sm bg-white font-semibold focus:ring-1 focus:ring-brand-800"
                  >
                    <option value="Grade 9">Grade 9</option>
                    <option value="Grade 10">Grade 10</option>
                    <option value="Grade 11">Grade 11</option>
                    <option value="Grade 12">Grade 12</option>
                  </select>

                  {members.length > 3 && (
                    <button
                      type="button"
                      onClick={() => removeMember(idx)}
                      className="text-slate-500 hover:text-red-600 p-1"
                      title="Remove member"
                    >
                      <Trash2 className="w-4 h-4" strokeWidth={2} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Block 5: Consent Checkbox */}
          <div className="p-4 rounded-lg border-2 border-slate-900 bg-slate-50">
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 w-4 h-4 text-brand-800 rounded border-slate-900 focus:ring-brand-800"
              />
              <span className="text-xs text-slate-700 font-semibold leading-relaxed">
                I confirm agreement to personal data processing and guarantee compliance with the ISM Regulations, including Article 8 Academic Integrity Rules (strict prohibition of generative AI).
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-brand-800 hover:bg-brand-900 disabled:bg-slate-400 text-white font-bold text-sm transition-all shadow-sm flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>Submitting Application...</span>
            ) : (
              <>
                <Send className="w-4 h-4" strokeWidth={2} />
                <span>Submit Team Registration</span>
              </>
            )}
          </button>
        </form>

      </div>
    </section>
  );
};
