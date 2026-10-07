import { Eyebrow, Heading, Rule, Section } from '@/components/ui/Type'

const pillars = [
  { n: '01', title: 'Origen', body: 'Materias primas recogidas a mano de noche en Grasse, Madagascar y el Macizo Central.' },
  { n: '02', title: 'Composición', body: 'Cada fórmula la compone un único perfumista, sin comités y sin concesiones.' },
  { n: '03', title: 'Maduración', body: 'Veinticuatro ciclos lunares de reposo en bóvedas subterráneas antes de liberar un solo frasco.' },
]

const timeline = [
  ['2014', 'Primera fórmula compuesta en una bodega de Grasse.'],
  ['2018', 'La serie Obsidiana establece la casa.'],
  ['2021', 'El atelier abre en Place Vendôme, París.'],
  ['2026', 'El Archivo: una colección permanente de ediciones numeradas.'],
]

export default function AboutPage() {
  return (
    <>
      <section aria-label="Portada" className="relative flex min-h-[560px] items-center justify-center px-6 text-center">
        <img src="/images/products/faceted-noir.jpg" alt="" className="absolute inset-0 size-full object-cover opacity-40" />
        <div className="relative z-10">
          <Eyebrow className="mb-4">Nuestra historia</Eyebrow>
          <Heading as="h1" size="xl">La casa de Menti</Heading>
        </div>
      </section>

      <Section label="Origen">
        <div className="mx-auto max-w-2xl space-y-6 font-text text-[20px] text-body">
          <p>Menti Parfum nació de una convicción: una fragancia puede ser arquitectura. No un accesorio, sino una estructura que ancla a una persona en una habitación.</p>
          <p>Trabajamos despacio, en lotes pequeños, con materiales elegidos por su silencio y no por su volumen.</p>
        </div>
      </Section>

      <Section label="Artesanía" className="border-t border-hairline">
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
        <img src="/images/products/smoked-cylinder.jpg" alt="Frasco del atelier" loading="lazy" className="size-full object-cover" />
      </section>

      <Section label="Cronología">
        <Heading size="md">Hitos</Heading>
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

      <Section label="Cita" className="border-t border-hairline text-center">
        <blockquote className="mx-auto max-w-3xl font-text text-[32px] italic leading-snug text-ink">
          “Una fragancia no debe anunciarse. Debe recordarse.”
        </blockquote>
        <Eyebrow className="mt-6">La casa de Menti</Eyebrow>
      </Section>
    </>
  )
}
