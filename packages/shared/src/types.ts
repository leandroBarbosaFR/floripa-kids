export type Language = 'pt' | 'en'

export type PriceType = 'free' | 'paid' | 'varies'

export type Category = {
  id: string
  name_pt: string
  name_en: string
  icon: string
  color: string
  created_at: string
}

export type Event = {
  id: string
  title_pt: string
  title_en: string
  description_pt: string
  description_en: string
  category_id: string
  category?: Category
  date_start: string | null
  date_end: string | null
  is_recurring: boolean
  recurring_description_pt: string | null
  recurring_description_en: string | null
  location_name: string
  location_address: string
  location_lat: number | null
  location_lng: number | null
  price_type: PriceType
  price_description_pt: string | null
  price_description_en: string | null
  age_min: number | null
  age_max: number | null
  website: string | null
  phone: string | null
  is_published: boolean
  photos: EventPhoto[]
  created_at: string
  updated_at: string
}

export type EventPhoto = {
  id: string
  event_id: string
  url: string
  is_primary: boolean
  sort_order: number
}

export const CATEGORIES: Omit<Category, 'id' | 'created_at'>[] = [
  { name_pt: 'Praias', name_en: 'Beaches', icon: '🏖️', color: '#0EA5E9' },
  { name_pt: 'Parques', name_en: 'Parks', icon: '🌳', color: '#22C55E' },
  { name_pt: 'Restaurantes', name_en: 'Restaurants', icon: '🍽️', color: '#F97316' },
  { name_pt: 'Parquinhos', name_en: 'Playgrounds', icon: '🎠', color: '#A855F7' },
  { name_pt: 'Ambientes Fechados', name_en: 'Indoor', icon: '🏠', color: '#6366F1' },
  { name_pt: 'Eventos & Festivais', name_en: 'Events & Festivals', icon: '🎉', color: '#EC4899' },
  { name_pt: 'Esportes', name_en: 'Sports', icon: '⚽', color: '#EAB308' },
  { name_pt: 'Educação', name_en: 'Education', icon: '📚', color: '#14B8A6' },
]
