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
        aria-label="Hero"
        className="relative flex min-h-[640px] items-center justify-center overflow-hidden px-6 text-center md:min-h-[760px]"
      >
        <img
          src="/images/products/hero-obsidian.jpg"
          alt=""
          className="absolute inset-0 size-full object-cover opacity-60"
        />
        <div className="relative z-10 flex flex-col items-center gap-6">
          <Eyebrow>Edition Noir // 2026</Eyebrow>
          <Heading as="h1" size="xl">The Art of Scent</Heading>
          <p className="max-w-md font-text text-[18px] italic text-body">
            Sculptural olfactory artifacts forged in silence, distilled in Grasse.
          </p>
          <Button to="/collection">Discover the collection</Button>
        </div>
      </section>

      {/* AC-HOME-2 */}
      <Section label="Olfactory anthologies" className="border-t border-hairline">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow className="mb-3">01 // Curated Editions</Eyebrow>
            <Heading>Olfactory Anthologies</Heading>
          </div>
          <p className="max-w-sm font-text text-[16px] italic text-muted">
            Bespoke high-concentration extraits encased in carved mineral vessels.
          </p>
        </div>
        <Rule className="my-10" />
        <div className="grid gap-10 md:grid-cols-3">
          {collections.slice(0, 3).map((c) => (
            <Link key={c.name} to="/collections" className="group block border border-hairline bg-surface-card">
              <img src={c.image} alt={`${c.name} series`} loading="lazy" className="aspect-[4/5] w-full object-cover" />
              <div className="p-6">
                <Eyebrow>Extrait de Parfum</Eyebrow>
                <h3 className="mt-2 text-[26px] tracking-[2px]">{c.name} Series</h3>
                <p className="mt-2 font-text text-[16px] text-body">{c.line}</p>
                <span className="mt-6 inline-block font-mono text-[11px] uppercase tracking-[2px] text-ink">Explore series +</span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* AC-HOME-3 */}
      <Section label="Permanent flacons" className="border-t border-hairline">
        <Eyebrow className="mb-3">02 // Archive Essentials</Eyebrow>
        <Heading>Permanent Flacons</Heading>
        <Rule className="my-10" />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 4).map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </Section>

      {/* AC-HOME-4 */}
      <section aria-label="Scent finder" className="border-y border-hairline bg-surface-soft px-6 py-24 text-center">
        <Eyebrow className="mb-4">Diagnostic Synthesis</Eyebrow>
        <Heading>Find Your Signature Scent</Heading>
        <p className="mx-auto mt-4 max-w-md font-text text-[18px] italic text-body">
          Our diagnostic consultation deciphers your olfactory profile through memory, geometry and architectural preference.
        </p>
        <div className="mt-8">
          <Button to="/scent-finder">Commence consultation</Button>
        </div>
      </section>

      {/* AC-HOME-5 */}
      <Section label="Philosophy">
        <div className="grid gap-12 md:grid-cols-[1fr_2fr]">
          <div>
            <Eyebrow className="mb-4">The Atelier Philosophy</Eyebrow>
            <Heading size="md">Timeless Form. Uncompromising Purity.</Heading>
            <Eyebrow className="mt-6">Grasse — Paris — Kyoto</Eyebrow>
          </div>
          <div className="space-y-5 border-l border-hairline pl-8 font-text text-[18px] text-body">
            <p>
              Menti Parfum rejects the ephemeral noise of commercial perfumery. Each flacon is designed as an architectural entity — a monolith conceived to anchor the sanctuary of the collector.
            </p>
            <p>
              Our formulas are matured in subterranean vaults for twenty-four lunar cycles before release, using non-denatured carrier spirits and undiluted absolutes extracted at threshold cold temperatures.
            </p>
            <Link to="/about" className="font-mono text-[11px] uppercase tracking-[2px] text-link underline underline-offset-8">
              Read the architectural manifesto
            </Link>
          </div>
        </div>
      </Section>

      <Section label="Press" className="border-t border-hairline text-center">
        <blockquote className="mx-auto max-w-3xl font-text text-[28px] italic leading-snug text-ink">
          “Menti Parfum transcends fragrance into the realm of sculptural permanence. It is not worn; it inhabits.”
        </blockquote>
        <Eyebrow className="mt-6">The Architectural Review, Paris</Eyebrow>
      </Section>

      <Section label="Newsletter" className="border-t border-hairline text-center">
        <Eyebrow className="mb-4">Confidential Allocations</Eyebrow>
        <Heading>Private Dispatches</Heading>
        <p className="mx-auto mt-4 max-w-md font-text text-[18px] italic text-body">
          Receive quarterly private releases and unlisted batch invitations.
        </p>
        {done ? (
          <p role="status" className="mt-8 font-mono text-[12px] uppercase tracking-[2px] text-ink">
            You are on the list.
          </p>
        ) : (
          <form onSubmit={onSubscribe} className="mx-auto mt-8 flex max-w-md items-end gap-4" noValidate>
            <Input
              label="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@domain.com"
              className="flex-1 text-left"
            />
            <Button type="submit" className="px-6">Subscribe</Button>
          </form>
        )}
      </Section>
    </>
  )
}
