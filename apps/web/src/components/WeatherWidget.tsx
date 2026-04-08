'use client'

import Link from 'next/link'
import { Sun, CloudSun, Cloud, CloudFog, CloudDrizzle, CloudRain, Snowflake, CloudSnow, CloudLightning } from 'lucide-react'
import type { FloripWeather } from '@/lib/weather'
import { weatherLabel } from '@/lib/weather'

const WeatherIcon = ({ code, size = 20, className = '' }: { code: number; size?: number; className?: string }) => {
  const props = { size, strokeWidth: 1.5, className }
  if (code === 0) return <Sun {...props} />
  if (code <= 2) return <CloudSun {...props} />
  if (code === 3) return <Cloud {...props} />
  if (code <= 48) return <CloudFog {...props} />
  if (code <= 55) return <CloudDrizzle {...props} />
  if (code <= 65) return <CloudRain {...props} />
  if (code <= 77) return <Snowflake {...props} />
  if (code <= 82) return <CloudRain {...props} />
  if (code <= 86) return <CloudSnow {...props} />
  return <CloudLightning {...props} />
}


export default function WeatherWidget({ weather }: { weather: FloripWeather }) {
  const isRainy = weather.currentPrecipProb >= 50 ||
    weather.days[0]?.precipProb >= 50

  return (
    <section className="py-10 px-6 bg-gradient-to-br from-sky-50 to-blue-50 border-y border-sky-100">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <WeatherIcon code={weather.currentWeatherCode} size={28} className="text-slate-700" />
              <h2 className="text-xl font-bold text-slate-800">Floripa Today</h2>
            </div>
            <p className="text-slate-400 text-xs">
              Florianópolis · updated every 30 min
            </p>
          </div>

          {/* Current temp */}
          <div className="text-right">
            <div className="text-4xl font-extrabold text-slate-800 leading-none">
              {weather.currentTemp}°
            </div>
            <div className="text-xs text-slate-500 mt-1">
              {weatherLabel(weather.currentWeatherCode)}
            </div>
            {weather.currentPrecipProb > 0 && (
              <div className="text-xs text-sky-600 font-medium mt-0.5">
                {weather.currentPrecipProb}% rain
              </div>
            )}
          </div>
        </div>

        {/* 7-day strip */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 -mx-1 px-1 scrollbar-hide">
          {weather.days.map((day) => (
            <div
              key={day.date}
              className={`flex-shrink-0 rounded-2xl px-3 py-3 flex flex-col items-center gap-1 min-w-[72px] border transition-all ${
                day.isToday
                  ? 'bg-white border-sky-200 shadow-sm'
                  : 'bg-white/60 border-transparent'
              }`}
            >
              <span className="text-xs font-bold text-slate-600">{day.dayLabel}</span>
              <WeatherIcon code={day.weatherCode} size={22} className="text-slate-600" />
              <span className="text-sm font-bold text-slate-800">{day.maxTemp}°</span>
              <span className="text-xs text-slate-400">{day.minTemp}°</span>
              {day.precipProb > 0 && (
                <span className="text-xs text-sky-500 font-medium">{day.precipProb}%</span>
              )}
            </div>
          ))}
        </div>

        {/* Rainy day suggestion */}
        {isRainy && (
          <div className="mt-5 flex items-center gap-3 bg-white/80 border border-sky-100 rounded-2xl px-4 py-3">
            <CloudRain size={24} strokeWidth={1.5} className="text-sky-500 shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-700">Looks like a rainy day!</p>
              <p className="text-xs text-slate-400">We have great indoor activities for you.</p>
            </div>
            <Link
              href="/activities?weather=rainy"
              className="text-xs font-bold text-sky-600 hover:text-sky-700 whitespace-nowrap"
            >
              See options →
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
