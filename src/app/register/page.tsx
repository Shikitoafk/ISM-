"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RegistrationBlock } from "@/components/RegistrationBlock";
import { useLanguage } from "@/context/LanguageContext";
import { supabase } from "@/lib/supabase";
import { Lock, Mail, Phone, Calendar, AlertCircle } from "lucide-react";

export default function RegisterPage() {
  const { content } = useLanguage();
  const { registrationPage, meta } = content;
  const [isRegistrationOpen, setIsRegistrationOpen] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkRegistrationStatus() {
      try {
        const { data, error } = await supabase
          .from("site_settings")
          .select("registration_open")
          .single();

        if (error || !data) {
          // Default to open if site_settings table does not exist or errors out
          setIsRegistrationOpen(true);
        } else {
          setIsRegistrationOpen(data.registration_open !== false);
        }
      } catch {
        setIsRegistrationOpen(true);
      } finally {
        setLoading(false);
      }
    }

    checkRegistrationStatus();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-brand-800 selection:text-white">
      <Header />

      <main className="flex-grow pt-24">
        {/* Compact Hero Banner */}
        <section className="bg-slate-900 text-white py-12 md:py-16 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-900 border border-brand-500/40 text-brand-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <span>{registrationPage.badge}</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
              {registrationPage.title}
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {registrationPage.subtitle}
            </p>
          </div>
        </section>

        {/* Content Area: Form or Closed State */}
        <div className="py-12 md:py-20">
          {loading ? (
            <div className="max-w-xl mx-auto text-center py-16 text-slate-500 font-medium">
              Checking registration status...
            </div>
          ) : isRegistrationOpen ? (
            /* Open Registration Form */
            <RegistrationBlock />
          ) : (
            /* Centered Closed State Card */
            <div className="max-w-2xl mx-auto px-4">
              <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 text-center shadow-lg">
                <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:12px_12px]" />

                <div className="relative z-10 space-y-6">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-full bg-amber-50 border-2 border-amber-200 flex items-center justify-center text-amber-700 mx-auto shadow-xs">
                    <Lock className="w-8 h-8" strokeWidth={2} />
                  </div>

                  {/* Status Badge */}
                  <div className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
                    {registrationPage.statusClosed}
                  </div>

                  {/* Title & Description */}
                  <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-900">
                    {registrationPage.closedTitle}
                  </h2>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
                    {registrationPage.closedDesc}
                  </p>

                  {/* Contact Info Notice */}
                  <div className="pt-6 border-t border-slate-100 text-left bg-slate-50 p-6 rounded-2xl border border-slate-200/80">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-brand-800" strokeWidth={2} />
                      <span>{registrationPage.contactNotice}</span>
                    </div>

                    <div className="space-y-2 text-xs sm:text-sm font-semibold text-slate-800">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-brand-800 shrink-0" strokeWidth={2} />
                        <span>{meta.contactEmail}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-brand-800 shrink-0" strokeWidth={2} />
                        <span>{meta.contactPhone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-brand-800 shrink-0" strokeWidth={2} />
                        <span>{meta.dateAnnouncementNote}</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
