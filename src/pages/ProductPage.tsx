import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { HeartIcon } from '@/components/ui/Icons'
import { Eyebrow, Heading, Rule, Section, Stars } from '@/components/ui/Type'
import { ProductCard } from '@/components/product/ProductCard'
import { useCart } from '@/context/CartContext'
import { useFavorites } from '@/context/FavoritesContext'
import { reviews } from '@/data/content'
import { getProduct, money, priceOf, products } from '@/data/products'
import NotFoundPage from './NotFoundPage'

const pillars = [
  { n: '01 // Cosecha', title: 'Extracción lunar de Grasse', body: 'Pétalos de jazmín recogidos a mano solo entre la medianoche y las 4:00 a. m. en Grasse, capturando la flor en su máxima densidad aromática volátil antes de la oxidación del alba.' },
  { n: '02 // Recipiente', title: 'Escultura de vidrio obsidiana', body: 'Cada frasco se talla a máquina en vidrio denso ultraclaro recubierto de carbono mineral ahumado, y se cierra con un prisma óptico cincelado a mano.' },
  { n: '03 // Maduración', title: 'Reposo subterráneo', body: 'Reposa 730 días en bóvedas subterráneas a 12 °C constantes. El alquitrán de abedul se suaviza como seda mientras los aldehídos metálicos fríos se funden con los minerales de basalto volcánico.' },
]

