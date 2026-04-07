'use client'

import Link from 'next/link'
import { Search, MapPin, Baby, Palmtree, Waves, TreePine, CloudRain, Tag, Building2, Compass, CalendarDays, Clock } from 'lucide-react'
import ActivityCard from '@/components/ActivityCard'
import WeatherWidget from '@/components/WeatherWidget'
import { useTranslation } from '@/components/LanguageProvider'
import type { Activity, SanityEvent } from '@/lib/types'
import type { FloripWeather } from '@/lib/weather'

const CategoryIcon = ({ type }: { type: string }) => {
  const props = { size: 28, strokeWidth: 1.5, className: 'text-slate-700' }
  switch (type) {
    case 'beach': return <Waves {...props} />
    case 'park': return <TreePine {...props} />
    case 'rainy': return <CloudRain {...props} />
    case 'free': return <Tag {...props} />
    case 'toddlers': return <Baby {...props} />
    case 'indoor': return <Building2 {...props} />
    default: return <MapPin {...props} />
  }
}

interface Props {
  featured: Activity[]
  events: SanityEvent[]
  totalCount: number
  weather: FloripWeather | null
}

export default function HomeClient({ featured, events, totalCount, weather }: Props) {
  const { t } = useTranslation()

  const quickFilters = [
    { key: 'beach',    labelKey: 'beach'    as const, href: '/activities?type=beach',    bg: 'bg-brand-blue' },
    { key: 'park',     labelKey: 'parks'    as const, href: '/activities?type=park',     bg: 'bg-brand-green' },
    { key: 'rainy',    labelKey: 'rainyDays'as const, href: '/activities?weather=rainy', bg: 'bg-brand-blue' },
    { key: 'free',     labelKey: 'freeOnly' as const, href: '/activities?budget=free',   bg: 'bg-brand-yellow' },
    { key: 'toddlers', labelKey: 'toddlers' as const, href: '/activities?age=0-2',       bg: 'bg-brand-pink' },
    { key: 'indoor',   labelKey: 'indoor'   as const, href: '/activities?type=indoor',   bg: 'bg-brand-green' },
  ]

  const stats = [
    { value: `${totalCount}+`, label: t.stats.activities },
    { value: '4',              label: t.stats.zones },
    { value: '0–12',           label: t.stats.ages },
    { value: t.budget.free,    label: t.stats.free },
  ]

  const howItWorks = [
    { Icon: Baby,   title: t.howItWorks.step1Title, desc: t.howItWorks.step1Desc },
    { Icon: Search, title: t.howItWorks.step2Title, desc: t.howItWorks.step2Desc },
    { Icon: MapPin, title: t.howItWorks.step3Title, desc: t.howItWorks.step3Desc },
  ]

  const zoneFilters = [
    { key: 'north',  labelKey: 'north'  as const, href: '/activities?zone=north',  bg: 'bg-brand-blue' },
    { key: 'south',  labelKey: 'south'  as const, href: '/activities?zone=south',  bg: 'bg-brand-green' },
    { key: 'lagoa',  labelKey: 'lagoa'  as const, href: '/activities?zone=lagoa',  bg: 'bg-brand-pink' },
    { key: 'center', labelKey: 'center' as const, href: '/activities?zone=center', bg: 'bg-brand-yellow' },
  ]

  const ageKeys = ['0-2', '3-5', '6-8', '9-12'] as const

  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-blue via-brand-green/30 to-white pt-28 pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-brand-yellow text-slate-700 border border-brand-yellow rounded-full px-4 py-1.5 text-sm font-medium mb-6 animate-slide-down">
            <Palmtree size={14} />
            {t.hero.badge}
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-800 leading-tight mb-4 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            {t.hero.title}{' '}
            <span className="text-brand-coral">{t.hero.highlight}</span>
          </h1>

          <p className="text-slate-500 text-lg max-w-xl mx-auto mb-10 leading-relaxed animate-fade-up" style={{ animationDelay: '0.2s' }}>
            {t.hero.description}
          </p>

          <div className="flex justify-center mb-10 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <Link href="/activities" className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-8 py-3.5 rounded-2xl transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 text-sm whitespace-nowrap">
              {t.hero.exploreAll}
            </Link>
          </div>

          <div className="flex items-center justify-center gap-2 flex-wrap animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <span className="text-xs text-slate-400 font-medium mr-1">{t.hero.ageFilterLabel}</span>
            {ageKeys.map((age, i) => (
              <Link
                key={age}
                href={`/activities?age=${age}`}
                className="bg-brand-blue border border-brand-blue text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-full hover:opacity-80 hover:-translate-y-0.5 transition-all duration-150 shadow-sm"
                style={{ animationDelay: `${0.45 + i * 0.06}s` }}
              >
                {t.ages[age]}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-y border-slate-100 py-8 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {stats.map(({ value, label }, i) => (
            <div key={label} className="animate-fade-up" style={{ animationDelay: `${0.1 + i * 0.1}s` }}>
              <div className="text-2xl font-extrabold text-brand-coral mb-1">{value}</div>
              <div className="text-xs text-slate-400 font-medium">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Weather */}
      {weather && <WeatherWidget weather={weather} />}

      {/* Quick filters / Categories */}
      <section className="py-14 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-800 mb-1 animate-fade-up">{t.categories.title}</h2>
          <p className="text-slate-400 text-sm mb-7 animate-fade-up" style={{ animationDelay: '0.05s' }}>
            {t.categories.subtitle}
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {quickFilters.map(({ key, labelKey, href, bg }, i) => (
              <Link
                key={key}
                href={href}
                className={`${bg} rounded-2xl p-4 flex flex-col items-center gap-2.5 hover:scale-105 hover:-translate-y-1 transition-all duration-200 shadow-sm border border-white/60 animate-scale-in`}
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                <CategoryIcon type={key} />
                <span className="text-xs font-semibold text-slate-700 text-center leading-tight">
                  {t.categories[labelKey]}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Zone filters */}
      <section className="py-14 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-1 animate-fade-up">
            <Compass size={18} className="text-brand-coral" />
            <h2 className="text-2xl font-bold text-slate-800">{t.zones.title}</h2>
          </div>
          <p className="text-slate-400 text-sm mb-7 animate-fade-up" style={{ animationDelay: '0.05s' }}>
            {t.zones.subtitle}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {zoneFilters.map(({ key, labelKey, href, bg }, i) => (
              <Link
                key={key}
                href={href}
                className={`${bg} rounded-2xl p-5 flex flex-col items-center gap-3 hover:scale-105 hover:-translate-y-1 transition-all duration-200 shadow-sm border border-white/60 animate-scale-in`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <MapPin size={26} strokeWidth={1.5} className="text-slate-700" />
                <span className="text-sm font-bold text-slate-700 text-center">{t.zones[labelKey]}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Top Picks / Featured */}
      {featured.length > 0 && (
        <section className="py-14 px-6 bg-brand-blue/40">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-end justify-between mb-7 animate-fade-up">
              <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-1">{t.featured.title}</h2>
                <p className="text-slate-400 text-sm">{t.featured.subtitle}</p>
              </div>
              <Link href="/activities" className="text-brand-coral hover:text-brand-coral/70 text-sm font-semibold transition-colors">
                {t.featured.viewAll} →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featured.map((activity, i) => (
                <div key={activity.slug} className="animate-fade-up" style={{ animationDelay: `${i * 0.12}s` }}>
                  <ActivityCard activity={activity} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Upcoming Events */}
      {events.length > 0 && (
        <section className="py-14 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-2 mb-1 animate-fade-up">
              <CalendarDays size={18} className="text-brand-coral" />
              <h2 className="text-2xl font-bold text-slate-800">Upcoming Events</h2>
            </div>
            <p className="text-slate-400 text-sm mb-7 animate-fade-up" style={{ animationDelay: '0.05s' }}>
              Things happening soon in Florianópolis for families
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {events.map((event, i) => (
                <div key={event.slug} className="animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-brand-blue transition-all duration-200 overflow-hidden flex flex-col">
                    {/* Header */}
                    <div className="h-32 flex items-center justify-center relative" style={{ backgroundColor: event.category?.color ? `${event.category.color}20` : '#f1f5f9' }}>
                      {event.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={event.imageUrl} alt={event.title_en} className="w-full h-full object-cover absolute inset-0" />
                      ) : (
                        <span className="text-4xl">{event.category?.icon ?? '🎉'}</span>
                      )}
                      {event.price_type === 'free' && (
                        <span className="absolute top-3 left-3 bg-emerald-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
                          Free
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="font-bold text-slate-800 text-base leading-snug mb-1 line-clamp-2">
                        {event.title_en}
                      </h3>
                      <p className="text-slate-500 text-xs mb-3 line-clamp-2 flex-1">
                        {event.description_en}
                      </p>
                      <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                        {event.is_recurring ? (
                          <span className="flex items-center gap-1">
                            <Clock size={11} /> {event.recurring_description_en ?? 'Recurring'}
                          </span>
                        ) : event.date_start ? (
                          <span className="flex items-center gap-1">
                            <CalendarDays size={11} />
                            {new Date(event.date_start).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                        ) : null}
                        {event.location_name && (
                          <span className="flex items-center gap-1">
                            <MapPin size={11} /> {event.location_name}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How it works */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-2 animate-fade-up">{t.howItWorks.title}</h2>
          <p className="text-slate-400 text-sm mb-12 animate-fade-up" style={{ animationDelay: '0.08s' }}>
            {t.howItWorks.subtitle}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {howItWorks.map(({ Icon, title, desc }, i) => (
              <div key={title} className="flex flex-col items-center gap-4 px-4 animate-fade-up" style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="w-14 h-14 rounded-2xl bg-brand-blue border border-brand-blue flex items-center justify-center shadow-sm hover:scale-110 transition-transform duration-200">
                  <Icon size={28} className="text-slate-700" />
                </div>
                <h3 className="font-bold text-slate-800 text-base">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-6 bg-brand-pink">
        <div className="max-w-2xl mx-auto text-center animate-fade-up">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-3">{t.cta.title}</h2>
          <p className="text-slate-500 text-sm mb-7">{t.cta.description}</p>
          <Link href="/activities" className="inline-block bg-slate-800 hover:bg-slate-700 text-white font-bold px-8 py-3.5 rounded-2xl transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 text-sm">
            {t.cta.button}
          </Link>
        </div>
      </section>
    </main>
  )
}
