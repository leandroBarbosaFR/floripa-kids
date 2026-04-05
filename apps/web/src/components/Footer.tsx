'use client'

import Link from 'next/link'
import { useTranslation } from './LanguageProvider'
import NewsletterForm from './NewsletterForm'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-slate-900 text-slate-400 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-8 mb-8">
          <div>
            <span className="font-extrabold text-white text-lg tracking-tight">
              Floripa with <span className="text-brand-pink">Kids</span>
            </span>
            <p className="text-sm max-w-xs leading-relaxed mt-2">{t.footer.tagline}</p>
            <div className="mt-5">
              <p className="text-xs text-white font-medium uppercase tracking-wider">{t.footer.newsletter}</p>
              <NewsletterForm />
            </div>
          </div>

          <div className="flex gap-12 text-sm">
            <div className="flex flex-col gap-2">
              <span className="text-white font-medium text-xs uppercase tracking-wider mb-1">
                {t.footer.explore}
              </span>
              <Link href="/activities" className="hover:text-brand-pink transition-colors">{t.footer.activities}</Link>
              <Link href="/activities?type=beach" className="hover:text-brand-pink transition-colors">{t.footer.beaches}</Link>
              <Link href="/activities?type=park" className="hover:text-brand-pink transition-colors">{t.footer.parks}</Link>
              <Link href="/activities?weather=rainy" className="hover:text-brand-pink transition-colors">{t.footer.rainyDays}</Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-white font-medium text-xs uppercase tracking-wider mb-1">
                {t.footer.info}
              </span>
              <Link href="/about" className="hover:text-brand-pink transition-colors">{t.footer.about}</Link>
              <Link href="/contact" className="hover:text-brand-pink transition-colors">{t.footer.contact}</Link>
              <Link href="/privacy" className="hover:text-brand-pink transition-colors">{t.footer.privacy}</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 text-xs text-slate-600 flex flex-col sm:flex-row justify-between gap-2">
          <span>© {new Date().getFullYear()} {t.footer.copyright}</span>
          <span>EN · FR · PT-BR · ES</span>
        </div>
      </div>
    </footer>
  )
}
