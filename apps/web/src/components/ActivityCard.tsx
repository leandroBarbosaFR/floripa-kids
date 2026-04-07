'use client'

import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Clock, Wallet, Baby, Waves, TreePine, Mountain, Building2, Utensils, CalendarDays, Sun, CloudRain, Cloud, Heart } from 'lucide-react'
import { Activity } from '@/lib/types'
import { FloripWeather, weatherEmoji, weatherLabel as liveWeatherLabel } from '@/lib/weather'
import { activityTypeColors } from '@/lib/data'
import KidScore from './KidScore'
import { useTranslation } from './LanguageProvider'
import { useFavorites } from './FavoritesProvider'

const TypeIcon = ({ type, size = 56 }: { type: string; size?: number }) => {
  const props = { size, strokeWidth: 1.5, className: 'text-white drop-shadow-sm' }
  switch (type) {
    case 'beach': return <Waves {...props} />
    case 'park': return <TreePine {...props} />
    case 'nature': return <Mountain {...props} />
    case 'indoor': return <Building2 {...props} />
    case 'restaurant': return <Utensils {...props} />
    case 'event': return <CalendarDays {...props} />
    default: return <MapPin {...props} />
  }
}

const WeatherIcon = ({ weather }: { weather: string }) => {
  const props = { size: 13, className: 'shrink-0' }
  if (weather === 'sunny') return <Sun {...props} />
  if (weather === 'rainy') return <CloudRain {...props} />
  return <Cloud {...props} />
}

export default function ActivityCard({ activity, todayWeather }: { activity: Activity; todayWeather?: FloripWeather | null }) {
  const { t } = useTranslation()
  const { toggle, isFavorite } = useFavorites()
  const liked = isFavorite(activity.slug)
  const gradient = activityTypeColors[activity.type] ?? 'from-sky-300 to-blue-400'

  const weatherCls =
    activity.weather === 'sunny'
      ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
      : activity.weather === 'rainy'
      ? 'bg-blue-50 text-blue-700 border-blue-200'
      : 'bg-sky-50 text-sky-700 border-sky-200'

  const weatherLabel =
    activity.weather === 'sunny'
      ? t.weather.sunny
      : activity.weather === 'rainy'
      ? t.weather.rainy
      : t.weather.both

  const typeLabel = t.types[activity.type as keyof typeof t.types] ?? activity.type

  return (
    <Link
      href={`/activities/${activity.slug}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md hover:border-brand-blue transition-all duration-200 flex flex-col"
    >
      {/* Visual header */}
      <div className={`relative h-44 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
        {activity.imageUrl ? (
          <Image
            src={activity.imageUrl}
            alt={activity.name}
            fill
            className="object-cover object-center"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            quality={90}
          />
        ) : (
          <TypeIcon type={activity.type} size={56} />
        )}
        <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
          <span className="bg-white/90 backdrop-blur-sm text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
            {typeLabel}
          </span>
          {activity.budget === 'free' && (
            <span className="bg-emerald-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
              {t.card.free}
            </span>
          )}
        </div>
        {todayWeather && (
          <div className="absolute bottom-3 right-3">
            <span className="bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
              {weatherEmoji(todayWeather.currentWeatherCode)} {todayWeather.currentTemp}°C · {liveWeatherLabel(todayWeather.currentWeatherCode)}
            </span>
          </div>
        )}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          <button
            onClick={(e) => { e.preventDefault(); toggle(activity.slug) }}
            aria-label={liked ? 'Remove from favourites' : 'Add to favourites'}
            className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
          >
            <Heart
              size={15}
              className={liked ? 'text-brand-pink fill-brand-pink' : 'text-slate-400'}
            />
          </button>
          <KidScore score={activity.kidScore} compact />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-slate-800 text-base leading-snug mb-1 group-hover:text-sky-700 transition-colors">
          {activity.name}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-3 flex-1 line-clamp-2">
          {activity.tagline}
        </p>

        {/* Meta */}
        <div className="flex flex-wrap gap-2 text-xs text-slate-500 mb-3">
          <span className="flex items-center gap-1">
            <MapPin size={12} className="text-slate-500" />
            {t.zones[activity.zone as keyof typeof t.zones]}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} className="text-slate-500" />
            {activity.duration}
          </span>
          <span className="flex items-center gap-1">
            <Wallet size={12} className="text-slate-500" />
            {activity.price}
          </span>
        </div>

        {/* Age tags */}
        <div className="flex items-center gap-1.5 flex-wrap mb-3">
          <Baby size={12} className="text-slate-400" />
          {activity.ageRanges.map((age) => (
            <span
              key={age}
              className="bg-brand-blue/40 text-slate-700 border border-brand-blue text-xs font-medium px-2 py-0.5 rounded-full"
            >
              {t.ages[age as keyof typeof t.ages]}
            </span>
          ))}
        </div>

        {/* Weather badge */}
        <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${weatherCls}`}>
          <WeatherIcon weather={activity.weather} />
          {weatherLabel}
        </span>
      </div>
    </Link>
  )
}
