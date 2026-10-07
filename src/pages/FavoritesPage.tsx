import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { HeartIcon } from '@/components/ui/Icons'
import { Eyebrow, Heading, Section } from '@/components/ui/Type'
import { useCart } from '@/context/CartContext'
import { useFavorites } from '@/context/FavoritesContext'
import { getProduct, money } from '@/data/products'
import type { Product } from '@/types'

export default function FavoritesPage() {
  const { slugs, toggle } = useFavorites()
  const { add } = useCart()
  const items = slugs.map(getProduct).filter((p): p is Product => !!p)

  return (
    <Section label="Favorites">
      <Eyebrow className="mb-4">Your selection</Eyebrow>
      <Heading as="h1" size="xl">Your Favorites ({items.length})</Heading>

      {items.length === 0 ? (
        <div className="mt-12">
          <p className="font-text text-[20px] italic text-body">No favorites yet. Tap the heart on any flacon to keep it here.</p>
          <div className="mt-8"><Button to="/collection">Explore the collection</Button></div>
        </div>
      ) : (
        <ul className="m-0 mt-12 grid list-none gap-x-8 gap-y-14 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => {
            const size = p.sizes[p.sizes.length - 1]
            return (
              <li key={p.slug}>
                <div className="relative border border-hairline">
                  <Link to={`/product/${p.slug}`} aria-label={`View ${p.name}`}>
                    <img src={p.image} alt={`${p.name} flacon`} loading="lazy" className="aspect-square w-full object-cover" />
                  </Link>
                  <span className="absolute right-3 top-3 text-ink"><HeartIcon size={16} filled /></span>
                </div>
                <div className="mt-5 flex justify-between gap-4">
                  <h2 className="text-[24px] tracking-[2px]">{p.name}</h2>
                  <span className="font-mono text-[12px] tracking-[2px] text-ink">{money(size.price)}</span>
                </div>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[2px] text-muted">{p.family}</p>
                <div className="mt-5 flex items-center gap-6">
                  <Button onClick={() => add(p.slug, size.ml)} aria-label={`Add ${p.name} to bag`}>Add to bag</Button>
                  <Button variant="text" onClick={() => toggle(p.slug)} aria-label={`Remove ${p.name} from favorites`}>Remove</Button>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </Section>
  )
}
