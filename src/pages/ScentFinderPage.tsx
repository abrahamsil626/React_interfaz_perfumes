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
    question: 'Which atmosphere defines you?',
    options: [
      { label: 'Woody', caption: 'Smoked cedar, birch and cold basalt.', match: (p) => p.family === 'Smoked Woods' },
      { label: 'Floral', caption: 'Night-blooming jasmine and iris.', match: (p) => p.family === 'Nocturnal Floral' },
      { label: 'Oriental', caption: 'Volcanic amber, resin and vanilla.', match: (p) => p.family === 'Volcanic Amber' },
      { label: 'Fresh', caption: 'Cold ozone, mineral and white cedar.', match: (p) => p.family === 'Cold Mineral' },
    ],
  },
  {
    question: 'When do you wear fragrance?',
    options: [
      { label: 'Evening', caption: 'Dense, dark and slow.', match: (p) => p.intensity !== 'Eau de Parfum' },
      { label: 'Daytime', caption: 'Lighter and cleaner.', match: (p) => p.intensity === 'Eau de Parfum' },
      { label: 'Always', caption: 'A single signature.', match: () => true },
      { label: 'Occasions', caption: 'Reserved for moments.', match: (p) => !!p.limited },
    ],
  },
  {
    question: 'How present should it be?',
    options: [
      { label: 'Whisper', caption: 'Close to the skin.', match: (p) => p.intensity === 'Eau de Parfum' },
      { label: 'Presence', caption: 'Noticeable, never loud.', match: (p) => p.intensity === 'Pure Parfum' },
      { label: 'Monolithic', caption: 'Unmistakable sillage.', match: (p) => p.intensity === 'Extrait de Parfum' },
      { label: 'Surprise me', caption: 'Let the house decide.', match: () => true },
    ],
  },
  {
    question: 'Which character suits you?',
    options: [
      { label: 'Monolith', caption: 'Genderless and architectural.', match: (p) => p.archetype.startsWith('Genderless') },
      { label: 'Dark masculine', caption: 'Leather, amber, depth.', match: (p) => p.archetype === 'Dark Masculine' },
      { label: 'Nocturne', caption: 'Ethereal and nocturnal.', match: (p) => p.archetype === 'Ethereal Nocturne' },
      { label: 'Open', caption: 'No preference.', match: () => true },
    ],
  },
  {
    question: 'Which note draws you in?',
    options: [
      { label: 'Obsidian', caption: 'Mineral, cold, sharp.', match: (p) => p.keyNotes.includes('Obsidian') },
      { label: 'Incense', caption: 'Smoke and ritual.', match: (p) => p.keyNotes.includes('Incense') },
      { label: 'Birch tar', caption: 'Smoked and leathery.', match: (p) => p.keyNotes.includes('Birch Tar') },
      { label: 'Bourbon', caption: 'Warm vanilla depth.', match: (p) => p.keyNotes.includes('Bourbon') },
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
      <Section label="Results">
        <Eyebrow className="mb-4">Diagnostic complete</Eyebrow>
        <Heading as="h1" size="xl">Your Signature</Heading>
        <p className="mt-4 max-w-xl font-text text-[18px] italic text-body">
          Three extractions matched to your olfactory profile.
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {recommendations().map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
        <div className="mt-12 flex gap-6">
          <Button onClick={() => { setStep(0); setAnswers(steps.map(() => null)) }}>Retake</Button>
          <Link to="/collection" className="self-center font-mono text-[12px] uppercase tracking-[2px] text-ink underline underline-offset-8">
            View full collection
          </Link>
        </div>
      </Section>
    )
  }

  const current = steps[step]
  const chosen = answers[step]

  return (
    <Section label="Scent finder">
      <Eyebrow className="mb-6">Step {step + 1} / {steps.length}</Eyebrow>
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
        <Button disabled={step === 0} onClick={() => setStep(step - 1)}>Back</Button>
        <Button disabled={chosen === null} onClick={() => setStep(step + 1)}>
          {step === steps.length - 1 ? 'See results' : 'Continue'}
        </Button>
      </div>
    </Section>
  )
}
