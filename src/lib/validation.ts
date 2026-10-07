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
  if (!/^\d{16}$/.test(digits)) errors.number = 'Enter a 16-digit card number'
  if (card.name.trim().length < 2) errors.name = 'Enter the cardholder name'

  const m = /^(\d{2})\s*\/\s*(\d{2})$/.exec(card.expiry.trim())
  if (!m) {
    errors.expiry = 'Use MM / YY'
  } else {
    const month = Number(m[1])
    const year = 2000 + Number(m[2])
    const endOfMonth = new Date(year, month, 0, 23, 59, 59)
    if (month < 1 || month > 12 || endOfMonth < now) errors.expiry = 'Card expired or invalid'
  }

  if (!/^\d{3,4}$/.test(card.cvc)) errors.cvc = 'Enter 3 or 4 digits'
  return errors
}

export const isEmail = (v: string) => /^\S+@\S+\.\S+$/.test(v.trim())
