import { Suspense } from 'react'
import ActivitiesClient from './ActivitiesClient'

export default function ActivitiesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-400 text-sm">Loading…</div>}>
      <ActivitiesClient />
    </Suspense>
  )
}
