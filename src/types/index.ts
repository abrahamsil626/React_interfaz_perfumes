export interface ProductSize {
  ml: number
  price: number
}

export interface Product {
  slug: string
  name: string
  tagline: string
  family: string
  archetype: string
  keyNotes: string[]
  concentration: string
  intensity: 'Extrait de Parfum' | 'Pure Parfum' | 'Eau de Parfum'
  sizes: ProductSize[]
  notes: { top: string; heart: string; base: string }
  description: string
  image: string
  limited?: boolean
}

export interface CartLine {
  slug: string
  ml: number
  qty: number
}

export interface OrderLine extends CartLine {
  name: string
  price: number
  image: string
}

export interface Order {
  number: string
  placedAt: string
  estimatedDelivery: string
  lines: OrderLine[]
  subtotal: number
  discount: number
  total: number
}

export interface User {
  name: string
  email: string
  provider: 'email' | 'google'
}

export interface Review {
  id: string
  stars: number
  title: string
  quote: string
  author: string
  product: string
  verified: boolean
}

export interface Boutique {
  city: string
  address: string
  hours: string
  phone: string
}

export interface FaqItem {
  id: string
  category: 'Envíos' | 'Devoluciones' | 'Autenticidad' | 'Pago' | 'Cuidado'
  question: string
  answer: string
}

export interface LegalDoc {
  slug: 'terms' | 'privacy' | 'returns'
  label: string
  updated: string
  sections: { title: string; body: string }[]
}
