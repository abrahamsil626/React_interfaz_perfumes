import { useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { Input, Select } from '@/components/ui/Field'
import { Eyebrow, Heading, Section } from '@/components/ui/Type'
import { boutiques } from '@/data/content'
import { isEmail } from '@/lib/validation'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: 'Consulta sobre un pedido', message: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [sent, setSent] = useState(false)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const next: Record<string, string> = {}
    if (!form.name.trim()) next.name = 'Introduce tu nombre'
    if (!isEmail(form.email)) next.email = 'Introduce un correo válido'
    if (form.message.trim().length < 5) next.message = 'Escribe un mensaje'
    setErrors(next)
    if (Object.keys(next).length === 0) setSent(true)
  }

  return (
    <Section label="Contacto">
      <Eyebrow className="mb-4">Conserjería y ateliers</Eyebrow>
      <Heading as="h1" size="xl">Contacto</Heading>

      <div className="mt-14 grid gap-16 lg:grid-cols-2">
        <div>
          {sent ? (
            <p role="status" className="font-text text-[22px] italic text-ink">
              Gracias, {form.name}. Nuestra conserjería te responderá en un día hábil.
            </p>
          ) : (
            <form onSubmit={onSubmit} noValidate aria-label="Formulario de contacto" className="space-y-6">
              <Input label="Nombre" autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} error={errors.name} />
              <Input label="Correo electrónico" type="email" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} error={errors.email} />
              <Select label="Asunto" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}>
                <option>Consulta sobre un pedido</option>
                <option>Cita en el atelier</option>
                <option>Prensa</option>
                <option>Otro</option>
              </Select>
              <Input label="Mensaje" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} error={errors.message} />
              <Button type="submit">Enviar mensaje</Button>
            </form>
          )}
          <p className="mt-10 font-mono text-[11px] uppercase tracking-[2px] text-muted">
            concierge@mentiparfum.com {'//'} +33 1 42 60 00 00
          </p>
        </div>

        <div>
          <h2 className="text-[26px] tracking-[3px]">Nuestras boutiques</h2>
          <ul className="m-0 mt-6 list-none p-0">
            {boutiques.map((b) => (
              <li key={b.city} className="border-t border-hairline py-6">
                <h3 className="text-[22px] tracking-[2px]">{b.city}</h3>
                <p className="mt-1 font-text text-[16px] text-body">{b.address}</p>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[2px] text-muted">{b.hours} {'//'} {b.phone}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
