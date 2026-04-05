'use client'

import { useState } from 'react'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setState('loading')
    const res = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    setState(res.ok ? 'success' : 'error')
  }

  if (state === 'success') {
    return <p className="text-sm text-emerald-400 font-medium mt-3">✓ You're subscribed!</p>
  }

  return (
    <form onSubmit={submit} className="mt-3">
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="flex-1 min-w-0 rounded-xl border border-slate-700 bg-slate-800 text-slate-200 text-sm px-3 py-2 placeholder:text-slate-500 focus:outline-none focus:border-[#CFECF3]"
        />
        <button
          type="submit"
          disabled={state === 'loading'}
          className="bg-brand-pink hover:opacity-90 text-slate-800 text-sm font-semibold px-4 py-2 rounded-xl transition-opacity disabled:opacity-60 whitespace-nowrap"
        >
          {state === 'loading' ? '…' : 'Subscribe'}
        </button>
      </div>
      {state === 'error' && (
        <p className="text-rose-400 text-xs mt-1.5">Something went wrong. Try again.</p>
      )}
    </form>
  )
}
