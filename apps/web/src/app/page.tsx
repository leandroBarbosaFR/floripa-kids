import { getFeaturedActivities, getAllActivities, getUpcomingEvents } from '@/lib/sanity/queries'
import { getFloripWeather } from '@/lib/weather'
import HomeClient from './HomeClient'

export default async function Home() {
  const [featured, allActivities, events, weather] = await Promise.all([
    getFeaturedActivities(),
    getAllActivities(),
    getUpcomingEvents(),
    getFloripWeather(),
  ])

  return <HomeClient featured={featured} events={events} totalCount={allActivities.length} weather={weather} />
}
