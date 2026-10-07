import { useMemo, useState } from 'react'
import { Chip, Eyebrow, Heading, Rule, Section } from '@/components/ui/Type'
import { Check, Select } from '@/components/ui/Field'
import { ProductCard } from '@/components/product/ProductCard'
import { archetypes, families, intensities, keyNotes, products } from '@/data/products'

const TOTAL_ARCHIVE = 24 // mockup 02: "SHOWING 9 OF 24 FLACONS"

type Sort = 'curated' | 'price-asc' | 'price-desc'

const toggleIn = <T,>(list: T[], v: T) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v])

export default function CatalogPage() {
  const [fam, setFam] = useState<string[]>([])
  const [notes, setNotes] = useState<string[]>([])
  const [arch, setArch] = useState<string[]>([])
  const [intensity, setIntensity] = useState<string | null>(null)
  const [sort, setSort] = useState<Sort>('curated')

  const reset = () => {
    setFam([])
    setNotes([])
    setArch([])
    setIntensity(null)
    setSort('curated')
  }

  // AC-CAT-2 / AC-CAT-3
  const list = useMemo(() => {
    const filtered = products.filter(
      (p) =>
        (fam.length === 0 || fam.includes(p.family)) &&
        (notes.length === 0 || notes.some((n) => p.keyNotes.includes(n))) &&
        (arch.length === 0 || arch.includes(p.archetype)) &&
        (!intensity || p.intensity === intensity),
    )
    const price = (p: (typeof products)[number]) => p.sizes[p.sizes.length - 1].price
    if (sort === 'price-asc') return [...filtered].sort((a, b) => price(a) - price(b))
    if (sort === 'price-desc') return [...filtered].sort((a, b) => price(b) - price(a))
    return filtered
  }, [fam, notes, arch, intensity, sort])

  const countBy = (key: 'family' | 'archetype', value: string) => products.filter((p) => p[key] === value).length
  const active = fam.length + notes.length + arch.length + (intensity ? 1 : 0)

  return (
    <Section label="Colección">
      <Eyebrow className="mb-4">01 // Archivo y ediciones</Eyebrow>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <Heading as="h1" size="xl">La colección</Heading>
        <p className="max-w-sm font-text text-[16px] text-body">
          Artefactos olfativos esculpidos en la oscuridad mineral y destilados en Grasse. Frascos monolíticos concebidos para la permanencia.
        </p>
      </div>
      <Rule className="my-10" />

      <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <p aria-live="polite" className="font-mono text-[11px] uppercase tracking-[2px] text-ink">
            Mostrando {list.length} de {TOTAL_ARCHIVE} frascos
          </p>
          <Chip active={active === 0} onClick={reset}>Todas las familias</Chip>
        </div>
        <Select label="Ordenar por" value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="w-56">
          <option value="curated">Archivo curado</option>
          <option value="price-asc">Precio: de menor a mayor</option>
          <option value="price-desc">Precio: de mayor a menor</option>
        </Select>
      </div>

      <div className="grid gap-12 lg:grid-cols-[260px_1fr]">
        <aside aria-label="Filtros" className="space-y-8">
          <fieldset className="m-0 space-y-3 border-0 border-b border-hairline p-0 pb-8">
            <legend className="mb-4 font-mono text-[12px] uppercase tracking-[2px] text-ink">Familia olfativa</legend>
            {families.map((f) => (
              <Check key={f} label={f} hint={`(${countBy('family', f)})`} checked={fam.includes(f)} onChange={() => setFam(toggleIn(fam, f))} />
            ))}
          </fieldset>

          <fieldset className="m-0 border-0 border-b border-hairline p-0 pb-8">
            <legend className="mb-4 font-mono text-[12px] uppercase tracking-[2px] text-ink">Notas clave</legend>
            <div className="flex flex-wrap gap-2">
              {keyNotes.map((n) => (
                <Chip key={n} active={notes.includes(n)} onClick={() => setNotes(toggleIn(notes, n))}>{n}</Chip>
              ))}
            </div>
          </fieldset>

          <fieldset className="m-0 space-y-3 border-0 border-b border-hairline p-0 pb-8">
            <legend className="mb-4 font-mono text-[12px] uppercase tracking-[2px] text-ink">Arquetipo</legend>
            {archetypes.map((a) => (
              <Check key={a} label={a} hint={`(${countBy('archetype', a)})`} checked={arch.includes(a)} onChange={() => setArch(toggleIn(arch, a))} />
            ))}
          </fieldset>

          <fieldset className="m-0 space-y-3 border-0 border-b border-hairline p-0 pb-8">
            <legend className="mb-4 font-mono text-[12px] uppercase tracking-[2px] text-ink">Intensidad</legend>
            {intensities.map((i) => (
              <Check key={i} kind="radio" name="intensity" label={i} checked={intensity === i} onChange={() => setIntensity(i)} />
            ))}
          </fieldset>

          <button
            type="button"
            onClick={reset}
            className="border-0 bg-transparent p-0 font-mono text-[11px] uppercase tracking-[2px] text-muted hover:text-ink"
          >
            ↺ Restablecer filtros
          </button>
        </aside>

        <div>
          {list.length === 0 ? (
            <p role="status" className="font-text text-[18px] italic text-body">
              Ningún frasco coincide con esta selección. Restablece los filtros para ver todo el archivo.
            </p>
          ) : (
            <ul className="m-0 grid list-none gap-x-8 gap-y-14 p-0 sm:grid-cols-2 xl:grid-cols-3">
              {list.map((p) => (
                <li key={p.slug}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          )}
          <nav aria-label="Paginación" className="mt-16 flex justify-center gap-2 border-t border-hairline pt-8 font-mono text-[11px] uppercase tracking-[2px]">
            <span className="border border-hairline px-4 py-2 text-muted-soft">Anterior</span>
            <span aria-current="page" className="bg-ink px-4 py-2 text-canvas">1</span>
            <span className="border border-hairline px-4 py-2 text-muted">2</span>
            <span className="border border-hairline px-4 py-2 text-muted">3</span>
            <span className="border border-hairline px-4 py-2 text-muted">Siguiente</span>
          </nav>
        </div>
      </div>
    </Section>
  )
}
