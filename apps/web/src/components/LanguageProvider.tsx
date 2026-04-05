'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { Lang, translations, Translations } from '@/lib/i18n'

interface LangContext {
  lang: Lang
  setLang: (l: Lang) => void
  t: Translations
}

const Ctx = createContext<LangContext>({
  lang: 'en',
  setLang: () => {},
  t: translations.en,
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')

  useEffect(() => {
    const stored = localStorage.getItem('lang') as Lang | null
    if (stored && stored in translations) setLangState(stored)
  }, [])

  function setLang(l: Lang) {
    setLangState(l)
    localStorage.setItem('lang', l)
  }

  return (
    <Ctx.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </Ctx.Provider>
  )
}

export function useTranslation() {
  return useContext(Ctx)
}
