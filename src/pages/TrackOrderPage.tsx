import { Button } from '@/components/ui/Button'
import { Eyebrow, Heading, Rule, Section } from '@/components/ui/Type'
import { useCart } from '@/context/CartContext'
import { money } from '@/data/products'

const steps = ['Confirmado', 'Preparado', 'Enviado', 'Entregado'] as const
const CURRENT = 2 // AC-TRK-1: "Enviado"

const fmt = (iso: string) => new Date(iso).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })

export default function TrackOrderPage() {
  const { order } = useCart()
  const number = order?.number ?? 'MP-4410822'
  const placed = order ? fmt(order.placedAt) : '12 sep 2026'
  const eta = order ? fmt(order.estimatedDelivery) : '14 sep 2026'

  return (
    <Section label="Seguimiento del pedido">
      <Eyebrow className="mb-4">Pedido {number} {'//'} {placed}</Eyebrow>
      <Heading as="h1" size="xl">Sigue tu pedido</Heading>

      <ol className="m-0 mt-14 grid list-none grid-cols-2 gap-y-8 p-0 md:grid-cols-4" aria-label="Progreso del pedido">
        {steps.map((s, i) => (
          <li key={s} aria-current={i === CURRENT ? 'step' : undefined} className="relative pt-6">
            <span className={`absolute left-0 top-0 h-px w-full ${i <= CURRENT ? 'bg-ink' : 'bg-hairline'}`} />
            <span className={`absolute -top-[5px] left-0 size-[11px] ${i <= CURRENT ? 'bg-ink' : 'border border-hairline-strong bg-canvas'}`} />
            <p className={`font-mono text-[12px] uppercase tracking-[2px] ${i <= CURRENT ? 'text-ink' : 'text-muted-soft'}`}>
              {String(i + 1).padStart(2, '0')} {'//'} {s}
            </p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[2px] text-muted">
              {i < CURRENT ? placed : i === CURRENT ? 'En curso' : `Est. ${eta}`}
            </p>
          </li>
        ))}
      </ol>

      <Rule className="my-12" />
      <div className="grid gap-12 md:grid-cols-2">
        <dl className="m-0 space-y-5 font-mono text-[12px] uppercase tracking-[2px]">
          <div><dt className="text-muted">Transportista</dt><dd className="m-0 mt-1 text-ink">Mensajería aérea diplomática (sellada)</dd></div>
          <div><dt className="text-muted">Número de seguimiento</dt><dd className="m-0 mt-1 text-ink">DC-{number.replace('MP-', '')}-FR</dd></div>
          <div><dt className="text-muted">Entrega estimada</dt><dd className="m-0 mt-1 text-ink">{eta}</dd></div>
          <div><dt className="text-muted">Dirección de entrega</dt><dd className="m-0 mt-1 text-ink">24 Place Vendôme, 75001 París, Francia</dd></div>
        </dl>
        <div>
          <Eyebrow>Artículos</Eyebrow>
          <ul className="m-0 mt-4 list-none p-0">
            {(order?.lines ?? [{ slug: 'obsidia-noir', ml: 100, qty: 1, name: 'Obsidia Noir', price: 520, image: '/images/products/obsidian-cuts.jpg' }]).map((l) => (
              <li key={`${l.slug}-${l.ml}`} className="flex items-center gap-4 border-b border-hairline py-4">
                <img src={l.image} alt="" className="size-16 border border-hairline object-cover" />
                <div className="flex-1">
                  <p className="font-display text-[20px] uppercase tracking-[2px] text-ink">{l.name}</p>
                  <p className="font-mono text-[11px] uppercase tracking-[2px] text-muted">{l.ml} ml {'//'} Cant. {l.qty}</p>
                </div>
                <span className="font-mono text-[12px] tracking-[2px] text-ink">{money(l.price * l.qty)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-12"><Button to="/contact">Contactar con soporte</Button></div>
    </Section>
  )
}
