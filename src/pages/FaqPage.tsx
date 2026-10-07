import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { MinusIcon, PlusIcon } from '@/components/ui/Icons'
import { Chip, Eyebrow, Heading, Section } from '@/components/ui/Type'
import { faqCategories, faqs } from '@/data/content'

export default function FaqPage() {
  const [category, setCategory] = useState<string>('Shipping')
  const [openId, setOpenId] = useState<string | null>(null)
  const list = faqs.filter((f) => f.category === category)

  return (
    <Section label="FAQ">
      <Eyebrow className="mb-4">Client service</Eyebrow>
      <Heading as="h1" size="xl">Frequently Asked Questions</Heading>

      <div className="mt-10 flex flex-wrap gap-3" role="group" aria-label="Categories">
        {faqCategories.map((c) => (
          <Chip key={c} active={category === c} onClick={() => { setCategory(c); setOpenId(null) }}>{c}</Chip>
        ))}
      </div>

      <ul className="m-0 mt-10 list-none border-b border-hairline p-0">
        {list.map((f) => {
          const open = openId === f.id
          return (
            <li key={f.id} className="border-t border-hairline">
              <h2 className="m-0">
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`${f.id}-panel`}
                  onClick={() => setOpenId(open ? null : f.id)}
                  className="flex w-full items-center justify-between gap-6 border-0 bg-transparent py-6 text-left font-display text-[22px] uppercase tracking-[2px] text-ink md:text-[26px]"
                >
                  {f.question}
                  {open ? <MinusIcon /> : <PlusIcon />}
                </button>
              </h2>
              {open && (
                <p id={`${f.id}-panel`} className="m-0 max-w-2xl pb-8 font-text text-[18px] text-body">{f.answer}</p>
              )}
            </li>
          )
        })}
      </ul>

      <div className="mt-20 text-center">
        <Eyebrow className="mb-4">Still need help?</Eyebrow>
        <Button to="/contact">Contact us</Button>
      </div>
    </Section>
  )
}
