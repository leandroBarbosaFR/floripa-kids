'use client'

import { ShieldCheck, Sparkles, Accessibility, Coins } from 'lucide-react'
import { KidScore as KidScoreType } from '@/lib/types'
import { useTranslation } from './LanguageProvider'

interface Props {
  score: KidScoreType
  compact?: boolean
}

function Dots({ value }: { value: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`inline-block rounded-full w-2 h-2 ${i < value ? 'bg-brand-coral' : 'bg-brand-coral/20'}`}
        />
      ))}
    </div>
  )
}

export default function KidScore({ score, compact = false }: Props) {
  const { t } = useTranslation()

  if (compact) {
    const avg = Math.round((score.safety + score.fun + score.access + score.budget) / 4)
    return (
      <div className="inline-flex items-center gap-1.5 bg-brand-yellow/60 border border-brand-yellow rounded-full px-3 py-1">
        <Sparkles size={12} className="text-slate-600" />
        <span className="text-xs font-bold text-slate-700">{avg}/5 {t.kidScore.compact}</span>
      </div>
    )
  }

  const metrics = [
    { key: 'safety' as const, label: t.kidScore.safety, Icon: ShieldCheck },
    { key: 'fun' as const, label: t.kidScore.fun, Icon: Sparkles },
    { key: 'access' as const, label: t.kidScore.access, Icon: Accessibility },
    { key: 'budget' as const, label: t.kidScore.value, Icon: Coins },
  ]

  return (
    <div className="bg-brand-blue/30 rounded-2xl p-4 border border-brand-blue">
      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
        {t.kidScore.title}
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {metrics.map(({ key, label, Icon }) => (
          <div key={key} className="flex flex-col gap-1">
            <span className="flex items-center gap-1 text-xs text-slate-500 font-medium">
              <Icon size={12} className="text-slate-500" />
              {label}
            </span>
            <Dots value={score[key]} />
          </div>
        ))}
      </div>
    </div>
  )
}
