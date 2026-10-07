import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Check, Input } from '@/components/ui/Field'
import { GoogleIcon } from '@/components/ui/Icons'
import { Eyebrow, Heading, Rule, Section } from '@/components/ui/Type'
import { useAuth } from '@/context/AuthContext'
import { useCart } from '@/context/CartContext'
import { getProduct, money, priceOf } from '@/data/products'
import { validateCard, type CardErrors } from '@/lib/validation'

type Method = 'card' | 'paypal' | 'apple' | 'google'

const methods: { id: Method; label: string; hint: string }[] = [
  { id: 'card', label: 'Tarjeta de crédito', hint: 'Visa / MC / Amex' },
  { id: 'paypal', label: 'PayPal', hint: 'Pago protegido' },
  { id: 'apple', label: 'Apple Pay', hint: 'Biométrico' },
  { id: 'google', label: 'Google Pay', hint: 'Pago rápido' },
]

export default function CheckoutPage() {
  const { validLines, subtotal, discount, total, placeOrder } = useCart()
  const { user, signInWithGoogle } = useAuth()
  const navigate = useNavigate()
  const [method, setMethod] = useState<Method>('card')
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvc: '' })
  const [errors, setErrors] = useState<CardErrors>({})
  const [placed, setPlaced] = useState(false)

  // AC-ORD-3: sin líneas válidas (bolsa vacía o solo cantidades en 0) no se puede pagar
  if (validLines.length === 0 && !placed) return <Navigate to="/bag" replace />

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (method === 'card') {
      const found = validateCard(card)
      setErrors(found)
      if (Object.keys(found).length > 0) return
    }
    const order = placeOrder()
    if (order) {
      setPlaced(true)
      navigate('/order-confirmation')
    }
  }

  const set = (k: keyof typeof card) => (e: ChangeEvent<HTMLInputElement>) =>
    setCard({ ...card, [k]: e.target.value })

  return (
    <>
      <div className="border-b border-hairline bg-surface-soft px-6 py-3 md:px-16">
        <div className="mx-auto flex max-w-page items-center justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[2px] text-muted">
            <span className="mr-2 inline-block size-1.5 rounded-full bg-link" />
            Despacho exprés {'//'} {user ? user.email : 'Cuenta de conocedor'}
          </p>
          {!user && (
            <Button variant="text" onClick={signInWithGoogle} className="border border-hairline-strong px-4 py-2">
              <GoogleIcon size={16} /> Continuar con Google
            </Button>
          )}
        </div>
      </div>

      <Section label="Pago" className="!py-12">
        <ol className="m-0 mb-10 flex list-none flex-wrap gap-6 p-0 font-mono text-[11px] uppercase tracking-[2px]">
          <li className="text-muted">01 {'//'} Envío <span className="ml-2 border border-hairline-strong px-2 py-0.5 text-link">Completado</span></li>
          <li aria-current="step" className="text-ink">02 {'//'} Pago <span className="ml-2 bg-ink px-2 py-0.5 text-canvas">Activo</span></li>
          <li className="text-muted-soft">03 {'//'} Confirmación</li>
        </ol>

        <form onSubmit={onSubmit} noValidate className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="border border-hairline p-6">
              <div className="flex justify-between">
                <p className="font-mono text-[11px] uppercase tracking-[2px] text-ink">Expediente de despacho</p>
                <span className="font-mono text-[11px] uppercase tracking-[2px] text-muted">[ Editar ]</span>
              </div>
              <Rule className="my-4" />
              <dl className="m-0 grid gap-4 font-mono text-[12px] uppercase tracking-[2px] sm:grid-cols-2">
                <div><dt className="text-muted">Destinatario</dt><dd className="m-0 mt-1 text-ink">{user?.name ?? 'Invitado'}</dd></div>
                <div><dt className="text-muted">Dirección de entrega</dt><dd className="m-0 mt-1 text-ink">24 Place Vendôme, 75001 París, Francia</dd></div>
              </dl>
              <p className="mt-4 flex justify-between border-t border-hairline pt-4 font-mono text-[11px] uppercase tracking-[2px] text-muted">
                Método: mensajería aérea diplomática (sellada) <span className="text-link">Gratuita</span>
              </p>
            </div>

            <h1 className="mt-12 text-[32px] tracking-[3px]">Método de pago</h1>
            <Rule className="mb-6 mt-3" />

            <fieldset className="m-0 space-y-3 border-0 p-0">
              <legend className="sr-only">Método de pago</legend>
              {methods.map((m) => (
                <div key={m.id} className={`border p-4 ${method === m.id ? 'border-ink' : 'border-hairline'}`}>
                  <Check kind="radio" name="payment" label={m.label} hint={m.hint} checked={method === m.id} onChange={() => setMethod(m.id)} />
                  {m.id === 'card' && method === 'card' && (
                    <div className="mt-6 grid gap-6 sm:grid-cols-2">
                      <Input className="sm:col-span-2" label="Número de tarjeta" inputMode="numeric" autoComplete="cc-number" placeholder="4112 0000 0000 8892" value={card.number} onChange={set('number')} error={errors.number} />
                      <Input className="sm:col-span-2" label="Titular de la tarjeta" autoComplete="cc-name" value={card.name} onChange={set('name')} error={errors.name} />
                      <Input label="Fecha de caducidad" autoComplete="cc-exp" placeholder="09 / 28" value={card.expiry} onChange={set('expiry')} error={errors.expiry} />
                      <Input label="CVC / CVV" inputMode="numeric" autoComplete="cc-csc" placeholder="•••" value={card.cvc} onChange={set('cvc')} error={errors.cvc} />
                    </div>
                  )}
                </div>
              ))}
            </fieldset>

            <div className="mt-8"><Check label="La dirección de facturación coincide con el destino del despacho" defaultChecked /></div>
            <Button type="submit" full className="mt-8">Realizar pedido {'//'} {money(total)}</Button>
          </div>

          <aside aria-label="Resumen del pedido" className="h-fit border border-hairline p-6">
            <Eyebrow className="text-ink">Selección de archivo {'//'} {validLines.length} {validLines.length === 1 ? 'artefacto' : 'artefactos'}</Eyebrow>
            <Rule className="my-4" />
            <ul className="m-0 list-none space-y-6 p-0">
              {validLines.map((l) => {
                const p = getProduct(l.slug)
                if (!p) return null
                return (
                  <li key={`${l.slug}-${l.ml}`} className="flex gap-4">
                    <img src={p.image} alt="" className="size-20 border border-hairline object-cover" />
                    <div className="flex-1">
                      <div className="flex justify-between gap-2">
                        <h2 className="text-[22px] tracking-[2px]">{p.name}</h2>
                        <span className="font-mono text-[12px] tracking-[2px] text-ink">{money(priceOf(p, l.ml) * l.qty)}</span>
                      </div>
                      <p className="font-mono text-[11px] uppercase tracking-[2px] text-muted">{l.ml} ml {'//'} Cant. {l.qty}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
            <Rule className="my-6" />
            <dl className="m-0 space-y-2 font-mono text-[11px] uppercase tracking-[2px]">
              <div className="flex justify-between"><dt className="text-muted">Subtotal</dt><dd className="m-0 text-ink">{money(subtotal)}</dd></div>
              {discount > 0 && <div className="flex justify-between"><dt className="text-muted">Descuento</dt><dd className="m-0 text-ink">− {money(discount)}</dd></div>}
              <div className="flex justify-between"><dt className="text-muted">Mensajería</dt><dd className="m-0 text-link">Gratuita</dd></div>
              <div className="flex justify-between"><dt className="text-muted">Aranceles e impuestos</dt><dd className="m-0 text-muted">Incluidos</dd></div>
            </dl>
            <Rule className="my-6" />
            <div className="flex items-baseline justify-between">
              <Heading as="h2" size="sm">Importe total</Heading>
              <span className="font-display text-[28px] tracking-[2px] text-ink">{money(total)}</span>
            </div>
          </aside>
        </form>
      </Section>
    </>
  )
}
