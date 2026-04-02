import { useState, useEffect } from 'react'

// Florianópolis default coords (fallback when event has no lat/lng)
const FLORIPA_LAT = -27.5954
const FLORIPA_LNG = -48.548

export type WeatherResult = {
  tempMin: number
  tempMax: number
  weatherCode: number
} | null

const cache: Record<string, WeatherResult> = {}

export function useWeather(
  lat: number | null,
  lng: number | null,
  dateStr: string | null,
): { weather: WeatherResult; loading: boolean } {
  const [weather, setWeather] = useState<WeatherResult>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!dateStr) return

    const eventDate = new Date(dateStr)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const diffDays = Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

    // Open-Meteo only forecasts 16 days ahead; skip past events
    if (diffDays < 0 || diffDays > 16) return

    const resolvedLat = lat ?? FLORIPA_LAT
    const resolvedLng = lng ?? FLORIPA_LNG
    const date = eventDate.toISOString().split('T')[0]
    const cacheKey = `${resolvedLat},${resolvedLng},${date}`

    if (cache[cacheKey] !== undefined) {
      setWeather(cache[cacheKey])
      return
    }

    setLoading(true)
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${resolvedLat}&longitude=${resolvedLng}` +
      `&daily=temperature_2m_max,temperature_2m_min,weathercode` +
      `&timezone=America%2FSao_Paulo&start_date=${date}&end_date=${date}`,
    )
      .then(r => r.json())
      .then(data => {
        const result: WeatherResult = {
          tempMin: Math.round(data.daily.temperature_2m_min[0]),
          tempMax: Math.round(data.daily.temperature_2m_max[0]),
          weatherCode: data.daily.weathercode[0],
        }
        cache[cacheKey] = result
        setWeather(result)
      })
      .catch(() => {
        cache[cacheKey] = null
      })
      .finally(() => setLoading(false))
  }, [lat, lng, dateStr])

  return { weather, loading }
}

// Map WMO weather codes → label
export function weatherLabel(code: number, lang: 'pt' | 'en'): string {
  if (code === 0) return lang === 'pt' ? 'Céu limpo' : 'Clear sky'
  if (code <= 3) return lang === 'pt' ? 'Parcialmente nublado' : 'Partly cloudy'
  if (code <= 48) return lang === 'pt' ? 'Nublado/névoa' : 'Cloudy/fog'
  if (code <= 55) return lang === 'pt' ? 'Garoa' : 'Drizzle'
  if (code <= 65) return lang === 'pt' ? 'Chuva' : 'Rain'
  if (code <= 77) return lang === 'pt' ? 'Neve' : 'Snow'
  if (code <= 82) return lang === 'pt' ? 'Pancadas' : 'Showers'
  return lang === 'pt' ? 'Trovoada' : 'Thunderstorm'
}

// Map WMO code → Lucide icon name
export function weatherIconName(code: number): 'Sun' | 'Cloud' | 'CloudDrizzle' | 'CloudRain' | 'CloudSnow' | 'CloudLightning' | 'CloudFog' {
  if (code === 0) return 'Sun'
  if (code <= 3) return 'Cloud'
  if (code <= 48) return 'CloudFog'
  if (code <= 55) return 'CloudDrizzle'
  if (code <= 65) return 'CloudRain'
  if (code <= 77) return 'CloudSnow'
  if (code <= 82) return 'CloudRain'
  return 'CloudLightning'
}
