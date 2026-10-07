import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { loadJSON, saveJSON } from '@/lib/storage'

const KEY = 'menti.favorites'

interface FavoritesValue {
  slugs: string[]
  toggle: (slug: string) => void
  has: (slug: string) => boolean
}

const FavoritesContext = createContext<FavoritesValue | null>(null)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [slugs, setSlugs] = useState<string[]>(() => loadJSON<string[]>(KEY, []))
  useEffect(() => {
    saveJSON(KEY, slugs)
  }, [slugs])

  const toggle = useCallback((slug: string) => {
    setSlugs((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]))
  }, [])
  const has = useCallback((slug: string) => slugs.includes(slug), [slugs])

  const value = useMemo<FavoritesValue>(() => ({ slugs, toggle, has }), [slugs, toggle, has])

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export function useFavorites(): FavoritesValue {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites must be used inside <FavoritesProvider>')
  return ctx
}
