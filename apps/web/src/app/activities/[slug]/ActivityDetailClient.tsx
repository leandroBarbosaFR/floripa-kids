'use client'

import Link from 'next/link'
import {
  MapPin, Clock, Wallet, Baby, ArrowLeft, CheckCircle, AlertTriangle,
  Car, Utensils, Waves, TreePine, Mountain, Building2, CalendarDays,
  Sun, CloudRain, Cloud, ShieldCheck,
} from 'lucide-react'
import { Activity } from '@/lib/types'
import { activityTypeColors } from '@/lib/data'
import KidScore from '@/components/KidScore'
import { useTranslation } from '@/components/LanguageProvider'

const TypeIcon = ({ type }: { type: string }) => {
  const props = { size: 72, strokeWidth: 1.2, className: 'text-white drop-shadow-sm' }
  switch (type) {
    case 'beach': return <Waves {...props} />
    case 'park': return <TreePine {...props} />
    case 'nature': return <Mountain {...props} />
    case 'indoor': return <Building2 {...props} />
    case 'restaurant': return <Utensils {...props} />
    case 'event': return <CalendarDays {...props} />
    default: return <MapPin {...props} />
  }
}

const WeatherIcon = ({ weather }: { weather: string }) => {
  const cls = 'shrink-0'
  if (weather === 'sunny') return <Sun size={14} className={cls} />
  if (weather === 'rainy') return <CloudRain size={14} className={cls} />
  return <Cloud size={14} className={cls} />
}

export default function ActivityDetailClient({ activity }: { activity: Activity }) {
  const { t } = useTranslation()
  const gradient = activityTypeColors[activity.type] ?? 'from-sky-300 to-blue-400'

  const weatherLabel =
    activity.weather === 'sunny' ? t.weather.sunny :
    activity.weather === 'rainy' ? t.weather.rainy :
    t.weather.both

  const weatherCls =
    activity.weather === 'sunny' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
    activity.weather === 'rainy' ? 'bg-blue-50 text-blue-700 border-blue-200' :
    'bg-sky-50 text-sky-700 border-sky-200'

  const typeLabel = t.types[activity.type as keyof typeof t.types] ?? activity.type
  const zoneName = t.zones[activity.zone as keyof typeof t.zones]

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className={`relative h-64 sm:h-80 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
        <TypeIcon type={activity.type} />
        <div className="absolute inset-0 bg-black/10" />
        <Link
          href="/activities"
          className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-slate-700 text-sm font-medium px-3 py-2 rounded-xl hover:bg-white transition-colors shadow-sm"
        >
          <ArrowLeft size={15} /> {t.detail.back}
        </Link>
        <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 flex gap-2 flex-wrap">
          <span className="bg-white/90 backdrop-blur-sm text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
            {typeLabel}
          </span>
          {activity.budget === 'free' && (
            <span className="bg-emerald-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
              {t.card.free}
            </span>
          )}
          <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border bg-white/90 backdrop-blur-sm shadow-sm ${weatherCls}`}>
            <WeatherIcon weather={activity.weather} />
            {weatherLabel}
          </span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-7">
            {/* Title */}
            <div>
              <h1 className="text-3xl font-extrabold text-slate-800 mb-2">{activity.name}</h1>
              <p className="text-slate-600 font-medium text-base mb-4">{activity.tagline}</p>
              <div className="flex flex-wrap gap-3 text-sm text-slate-500">
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-slate-500" /> {activity.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={14} className="text-slate-500" /> {activity.duration}
                </span>
                <span className="flex items-center gap-1.5">
                  <Wallet size={14} className="text-slate-500" /> {activity.price}
                </span>
              </div>
            </div>

            {/* Recommended ages */}
            <div>
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Baby size={13} /> {t.detail.recommendedAges}
              </h2>
              <div className="flex gap-2 flex-wrap">
                {activity.ageRanges.map((age) => (
                  <span
                    key={age}
                    className="bg-brand-blue/50 text-slate-700 border border-brand-blue text-sm font-semibold px-3 py-1 rounded-full"
                  >
                    {t.ages[age as keyof typeof t.ages]}
                  </span>
                ))}
              </div>
            </div>

            {/* About */}
            <div>
              <h2 className="text-sm font-bold text-slate-700 mb-2">{t.detail.about}</h2>
              <p className="text-slate-500 text-sm leading-relaxed">{activity.description}</p>
            </div>

            {/* Tips */}
            <div>
              <h2 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-1.5">
                <CheckCircle size={15} className="text-emerald-500" /> {t.detail.parentTips}
              </h2>
              <ul className="space-y-2">
                {activity.tips.map((tip) => (
                  <li key={tip} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <CheckCircle size={14} className="text-emerald-400 mt-0.5 shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* Warnings */}
            {activity.warnings.length > 0 && (
              <div>
                <h2 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-1.5">
                  <AlertTriangle size={15} className="text-amber-500" /> {t.detail.watchOut}
                </h2>
                <ul className="space-y-2">
                  {activity.warnings.map((w) => (
                    <li key={w} className="flex items-start gap-2.5 text-sm text-slate-600">
                      <AlertTriangle size={14} className="text-amber-400 mt-0.5 shrink-0" />
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Best time */}
            <div className="bg-brand-yellow/40 border border-brand-yellow rounded-2xl p-4">
              <h2 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Sun size={13} /> {t.detail.bestTimeTitle}
              </h2>
              <p className="text-sm text-slate-700">{activity.bestTime}</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <KidScore score={activity.kidScore} />

            {/* Practical info */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                {t.detail.practical}
              </h3>
              <div className="space-y-2.5">
                {[
                  {
                    Icon: Baby,
                    label: t.detail.strollerLabel,
                    ok: activity.stroller,
                    yes: t.detail.strollerYes,
                    no: t.detail.strollerNo,
                  },
                  {
                    Icon: Car,
                    label: t.detail.parkingLabel,
                    ok: activity.parking,
                    yes: t.detail.parkingYes,
                    no: t.detail.parkingNo,
                  },
                  {
                    Icon: Utensils,
                    label: t.detail.foodLabel,
                    ok: activity.food,
                    yes: t.detail.foodYes,
                    no: t.detail.foodNo,
                  },
                ].map(({ Icon, label, ok, yes, no }) => (
                  <div key={label} className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-slate-500">
                      <Icon size={14} className="text-slate-500" /> {label}
                    </span>
                    <span className={`font-semibold text-xs px-2 py-0.5 rounded-full ${ok ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                      {ok ? yes : no}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Zone */}
            <div className="bg-brand-green/40 border border-brand-green rounded-2xl p-4">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                <MapPin size={12} /> {t.detail.zoneLabel}
              </p>
              <p className="font-semibold text-sm text-slate-700">{zoneName} {t.detail.floripa}</p>
            </div>

            {/* Security note */}
            <div className="bg-white border border-slate-100 rounded-2xl p-4 flex items-start gap-2.5">
              <ShieldCheck size={16} className="text-sky-400 mt-0.5 shrink-0" />
              <p className="text-xs text-slate-500 leading-relaxed">{t.kidScore.safety}: {activity.kidScore.safety}/5</p>
            </div>

            <Link
              href="/activities"
              className="w-full flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-600 text-sm font-medium py-3 rounded-2xl hover:bg-brand-blue/20 hover:border-brand-blue transition-colors"
            >
              <ArrowLeft size={15} /> {t.detail.allActivities}
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
