'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'

interface FavoritesCtx {
  favorites: string[]
  toggle: (slug: string) => void
  isFavorite: (slug: string) => boolean
}

const Ctx = createContext<FavoritesCtx>({
  favorites: [],
  toggle: () => {},
  isFavorite: () => false,
})

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('favorites')
    if (stored) setFavorites(JSON.parse(stored))
  }, [])

  const toggle = useCallback((slug: string) => {
    setFavorites((prev) => {
      const next = prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
      localStorage.setItem('favorites', JSON.stringify(next))
      return next
    })
  }, [])

  const isFavorite = useCallback((slug: string) => favorites.includes(slug), [favorites])

  return <Ctx.Provider value={{ favorites, toggle, isFavorite }}>{children}</Ctx.Provider>
}

export const useFavorites = () => useContext(Ctx)
