import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { LanguageProvider } from '@/context/LanguageContext'
import { useFonts, Pacifico_400Regular } from '@expo-google-fonts/pacifico'
import * as SplashScreen from 'expo-splash-screen'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import WelcomeScreen from '@/components/WelcomeScreen'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded] = useFonts({ Pacifico_400Regular })
  const [showWelcome, setShowWelcome] = useState(false)

  useEffect(() => {
    if (!loaded) return
    SplashScreen.hideAsync()
    AsyncStorage.getItem('welcomed').then(val => {
      if (!val) setShowWelcome(true)
    })
  }, [loaded])

  const handleContinue = () => {
    AsyncStorage.setItem('welcomed', '1')
    setShowWelcome(false)
  }

  if (!loaded) return null

  return (
    <SafeAreaProvider>
      <LanguageProvider>
        <StatusBar style={showWelcome ? 'light' : 'dark'} />
        <Stack screenOptions={{ headerShown: false }} />
        {showWelcome && <WelcomeScreen onContinue={handleContinue} />}
      </LanguageProvider>
    </SafeAreaProvider>
  )
}
