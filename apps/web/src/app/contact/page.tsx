'use client'

import { useState } from 'react'
import { Mail, MessageSquare, Send } from 'lucide-react'
import { useTranslation } from '@/components/LanguageProvider'

export default function ContactPage() {
  const { t } = useTranslation()
  const p = t.contactPage
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [state, setState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  function update(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setState('sending')
    // Send via the newsletter route as a simple contact relay, or swap for a dedicated endpoint
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: `contact-form@floripa — from ${form.name} <${form.email}>:\n\n${form.message}`,
        }),
      })
      setState(res.ok ? 'success' : 'error')
    } catch {
      setState('error')
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-b from-brand-blue/50 to-white border-b border-brand-blue/30 px-6 py-14">
        <div className="max-w-xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-blue mb-5 shadow-sm">
            <Mail size={26} className="text-slate-700" strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-800 mb-2">{p.title}</h1>
          <p className="text-slate-500 text-sm leading-relaxed">{p.subtitle}</p>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-6 py-12">
        {state === 'success' ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🎉</div>
            <p className="font-bold text-slate-800 text-lg mb-1">{p.success}</p>
          </div>
        ) : (
          <form onSubmit={submit} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                {p.nameLabel}
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
                placeholder={p.namePlaceholder}
                required
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-brand-blue transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                {p.emailLabel}
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                placeholder={p.emailPlaceholder}
                required
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-brand-blue transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                {p.messageLabel}
              </label>
              <textarea
                value={form.message}
                onChange={(e) => update('message', e.target.value)}
                placeholder={p.messagePlaceholder}
                required
                rows={5}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-brand-blue transition-colors resize-none"
              />
            </div>

            {state === 'error' && (
              <p className="text-rose-500 text-xs">{p.error}</p>
            )}

            <button
              type="submit"
              disabled={state === 'sending'}
              className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-60 text-sm"
            >
              <Send size={15} />
              {state === 'sending' ? p.sending : p.send}
            </button>
          </form>
        )}

        <div className="mt-8 flex items-center justify-center gap-2 text-slate-400 text-sm">
          <MessageSquare size={14} />
          <a href="mailto:hello@floripawithkids.com" className="hover:text-slate-700 transition-colors">
            hello@floripawithkids.com
          </a>
        </div>
      </div>
    </main>
  )
}
