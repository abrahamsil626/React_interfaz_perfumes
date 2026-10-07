import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Eyebrow, Heading, Section } from '@/components/ui/Type'
import { ProductCard } from '@/components/product/ProductCard'
import { products } from '@/data/products'
import type { Product } from '@/types'

interface Step {
  question: string
  options: { label: string; caption: string; match: (p: Product) => boolean }[]
}

// AC-QUIZ-1: 5 pasos
const steps: Step[] = [
  {
    question: '¿Qué atmósfera te define?',
    options: [
      { label: 'Amaderado', caption: 'Cedro ahumado, abedul y basalto frío.', match: (p) => p.family === 'Maderas ahumadas' },
      { label: 'Floral', caption: 'Jazmín nocturno e iris.', match: (p) => p.family === 'Floral nocturno' },
      { label: 'Oriental', caption: 'Ámbar volcánico, resina y vainilla.', match: (p) => p.family === 'Ámbar volcánico' },
      { label: 'Fresco', caption: 'Ozono frío, mineral y cedro blanco.', match: (p) => p.family === 'Mineral frío' },
    ],
  },
  {
    question: '¿Cuándo usas fragancia?',
    options: [
      { label: 'Noche', caption: 'Densa, oscura y lenta.', match: (p) => p.intensity !== 'Eau de Parfum' },
      { label: 'Día', caption: 'Más ligera y limpia.', match: (p) => p.intensity === 'Eau de Parfum' },
      { label: 'Siempre', caption: 'Una única firma.', match: () => true },
      { label: 'Ocasiones', caption: 'Reservada para momentos.', match: (p) => !!p.limited },
    ],
  },
  {
    question: '¿Qué tan presente debe ser?',
    options: [
      { label: 'Susurro', caption: 'Cerca de la piel.', match: (p) => p.intensity === 'Eau de Parfum' },
      { label: 'Presencia', caption: 'Perceptible, nunca estridente.', match: (p) => p.intensity === 'Pure Parfum' },
      { label: 'Monolítica', caption: 'Una estela inconfundible.', match: (p) => p.intensity === 'Extrait de Parfum' },
      { label: 'Sorpréndeme', caption: 'Que decida la casa.', match: () => true },
    ],
  },
  {
    question: '¿Qué carácter te representa?',
    options: [
      { label: 'Monolito', caption: 'Unisex y arquitectónico.', match: (p) => p.archetype.startsWith('Unisex') },
      { label: 'Masculino oscuro', caption: 'Cuero, ámbar, profundidad.', match: (p) => p.archetype === 'Masculino oscuro' },
      { label: 'Nocturno', caption: 'Etéreo y nocturno.', match: (p) => p.archetype === 'Nocturno etéreo' },
      { label: 'Abierto', caption: 'Sin preferencia.', match: () => true },
    ],
  },
  {
    question: '¿Qué nota te atrae?',
    options: [
      { label: 'Obsidiana', caption: 'Mineral, fría, afilada.', match: (p) => p.keyNotes.includes('Obsidiana') },
      { label: 'Incienso', caption: 'Humo y ritual.', match: (p) => p.keyNotes.includes('Incienso') },
      { label: 'Alquitrán de abedul', caption: 'Ahumada y curtida.', match: (p) => p.keyNotes.includes('Alquitrán de abedul') },
      { label: 'Bourbon', caption: 'Profundidad cálida de vainilla.', match: (p) => p.keyNotes.includes('Bourbon') },
    ],
  },
]

export default function ScentFinderPage() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(() => steps.map(() => null))
  const finished = step >= steps.length

  const recommendations = () => {
    const scored = products.map((p) => ({
      p,
      score: steps.reduce((s, st, i) => {
        const a = answers[i]
        return a !== null && st.options[a].match(p) ? s + 1 : s
      }, 0),
    }))
    return scored.sort((a, b) => b.score - a.score).slice(0, 3).map((x) => x.p)
  }

  if (finished) {
    return (
      <Section label="Resultados">
        <Eyebrow className="mb-4">Diagnóstico completo</Eyebrow>
        <Heading as="h1" size="xl">Tu firma</Heading>
        <p className="mt-4 max-w-xl font-text text-[18px] italic text-body">
          Tres extracciones ajustadas a tu perfil olfativo.
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {recommendations().map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
        <div className="mt-12 flex gap-6">
          <Button onClick={() => { setStep(0); setAnswers(steps.map(() => null)) }}>Repetir</Button>
          <Link to="/collection" className="self-center font-mono text-[12px] uppercase tracking-[2px] text-ink underline underline-offset-8">
            Ver toda la colección
          </Link>
        </div>
      </Section>
    )
  }

  const current = steps[step]
  const chosen = answers[step]

  return (
    <Section label="Buscador de fragancia">
      <Eyebrow className="mb-6">Paso {step + 1} / {steps.length}</Eyebrow>
      <div className="mb-10 h-px bg-hairline">
        <div className="h-px bg-ink" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
      </div>
      <Heading as="h1" size="xl">{current.question}</Heading>

      <div role="radiogroup" aria-label={current.question} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {current.options.map((o, i) => (
          <button
            key={o.label}
            type="button"
            role="radio"
            aria-checked={chosen === i}
            onClick={() => setAnswers(answers.map((a, idx) => (idx === step ? i : a)))}
            className={`min-h-48 border bg-transparent p-6 text-left ${
              chosen === i ? 'border-ink' : 'border-hairline hover:border-hairline-strong'
            }`}
          >
            <span className="block font-display text-[28px] uppercase tracking-[3px] text-ink">{o.label}</span>
            <span className="mt-3 block font-text text-[16px] text-body">{o.caption}</span>
          </button>
        ))}
      </div>

      <div className="mt-12 flex gap-4">
        <Button disabled={step === 0} onClick={() => setStep(step - 1)}>Atrás</Button>
        <Button disabled={chosen === null} onClick={() => setStep(step + 1)}>
          {step === steps.length - 1 ? 'Ver resultados' : 'Continuar'}
        </Button>
      </div>
    </Section>
  )
}
