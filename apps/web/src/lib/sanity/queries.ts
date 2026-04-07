import { sanityClient } from './client'
import type { Activity, SanityEvent } from '@/lib/types'

const ACTIVITY_PROJECTION = `
  "slug": slug.current,
  name,
  tagline,
  description,
  ageRanges,
  type,
  weather,
  budget,
  zone,
  location,
  duration,
  price,
  stroller,
  parking,
  food,
  bestTime,
  tips,
  warnings,
  kidScore,
  featured,
  "imageUrl": image.asset->url
`

const NOT_DRAFT = `!(_id in path("drafts.**"))`

export async function getAllActivities(): Promise<Activity[]> {
  return sanityClient.fetch(
    `*[_type == "activity" && ${NOT_DRAFT}] | order(featured desc, name asc) { ${ACTIVITY_PROJECTION} }`,
    {},
    { next: { revalidate: 60 } },
  )
}

export async function getFeaturedActivities(): Promise<Activity[]> {
  return sanityClient.fetch(
    `*[_type == "activity" && featured == true && ${NOT_DRAFT}] | order(name asc) { ${ACTIVITY_PROJECTION} }`,
    {},
    { next: { revalidate: 60 } },
  )
}

export async function getActivityBySlug(slug: string): Promise<Activity | null> {
  return sanityClient.fetch(
    `*[_type == "activity" && slug.current == $slug && ${NOT_DRAFT}][0] { ${ACTIVITY_PROJECTION} }`,
    { slug },
    { next: { revalidate: 60 } },
  )
}

export async function getAllActivitySlugs(): Promise<string[]> {
  const results = await sanityClient.fetch<{ slug: string }[]>(
    `*[_type == "activity" && ${NOT_DRAFT}] { "slug": slug.current }`,
  )
  return results.map((r) => r.slug)
}

export async function getUpcomingEvents(): Promise<SanityEvent[]> {
  const now = new Date().toISOString()
  return sanityClient.fetch(
    `*[_type == "event" && is_published == true && ${NOT_DRAFT} && (date_start > $now || is_recurring == true)]
      | order(date_start asc)[0...6] {
        "slug": slug.current,
        title_en,
        title_pt,
        description_en,
        description_pt,
        date_start,
        date_end,
        is_recurring,
        recurring_description_en,
        recurring_description_pt,
        location_name,
        price_type,
        price_description_en,
        age_min,
        age_max,
        website,
        "category": category-> { name_en, name_pt, icon, color },
        "imageUrl": image.asset->url
      }`,
    { now },
    { next: { revalidate: 60 } },
  )
}