export default function ProductPage() {
  const { slug = '' } = useParams()
  const product = getProduct(slug)
  const [ml, setMl] = useState<number | null>(null)
  const [added, setAdded] = useState(false)
  const { add } = useCart()
  const { has, toggle } = useFavorites()

  if (!product) return <NotFoundPage />

  const size = ml ?? product.sizes[product.sizes.length - 1].ml
  const price = priceOf(product, size)
  const fav = has(product.slug)
  const productReviews = reviews.filter((r) => r.product === product.name)
  const shownReviews = (productReviews.length >= 3 ? productReviews : reviews).slice(0, 3)
  const similar = products.filter((p) => p.slug !== product.slug).slice(0, 4)

  const onAdd = () => {
    add(product.slug, size)
    setAdded(true)
  }

  const noteLabels = { top: 'Salida', heart: 'Corazón', base: 'Fondo' } as const

  return (
    <>
      <Section label="Producto" className="!py-10 md:!py-14">
        <nav aria-label="Ruta de navegación" className="mb-8 font-mono text-[11px] uppercase tracking-[2px] text-muted">
          <Link to="/collection" className="hover:text-ink">Colección</Link> <span className="mx-2 text-muted-soft">//</span>
          {product.family} <span className="mx-2 text-muted-soft">//</span>
          <span className="text-ink">{product.name}</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="border border-hairline bg-canvas">
              <img src={product.image} alt={`Frasco ${product.name}`} className="aspect-square w-full object-cover" />
            </div>
            <div className="mt-4 grid grid-cols-4 gap-4">
              {[product.image, ...products.filter((p) => p.slug !== product.slug).slice(0, 3).map((p) => p.image)].map((src, i) => (
                <div key={src + i} className={`aspect-square border ${i === 0 ? 'border-ink' : 'border-hairline'}`}>
                  <img src={src} alt="" className="size-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <Eyebrow className="mb-3">
              <span className="mr-2 inline-block size-1.5 bg-link" />
              {product.intensity} // {product.limited ? 'Tirada limitada' : 'Edición permanente'}
            </Eyebrow>
            <Heading as="h1" size="xl">{product.name}</Heading>
            <p className="mt-4 font-mono text-[14px] uppercase tracking-[2px] text-ink">
              {money(price)} <span className="ml-2 text-[10px] text-muted">Impuestos incluidos — envío por mensajería diplomática</span>
            </p>
            <p className="mt-6 font-text text-[18px] text-body">{product.description}</p>

            <Rule className="my-8" />
            <Eyebrow className="mb-4">Arquitectura olfativa y extracciones</Eyebrow>
            <dl className="m-0 space-y-3 font-text text-[16px] text-body">
              {(['top', 'heart', 'base'] as const).map((k) => (
                <div key={k} className="grid grid-cols-[72px_1fr] gap-4">
                  <dt className="font-mono text-[10px] uppercase tracking-[2px] text-muted">{noteLabels[k]}</dt>
                  <dd className="m-0">{product.notes[k]}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 grid grid-cols-2 border border-hairline">
              {[
                ['Intensidad // Estela', 'Monolítica (4,8 / 5,0)'],
                ['Duración', '18+ horas sobre la piel'],
                ['Método de extracción', 'Enfleurage ultrasónico en frío'],
                ['Recipiente', 'Obsidiana ahumada tallada a mano'],
              ].map(([k, v]) => (
                <div key={k} className="border-hairline p-4 [&:nth-child(odd)]:border-r [&:nth-child(-n+2)]:border-b">
                  <p className="font-mono text-[10px] uppercase tracking-[2px] text-muted">{k}</p>
                  <p className="mt-1 font-mono text-[12px] uppercase tracking-[1px] text-ink">{v}</p>
                </div>
              ))}
            </div>

            <fieldset className="m-0 mt-8 border-0 p-0">
              <legend className="mb-3 flex w-full justify-between font-mono text-[10px] uppercase tracking-[2px] text-muted">
                <span>Elige el tamaño</span>
                <span className="text-link">En stock — listo para despachar</span>
              </legend>
              <div className="grid grid-cols-3 gap-3">
                {product.sizes.map((s) => (
                  <label
                    key={s.ml}
                    className={`cursor-pointer border p-3 text-center font-mono text-[11px] uppercase tracking-[2px] ${
                      s.ml === size ? 'border-ink text-ink' : 'border-hairline text-muted hover:border-hairline-strong'
                    }`}
                  >
                    <input
                      type="radio"
                      name="size"
                      className="sr-only"
                      checked={s.ml === size}
                      onChange={() => {
                        setMl(s.ml)
                        setAdded(false)
                      }}
                      aria-label={`${s.ml} ml, ${money(s.price)}`}
                    />
                    {s.ml} ML<br />
                    <span className="text-[10px] text-muted">{money(s.price)}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="mt-6 flex items-center gap-3">
              <Button full onClick={onAdd}>Añadir a la bolsa — {money(price)}</Button>
              <Button
                variant="icon"
                aria-label={fav ? 'Quitar de favoritos' : 'Añadir a favoritos'}
                aria-pressed={fav}
                onClick={() => toggle(product.slug)}
              >
                <HeartIcon size={16} filled={fav} />
              </Button>
            </div>
            {added && (
              <p role="status" className="mt-4 font-mono text-[11px] uppercase tracking-[2px] text-link">
                Añadido a tu bolsa. <Link to="/bag" className="underline underline-offset-4">Ver bolsa</Link>
              </p>
            )}

            <ul className="m-0 mt-8 list-none space-y-3 border border-hairline bg-surface-card p-5 font-mono text-[11px] uppercase tracking-[1.500px] text-body">
              <li>Viales de descubrimiento de 2 ml de regalo con cada pedido.</li>
              <li>Envío asegurado por mensajería diplomática en 24 horas.</li>
              <li>Certificado de procedencia numerado y sellado.</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section label="Artesanía" className="border-t border-hairline">
        <Eyebrow className="mb-3">Materia prima y savoir-faire</Eyebrow>
        <Heading>La alquimia de la obsidiana</Heading>
        <p className="mt-4 max-w-3xl font-text text-[18px] text-body">
          Rechazando los compromisos de la perfumería convencional, el atelier Menti crea artefactos monumentales mediante una maceración extrema en recipientes de granito negro a medida, aislados de la luz ultravioleta y de la vibración terrestre.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {pillars.map((p) => (
            <article key={p.n} className="border border-hairline bg-surface-card p-6">
              <Eyebrow>{p.n}</Eyebrow>
              <h3 className="mt-3 text-[22px] tracking-[2px]">{p.title}</h3>
              <p className="mt-3 font-text text-[16px] text-body">{p.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section label="Opiniones" className="border-t border-hairline">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow className="mb-3">Despachos del archivo</Eyebrow>
            <Heading>Crítica y opiniones</Heading>
          </div>
          <div className="text-right">
            <p className="font-mono text-[14px] tracking-[2px] text-ink">4,9 / 5,0</p>
            <Link to="/reviews" className="font-mono text-[10px] uppercase tracking-[2px] text-muted underline underline-offset-4">
              28 opiniones de conocedores
            </Link>
          </div>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {shownReviews.map((r) => (
            <figure key={r.id} className="m-0 border border-hairline bg-surface-card p-6">
              <Stars value={r.stars} />
              <blockquote className="m-0 mt-4 font-text text-[18px] text-ink">“{r.quote}”</blockquote>
              <figcaption className="mt-6 border-t border-hairline pt-4 font-mono text-[10px] uppercase tracking-[2px] text-muted">
                {r.author}
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <Section label="También te puede gustar" className="border-t border-hairline">
        <div className="flex items-end justify-between">
          <div>
            <Eyebrow className="mb-3">Extracciones complementarias</Eyebrow>
            <Heading>También te puede gustar</Heading>
          </div>
          <Link to="/collection" className="font-mono text-[11px] uppercase tracking-[2px] text-ink">Ver todo el archivo +</Link>
        </div>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {similar.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </Section>
    </>
  )
}
