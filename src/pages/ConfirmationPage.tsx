import { Navigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { CheckIcon } from '@/components/ui/Icons'
import { Eyebrow, Heading, Rule, Section } from '@/components/ui/Type'
import { useCart } from '@/context/CartContext'
import { money } from '@/data/products'

const fmt = (iso: string) => new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })

export default function ConfirmationPage() {
  const { order } = useCart()
  // AC-ORD-2
  if (!order) return <Navigate to="/bag" replace />

  return (
    <Section label="Order confirmed" className="text-center">
      <span className="mx-auto mb-8 inline-flex size-16 items-center justify-center rounded-full border border-ink text-ink">
        <CheckIcon size={28} />
      </span>
      <Heading as="h1" size="xl">Thank You</Heading>
      <p className="mx-auto mt-5 max-w-lg font-text text-[18px] italic text-body">
        Your allocation is secured. A confirmation and your certificate of provenance will follow by email.
      </p>

      <dl className="mx-auto mt-10 grid max-w-xl gap-6 font-mono text-[12px] uppercase tracking-[2px] sm:grid-cols-2">
        <div><dt className="text-muted">Order number</dt><dd className="m-0 mt-1 text-ink">{order.number}</dd></div>
        <div><dt className="text-muted">Estimated delivery</dt><dd className="m-0 mt-1 text-ink">{fmt(order.estimatedDelivery)}</dd></div>
      </dl>

      <div className="mx-auto mt-12 max-w-xl text-left">
        <Eyebrow>Order summary</Eyebrow>
        <Rule className="my-4" />
        <ul className="m-0 list-none p-0">
          {order.lines.map((l) => (
            <li key={`${l.slug}-${l.ml}`} className="flex justify-between border-b border-hairline py-3 font-mono text-[12px] uppercase tracking-[2px]">
              <span className="text-body">{l.name} // {l.ml} ml × {l.qty}</span>
              <span className="text-ink">{money(l.price * l.qty)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 flex justify-between font-mono text-[13px] uppercase tracking-[2px] text-ink">
          <span>Total</span><span>{money(order.total)}</span>
        </p>
      </div>

      <div className="mt-12 flex flex-wrap justify-center gap-4">
        <Button to="/track-order">Track order</Button>
        <Button to="/collection">Continue shopping</Button>
      </div>
    </Section>
  )
}
