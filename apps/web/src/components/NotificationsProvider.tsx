'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'

interface AppNotification {
  id: string
  message: string
}

interface NotificationsCtx {
  notifications: AppNotification[]
  dismiss: (id: string) => void
}

const Ctx = createContext<NotificationsCtx>({ notifications: [], dismiss: () => {} })

const SEED: AppNotification[] = [
  { id: 'welcome-2026', message: '👋 Welcome! Tap ♥ on any activity to save it to your favourites.' },
]

export function NotificationsProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<AppNotification[]>([])

  useEffect(() => {
    const seen = JSON.parse(localStorage.getItem('seen_notifications') ?? '[]') as string[]
    setNotifications(SEED.filter((n) => !seen.includes(n.id)))
  }, [])

  const dismiss = useCallback((id: string) => {
    setNotifications((prev) => {
      const next = prev.filter((n) => n.id !== id)
      const seen = JSON.parse(localStorage.getItem('seen_notifications') ?? '[]') as string[]
      localStorage.setItem('seen_notifications', JSON.stringify([...seen, id]))
      return next
    })
  }, [])

  return <Ctx.Provider value={{ notifications, dismiss }}>{children}</Ctx.Provider>
}

export const useNotifications = () => useContext(Ctx)
