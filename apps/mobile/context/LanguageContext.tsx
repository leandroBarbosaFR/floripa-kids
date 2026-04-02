import React, { createContext, useContext, useState } from 'react'
import type { Language } from '@/lib/types'

type LanguageContextType = {
  lang: Language
  toggleLang: () => void
  t: (pt: string, en: string) => string
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  toggleLang: () => {},
  t: (_, en) => en,
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('en')
  const toggleLang = () => setLang(l => (l === 'en' ? 'pt' : 'en'))
  const t = (pt: string, en: string) => (lang === 'pt' ? pt : en)

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLang = () => useContext(LanguageContext)
