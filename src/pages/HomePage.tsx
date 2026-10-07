import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Heading, Eyebrow, Rule, Section } from '@/components/ui/Type'
import { Input } from '@/components/ui/Field'
import { ProductCard } from '@/components/product/ProductCard'
import { collections } from '@/data/content'
import { products } from '@/data/products'

export default function HomePage() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  const onSubscribe = (e: FormEvent) => {
    e.preventDefault()
    if (/\S+@\S+\.\S+/.test(email)) setDone(true)
  }

  return (
    <>
      {/* AC-HOME-1 */}
      <section
        aria-label="Portada"
        className="relative flex min-h-[640px] items-center justify-center overflow-hidden px-6 text-center md:min-h-[760px]"
      >
        <img
          src="/images/products/hero-obsidian.jpg"
          alt=""
          className="absolute inset-0 size-full object-cover opacity-60"
        />
        <div className="relative z-10 flex flex-col items-center gap-6">
          <Eyebrow>Edición Noir // 2026</Eyebrow>
          <Heading as="h1" size="xl">El arte del aroma</Heading>
          <p className="max-w-md font-text text-[18px] italic text-body">
            Artefactos olfativos esculpidos en el silencio, destilados en Grasse.
          </p>
          <Button to="/collection">Descubrir la colección</Button>
        </div>
      </section>

      {/* AC-HOME-2 */}
      <Section label="Antologías olfativas" className="border-t border-hairline">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow className="mb-3">01 // Ediciones curadas</Eyebrow>
            <Heading>Antologías olfativas</Heading>
          </div>
          <p className="max-w-sm font-text text-[16px] italic text-muted">
            Extraits de alta concentración a medida, encerrados en recipientes minerales tallados.
          </p>
        </div>
        <Rule className="my-10" />
        <div className="grid gap-10 md:grid-cols-3">
          {collections.slice(0, 3).map((c) => (
            <Link key={c.name} to="/collections" className="group block border border-hairline bg-surface-card">
              <img src={c.image} alt={`Serie ${c.name}`} loading="lazy" className="aspect-[4/5] w-full object-cover" />
              <div className="p-6">
                <Eyebrow>Extrait de Parfum</Eyebrow>
                <h3 className="mt-2 text-[26px] tracking-[2px]">Serie {c.name}</h3>
                <p className="mt-2 font-text text-[16px] text-body">{c.line}</p>
                <span className="mt-6 inline-block font-mono text-[11px] uppercase tracking-[2px] text-ink">Explorar serie +</span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* AC-HOME-3 */}
      <Section label="Frascos permanentes" className="border-t border-hairline">
        <Eyebrow className="mb-3">02 // Esenciales del archivo</Eyebrow>
        <Heading>Frascos permanentes</Heading>
        <Rule className="my-10" />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 4).map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </Section>

      {/* AC-HOME-4 */}
      <section aria-label="Buscador de fragancia" className="border-y border-hairline bg-surface-soft px-6 py-24 text-center">
        <Eyebrow className="mb-4">Síntesis diagnóstica</Eyebrow>
        <Heading>Encuentra tu aroma</Heading>
        <p className="mx-auto mt-4 max-w-md font-text text-[18px] italic text-body">
          Nuestra consulta diagnóstica descifra tu perfil olfativo a través de la memoria, la geometría y la preferencia arquitectónica.
        </p>
        <div className="mt-8">
          <Button to="/scent-finder">Comenzar consulta</Button>
        </div>
      </section>

      {/* AC-HOME-5 */}
      <Section label="Filosofía">
        <div className="grid gap-12 md:grid-cols-[1fr_2fr]">
          <div>
            <Eyebrow className="mb-4">La filosofía del atelier</Eyebrow>
            <Heading size="md">Forma atemporal. Pureza sin concesiones.</Heading>
            <Eyebrow className="mt-6">Grasse — París — Kioto</Eyebrow>
          </div>
          <div className="space-y-5 border-l border-hairline pl-8 font-text text-[18px] text-body">
            <p>
              Menti Parfum rechaza el ruido efímero de la perfumería comercial. Cada frasco está concebido como una entidad arquitectónica: un monolito pensado para anclar el santuario del coleccionista.
            </p>
            <p>
              Nuestras fórmulas maduran en bóvedas subterráneas durante veinticuatro ciclos lunares antes de su lanzamiento, con alcoholes portadores sin desnaturalizar y absolutos sin diluir extraídos a temperaturas umbral.
            </p>
            <Link to="/about" className="font-mono text-[11px] uppercase tracking-[2px] text-link underline underline-offset-8">
              Leer el manifiesto arquitectónico
            </Link>
          </div>
        </div>
      </Section>

      <Section label="Prensa" className="border-t border-hairline text-center">
        <blockquote className="mx-auto max-w-3xl font-text text-[28px] italic leading-snug text-ink">
          “Menti Parfum trasciende la fragancia hasta el reino de la permanencia escultórica. No se lleva puesto: se habita.”
        </blockquote>
        <Eyebrow className="mt-6">The Architectural Review, París</Eyebrow>
      </Section>

      <Section label="Boletín" className="border-t border-hairline text-center">
        <Eyebrow className="mb-4">Asignaciones confidenciales</Eyebrow>
        <Heading>Comunicaciones privadas</Heading>
        <p className="mx-auto mt-4 max-w-md font-text text-[18px] italic text-body">
          Recibe lanzamientos privados trimestrales e invitaciones a lotes no publicados.
        </p>
        {done ? (
          <p role="status" className="mt-8 font-mono text-[12px] uppercase tracking-[2px] text-ink">
            Ya estás en la lista.
          </p>
        ) : (
          <form onSubmit={onSubscribe} className="mx-auto mt-8 flex max-w-md items-end gap-4" noValidate>
            <Input
              label="Correo electrónico"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              className="flex-1 text-left"
            />
            <Button type="submit" className="px-6">Suscribirme</Button>
          </form>
        )}
      </Section>
    </>
  )
}
