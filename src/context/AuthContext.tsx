import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { User } from '@/types'
import { loadJSON, removeKey, saveJSON } from '@/lib/storage'

const KEY = 'menti.user'

interface AuthValue {
  user: User | null
  signIn: (email: string) => void
  signInWithGoogle: () => void
  signOut: () => void
}

const AuthContext = createContext<AuthValue | null>(null)

const nameFromEmail = (email: string) => {
  const local = email.split('@')[0] ?? 'Conocedor'
  return local.charAt(0).toUpperCase() + local.slice(1)
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => loadJSON<User | null>(KEY, null))

  useEffect(() => {
    if (user) saveJSON(KEY, user)
    else removeKey(KEY)
  }, [user])

  const signIn = useCallback((email: string) => {
    setUser({ name: nameFromEmail(email), email, provider: 'email' })
  }, [])
  const signInWithGoogle = useCallback(() => {
    setUser({ name: 'Marcel Van Den Berg', email: 'marcel@gmail.com', provider: 'google' })
  }, [])
  const signOut = useCallback(() => setUser(null), [])

  const value = useMemo<AuthValue>(
    () => ({ user, signIn, signInWithGoogle, signOut }),
    [user, signIn, signInWithGoogle, signOut],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
