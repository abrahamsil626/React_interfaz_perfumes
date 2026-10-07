import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { CartLine, Order } from '@/types'
import { getProduct, priceOf } from '@/data/products'
import { loadJSON, saveJSON } from '@/lib/storage'

const CART_KEY = 'menti.cart'
const ORDER_KEY = 'menti.order'
export const PROMO_CODE = 'MENTI10'
const PROMO_RATE = 0.1

interface CartValue {
  /** Todas las líneas, incluidas las de cantidad 0 (solo `remove` las elimina). */
  lines: CartLine[]
  /** Líneas con cantidad ≥ 1: las únicas que cuentan para totales y pedido. */
  validLines: CartLine[]
  hasEmptyLines: boolean
  canCheckout: boolean
  count: number
  subtotal: number
  discount: number
  total: number
  promo: string | null
  order: Order | null
  add: (slug: string, ml: number) => void
  setQty: (slug: string, ml: number, qty: number) => void
  remove: (slug: string, ml: number) => void
  applyPromo: (code: string) => boolean
  clear: () => void
  placeOrder: () => Order | null
}

const CartContext = createContext<CartValue | null>(null)

const same = (a: CartLine, slug: string, ml: number) => a.slug === slug && a.ml === ml

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(() => loadJSON<CartLine[]>(CART_KEY, []))
  const [promo, setPromo] = useState<string | null>(null)
  const [order, setOrder] = useState<Order | null>(() => loadJSON<Order | null>(ORDER_KEY, null))

  useEffect(() => {
    saveJSON(CART_KEY, lines)
  }, [lines])
  useEffect(() => {
    saveJSON(ORDER_KEY, order)
  }, [order])

  const add = useCallback((slug: string, ml: number) => {
    setLines((prev) =>
      prev.some((l) => same(l, slug, ml))
        ? prev.map((l) => (same(l, slug, ml) ? { ...l, qty: l.qty + 1 } : l))
        : [...prev, { slug, ml, qty: 1 }],
    )
  }, [])

  // AC-CART-2: nunca elimina; valores negativos o no numéricos se llevan a 0
  const setQty = useCallback((slug: string, ml: number, qty: number) => {
    const safe = Number.isFinite(qty) ? Math.max(0, Math.floor(qty)) : 0
    setLines((prev) => prev.map((l) => (same(l, slug, ml) ? { ...l, qty: safe } : l)))
  }, [])

  const remove = useCallback((slug: string, ml: number) => {
    setLines((prev) => prev.filter((l) => !same(l, slug, ml)))
  }, [])

  const applyPromo = useCallback((code: string) => {
    const ok = code.trim().toUpperCase() === PROMO_CODE
    if (ok) setPromo(PROMO_CODE)
    return ok
  }, [])

  const clear = useCallback(() => {
    setLines([])
    setPromo(null)
  }, [])

  const validLines = useMemo(() => lines.filter((l) => l.qty >= 1), [lines])
  const hasEmptyLines = lines.length > validLines.length
  const canCheckout = validLines.length > 0

  const subtotal = useMemo(
    () =>
      validLines.reduce((sum, l) => {
        const p = getProduct(l.slug)
        return p ? sum + priceOf(p, l.ml) * l.qty : sum
      }, 0),
    [validLines],
  )
  const discount = promo ? Math.round(subtotal * PROMO_RATE) : 0
  const total = subtotal - discount
  const count = validLines.reduce((n, l) => n + l.qty, 0)

  const placeOrder = useCallback((): Order | null => {
    if (validLines.length === 0) return null
    const placed = new Date()
    const eta = new Date(placed.getTime() + 2 * 24 * 60 * 60 * 1000)
    const created: Order = {
      number: `MP-${String(placed.getTime()).slice(-7)}`,
      placedAt: placed.toISOString(),
      estimatedDelivery: eta.toISOString(),
      lines: validLines.flatMap((l) => {
        const p = getProduct(l.slug)
        return p ? [{ ...l, name: p.name, price: priceOf(p, l.ml), image: p.image }] : []
      }),
      subtotal,
      discount,
      total,
    }
    setOrder(created)
    setLines([])
    setPromo(null)
    return created
  }, [validLines, subtotal, discount, total])

  const value = useMemo<CartValue>(
    () => ({
      lines, validLines, hasEmptyLines, canCheckout, count, subtotal, discount, total, promo, order,
      add, setQty, remove, applyPromo, clear, placeOrder,
    }),
    [lines, validLines, hasEmptyLines, canCheckout, count, subtotal, discount, total, promo, order, add, setQty, remove, applyPromo, clear, placeOrder],
  )
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>')
  return ctx
}
