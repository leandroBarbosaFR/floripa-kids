import { useState, useCallback } from 'react'
import {
  View, Text, TextInput, ScrollView, StyleSheet,
  ActivityIndicator, TouchableOpacity,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { supabase } from '@/lib/supabase'
import { useLang } from '@/context/LanguageContext'
import EventCard from '@/components/EventCard'
import type { Event } from '@/lib/types'
import { Search } from 'lucide-react-native'

export default function SearchScreen() {
  const { lang, t } = useLang()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Event[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const handleSearch = useCallback(async (text: string) => {
    setQuery(text)
    if (text.trim().length < 2) { setResults([]); setSearched(false); return }
    setLoading(true)
    const { data } = await supabase
      .from('events')
      .select('*, categories(*), event_photos(*)')
      .eq('is_published', true)
      .or(`title_en.ilike.%${text}%,title_pt.ilike.%${text}%,description_en.ilike.%${text}%,description_pt.ilike.%${text}%,location_name.ilike.%${text}%`)
      .limit(20)
    setResults((data as Event[]) ?? [])
    setLoading(false)
    setSearched(true)
  }, [])

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('Buscar', 'Search')}</Text>
      </View>

      <View style={styles.searchBox}>
        <Search size={18} color="#9ca3af" />
        <TextInput
          style={styles.input}
          placeholder={t('Buscar atividades, lugares…', 'Search activities, places…')}
          placeholderTextColor="#9ca3af"
          value={query}
          onChangeText={handleSearch}
          autoCorrect={false}
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => { setQuery(''); setResults([]); setSearched(false) }}>
            <Text style={styles.clear}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView contentContainerStyle={styles.results} showsVerticalScrollIndicator={false}>
        {loading && <ActivityIndicator color="#f97316" style={{ marginTop: 40 }} />}
        {!loading && searched && results.length === 0 && (
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyText}>{t('Nenhum resultado', 'No results found')}</Text>
          </View>
        )}
        {!loading && results.map(event => (
          <EventCard key={event.id} event={event} lang={lang} />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 },
  title: { fontSize: 22, fontWeight: '800', color: '#111827' },
  searchBox: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    marginHorizontal: 16, marginBottom: 12,
    backgroundColor: '#f3f4f6', borderRadius: 14,
    paddingHorizontal: 14, paddingVertical: 10,
  },
  input: { flex: 1, fontSize: 14, color: '#111827' },
  clear: { fontSize: 14, color: '#9ca3af', fontWeight: '700', paddingHorizontal: 4 },
  results: { paddingHorizontal: 16, paddingBottom: 24, gap: 16 },
  empty: { alignItems: 'center', paddingTop: 60, gap: 12 },
  emptyIcon: { fontSize: 40 },
  emptyText: { fontSize: 16, color: '#9ca3af' },
})
