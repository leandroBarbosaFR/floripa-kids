export type AgeRange = '0-2' | '3-5' | '6-8' | '9-12'

export interface SanityCategory {
  name_en: string
  name_pt: string
  icon: string
  color: string
}

export interface SanityEvent {
  slug: string
  title_en: string
  title_pt: string
  description_en: string
  description_pt: string
  date_start: string | null
  date_end: string | null
  is_recurring: boolean
  recurring_description_en: string | null
  recurring_description_pt: string | null
  location_name: string
  price_type: 'free' | 'paid' | 'varies'
  price_description_en: string | null
  age_min: number | null
  age_max: number | null
  website: string | null
  category: SanityCategory | null
  imageUrl: string | null
}
export type ActivityType = 'beach' | 'park' | 'nature' | 'indoor' | 'restaurant' | 'event'
export type Weather = 'sunny' | 'rainy' | 'both'
export type Budget = 'free' | 'paid'
export type Zone = 'north' | 'south' | 'lagoa' | 'center'

export interface KidScore {
  safety: number   // 1-5
  fun: number      // 1-5
  access: number   // 1-5 (accessibility / ease)
  budget: number   // 1-5 (5 = very affordable)
}

export interface Activity {
  slug: string
  name: string
  tagline: string
  description: string
  ageRanges: AgeRange[]
  type: ActivityType
  weather: Weather
  budget: Budget
  zone: Zone
  location: string
  duration: string
  price: string
  stroller: boolean
  parking: boolean
  food: boolean
  bestTime: string
  tips: string[]
  warnings: string[]
  kidScore: KidScore
  featured?: boolean
}
