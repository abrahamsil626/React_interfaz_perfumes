import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { useCart } from '@/context/CartContext'
import { useFavorites } from '@/context/FavoritesContext'
import { BagIcon, CloseIcon, HeartIcon, SearchIcon, UserIcon } from '@/components/ui/Icons'
import { menuLinks } from './nav'

const iconBtn = 'relative inline-flex size-10 items-center justify-center text-ink hover:text-body'

export function Header() {
  const [open, setOpen] = useState(false)
  const { count } = useCart()
  const { slugs } = useFavorites()
  const { user } = useAuth()
  const { pathname } = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-canvas">
      <div className="relative mx-auto flex h-14 max-w-[1600px] items-center justify-between px-6 md:px-16">
        <button
          type="button"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((v) => !v)}
          className="font-mono text-[12px] uppercase tracking-[2px] text-ink"
        >
          {open ? 'Cerrar' : 'Menú'}
        </button>

        <Link
          to="/"
          className="absolute left-1/2 -translate-x-1/2 font-display text-[14px] uppercase tracking-[6px] text-ink"
        >
          Menti Parfum
        </Link>

        <nav aria-label="Cuenta y bolsa" className="flex items-center">
          <Link to="/collection" aria-label="Buscar en la colección" className={iconBtn}>
            <SearchIcon />
          </Link>
          <Link to="/favorites" aria-label={`Favoritos (${slugs.length})`} className={iconBtn}>
            <HeartIcon />
          </Link>
          <Link to={user ? '/account' : '/login'} aria-label={user ? 'Mi cuenta' : 'Iniciar sesión'} className={iconBtn}>
            <UserIcon />
          </Link>
          <Link to="/bag" aria-label={`Bolsa, ${count} ${count === 1 ? 'artículo' : 'artículos'}`} className={iconBtn}>
            <BagIcon />
            <span className="ml-0.5 font-mono text-[11px] tracking-[1px] text-muted">({count})</span>
          </Link>
        </nav>
      </div>

      {open && (
        <div id="site-menu" className="fixed inset-x-0 top-14 bottom-0 z-30 overflow-y-auto bg-canvas">
          <nav aria-label="Principal" className="mx-auto flex max-w-page flex-col px-6 py-12 md:px-20">
            <button
              type="button"
              aria-label="Cerrar menú"
              onClick={() => setOpen(false)}
              className="mb-8 self-end text-ink md:hidden"
            >
              <CloseIcon />
            </button>
            {menuLinks.map((l, i) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `flex items-baseline gap-6 border-b border-hairline py-5 font-display text-[32px] uppercase tracking-[3px] md:text-[44px] ${
                    isActive ? 'text-ink' : 'text-body hover:text-ink'
                  }`
                }
              >
                <span className="font-mono text-[11px] tracking-[2px] text-muted">{String(i + 1).padStart(2, '0')}</span>
                {l.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
