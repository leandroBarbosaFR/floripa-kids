'use client'

import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { SlidersHorizontal, X, SearchX } from 'lucide-react'
import { activities } from '@/lib/data'
import { AgeRange, ActivityType, Zone } from '@/lib/types'
import ActivityCard from '@/components/ActivityCard'
import FilterBar, { Filters } from '@/components/FilterBar'
import { useTranslation } from '@/components/LanguageProvider'

export default function ActivitiesClient() {
  const searchParams = useSearchParams()
  const { t } = useTranslation()

  const [filters, setFilters] = useState<Filters>({
    age: (searchParams.get('age') as AgeRange) || '',
    type: (searchParams.get('type') as ActivityType) || '',
    weather: (searchParams.get('weather') as 'sunny' | 'rainy') || '',
    budget: (searchParams.get('budget') as 'free' | 'paid') || '',
    zone: (searchParams.get('zone') as Zone) || '',
  })
  const [showFilters, setShowFilters] = useState(false)

  // Re-seed filters when the URL changes (e.g. clicking a zone link from the homepage)
  useEffect(() => {
    setFilters({
      age: (searchParams.get('age') as AgeRange) || '',
      type: (searchParams.get('type') as ActivityType) || '',
      weather: (searchParams.get('weather') as 'sunny' | 'rainy') || '',
      budget: (searchParams.get('budget') as 'free' | 'paid') || '',
      zone: (searchParams.get('zone') as Zone) || '',
    })
  }, [searchParams])

  const filtered = useMemo(() => {
    return activities.filter((a) => {
      if (filters.age && !a.ageRanges.includes(filters.age as AgeRange)) return false
      if (filters.type && a.type !== filters.type) return false
      if (filters.weather && a.weather !== 'both' && a.weather !== filters.weather) return false
      if (filters.budget && a.budget !== filters.budget) return false
      if (filters.zone && a.zone !== filters.zone) return false
      return true
    })
  }, [filters])

  const activeCount = Object.values(filters).filter(Boolean).length
  const clearFilters = () => setFilters({ age: '', type: '', weather: '', budget: '', zone: '' })

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-b from-brand-blue/60 to-white border-b border-brand-blue px-6 py-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-extrabold text-slate-800 mb-1">{t.activitiesPage.title}</h1>
          <p className="text-slate-400 text-sm">{t.activitiesPage.found(filtered.length)}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Mobile filter toggle */}
        <div className="flex items-center justify-between mb-5 sm:hidden">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 text-sm font-medium px-4 py-2 rounded-xl shadow-sm"
          >
            <SlidersHorizontal size={15} />
            {t.filters.filtersBtn}
            {activeCount > 0 && (
              <span className="bg-sky-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {activeCount}
              </span>
            )}
          </button>
          {activeCount > 0 && (
            <button onClick={clearFilters} className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600">
              <X size={13} /> {t.filters.clear}
            </button>
          )}
        </div>

        {/* Desktop filters */}
        <div className="hidden sm:block bg-white rounded-2xl border border-slate-100 shadow-sm p-5 mb-7">
          <FilterBar filters={filters} onChange={setFilters} />
        </div>

        {/* Mobile filters */}
        {showFilters && (
          <div className="sm:hidden bg-white rounded-2xl border border-slate-100 shadow-sm p-5 mb-5">
            <FilterBar filters={filters} onChange={setFilters} />
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <SearchX size={48} className="text-slate-300 mx-auto mb-4" />
            <h3 className="font-bold text-slate-700 text-lg mb-2">{t.filters.noResults}</h3>
            <p className="text-slate-400 text-sm mb-5">{t.filters.noResultsHint}</p>
            <button
              onClick={clearFilters}
              className="text-sky-500 hover:text-sky-700 text-sm font-semibold underline underline-offset-2"
            >
              {t.filters.clearFilters}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((activity) => (
              <ActivityCard key={activity.slug} activity={activity} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
