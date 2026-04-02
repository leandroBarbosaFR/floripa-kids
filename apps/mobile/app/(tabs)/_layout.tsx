import { Tabs } from 'expo-router'
import { useLang } from '@/context/LanguageContext'
import { Home, Search, Info } from 'lucide-react-native'

export default function TabLayout() {
  const { t } = useLang()

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: 'rgba(255,255,255,0.6)',
        tabBarStyle: {
          backgroundColor: '#f97316',
          borderTopWidth: 0,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingBottom: 8,
          height: 72,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('Início', 'Home'),
          tabBarIcon: ({ color }) => <Home size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: t('Buscar', 'Search'),
          tabBarIcon: ({ color }) => <Search size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: t('Sobre', 'About'),
          tabBarIcon: ({ color }) => <Info size={22} color={color} />,
        }}
      />
    </Tabs>
  )
}
