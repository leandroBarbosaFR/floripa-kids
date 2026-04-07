import { getAllActivities } from '@/lib/sanity/queries'
import DashboardClient from './DashboardClient'

export default async function DashboardPage() {
  const activities = await getAllActivities()
  return <DashboardClient activities={activities} />
}
