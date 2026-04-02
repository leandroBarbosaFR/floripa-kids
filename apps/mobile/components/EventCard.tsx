import { useRef } from 'react'
import { View, Text, StyleSheet, Image, Pressable, Animated } from 'react-native'
import { useRouter } from 'expo-router'
import type { Event, Language } from '@/lib/types'
import { MapPin, Clock, Users, Sun, Cloud, CloudDrizzle, CloudRain, CloudSnow, CloudLightning, CloudFog, LucideIcon } from 'lucide-react-native'
import { useWeather, weatherIconName } from '@/lib/weather'

const WEATHER_ICONS: Record<string, LucideIcon> = {
  Sun, Cloud, CloudDrizzle, CloudRain, CloudSnow, CloudLightning, CloudFog,
}

function WeatherBadge({ lat, lng, dateStr, lang }: { lat: number | null; lng: number | null; dateStr: string; lang: Language }) {
  const { weather } = useWeather(lat, lng, dateStr)
  if (!weather) return null
  const IconComponent = WEATHER_ICONS[weatherIconName(weather.weatherCode)]
  const label = lang === 'pt' ? 'Previsão' : 'Weather'
  return (
    <View style={weatherStyles.badge}>
      <IconComponent size={12} color="#f97316" />
      <Text style={weatherStyles.text}>{label}: {weather.tempMin}–{weather.tempMax}°C</Text>
    </View>
  )
}

const weatherStyles = StyleSheet.create({
  badge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#fff7ed', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 12 },
  text: { fontSize: 11, color: '#f97316', fontWeight: '600' },
})

type Props = { event: Event; lang: Language }

export default function EventCard({ event, lang }: Props) {
  const router = useRouter()
  const t = (pt: string, en: string) => (lang === 'pt' ? pt : en)

  const category = event.category as { name_en: string; name_pt: string; icon: string; color: string } | undefined
  const photos = (event.event_photos ?? event.photos) as typeof event.photos
  const primaryPhoto = photos?.find(p => p.is_primary) ?? photos?.[0]

  const priceLabel =
    event.price_type === 'free' ? t('Grátis', 'Free')
    : event.price_type === 'paid' ? (lang === 'pt' ? event.price_description_pt : event.price_description_en) ?? t('Pago', 'Paid')
    : t('Variável', 'Varies')

  const ageLabel =
    event.age_min != null && event.age_max != null
      ? `${event.age_min}–${event.age_max} ${t('anos', 'yrs')}`
      : event.age_min != null
      ? `${event.age_min}+ ${t('anos', 'yrs')}`
      : null

  const scale = useRef(new Animated.Value(1)).current

  return (
    <Pressable
      onPressIn={() => Animated.timing(scale, { toValue: 0.97, duration: 100, useNativeDriver: true }).start()}
      onPressOut={() => Animated.timing(scale, { toValue: 1, duration: 150, useNativeDriver: true }).start()}
      onPress={() => router.push(`/event/${event.id}`)}
    >
    <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
      {/* Cover photo */}
      {primaryPhoto ? (
        <Image source={{ uri: primaryPhoto.url }} style={styles.image} />
      ) : (
        <View style={[styles.imagePlaceholder, { backgroundColor: (category?.color ?? '#f97316') + '20' }]}>
          <Text style={styles.placeholderIcon}>{category?.icon ?? '📍'}</Text>
        </View>
      )}

      {/* Category badge */}
      {category && (
        <View style={[styles.badge, { backgroundColor: category.color + '20' }]}>
          <Text style={[styles.badgeText, { color: category.color }]}>
            {category.icon} {lang === 'pt' ? category.name_pt : category.name_en}
          </Text>
        </View>
      )}

      {/* Price badge */}
      <View style={[styles.priceBadge, { backgroundColor: event.price_type === 'free' ? '#dcfce7' : '#dbeafe' }]}>
        <Text style={[styles.priceText, { color: event.price_type === 'free' ? '#16a34a' : '#1d4ed8' }]}>{priceLabel}</Text>
      </View>

      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={2}>
          {lang === 'pt' ? event.title_pt : event.title_en}
        </Text>

        {event.location_name ? (
          <View style={styles.row}>
            <MapPin size={13} color="#9ca3af" />
            <Text style={styles.meta} numberOfLines={1}>{event.location_name}</Text>
          </View>
        ) : null}

        {event.is_recurring && (event.recurring_description_en || event.recurring_description_pt) ? (
          <View style={styles.row}>
            <Clock size={13} color="#9ca3af" />
            <Text style={styles.meta}>
              {lang === 'pt' ? event.recurring_description_pt : event.recurring_description_en}
            </Text>
          </View>
        ) : event.date_start ? (
          <View style={styles.row}>
            <Clock size={13} color="#9ca3af" />
            <Text style={styles.meta}>
              {new Date(event.date_start).toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'en-AU', {
                day: 'numeric', month: 'short', year: 'numeric',
              })}
            </Text>
            <WeatherBadge lat={event.location_lat} lng={event.location_lng} dateStr={event.date_start} lang={lang} />
          </View>
        ) : null}

        {ageLabel && (
          <View style={styles.row}>
            <Users size={13} color="#9ca3af" />
            <Text style={styles.meta}>{ageLabel}</Text>
          </View>
        )}
      </View>
    </Animated.View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  image: { width: '100%', height: 180 },
  imagePlaceholder: {
    width: '100%', height: 180,
    alignItems: 'center', justifyContent: 'center',
  },
  placeholderIcon: { fontSize: 52 },
  badge: {
    position: 'absolute', top: 12, left: 12,
    paddingHorizontal: 10, paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: { fontSize: 11, fontWeight: '700' },
  priceBadge: {
    position: 'absolute', top: 12, right: 12,
    paddingHorizontal: 10, paddingVertical: 4,
    borderRadius: 20,
  },
  priceText: { fontSize: 11, fontWeight: '700' },
  body: { padding: 14, gap: 6 },
  title: { fontSize: 16, fontWeight: '700', color: '#FFA451', lineHeight: 22 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  meta: { fontSize: 12, color: '#6b7280', flex: 1 },
})
