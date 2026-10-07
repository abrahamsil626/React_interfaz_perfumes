import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const SRC = join(process.cwd(), 'src')

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f)
    if (statSync(p).isDirectory()) return f === 'test' ? [] : walk(p)
    return /\.(tsx?|css)$/.test(f) ? [p] : []
  })
}

const files = walk(SRC)
const read = (p: string) => readFileSync(p, 'utf8')

describe('spec 01 · conformidad con el sistema de diseño (Bugatti)', () => {
  it('hay archivos que revisar', () => {
    expect(files.length).toBeGreaterThan(20)
  })

  it('AC-DS-2: ningún peso tipográfico > 400 en las clases', () => {
    const bad = files.filter((f) => /\bfont-(bold|semibold|medium|extrabold|black)\b/.test(read(f)))
    expect(bad).toEqual([])
  })

  it('AC-DS-3: sin radios fuera de none / full', () => {
    const bad = files.filter((f) => /\brounded-(sm|md|lg|xl|2xl|3xl)\b/.test(read(f)))
    expect(bad).toEqual([])
  })

  it('AC-DS-6: sin sombras ni degradados decorativos', () => {
    const bad = files.filter((f) => /\bshadow-(sm|md|lg|xl|2xl)\b|\bbg-gradient|linear-gradient|radial-gradient/.test(read(f)))
    expect(bad).toEqual([])
  })

  it('AC-DS-1/7: sin colores hex fuera de los tokens (styles/index.css)', () => {
    const allowedInline = new Set(['#000'])
    const bad = files
      .filter((f) => !f.endsWith('index.css'))
      .flatMap((f) => (read(f).match(/#[0-9a-fA-F]{3,8}\b/g) ?? []).filter((h) => !allowedInline.has(h)).map((h) => `${f}: ${h}`))
    expect(bad).toEqual([])
  })

  it('AC-DS-1: el lienzo definido es #000000 y no existe modo claro', () => {
    const css = read(join(SRC, 'styles', 'index.css'))
    expect(css).toMatch(/--color-canvas:\s*#000000/)
    expect(css).not.toMatch(/prefers-color-scheme:\s*light/)
  })

  it('AC-DS-7: el único color cromático declarado es el azul hielo (y success para confirmación)', () => {
    const css = read(join(SRC, 'styles', 'index.css'))
    const colors = [...css.matchAll(/--color-([\w-]+):\s*(#[0-9a-f]{6})/gi)]
    const chromatic = colors.filter(([, , hex]) => {
      const n = parseInt(hex.slice(1), 16)
      const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255]
      return Math.max(r, g, b) - Math.min(r, g, b) > 8
    })
    expect(chromatic.map(([, name]) => name).sort()).toEqual(['link', 'success'])
  })
})
