import { Link, useParams } from 'react-router-dom'
import { Eyebrow, Heading, Section } from '@/components/ui/Type'
import { legalDocs } from '@/data/content'
import NotFoundPage from './NotFoundPage'

export default function LegalPage() {
  const { doc } = useParams()
  const current = legalDocs.find((d) => d.slug === doc)
  // AC-LEG-2
  if (!current) return <NotFoundPage />

  return (
    <Section label="Legal">
      <Eyebrow className="mb-4">Legal &amp; compliance</Eyebrow>
      <Heading as="h1" size="xl">{current.label}</Heading>

      <div className="mt-12 grid gap-12 lg:grid-cols-[240px_1fr]">
        <nav aria-label="Legal documents" className="flex flex-col lg:sticky lg:top-24 lg:self-start">
          {legalDocs.map((d) => (
            <Link
              key={d.slug}
              to={`/legal/${d.slug}`}
              aria-current={d.slug === current.slug ? 'page' : undefined}
              className={`border-b border-hairline py-3 font-mono text-[12px] uppercase tracking-[2px] ${
                d.slug === current.slug ? 'text-ink' : 'text-muted hover:text-ink'
              }`}
            >
              {d.label}
            </Link>
          ))}
        </nav>

        <article className="max-w-[720px]">
          <p className="font-mono text-[11px] uppercase tracking-[2px] text-muted">Last updated {current.updated}</p>
          {current.sections.map((s, i) => (
            <section key={s.title} className="mt-10 border-t border-hairline pt-8">
              <h2 className="text-[26px] tracking-[3px]">{String(i + 1).padStart(2, '0')}. {s.title}</h2>
              <p className="mt-3 font-text text-[18px] text-body">{s.body}</p>
            </section>
          ))}
        </article>
      </div>
    </Section>
  )
}
