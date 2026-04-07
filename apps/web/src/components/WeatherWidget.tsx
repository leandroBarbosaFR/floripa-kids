'use client'

import Link from 'next/link'
import type { FloripWeather } from '@/lib/weather'
import { weatherEmoji, weatherLabel } from '@/lib/weather'

function PrecipBar({ prob }: { prob: number }) {
  return (
    <div className="flex items-center gap-1 mt-1">
      <div className="h-1 w-12 rounded-full bg-slate-200 overflow-hidden">
        <div
          className="h-full rounded-full bg-sky-400 transition-all"
          style={{ width: `${prob}%` }}
        />
      </div>
      <span className="text-xs text-slate-400">{prob}%</span>
    </div>
  )
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
              <span className="text-2xl leading-none">{weatherEmoji(weather.currentWeatherCode)}</span>
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
              <span className="text-xl leading-none">{weatherEmoji(day.weatherCode)}</span>
              <span className="text-sm font-bold text-slate-800">{day.maxTemp}°</span>
              <span className="text-xs text-slate-400">{day.minTemp}°</span>
              {day.precipProb > 0 && (
                <span className="text-xs text-sky-500 font-medium">{day.precipProb}%</span>
              )}
            </div>
          ))}
        </div>

        {/* Hourly forecast */}
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            Next 12 hours
          </p>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
            {weather.todayHours.map((h) => {
              const label = h.hour === 0 ? '12am'
                : h.hour < 12 ? `${h.hour}am`
                : h.hour === 12 ? '12pm'
                : `${h.hour - 12}pm`
              return (
                <div key={h.hour} className="flex-shrink-0 flex flex-col items-center gap-1 min-w-[52px]">
                  <span className="text-xs text-slate-400">{label}</span>
                  <span className="text-base leading-none">{weatherEmoji(h.weatherCode)}</span>
                  <span className="text-sm font-semibold text-slate-700">{h.temp}°</span>
                  <PrecipBar prob={h.precipProb} />
                </div>
              )
            })}
          </div>
        </div>

        {/* Rainy day suggestion */}
        {isRainy && (
          <div className="mt-5 flex items-center gap-3 bg-white/80 border border-sky-100 rounded-2xl px-4 py-3">
            <span className="text-2xl">🌧️</span>
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
