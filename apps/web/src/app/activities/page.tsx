import { Suspense } from 'react'
import { getAllActivities } from '@/lib/sanity/queries'
import { getFloripWeather } from '@/lib/weather'
import ActivitiesClient from './ActivitiesClient'

export default async function ActivitiesPage() {
  const [activities, weather] = await Promise.all([getAllActivities(), getFloripWeather()])

  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-400 text-sm">Loading…</div>}>
      <ActivitiesClient activities={activities} weather={weather} />
    </Suspense>
  )
}
