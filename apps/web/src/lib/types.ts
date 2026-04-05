export type AgeRange = '0-2' | '3-5' | '6-8' | '9-12'
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
