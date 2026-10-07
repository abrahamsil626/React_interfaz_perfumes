import { Link } from 'react-router-dom'
import { useFavorites } from '@/context/FavoritesContext'
import { HeartIcon } from '@/components/ui/Icons'
import { money } from '@/data/products'
import type { Product } from '@/types'

export function ProductCard({ product, price }: { product: Product; price?: number }) {
  const { has, toggle } = useFavorites()
  const fav = has(product.slug)
  const shown = price ?? product.sizes[product.sizes.length - 1].price

  return (
    <article className="group">
      <div className="relative aspect-square border border-hairline bg-canvas">
        <Link to={`/product/${product.slug}`} aria-label={`View ${product.name}`}>
          <img
            src={product.image}
            alt={`${product.name} flacon`}
            loading="lazy"
            className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </Link>
        <button
          type="button"
          aria-label={fav ? `Remove ${product.name} from favorites` : `Add ${product.name} to favorites`}
          aria-pressed={fav}
          onClick={() => toggle(product.slug)}
          className="absolute right-3 top-3 inline-flex size-9 items-center justify-center bg-canvas/60 text-ink"
        >
          <HeartIcon size={16} filled={fav} />
        </button>
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <h3 className="text-[22px] tracking-[2px] md:text-[26px]">
          <Link to={`/product/${product.slug}`}>{product.name}</Link>
        </h3>
        <span className="whitespace-nowrap font-mono text-[12px] uppercase tracking-[2px] text-ink">{money(shown)}</span>
      </div>
      <p className="mt-1 font-mono text-[11px] uppercase tracking-[2px] text-muted">{product.tagline}</p>
      <p className="mt-2 font-mono text-[11px] uppercase tracking-[2px] text-muted-soft">{product.concentration}</p>
    </article>
  )
}
