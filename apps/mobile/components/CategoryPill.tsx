import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import {
  Waves, Trees, UtensilsCrossed, Laugh, House,
  PartyPopper, Dumbbell, BookOpen, Sparkles, type LucideIcon,
} from 'lucide-react-native'

const ICON_MAP: Record<string, LucideIcon> = {
  Beaches: Waves,
  Parks: Trees,
  Restaurants: UtensilsCrossed,
  Playgrounds: Laugh,
  Indoor: House,
  'Events & Festivals': PartyPopper,
  Sports: Dumbbell,
  Education: BookOpen,
  All: Sparkles,
  // PT names
  Praias: Waves,
  Parques: Trees,
  Restaurantes: UtensilsCrossed,
  Parquinhos: Laugh,
  'Ambientes Fechados': House,
  'Eventos & Festivais': PartyPopper,
  Esportes: Dumbbell,
  'Educação': BookOpen,
  Todos: Sparkles,
}

type Props = {
  label: string
  icon: string
  color: string
  selected: boolean
  onPress: () => void
}

export default function CategoryPill({ label, icon, color, selected, onPress }: Props) {
  const LucideIcon = ICON_MAP[label]

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.pill,
        selected
          ? { backgroundColor: color, borderColor: color }
          : { backgroundColor: '#f9fafb', borderColor: '#e5e7eb' },
      ]}
    >
      {LucideIcon ? (
        <LucideIcon size={14} color={selected ? '#fff' : '#f97316'} strokeWidth={2.5} />
      ) : (
        <Text style={styles.emoji}>{icon}</Text>
      )}
      <Text style={[styles.label, { color: selected ? '#fff' : '#374151' }]}>{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    paddingHorizontal: 12, paddingVertical: 7,
    borderRadius: 20, borderWidth: 1.5,
  },
  emoji: { fontSize: 14 },
  label: { fontSize: 12, fontWeight: '600' },
})
