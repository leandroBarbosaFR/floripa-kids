import { useEffect, useState, useCallback } from 'react'
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, RefreshControl,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { supabase } from '@/lib/supabase'
import { useLang } from '@/context/LanguageContext'
import EventCard from '@/components/EventCard'
import CategoryPill from '@/components/CategoryPill'
import SkeletonCard from '@/components/SkeletonCard'
import AnimatedCard from '@/components/AnimatedCard'
import type { Event, Category } from '@/lib/types'

export default function HomeScreen() {
  const { lang, toggleLang, t } = useLang()
  const [categories, setCategories] = useState<Category[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const fetchData = useCallback(async () => {
    const [{ data: cats }, { data: evs }] = await Promise.all([
      supabase.from('categories').select('*').order('name_en'),
      supabase
        .from('events')
        .select('*, categories(*), event_photos(*)')
        .eq('is_published', true)
        .order('created_at', { ascending: false }),
    ])
    setCategories(cats ?? [])
    setEvents((evs as Event[]) ?? [])
    setLoading(false)
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await fetchData()
    setRefreshing(false)
  }, [fetchData])

  const filtered = selectedCategory
    ? events.filter(e => e.category_id === selectedCategory)
    : events

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Floripa</Text>
          <Text style={styles.subtitle}>{t('com Crianças', 'with Kids')}</Text>
        </View>
        <TouchableOpacity onPress={toggleLang} style={styles.langBtn}>
          <Text style={styles.langText}>{lang === 'en' ? '🇧🇷 PT' : '🇬🇧 EN'}</Text>
        </TouchableOpacity>
      </View>

      {/* Category pills — fixed, does not scroll with content */}
      <View style={styles.pillsWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pills}>
          <CategoryPill
            label={t('Todos', 'All')}
            icon="✨"
            color="#f97316"
            selected={selectedCategory === null}
            onPress={() => setSelectedCategory(null)}
          />
          {categories.map(cat => (
            <CategoryPill
              key={cat.id}
              label={lang === 'pt' ? cat.name_pt : cat.name_en}
              icon={cat.icon}
              color={cat.color}
              selected={selectedCategory === cat.id}
              onPress={() => setSelectedCategory(cat.id === selectedCategory ? null : cat.id)}
            />
          ))}
        </ScrollView>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#f97316" />}
      >
        {loading ? (
          <View style={styles.cards}>
            {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
          </View>
        ) : filtered.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyText}>{t('Nenhum evento encontrado', 'No events found')}</Text>
          </View>
        ) : (
          <View style={styles.cards}>
            {filtered.map((event, i) => (
              <AnimatedCard key={event.id} index={i}>
                <EventCard event={event} lang={lang} />
              </AnimatedCard>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fafafa' },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingVertical: 16,
    borderBottomWidth: 1, borderBottomColor: '#f3f4f6',
  },
  title: { fontSize: 22, fontWeight: '800', color: '#111827' },
  subtitle: { fontSize: 18, color: '#f97316', marginTop: 1, fontFamily: 'Pacifico_400Regular' },
  langBtn: {
    backgroundColor: '#f3f4f6', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6,
  },
  langText: { fontSize: 13, fontWeight: '600', color: '#374151' },
  pillsWrapper: {
    borderBottomWidth: 1, borderBottomColor: '#f3f4f6',
    backgroundColor: '#fafafa',
  },
  pills: { paddingHorizontal: 16, paddingVertical: 14, gap: 8 },
  cards: { paddingHorizontal: 16, paddingBottom: 24, gap: 16 },
  empty: { alignItems: 'center', paddingTop: 60, gap: 12 },
  emptyIcon: { fontSize: 40 },
  emptyText: { fontSize: 16, color: '#9ca3af' },
})
