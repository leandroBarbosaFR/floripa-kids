'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Globe, ChevronDown } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useTranslation } from './LanguageProvider'
import { Lang } from '@/lib/i18n'

const LANGUAGES: { code: Lang; label: string; short: string }[] = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'fr', label: 'Français', short: 'FR' },
  { code: 'pt', label: 'Português', short: 'PT' },
  { code: 'es', label: 'Español', short: 'ES' },
]

export default function Navbar() {
  const pathname = usePathname()
  const { t, lang, setLang } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/activities', label: t.nav.activities },
    { href: '/about', label: t.footer.about },
    { href: '/contact', label: t.footer.contact },
  ]

  const currentLang = LANGUAGES.find((l) => l.code === lang)!
  const { data: session } = useSession()

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-brand-blue shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-extrabold tracking-tight text-slate-800">
          Floripa with <span className="text-brand-pink">Kids</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-5">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors ${
                pathname === l.href ? 'text-brand-coral font-semibold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {l.label}
            </Link>
          ))}

          {/* Language picker */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors px-2 py-1 rounded-lg hover:bg-slate-50"
            >
              <Globe size={15} />
              {currentLang.short}
              <ChevronDown size={13} className={`transition-transform ${langOpen ? 'rotate-180' : ''}`} />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-slate-100 rounded-xl shadow-md py-1 min-w-[130px]">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setLangOpen(false) }}
                    className={`w-full text-left px-3.5 py-2 text-sm font-medium transition-colors ${
                      lang === l.code
                        ? 'text-brand-coral bg-brand-pink/20'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {session ? (
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              {session.user?.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={session.user.image} alt="" className="w-7 h-7 rounded-full object-cover" />
              )}
              {t.nav.dashboard}
            </Link>
          ) : (
            <button
              onClick={() => signIn('google')}
              className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
            >
              {t.nav.signIn}
            </button>
          )}

          <Link
            href="/activities"
            className="bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors shadow-sm"
          >
            {t.nav.findActivities}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="sm:hidden p-2 text-slate-500"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden border-t border-brand-blue bg-white px-4 py-4 flex flex-col gap-3">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className={`text-sm font-medium py-1.5 ${pathname === l.href ? 'text-brand-coral font-semibold' : 'text-slate-600'}`}
            >
              {l.label}
            </Link>
          ))}
          {/* Language switcher mobile */}
          <div className="flex gap-2 pt-1 pb-1">
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-semibold border transition-colors ${
                  lang === l.code
                    ? 'bg-brand-pink/20 text-brand-coral border-brand-pink'
                    : 'text-slate-500 border-slate-200 hover:border-brand-blue'
                }`}
              >
                {l.short}
              </button>
            ))}
          </div>
          {session ? (
            <>
              <Link
                href="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 text-sm font-medium text-slate-600 py-1.5"
              >
                {session.user?.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={session.user.image} alt="" className="w-6 h-6 rounded-full object-cover" />
                )}
                {t.nav.dashboard}
              </Link>
              <button
                onClick={() => { signOut(); setMenuOpen(false) }}
                className="text-left text-sm text-slate-400 hover:text-slate-600 py-1"
              >
                Sign out
              </button>
            </>
          ) : (
            <button
              onClick={() => { signIn('google'); setMenuOpen(false) }}
              className="text-left text-sm font-medium text-slate-600 py-1.5"
            >
              {t.nav.signIn}
            </button>
          )}
          <Link
            href="/activities"
            onClick={() => setMenuOpen(false)}
            className="bg-slate-800 text-white text-sm font-semibold px-4 py-2.5 rounded-xl text-center"
          >
            {t.nav.findActivities}
          </Link>
        </div>
      )}
    </nav>
  )
}
