import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Eyebrow, Heading, Section } from '@/components/ui/Type'
import { useCart, PROMO_CODE } from '@/context/CartContext'
import { money, products } from '@/data/products'

const blocks = [
  { title: 'Sets de regalo', body: 'Dos frascos numerados en un estuche de obsidiana acabado a mano, con certificado de procedencia sellado.', value: 'Desde $ 940 USD', image: '/images/products/faceted-noir.jpg' },
  { title: 'Kit de descubrimiento', body: 'Ocho viales de 2 ml de la colección permanente. Su costo se abona a tu primer frasco.', value: '$ 65 USD', image: '/images/products/smoked-cylinder.jpg' },
  { title: 'Programa de fidelidad', body: 'Acumula un punto por dólar. Canjéalo en asignaciones privadas y citas en el atelier.', value: '1 punto / $ 1', image: '/images/products/matte-gold.jpg' },
]

const pad = (n: number) => String(n).padStart(2, '0')

function useCountdown(seconds: number) {
  const [left, setLeft] = useState(seconds)
  useEffect(() => {
    const id = window.setInterval(() => setLeft((s) => (s > 0 ? s - 1 : 0)), 1000)
    return () => window.clearInterval(id)
  }, [])
  return `${pad(Math.floor(left / 3600))}:${pad(Math.floor((left % 3600) / 60))}:${pad(left % 60)}`
}

export default function PromotionsPage() {
  const { add } = useCart()
  const [added, setAdded] = useState<string | null>(null)
  const clock = useCountdown(72 * 3600)

  return (
    <>
      <section aria-label="Venta privada" className="border-b border-hairline px-6 py-24 text-center md:py-32">
        <Eyebrow className="mb-4">Termina en <time className="text-ink">{clock}</time></Eyebrow>
        <Heading as="h1" size="xl">La venta privada</Heading>
        <p className="mx-auto mt-5 max-w-lg font-text text-[18px] italic text-body">
          Un diez por ciento en la colección permanente con el código <strong className="not-italic text-ink">{PROMO_CODE}</strong>, aplicado en tu bolsa.
        </p>
        <div className="mt-8">
          <Button to="/collection">Ver ofertas</Button>
        </div>
      </section>

      <Section label="Ofertas">
        <div className="grid gap-8 md:grid-cols-3">
          {blocks.map((b) => (
            <article key={b.title} className="border border-hairline bg-surface-card">
              <img src={b.image} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover" />
              <div className="p-6">
                <h3 className="text-[24px] tracking-[2px]">{b.title}</h3>
                <p className="mt-3 font-text text-[16px] text-body">{b.body}</p>
                <p className="mt-5 font-mono text-[12px] uppercase tracking-[2px] text-ink">{b.value}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section label="Ofertas seleccionadas" className="border-t border-hairline">
        <Eyebrow className="mb-3">Seleccionadas para la venta</Eyebrow>
        <Heading>Extracciones preferidas</Heading>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 4).map((p) => {
            const regular = p.sizes[p.sizes.length - 1].price
            const promo = Math.round(regular * 0.9)
            return (
              <article key={p.slug}>
                <Link to={`/product/${p.slug}`} className="block border border-hairline">
                  <img src={p.image} alt={`Frasco ${p.name}`} loading="lazy" className="aspect-square w-full object-cover" />
                </Link>
                <h3 className="mt-4 text-[22px] tracking-[2px]">{p.name}</h3>
                <p className="mt-1 font-mono text-[12px] uppercase tracking-[2px]">
                  <s className="text-muted-soft" aria-label={`Precio habitual ${money(regular)}`}>{money(regular)}</s>
                  <span className="ml-3 text-ink" aria-label={`Precio de oferta ${money(promo)}`}>{money(promo)}</span>
                </p>
                <Button
                  className="mt-4"
                  onClick={() => {
                    add(p.slug, p.sizes[p.sizes.length - 1].ml)
                    setAdded(p.name)
                  }}
                >
                  Añadir a la bolsa
                </Button>
              </article>
            )
          })}
        </div>
        {added && (
          <p role="status" className="mt-8 font-mono text-[11px] uppercase tracking-[2px] text-link">
            {added} añadido. <Link to="/bag" className="underline underline-offset-4">Ver bolsa</Link> e introduce {PROMO_CODE}.
          </p>
        )}
      </Section>
    </>
  )
}
