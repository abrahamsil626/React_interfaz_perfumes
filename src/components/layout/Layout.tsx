import { useEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { ArrowLeftIcon } from '@/components/ui/Icons'
import { Footer } from './Footer'
import { Header } from './Header'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

/** Layout estándar: cabecera completa + pie (AC-NAV-1). */
export function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

/** Layout mínimo para /checkout y /login (AC-NAV-1). */
export function FocusLayout({ backTo, backLabel }: { backTo: string; backLabel: string }) {
  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <ScrollToTop />
      <header className="border-b border-hairline">
        <div className="relative mx-auto flex h-14 max-w-[1600px] items-center px-6 md:px-16">
          <Link
            to={backTo}
            className="inline-flex items-center gap-3 font-mono text-[12px] uppercase tracking-[2px] text-muted hover:text-ink"
          >
            <ArrowLeftIcon size={16} />
            {backLabel}
          </Link>
          <Link
            to="/"
            className="absolute left-1/2 -translate-x-1/2 font-display text-[14px] uppercase tracking-[6px] text-ink"
          >
            Menti Parfum
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}
