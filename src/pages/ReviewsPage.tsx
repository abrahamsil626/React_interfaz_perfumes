import { useMemo, useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Field'
import { Chip, Eyebrow, Heading, Rule, Section, Stars } from '@/components/ui/Type'
import { reviews as seed } from '@/data/content'
import { products } from '@/data/products'
import type { Review } from '@/types'

type Filter = 'all' | 'five'

export default function ReviewsPage() {
  const [list, setList] = useState<Review[]>(seed)
  const [filter, setFilter] = useState<Filter>('all')
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ title: '', quote: '', author: '', stars: 5, product: products[0].name })
  const [error, setError] = useState('')

  const average = useMemo(() => (list.reduce((s, r) => s + r.stars, 0) / list.length).toFixed(1), [list])
  const shown = filter === 'five' ? list.filter((r) => r.stars === 5) : list

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!form.title.trim() || !form.quote.trim() || !form.author.trim()) {
      setError('El título, la opinión y el nombre son obligatorios.')
      return
    }
    setList([{ id: `r${Date.now()}`, ...form, verified: false }, ...list])
    setForm({ title: '', quote: '', author: '', stars: 5, product: products[0].name })
    setError('')
    setOpen(false)
  }

  return (
    <Section label="Opiniones">
      <Eyebrow className="mb-4">Despachos del archivo</Eyebrow>
      <Heading as="h1" size="xl">Voces</Heading>
      <Rule className="my-10" />

      <div className="grid gap-12 lg:grid-cols-[320px_1fr]">
        <aside aria-label="Resumen de valoraciones">
          <p className="font-display text-[96px] leading-none tracking-[4px] text-ink">{average.replace('.', ',')}</p>
          <Stars value={Math.round(Number(average))} />
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[2px] text-muted">{list.length} opiniones</p>
          <ul className="m-0 mt-8 list-none space-y-3 p-0">
            {[5, 4, 3, 2, 1].map((n) => {
              const count = list.filter((r) => r.stars === n).length
              return (
                <li key={n} className="flex items-center gap-3 font-mono text-[11px] tracking-[2px] text-muted">
                  <span className="w-3">{n}</span>
                  <span className="h-px flex-1 bg-hairline">
                    <span className="block h-px bg-ink" style={{ width: `${(count / list.length) * 100}%` }} />
                  </span>
                  <span className="w-4 text-right">{count}</span>
                </li>
              )
            })}
          </ul>
          <Button className="mt-8" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
            Escribir una opinión
          </Button>
        </aside>

        <div>
          {open && (
            <form onSubmit={onSubmit} noValidate aria-label="Escribir una opinión" className="mb-12 grid gap-6 border border-hairline bg-surface-card p-6 md:grid-cols-2">
              <Input label="Título" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              <Input label="Tu nombre" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
              <div className="flex flex-col gap-1">
                <label htmlFor="rev-product" className="font-mono text-[11px] uppercase tracking-[2px] text-muted">Fragancia</label>
                <select id="rev-product" value={form.product} onChange={(e) => setForm({ ...form, product: e.target.value })} className="h-11 border-0 border-b border-hairline-strong bg-canvas font-mono text-[13px] uppercase tracking-[2px] text-ink">
                  {products.map((p) => <option key={p.slug}>{p.name}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="rev-stars" className="font-mono text-[11px] uppercase tracking-[2px] text-muted">Valoración</label>
                <select id="rev-stars" value={form.stars} onChange={(e) => setForm({ ...form, stars: Number(e.target.value) })} className="h-11 border-0 border-b border-hairline-strong bg-canvas font-mono text-[13px] uppercase tracking-[2px] text-ink">
                  {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} {n === 1 ? 'estrella' : 'estrellas'}</option>)}
                </select>
              </div>
              <Input label="Tu opinión" className="md:col-span-2" value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })} />
              {error && <p role="alert" className="font-mono text-[11px] uppercase tracking-[2px] text-link md:col-span-2">{error}</p>}
              <div className="md:col-span-2"><Button type="submit">Publicar opinión</Button></div>
            </form>
          )}

          <div className="mb-8 flex gap-3" role="group" aria-label="Filtrar opiniones">
            <Chip active={filter === 'all'} onClick={() => setFilter('all')}>Todas</Chip>
            <Chip active={filter === 'five'} onClick={() => setFilter('five')}>5 estrellas</Chip>
          </div>

          <ul className="m-0 list-none p-0">
            {shown.map((r) => (
              <li key={r.id} className="border-t border-hairline py-8">
                <Stars value={r.stars} />
                <h2 className="mt-3 text-[24px] tracking-[2px]">{r.title}</h2>
                <p className="mt-3 max-w-2xl font-text text-[18px] text-body">“{r.quote}”</p>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[2px] text-muted">
                  {r.author} {'//'} {r.product} {r.verified && '// Compra verificada'}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
