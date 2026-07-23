"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, ContentStructure, TRANSLATIONS } from "@/data/translations";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  content: ContentStructure;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>("EN");

  useEffect(() => {
    const savedLang = localStorage.getItem("ism_lang") as Language;
    if (savedLang && (savedLang === "EN" || savedLang === "RU" || savedLang === "KZ")) {
      setLangState(savedLang);
    }
  }, []);

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
