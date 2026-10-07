import { describe, expect, it } from 'vitest'
import { isEmail, validateCard } from '@/lib/validation'

const NOW = new Date('2026-10-07T00:00:00Z')
const ok = { number: '4112 0000 0000 8892', name: 'Marcel', expiry: '09 / 28', cvc: '123' }

describe('validateCard (AC-CHK-3)', () => {
  it('acepta una tarjeta válida', () => {
    expect(validateCard(ok, NOW)).toEqual({})
  })
  it('rechaza número corto, nombre vacío, CVC inválido', () => {
    const e = validateCard({ number: '1234', name: '', expiry: '09 / 28', cvc: '1' }, NOW)
    expect(Object.keys(e).sort()).toEqual(['cvc', 'name', 'number'])
  })
  it('rechaza caducidad pasada, mes 13 y formato incorrecto', () => {
    expect(validateCard({ ...ok, expiry: '01 / 20' }, NOW).expiry).toBeDefined()
    expect(validateCard({ ...ok, expiry: '13 / 30' }, NOW).expiry).toBeDefined()
    expect(validateCard({ ...ok, expiry: '0928' }, NOW).expiry).toBeDefined()
  })
  it('acepta el mes en curso', () => {
    expect(validateCard({ ...ok, expiry: '10 / 26' }, NOW).expiry).toBeUndefined()
  })
})

describe('isEmail', () => {
  it('valida formatos básicos', () => {
    expect(isEmail('a@b.co')).toBe(true)
    expect(isEmail('a@b')).toBe(false)
    expect(isEmail('')).toBe(false)
  })
})
