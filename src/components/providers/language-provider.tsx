"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, Language } from "@/lib/i18n/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.en | typeof translations.ar;
  dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Load saved language from localStorage
    const savedLang = localStorage.getItem("language") as Language;
    if (savedLang && (savedLang === "en" || savedLang === "ar")) {
      setLanguageState(savedLang);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      // Save language to localStorage
      localStorage.setItem("language", language);
      
      // Update document direction and lang attribute
      document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = language;
    }
  }, [language, mounted]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
    dir: language === "ar" ? "rtl" : "ltr",
  };

  if (!mounted) {
    return null;
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

