"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, ContentStructure, TRANSLATIONS } from "@/data/translations";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  content: ContentStructure;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/** BCP 47 tags for the document element, so screen readers and hyphenation
 *  use the right locale instead of always announcing English. */
const HTML_LANG: Record<Language, string> = {
  EN: "en",
  RU: "ru",
  KZ: "kk",
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>("EN");

  useEffect(() => {
    let savedLang: Language | null = null;
    try {
      savedLang = localStorage.getItem("ism_lang") as Language | null;
    } catch {
      // Storage can be unavailable (private mode, blocked cookies).
    }
    if (savedLang === "EN" || savedLang === "RU" || savedLang === "KZ") {
      setLangState(savedLang);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = HTML_LANG[lang];
  }, [lang]);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem("ism_lang", newLang);
    } catch {
      // ignore
    }
  };

  const content = TRANSLATIONS[lang] || TRANSLATIONS.EN;

  return (
    <LanguageContext.Provider value={{ lang, setLang, content }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
