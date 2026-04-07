import { notFound } from 'next/navigation'
import { getActivityBySlug, getAllActivitySlugs } from '@/lib/sanity/queries'
import ActivityDetailClient from './ActivityDetailClient'

export async function generateStaticParams() {
  const slugs = await getAllActivitySlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const activity = await getActivityBySlug(slug)
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
  const activity = await getActivityBySlug(slug)
  if (!activity) notFound()

  return <ActivityDetailClient activity={activity} />
}
