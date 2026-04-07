export interface HourForecast {
  hour: number
  temp: number
  precipProb: number
  weatherCode: number
}

export interface DayForecast {
  date: string
  dayLabel: string
  isToday: boolean
  maxTemp: number
  minTemp: number
  weatherCode: number
  precipProb: number
}

export interface FloripWeather {
  currentTemp: number
  currentWeatherCode: number
  currentPrecipProb: number
  days: DayForecast[]
  todayHours: HourForecast[]
}

export function weatherLabel(code: number): string {
  if (code === 0) return 'Clear sky'
  if (code === 1) return 'Mainly clear'
  if (code === 2) return 'Partly cloudy'
  if (code === 3) return 'Overcast'
  if (code <= 48) return 'Foggy'
  if (code <= 55) return 'Drizzle'
  if (code <= 65) return 'Rain'
  if (code <= 77) return 'Snow'
  if (code <= 82) return 'Rain showers'
  if (code <= 86) return 'Snow showers'
  return 'Thunderstorm'
}

export function weatherEmoji(code: number): string {
  if (code === 0) return '☀️'
  if (code <= 2) return '🌤️'
  if (code === 3) return '☁️'
  if (code <= 48) return '🌫️'
  if (code <= 55) return '🌦️'
  if (code <= 65) return '🌧️'
  if (code <= 77) return '❄️'
  if (code <= 82) return '🌦️'
  if (code <= 86) return '🌨️'
  return '⛈️'
}

export async function getFloripWeather(): Promise<FloripWeather | null> {
  try {
    const url =
      'https://api.open-meteo.com/v1/forecast' +
      '?latitude=-27.5954&longitude=-48.5480' +
      '&hourly=temperature_2m,precipitation_probability,weathercode' +
      '&daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_probability_max' +
      '&timezone=America%2FSao_Paulo' +
      '&forecast_days=7'

    const res = await fetch(url, { next: { revalidate: 1800 } })
    if (!res.ok) return null
    const data = await res.json()

    // Find current hour in Sao Paulo time
    const nowSP = new Date(
      new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }),
    )
    const pad = (n: number) => String(n).padStart(2, '0')
    const todayStr = `${nowSP.getFullYear()}-${pad(nowSP.getMonth() + 1)}-${pad(nowSP.getDate())}`
    const currentHourStr = `${todayStr}T${pad(nowSP.getHours())}:00`

    const hourlyTimes: string[] = data.hourly.time
    const currentHourIdx = Math.max(0, hourlyTimes.findIndex((t) => t === currentHourStr))

    const currentTemp = Math.round(data.hourly.temperature_2m[currentHourIdx])
    const currentWeatherCode: number = data.hourly.weathercode[currentHourIdx]
    const currentPrecipProb: number = data.hourly.precipitation_probability[currentHourIdx]

    // Next 12 hours
    const todayHours: HourForecast[] = []
    for (let i = 0; i < 12; i++) {
      const idx = currentHourIdx + i
      if (idx >= hourlyTimes.length) break
      todayHours.push({
        hour: parseInt(hourlyTimes[idx].slice(11, 13)),
        temp: Math.round(data.hourly.temperature_2m[idx]),
        precipProb: data.hourly.precipitation_probability[idx],
        weatherCode: data.hourly.weathercode[idx],
      })
    }

    // 7-day daily
    const days: DayForecast[] = (data.daily.time as string[]).map((date, i) => {
      const d = new Date(date + 'T12:00:00-03:00')
      return {
        date,
        isToday: date === todayStr,
        dayLabel: date === todayStr
          ? 'Today'
          : d.toLocaleDateString('en-US', { weekday: 'short' }),
        maxTemp: Math.round(data.daily.temperature_2m_max[i]),
        minTemp: Math.round(data.daily.temperature_2m_min[i]),
        weatherCode: data.daily.weathercode[i],
        precipProb: data.daily.precipitation_probability_max[i],
      }
    })

    return { currentTemp, currentWeatherCode, currentPrecipProb, days, todayHours }
  } catch {
    return null
  }
}
