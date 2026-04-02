import { useEffect, useState } from 'react'
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
  Image, Linking, ActivityIndicator, Dimensions,
} from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { supabase } from '@/lib/supabase'
import { useLang } from '@/context/LanguageContext'
import type { Event } from '@/lib/types'
import { ArrowLeft, MapPin, Clock, Globe, Phone, Users, DollarSign, Sun, Cloud, CloudDrizzle, CloudRain, CloudSnow, CloudLightning, CloudFog, LucideIcon } from 'lucide-react-native'
import { useWeather, weatherIconName, weatherLabel } from '@/lib/weather'

const WEATHER_ICONS: Record<string, LucideIcon> = {
  Sun, Cloud, CloudDrizzle, CloudRain, CloudSnow, CloudLightning, CloudFog,
}

const { width } = Dimensions.get('window')

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const router = useRouter()
  const { lang, toggleLang, t } = useLang()
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [photoIndex, setPhotoIndex] = useState(0)

  const { weather } = useWeather(
    event?.location_lat ?? null,
    event?.location_lng ?? null,
    (!event?.is_recurring && event?.date_start) ? event.date_start : null,
  )

  useEffect(() => {
    supabase
      .from('events')
      .select('*, categories(*), event_photos(*)')
      .eq('id', id)
      .single()
      .then(({ data }) => {
        setEvent(data as Event)
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color="#f97316" size="large" />
      </View>
    )
  }

  if (!event) return null

  const category = event.category as { name_en: string; name_pt: string; icon: string; color: string } | undefined
  const photos = (event.event_photos ?? event.photos) as typeof event.photos ?? []
  const sortedPhotos = [...photos].sort((a, b) => (b.is_primary ? 1 : 0) - (a.is_primary ? 1 : 0))

  const title = lang === 'pt' ? event.title_pt : event.title_en
  const description = lang === 'pt' ? event.description_pt : event.description_en

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Photo gallery */}
        <View style={styles.photoContainer}>
          {sortedPhotos.length > 0 ? (
            <>
              <ScrollView
                horizontal pagingEnabled showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={e => setPhotoIndex(Math.round(e.nativeEvent.contentOffset.x / width))}
              >
                {sortedPhotos.map(p => (
                  <Image key={p.id} source={{ uri: p.url }} style={styles.photo} />
                ))}
              </ScrollView>
              {sortedPhotos.length > 1 && (
                <View style={styles.dots}>
                  {sortedPhotos.map((_, i) => (
                    <View key={i} style={[styles.dot, i === photoIndex && styles.dotActive]} />
                  ))}
                </View>
              )}
            </>
          ) : (
            <View style={[styles.photoPlaceholder, { backgroundColor: (category?.color ?? '#f97316') + '20' }]}>
              <Text style={{ fontSize: 72 }}>{category?.icon ?? '📍'}</Text>
            </View>
          )}

          {/* Back button */}
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <ArrowLeft size={20} color="#111827" />
          </TouchableOpacity>

          {/* Lang toggle */}
          <TouchableOpacity onPress={toggleLang} style={styles.langBtn}>
            <Text style={styles.langText}>{lang === 'en' ? '🇧🇷' : '🇬🇧'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {/* Category */}
          {category && (
            <View style={[styles.categoryBadge, { backgroundColor: category.color + '20' }]}>
              <Text style={[styles.categoryText, { color: category.color }]}>
                {category.icon} {lang === 'pt' ? category.name_pt : category.name_en}
              </Text>
            </View>
          )}

          <Text style={styles.title}>{title}</Text>

          {/* Info rows */}
          <View style={styles.infoSection}>
            {event.location_name ? (
              <InfoRow icon={<MapPin size={16} color="#f97316" />} label={event.location_name} sub={event.location_address} />
            ) : null}

            {event.is_recurring ? (
              <InfoRow
                icon={<Clock size={16} color="#f97316" />}
                label={lang === 'pt' ? (event.recurring_description_pt ?? '') : (event.recurring_description_en ?? '')}
              />
            ) : event.date_start ? (
              <>
                <InfoRow
                  icon={<Clock size={16} color="#f97316" />}
                  label={new Date(event.date_start).toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'en-AU', {
                    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
                  })}
                  sub={event.date_end ? `${t('até', 'until')} ${new Date(event.date_end).toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'en-AU', { day: 'numeric', month: 'short' })}` : undefined}
                />
                {weather && (() => {
                  const WeatherIcon = WEATHER_ICONS[weatherIconName(weather.weatherCode)]
                  return (
                    <InfoRow
                      icon={<WeatherIcon size={16} color="#f97316" />}
                      label={t('Previsão do tempo', 'Expected weather')}
                      sub={`${weatherLabel(weather.weatherCode, lang)} · ${weather.tempMin}–${weather.tempMax}°C`}
                    />
                  )
                })()}
              </>
            ) : null}

            <InfoRow
              icon={<DollarSign size={16} color="#f97316" />}
              label={
                event.price_type === 'free' ? t('Grátis', 'Free')
                : (lang === 'pt' ? event.price_description_pt : event.price_description_en) ?? t('Pago', 'Paid')
              }
            />

            {(event.age_min != null || event.age_max != null) && (
              <InfoRow
                icon={<Users size={16} color="#f97316" />}
                label={
                  event.age_min != null && event.age_max != null
                    ? `${event.age_min}–${event.age_max} ${t('anos', 'years old')}`
                    : `${event.age_min ?? event.age_max}+ ${t('anos', 'years old')}`
                }
              />
            )}
          </View>

          {/* Description */}
          {description ? (
            <View style={styles.descSection}>
              <Text style={styles.sectionTitle}>{t('Sobre', 'About')}</Text>
              <Text style={styles.description}>{description}</Text>
            </View>
          ) : null}

          {/* Actions */}
          <View style={styles.actions}>
            {event.website ? (
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => Linking.openURL(event.website!)}
              >
                <Globe size={16} color="#f97316" />
                <Text style={styles.actionText}>{t('Site', 'Website')}</Text>
              </TouchableOpacity>
            ) : null}

            {event.phone ? (
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => Linking.openURL(`https://wa.me/${event.phone!.replace(/\D/g, '')}`)}
              >
                <Phone size={16} color="#f97316" />
                <Text style={styles.actionText}>WhatsApp</Text>
              </TouchableOpacity>
            ) : null}

            {event.location_address ? (
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => Linking.openURL(`https://maps.apple.com/?q=${encodeURIComponent(event.location_address)}`)}
              >
                <MapPin size={16} color="#f97316" />
                <Text style={styles.actionText}>{t('Mapa', 'Map')}</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

function InfoRow({ icon, label, sub }: { icon: React.ReactNode; label: string; sub?: string }) {
  return (
    <View style={infoStyles.row}>
      <View style={infoStyles.icon}>{icon}</View>
      <View style={{ flex: 1 }}>
        <Text style={infoStyles.label}>{label}</Text>
        {sub ? <Text style={infoStyles.sub}>{sub}</Text> : null}
      </View>
    </View>
  )
}

const infoStyles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, paddingVertical: 8 },
  icon: { width: 28, height: 28, borderRadius: 8, backgroundColor: '#fff7ed', alignItems: 'center', justifyContent: 'center' },
  label: { fontSize: 14, color: '#111827', fontWeight: '500' },
  sub: { fontSize: 12, color: '#6b7280', marginTop: 2 },
})

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  photoContainer: { position: 'relative' },
  photo: { width, height: 280 },
  photoPlaceholder: { width, height: 280, alignItems: 'center', justifyContent: 'center' },
  dots: { position: 'absolute', bottom: 12, alignSelf: 'center', flexDirection: 'row', gap: 6 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.5)' },
  dotActive: { backgroundColor: '#fff', width: 18 },
  backBtn: {
    position: 'absolute', top: 16, left: 16,
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center', justifyContent: 'center',
  },
  langBtn: {
    position: 'absolute', top: 16, right: 16,
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center', justifyContent: 'center',
  },
  langText: { fontSize: 18 },
  content: { padding: 20, gap: 16 },
  categoryBadge: { alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20 },
  categoryText: { fontSize: 12, fontWeight: '700' },
  title: { fontSize: 24, fontWeight: '800', color: '#111827', lineHeight: 30 },
  infoSection: { backgroundColor: '#f9fafb', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 4 },
  descSection: { gap: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#111827' },
  description: { fontSize: 14, color: '#4b5563', lineHeight: 22 },
  actions: { flexDirection: 'row', gap: 12, flexWrap: 'wrap' },
  actionBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: '#fff7ed', paddingHorizontal: 16, paddingVertical: 10,
    borderRadius: 12, borderWidth: 1, borderColor: '#fed7aa',
  },
  actionText: { fontSize: 13, fontWeight: '600', color: '#ea580c' },
})
