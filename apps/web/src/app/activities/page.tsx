import { Suspense } from 'react'
import { getAllActivities } from '@/lib/sanity/queries'
import ActivitiesClient from './ActivitiesClient'

export default async function ActivitiesPage() {
  const activities = await getAllActivities()

  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-400 text-sm">Loading…</div>}>
      <ActivitiesClient activities={activities} />
    </Suspense>
  )
}
