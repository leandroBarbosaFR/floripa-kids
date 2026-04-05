'use client'

import { SessionProvider } from 'next-auth/react'
import { FavoritesProvider } from './FavoritesProvider'
import { NotificationsProvider } from './NotificationsProvider'
import ToastContainer from './ToastContainer'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <FavoritesProvider>
        <NotificationsProvider>
          {children}
          <ToastContainer />
        </NotificationsProvider>
      </FavoritesProvider>
    </SessionProvider>
  )
}
