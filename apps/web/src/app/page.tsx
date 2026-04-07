import { getFeaturedActivities, getAllActivities, getUpcomingEvents } from '@/lib/sanity/queries'
import HomeClient from './HomeClient'

export default async function Home() {
  const [featured, allActivities, events] = await Promise.all([
    getFeaturedActivities(),
    getAllActivities(),
    getUpcomingEvents(),
  ])

  return <HomeClient featured={featured} events={events} totalCount={allActivities.length} />
}
