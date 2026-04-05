import { notFound } from 'next/navigation'
import { activities } from '@/lib/data'
import ActivityDetailClient from './ActivityDetailClient'

export function generateStaticParams() {
  return activities.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const activity = activities.find((a) => a.slug === slug)
  if (!activity) return {}
  return {
    title: `${activity.name} · Floripa with Kids`,
    description: activity.tagline,
  }
}

export default async function ActivityDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const activity = activities.find((a) => a.slug === slug)
  if (!activity) notFound()

  return <ActivityDetailClient activity={activity} />
}
