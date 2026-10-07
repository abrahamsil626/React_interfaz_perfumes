import { useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { Input, Select } from '@/components/ui/Field'
import { Eyebrow, Heading, Section } from '@/components/ui/Type'
import { boutiques } from '@/data/content'
import { isEmail } from '@/lib/validation'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: 'Order enquiry', message: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [sent, setSent] = useState(false)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const next: Record<string, string> = {}
    if (!form.name.trim()) next.name = 'Enter your name'
    if (!isEmail(form.email)) next.email = 'Enter a valid email'
    if (form.message.trim().length < 5) next.message = 'Write a message'
    setErrors(next)
    if (Object.keys(next).length === 0) setSent(true)
  }

  return (
    <Section label="Contact">
      <Eyebrow className="mb-4">Concierge &amp; ateliers</Eyebrow>
      <Heading as="h1" size="xl">Contact</Heading>

      <div className="mt-14 grid gap-16 lg:grid-cols-2">
        <div>
          {sent ? (
            <p role="status" className="font-text text-[22px] italic text-ink">
              Thank you, {form.name}. Our concierge will reply within one business day.
            </p>
          ) : (
            <form onSubmit={onSubmit} noValidate aria-label="Contact form" className="space-y-6">
              <Input label="Name" autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} error={errors.name} />
              <Input label="Email" type="email" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} error={errors.email} />
              <Select label="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}>
                <option>Order enquiry</option>
                <option>Atelier appointment</option>
                <option>Press</option>
                <option>Other</option>
              </Select>
              <Input label="Message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} error={errors.message} />
              <Button type="submit">Send message</Button>
            </form>
          )}
          <p className="mt-10 font-mono text-[11px] uppercase tracking-[2px] text-muted">
            concierge@mentiparfum.com // +33 1 42 60 00 00
          </p>
        </div>

        <div>
          <h2 className="text-[26px] tracking-[3px]">Our Boutiques</h2>
          <ul className="m-0 mt-6 list-none p-0">
            {boutiques.map((b) => (
              <li key={b.city} className="border-t border-hairline py-6">
                <h3 className="text-[22px] tracking-[2px]">{b.city}</h3>
                <p className="mt-1 font-text text-[16px] text-body">{b.address}</p>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[2px] text-muted">{b.hours} // {b.phone}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
