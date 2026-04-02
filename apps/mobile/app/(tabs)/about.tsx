import { View, Text, StyleSheet, Linking, TouchableOpacity, ScrollView } from 'react-native'
import { Heart } from 'lucide-react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLang } from '@/context/LanguageContext'

export default function AboutScreen() {
  const { lang, toggleLang, t } = useLang()

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Floripa with Kids</Text>
          <Text style={styles.heroSub}>
            {t(
              'Descubra as melhores atividades para fazer com seus filhos em Florianópolis.',
              'Discover the best activities to do with your kids in Florianópolis.',
            )}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t('Sobre o app', 'About the app')}</Text>
          <Text style={styles.cardText}>
            {t(
              'Floripa with Kids é um guia de atividades para famílias em Florianópolis, SC. Aqui você encontra praias, parques, restaurantes, eventos e muito mais — tudo pensado para crianças e famílias.',
              'Floripa with Kids is a family activity guide for Florianópolis, SC. Here you\'ll find beaches, parks, restaurants, events and much more — all designed for kids and families.',
            )}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t('Idioma / Language', 'Language / Idioma')}</Text>
          <TouchableOpacity style={styles.langToggle} onPress={toggleLang}>
            <Text style={styles.langToggleText}>
              {lang === 'en' ? '🇧🇷 Mudar para Português' : '🇬🇧 Switch to English'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t('Contato', 'Contact')}</Text>
          <TouchableOpacity onPress={() => Linking.openURL('mailto:hello@1367studio.com')}>
            <Text style={styles.link}>hello@1367studio.com</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t('Legal', 'Legal')}</Text>
          <TouchableOpacity onPress={() => Linking.openURL('https://floripa-kids-web.vercel.app/privacy')}>
            <Text style={styles.link}>{t('Política de Privacidade', 'Privacy Policy')}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.versionRow}>
          <Text style={styles.version}>v1.0.0 · {t('Feito com', 'Made with')} </Text>
          <Heart size={12} color="#9ca3af" fill="#9ca3af" />
          <Text style={styles.version}> {t('em Floripa', 'in Floripa')}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 20, gap: 16 },
  hero: { alignItems: 'center', paddingVertical: 24, gap: 8 },
  heroIcon: { fontSize: 56 },
  heroTitle: { fontSize: 26, fontWeight: '800', color: '#111827' },
  heroSub: { fontSize: 14, color: '#6b7280', textAlign: 'center', lineHeight: 20 },
  card: {
    backgroundColor: '#f9fafb', borderRadius: 16,
    padding: 16, gap: 8,
    borderWidth: 1, borderColor: '#f3f4f6',
  },
  cardTitle: { fontSize: 14, fontWeight: '700', color: '#111827' },
  cardText: { fontSize: 13, color: '#4b5563', lineHeight: 20 },
  langToggle: {
    backgroundColor: '#f97316', borderRadius: 12,
    paddingHorizontal: 16, paddingVertical: 10,
    alignSelf: 'flex-start',
  },
  langToggleText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  link: { color: '#f97316', fontSize: 14, fontWeight: '600' },
  versionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop: 8 },
  version: { fontSize: 12, color: '#9ca3af' },
})
