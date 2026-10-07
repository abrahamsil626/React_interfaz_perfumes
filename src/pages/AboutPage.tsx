import { Eyebrow, Heading, Rule, Section } from '@/components/ui/Type'

const pillars = [
  { n: '01', title: 'Sourcing', body: 'Raw materials gathered by hand at night in Grasse, Madagascar and the Massif Central.' },
  { n: '02', title: 'Composition', body: 'Every formula is composed by a single perfumer, without committee and without compromise.' },
  { n: '03', title: 'Maturation', body: 'Twenty-four lunar cycles of rest in subterranean vaults before a single flacon is released.' },
]

const timeline = [
  ['2014', 'First formula composed in a Grasse cellar.'],
  ['2018', 'The Obsidian series establishes the house.'],
  ['2021', 'Atelier opens at Place Vendôme, Paris.'],
  ['2026', 'The Archive: a permanent collection of numbered editions.'],
]

export default function AboutPage() {
  return (
    <>
      <section aria-label="Hero" className="relative flex min-h-[560px] items-center justify-center px-6 text-center">
        <img src="/images/products/faceted-noir.jpg" alt="" className="absolute inset-0 size-full object-cover opacity-40" />
        <div className="relative z-10">
          <Eyebrow className="mb-4">Our story</Eyebrow>
          <Heading as="h1" size="xl">The House of Menti</Heading>
        </div>
      </section>

      <Section label="Origin">
        <div className="mx-auto max-w-2xl space-y-6 font-text text-[20px] text-body">
          <p>Menti Parfum was founded on a single conviction: that a fragrance can be architecture. Not an accessory, but a structure that anchors a person in a room.</p>
          <p>We work slowly, in small batches, with materials chosen for their silence rather than their volume.</p>
        </div>
      </Section>

      <Section label="Craft" className="border-t border-hairline">
        <div className="grid gap-12 md:grid-cols-3">
          {pillars.map((p) => (
            <article key={p.n}>
              <p className="font-mono text-[12px] tracking-[2px] text-muted">{p.n}</p>
              <h2 className="mt-3 text-[28px] tracking-[3px]">{p.title}</h2>
              <p className="mt-3 font-text text-[18px] text-body">{p.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <section aria-label="Atelier" className="h-[420px] border-y border-hairline">
        <img src="/images/products/smoked-cylinder.jpg" alt="Atelier flacon" loading="lazy" className="size-full object-cover" />
      </section>

      <Section label="Timeline">
        <Heading size="md">Milestones</Heading>
        <Rule className="my-8" />
        <ol className="m-0 list-none p-0">
          {timeline.map(([year, text]) => (
            <li key={year} className="grid grid-cols-[100px_1fr] gap-6 border-b border-hairline py-6">
              <span className="font-mono text-[14px] tracking-[2px] text-ink">{year}</span>
              <span className="font-text text-[18px] text-body">{text}</span>
            </li>
          ))}
        </ol>
      </Section>

      <Section label="Quote" className="border-t border-hairline text-center">
        <blockquote className="mx-auto max-w-3xl font-text text-[32px] italic leading-snug text-ink">
          “A fragrance should not announce itself. It should be remembered.”
        </blockquote>
        <Eyebrow className="mt-6">The House of Menti</Eyebrow>
      </Section>
    </>
  )
}
