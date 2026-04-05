'use client'

import Link from 'next/link'
import { CheckCircle, Heart, MapPin, Users } from 'lucide-react'
import { useTranslation } from '@/components/LanguageProvider'

export default function AboutPage() {
  const { t } = useTranslation()
  const p = t.aboutPage

  const features = [p.what1, p.what2, p.what3, p.what4]

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-pink/40 to-white px-6 py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-pink mb-6 shadow-sm">
            <Heart size={30} className="text-slate-700" strokeWidth={1.5} />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-800 mb-3">{p.title}</h1>
          <p className="text-slate-500 text-lg leading-relaxed">{p.subtitle}</p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-start gap-4 bg-brand-cream/60 rounded-2xl p-6 border border-brand-cream">
            <div className="w-10 h-10 rounded-xl bg-brand-yellow flex items-center justify-center shrink-0">
              <Users size={20} className="text-slate-700" strokeWidth={1.5} />
            </div>
            <p className="text-slate-600 text-base leading-relaxed">{p.story}</p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-8 px-6 bg-brand-green/30">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-brand-green flex items-center justify-center shrink-0">
              <MapPin size={20} className="text-slate-700" strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800 mb-2">{p.missionTitle}</h2>
              <p className="text-slate-500 text-sm leading-relaxed">{p.missionText}</p>
            </div>
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-slate-800 mb-6">{p.whatTitle}</h2>
          <ul className="space-y-3">
            {features.map((feat) => (
              <li key={feat} className="flex items-center gap-3 text-slate-600 text-sm">
                <CheckCircle size={18} className="text-brand-coral shrink-0" />
                {feat}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-6 bg-brand-coral/20 border-t border-brand-coral/20">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-slate-700 font-semibold text-lg mb-4">{p.contactCta}</p>
          <Link
            href="/contact"
            className="inline-block bg-slate-800 hover:bg-slate-700 text-white font-semibold px-8 py-3 rounded-2xl transition-colors text-sm"
          >
            {p.contactBtn}
          </Link>
        </div>
      </section>
    </main>
  )
}
