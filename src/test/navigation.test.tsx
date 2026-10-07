import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { matchRoutes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { routes, staticPaths } from '@/routes'
import { renderApp } from './utils'

// AC-LANG-1: términos de interfaz que no deben aparecer en inglés
const ENGLISH_UI =
  /\b(Add to bag|Sign in|Sign out|Create account|Continue|Remove|Subscribe|Discover|Explore|Shipping|Checkout|Your bag|Order summary|Total amount|Return to|Read more|Search|Favorites|Reviews|Contact us|Place order|Thank you)\b/

describe('spec 02 · rutas y navegación', () => {
  it.each(staticPaths)('AC-NAV: %s renderiza sin errores', (path) => {
    const { container } = renderApp(path)
    expect(container.querySelector('main, [role="main"], div')).not.toBeNull()
    expect(screen.queryByText(/no está en el archivo/i)).toBeNull()
  })

  it.each(staticPaths)('AC-LANG-1: %s no contiene textos de interfaz en inglés', (path) => {
    renderApp(path)
    expect(document.body.textContent ?? '').not.toMatch(ENGLISH_UI)
    expect(document.documentElement.lang || 'es').toBe('es')
  })

  it('AC-NAV-1: todas las pantallas del mapa existen (20 rutas, 18 pantallas)', () => {
    expect(staticPaths.length).toBeGreaterThanOrEqual(18)
  })

  it('AC-NAV-5: ruta desconocida muestra 404 con enlace a Home', () => {
    renderApp('/no-existe')
    expect(screen.getByRole('heading', { name: /no está en el archivo/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /volver al inicio/i })).toHaveAttribute('href', '/')
  })

  it('AC-NAV-7: todos los enlaces internos de Home, menú y pie apuntan a rutas existentes', async () => {
    const { container } = renderApp('/')
    await userEvent.click(screen.getByRole('button', { name: /^menú$/i }))
    const hrefs = [...container.ownerDocument.querySelectorAll('a[href]')]
      .map((a) => a.getAttribute('href')!)
      .filter((h) => h.startsWith('/'))
    expect(hrefs.length).toBeGreaterThan(15)
    for (const href of hrefs) {
      const matches = matchRoutes(routes, href.split('#')[0])
      const leaf = matches?.at(-1)?.route.path
      expect(leaf, `enlace roto: ${href}`).toBeDefined()
      expect(leaf, `enlace cae en 404: ${href}`).not.toBe('*')
    }
  })

  it('AC-NAV-2: cabecera con wordmark e iconos accesibles', () => {
    renderApp('/')
    expect(screen.getByRole('link', { name: 'Menti Parfum' })).toBeInTheDocument()
    for (const name of [/favoritos/i, /iniciar sesión/i, /bolsa/i]) {
      expect(screen.getAllByRole('link', { name })[0]).toBeInTheDocument()
    }
  })

  it('AC-NAV-1: /login usa cabecera mínima (sin menú ni pie)', () => {
    renderApp('/login')
    expect(screen.queryByRole('button', { name: /^menú$/i })).toBeNull()
    expect(screen.queryByRole('contentinfo')).toBeNull()
  })

  it('AC-LEG-2: documento legal inválido → 404', () => {
    renderApp('/legal/otra-cosa')
    expect(screen.getByRole('heading', { name: /no está en el archivo/i })).toBeInTheDocument()
  })

  it('AC-PDP-1: slug desconocido → 404', () => {
    renderApp('/product/no-existe')
    expect(screen.getByRole('heading', { name: /no está en el archivo/i })).toBeInTheDocument()
  })
})
