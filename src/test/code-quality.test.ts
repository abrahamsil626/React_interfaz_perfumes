import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const SRC = join(process.cwd(), 'src')

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f)
    if (statSync(p).isDirectory()) return f === 'test' ? [] : walk(p)
    return /\.tsx?$/.test(f) ? [p] : []
  })
}

describe('calidad de código', () => {
  it('ningún useEffect usa cuerpo de expresión (devolvería su resultado como función de limpieza)', () => {
    // Regresión: "destroy is not a function" en el navegador con StrictMode.
    const bad = walk(SRC).flatMap((f) =>
      readFileSync(f, 'utf8')
        .split('\n')
        .map((line, i) => ({ f, i: i + 1, line }))
        .filter(({ line }) => /useEffect\(\s*\(\)\s*=>\s*[^{\s]/.test(line))
        .map(({ f: file, i }) => `${file}:${i}`),
    )
    expect(bad).toEqual([])
  })
})
