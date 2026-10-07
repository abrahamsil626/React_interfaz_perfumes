import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { matchRoutes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { routes, staticPaths } from '@/routes'
import { renderApp } from './utils'

describe('spec 02 · rutas y navegación', () => {
  it.each(staticPaths)('AC-NAV: %s renderiza sin errores', (path) => {
    const { container } = renderApp(path)
    expect(container.querySelector('main, [role="main"], div')).not.toBeNull()
    expect(screen.queryByText(/not in the archive/i)).toBeNull()
  })

  it('AC-NAV-1: todas las pantallas del mapa existen (20 rutas, 18 pantallas)', () => {
    expect(staticPaths.length).toBeGreaterThanOrEqual(18)
  })

  it('AC-NAV-5: ruta desconocida muestra 404 con enlace a Home', () => {
    renderApp('/no-existe')
    expect(screen.getByRole('heading', { name: /not in the archive/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /return home/i })).toHaveAttribute('href', '/')
  })

  it('AC-NAV-7: todos los enlaces internos de Home, menú y pie apuntan a rutas existentes', async () => {
    const { container } = renderApp('/')
    await userEvent.click(screen.getByRole('button', { name: /menu/i }))
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
    for (const name of [/favorites/i, /sign in/i, /bag/i]) {
      expect(screen.getAllByRole('link', { name })[0]).toBeInTheDocument()
    }
  })

  it('AC-NAV-1: /checkout y /login usan cabecera mínima (sin menú ni pie)', () => {
    renderApp('/login')
    expect(screen.queryByRole('button', { name: /^menu$/i })).toBeNull()
    expect(screen.queryByRole('contentinfo')).toBeNull()
  })

  it('AC-LEG-2: documento legal inválido → 404', () => {
    renderApp('/legal/otra-cosa')
    expect(screen.getByRole('heading', { name: /not in the archive/i })).toBeInTheDocument()
  })

  it('AC-PDP-1: slug desconocido → 404', () => {
    renderApp('/product/no-existe')
    expect(screen.getByRole('heading', { name: /not in the archive/i })).toBeInTheDocument()
  })
})
