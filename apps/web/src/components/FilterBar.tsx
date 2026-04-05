'use client'

import { Waves, TreePine, Mountain, Building2, Utensils, CalendarDays, Sun, CloudRain, Tag, CreditCard, MapPin } from 'lucide-react'
import { AgeRange, ActivityType, Zone } from '@/lib/types'
import { useTranslation } from './LanguageProvider'

export interface Filters {
  age: AgeRange | ''
  type: ActivityType | ''
  weather: 'sunny' | 'rainy' | ''
  budget: 'free' | 'paid' | ''
  zone: Zone | ''
}

interface Props {
  filters: Filters
  onChange: (filters: Filters) => void
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 whitespace-nowrap px-3.5 py-1.5 rounded-full text-sm font-medium border transition-all ${
        active
          ? 'bg-slate-800 text-white border-slate-800 shadow-sm'
          : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400 hover:text-slate-800'
      }`}
    >
      {children}
    </button>
  )
}

const typeIconMap: Record<string, React.ReactNode> = {
  beach: <Waves size={13} />,
  park: <TreePine size={13} />,
  nature: <Mountain size={13} />,
  indoor: <Building2 size={13} />,
  restaurant: <Utensils size={13} />,
  event: <CalendarDays size={13} />,
}

export default function FilterBar({ filters, onChange }: Props) {
  const { t } = useTranslation()

  function toggle<K extends keyof Filters>(key: K, value: Filters[K]) {
    onChange({ ...filters, [key]: filters[key] === value ? '' : value })
  }

  function reset() {
    onChange({ age: '', type: '', weather: '', budget: '', zone: '' })
  }

  const hasActive = Object.values(filters).some(Boolean)

  const ageKeys = ['0-2', '3-5', '6-8', '9-12'] as const
  const typeKeys = ['beach', 'park', 'nature', 'indoor', 'restaurant', 'event'] as const
  const zoneKeys = ['north', 'south', 'lagoa', 'center'] as const

  return (
    <div className="space-y-3">
      {/* Age */}
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">{t.filters.ageLabel}</p>
        <div className="flex flex-wrap gap-2">
          {ageKeys.map((age) => (
            <Chip key={age} active={filters.age === age} onClick={() => toggle('age', age)}>
              {t.ages[age]}
            </Chip>
          ))}
        </div>
      </div>

      {/* Type */}
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">{t.filters.typeLabel}</p>
        <div className="flex flex-wrap gap-2">
          {typeKeys.map((type) => (
            <Chip key={type} active={filters.type === type} onClick={() => toggle('type', type)}>
              {typeIconMap[type]}
              {t.types[type]}
            </Chip>
          ))}
        </div>
      </div>

      {/* Zone */}
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">{t.filters.zoneLabel}</p>
        <div className="flex flex-wrap gap-2">
          {zoneKeys.map((zone) => (
            <Chip key={zone} active={filters.zone === zone} onClick={() => toggle('zone', zone)}>
              <MapPin size={12} /> {t.zones[zone]}
            </Chip>
          ))}
        </div>
      </div>

      {/* Weather + Budget */}
      <div className="flex flex-wrap gap-6">
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">{t.filters.weatherLabel}</p>
          <div className="flex gap-2">
            <Chip active={filters.weather === 'sunny'} onClick={() => toggle('weather', 'sunny')}>
              <Sun size={13} /> {t.weather.sunny}
            </Chip>
            <Chip active={filters.weather === 'rainy'} onClick={() => toggle('weather', 'rainy')}>
              <CloudRain size={13} /> {t.weather.rainy}
            </Chip>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">{t.filters.budgetLabel}</p>
          <div className="flex gap-2">
            <Chip active={filters.budget === 'free'} onClick={() => toggle('budget', 'free')}>
              <Tag size={13} /> {t.budget.free}
            </Chip>
            <Chip active={filters.budget === 'paid'} onClick={() => toggle('budget', 'paid')}>
              <CreditCard size={13} /> {t.budget.paid}
            </Chip>
          </div>
        </div>
      </div>

      {hasActive && (
        <button
          onClick={reset}
          className="text-xs text-slate-400 hover:text-slate-600 underline underline-offset-2 transition-colors"
        >
          {t.filters.clearAll}
        </button>
      )}
    </div>
  )
}
