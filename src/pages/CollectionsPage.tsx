import { Link } from 'react-router-dom'
import { Eyebrow, Heading, Section } from '@/components/ui/Type'
import { collections } from '@/data/content'

export default function CollectionsPage() {
  return (
    <>
      <Section label="Collections" className="pb-0">
        <Eyebrow className="mb-4">The Houses of Menti</Eyebrow>
        <Heading as="h1" size="xl">Our Collections</Heading>
      </Section>
      {collections.map((c, i) => (
        <section key={c.name} aria-label={c.name} className="grid min-h-[560px] md:grid-cols-2">
          <img
            src={c.image}
            alt={`${c.name} collection`}
            loading="lazy"
            className={`size-full max-h-[720px] object-cover ${i % 2 ? 'md:order-2' : ''}`}
          />
          <div className="flex flex-col justify-center gap-5 px-6 py-16 md:px-20">
            <Eyebrow>{String(i + 1).padStart(2, '0')} // Series</Eyebrow>
            <Heading size="lg">{c.name}</Heading>
            <p className="max-w-sm font-text text-[18px] text-body">{c.line}</p>
            <Link to="/collection" className="font-mono text-[12px] uppercase tracking-[2px] text-link underline underline-offset-8">
              Discover
            </Link>
          </div>
        </section>
      ))}
    </>
  )
}
