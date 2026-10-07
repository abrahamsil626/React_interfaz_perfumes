export interface CardInput {
  number: string
  name: string
  expiry: string
  cvc: string
}

export type CardErrors = Partial<Record<keyof CardInput, string>>

/** AC-CHK-3: 16 dígitos, nombre, caducidad MM/AA vigente, CVC de 3–4 dígitos. */
export function validateCard(card: CardInput, now = new Date()): CardErrors {
  const errors: CardErrors = {}
  const digits = card.number.replace(/\s+/g, '')
  if (!/^\d{16}$/.test(digits)) errors.number = 'Introduce un número de tarjeta de 16 dígitos'
  if (card.name.trim().length < 2) errors.name = 'Introduce el nombre del titular'

  const m = /^(\d{2})\s*\/\s*(\d{2})$/.exec(card.expiry.trim())
  if (!m) {
    errors.expiry = 'Usa el formato MM / AA'
  } else {
    const month = Number(m[1])
    const year = 2000 + Number(m[2])
    const endOfMonth = new Date(year, month, 0, 23, 59, 59)
    if (month < 1 || month > 12 || endOfMonth < now) errors.expiry = 'Tarjeta caducada o no válida'
  }

  if (!/^\d{3,4}$/.test(card.cvc)) errors.cvc = 'Introduce 3 o 4 dígitos'
  return errors
}

export const isEmail = (v: string) => /^\S+@\S+\.\S+$/.test(v.trim())
