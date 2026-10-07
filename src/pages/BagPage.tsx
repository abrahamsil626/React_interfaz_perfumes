import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { ArrowLeftIcon, MinusIcon, PlusIcon } from '@/components/ui/Icons'
import { Eyebrow, Heading, Rule, Section } from '@/components/ui/Type'
import { useCart } from '@/context/CartContext'
import { getProduct, money, priceOf } from '@/data/products'

export default function BagPage() {
  const { lines, count, subtotal, discount, total, promo, setQty, remove, applyPromo } = useCart()
  const [code, setCode] = useState('')
  const [codeError, setCodeError] = useState('')

  const onApply = (e: FormEvent) => {
    e.preventDefault()
    if (applyPromo(code)) {
      setCodeError('')
      setCode('')
    } else {
      setCodeError('Invalid code')
    }
  }

  return (
    <Section label="Bag">
      <Eyebrow className="mb-6">Archive // Allocation dispatch</Eyebrow>
      <Heading as="h1" size="xl">Your Bag ({count})</Heading>

      {lines.length === 0 ? (
        <div className="mt-12">
          <p className="font-text text-[20px] italic text-body">Your bag is empty.</p>
          <div className="mt-8"><Button to="/collection">Explore the collection</Button></div>
        </div>
      ) : (
        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_380px]">
          <div>
            <div className="hidden grid-cols-[1fr_140px_140px] gap-4 border-b border-hairline pb-4 font-mono text-[11px] uppercase tracking-[2px] text-muted md:grid">
              <span>Specimen</span><span>Quantity</span><span className="text-right">Value</span>
            </div>
            <ul className="m-0 list-none p-0">
              {lines.map((l) => {
                const p = getProduct(l.slug)
                if (!p) return null
                const price = priceOf(p, l.ml)
                return (
                  <li key={`${l.slug}-${l.ml}`} className="grid gap-4 border-b border-hairline py-8 md:grid-cols-[1fr_140px_140px] md:items-center">
                    <div className="flex gap-6">
                      <Link to={`/product/${p.slug}`} className="shrink-0 border border-hairline">
                        <img src={p.image} alt={`${p.name} flacon`} className="size-32 object-cover md:size-40" />
                      </Link>
                      <div>
                        <Eyebrow>{p.family}</Eyebrow>
                        <h2 className="mt-1 text-[26px] tracking-[2px]">{p.name}</h2>
                        <p className="font-mono text-[11px] uppercase tracking-[2px] text-muted">{p.intensity} // {l.ml} ml</p>
                        <p className="mt-2 font-text text-[16px] text-body">{p.notes.top.split(',').slice(0, 3).join(',')}.</p>
                        <button
                          type="button"
                          onClick={() => remove(l.slug, l.ml)}
                          aria-label={`Remove ${p.name}`}
                          className="mt-3 border-0 bg-transparent p-0 font-mono text-[11px] uppercase tracking-[2px] text-muted hover:text-ink"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="inline-flex h-11 w-fit items-center border border-hairline-strong">
                      <button type="button" aria-label={`Decrease quantity of ${p.name}`} onClick={() => setQty(l.slug, l.ml, l.qty - 1)} className="inline-flex size-11 items-center justify-center border-0 bg-transparent text-ink">
                        <MinusIcon size={14} />
                      </button>
                      <span aria-live="polite" aria-label={`Quantity ${l.qty}`} className="w-8 text-center font-mono text-[13px] text-ink">{l.qty}</span>
                      <button type="button" aria-label={`Increase quantity of ${p.name}`} onClick={() => setQty(l.slug, l.ml, l.qty + 1)} className="inline-flex size-11 items-center justify-center border-0 bg-transparent text-ink">
                        <PlusIcon size={14} />
                      </button>
                    </div>
                    <p className="font-mono text-[14px] uppercase tracking-[2px] text-ink md:text-right">{money(price * l.qty)}</p>
                  </li>
                )
              })}
            </ul>

            <div className="mt-8 flex items-center justify-between border border-hairline bg-surface-card p-5">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[2px] text-ink">Complimentary archival gift</p>
                <p className="mt-1 font-text text-[16px] text-body">2 × 2ml discovery vials automatically paired with your order.</p>
              </div>
              <span className="font-mono text-[11px] uppercase tracking-[2px] text-link">Included</span>
            </div>
            <Link to="/collection" className="mt-8 inline-flex items-center gap-3 font-mono text-[12px] uppercase tracking-[2px] text-ink">
              <ArrowLeftIcon size={16} /> Explore allocations
            </Link>
          </div>

          <aside aria-label="Order summary" className="h-fit border border-hairline bg-surface-card p-8">
            <h2 className="text-[26px] tracking-[3px]">Order Summary</h2>
            <Rule className="my-6" />
            <dl className="m-0 space-y-3 font-mono text-[12px] uppercase tracking-[2px]">
              <div className="flex justify-between"><dt className="text-muted">Subtotal</dt><dd className="m-0 text-ink">{money(subtotal)}</dd></div>
              {discount > 0 && (
                <div className="flex justify-between"><dt className="text-muted">Code {promo}</dt><dd className="m-0 text-ink">− {money(discount)}</dd></div>
              )}
              <div className="flex justify-between"><dt className="text-muted">Courier</dt><dd className="m-0 text-ink">Complimentary</dd></div>
              <div className="flex justify-between"><dt className="text-muted">Duties &amp; insurance</dt><dd className="m-0 text-ink">Included</dd></div>
            </dl>
            <Rule className="my-6" />
            <form onSubmit={onApply} noValidate className="flex items-end gap-3">
              <div className="flex flex-1 flex-col gap-1">
                <label htmlFor="promo" className="font-mono text-[11px] uppercase tracking-[2px] text-muted">Access code</label>
                <input id="promo" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Enter code" className="h-11 border-0 border-b border-hairline-strong bg-transparent font-mono text-[13px] uppercase tracking-[2px] text-ink outline-none focus:border-ink" />
              </div>
              <button type="submit" className="h-9 border border-hairline-strong bg-transparent px-4 font-mono text-[11px] uppercase tracking-[2px] text-ink">Apply</button>
            </form>
            {codeError && <p role="alert" className="mt-2 font-mono text-[11px] uppercase tracking-[2px] text-link">{codeError}</p>}
            <Rule className="my-6" />
            <p className="flex items-baseline justify-between">
              <span className="font-display text-[26px] uppercase tracking-[3px] text-ink">Total</span>
              <span data-testid="bag-total" className="font-mono text-[18px] tracking-[2px] text-ink">{money(total)}</span>
            </p>
            <Button to="/checkout" full className="mt-6">Proceed to checkout</Button>
          </aside>
        </div>
      )}
    </Section>
  )
}
