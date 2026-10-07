import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { renderApp } from './utils'

const user = () => userEvent.setup()

describe('spec 04 · autenticación', () => {
  it('AC-AUTH-2: /account sin sesión redirige a /login', () => {
    const { router } = renderApp('/account')
    expect(router.state.location.pathname).toBe('/login')
  })

  it('AC-LOG-2: email y contraseña obligatorios', async () => {
    const u = user()
    const { router } = renderApp('/login')
    await u.click(screen.getByRole('button', { name: /enter archive/i }))
    expect(screen.getAllByRole('alert')).toHaveLength(2)
    expect(router.state.location.pathname).toBe('/login')
  })

  it('AC-LOG-1: pestañas SIGN IN / CREATE ACCOUNT', async () => {
    const u = user()
    renderApp('/login')
    await u.click(screen.getByRole('tab', { name: /create account/i }))
    expect(screen.getByRole('button', { name: /^create account$/i })).toBeInTheDocument()
  })

  it('AC-LOG-3 / AC-ACC-*: Google inicia sesión, perfil y cierre de sesión', async () => {
    const u = user()
    const { router } = renderApp('/login')
    await u.click(screen.getByRole('button', { name: /continue with google/i }))
    expect(router.state.location.pathname).toBe('/account')
    expect(await screen.findByText(/welcome back, marcel/i)).toBeInTheDocument()
    await u.click(screen.getByRole('button', { name: /^addresses$/i }))
    expect(screen.getByRole('region', { name: /addresses/i })).toBeInTheDocument()
    await u.click(screen.getByRole('button', { name: /payment methods/i }))
    expect(screen.getByRole('region', { name: /payment methods/i })).toBeInTheDocument()
    await u.click(screen.getByRole('button', { name: /sign out/i }))
    expect(router.state.location.pathname).toBe('/')
    expect(screen.getByRole('link', { name: /sign in/i })).toBeInTheDocument()
  })
})

describe('spec 04 · contenido', () => {
  it('AC-FAQ-2: acordeón, una abierta a la vez, aria-expanded correcto', async () => {
    const u = user()
    renderApp('/faq')
    const [first, second] = within(screen.getByRole('main')).getAllByRole('button', { expanded: false })
      .filter((b) => b.hasAttribute('aria-controls'))
    await u.click(first)
    expect(first).toHaveAttribute('aria-expanded', 'true')
    await u.click(second)
    expect(first).toHaveAttribute('aria-expanded', 'false')
    expect(second).toHaveAttribute('aria-expanded', 'true')
  })

  it('AC-FAQ-1: chips filtran por categoría', async () => {
    const u = user()
    renderApp('/faq')
    expect(screen.getByText(/how long does delivery take/i)).toBeInTheDocument()
    await u.click(screen.getByRole('button', { name: /^returns$/i }))
    expect(screen.queryByText(/how long does delivery take/i)).toBeNull()
    expect(screen.getByText(/can i return a fragrance/i)).toBeInTheDocument()
  })

  it('AC-CON-1/2: validación del formulario, éxito y 4 boutiques', async () => {
    const u = user()
    renderApp('/contact')
    for (const city of ['Paris', 'Milan', 'New York', 'Dubai']) {
      expect(screen.getByRole('heading', { name: city })).toBeInTheDocument()
    }
    await u.click(screen.getByRole('button', { name: /send message/i }))
    expect(screen.getAllByRole('alert')).toHaveLength(3)
    await u.type(screen.getByLabelText(/^name/i), 'Ana')
    await u.type(screen.getByLabelText(/^email/i), 'ana@example.com')
    await u.type(screen.getByLabelText(/^message/i), 'Hola, necesito ayuda')
    await u.click(screen.getByRole('button', { name: /send message/i }))
    expect(screen.getByRole('status')).toHaveTextContent(/thank you, ana/i)
  })

  it('AC-LEG-1: pestañas legales cambian de documento y URL', async () => {
    const u = user()
    const { router } = renderApp('/legal/privacy')
    expect(screen.getByRole('heading', { level: 1, name: /privacy policy/i })).toBeInTheDocument()
    const nav = screen.getByRole('navigation', { name: /legal documents/i })
    await u.click(within(nav).getByRole('link', { name: /terms of service/i }))
    expect(router.state.location.pathname).toBe('/legal/terms')
    expect(await screen.findByRole('heading', { level: 1, name: /terms of service/i })).toBeInTheDocument()
  })

  it('AC-REV-2/3: filtro 5 estrellas y nueva opinión', async () => {
    const u = user()
    renderApp('/reviews')
    const total = screen.getAllByRole('listitem').length
    await u.click(screen.getByRole('button', { name: /5 stars/i }))
    expect(screen.getAllByRole('listitem').length).toBeLessThan(total)
    await u.click(screen.getByRole('button', { name: /^all$/i }))
    await u.click(screen.getByRole('button', { name: /write a review/i }))
    await u.click(screen.getByRole('button', { name: /publish review/i }))
    expect(screen.getByRole('alert')).toBeInTheDocument()
    await u.type(screen.getByLabelText(/^title/i), 'Excelente')
    await u.type(screen.getByLabelText(/your name/i), 'Luis')
    await u.type(screen.getByLabelText(/your review/i), 'Un perfume magnífico')
    await u.click(screen.getByRole('button', { name: /publish review/i }))
    expect(screen.getByText(/un perfume magnífico/i)).toBeInTheDocument()
  })

  it('AC-QUIZ-1/2/3: 5 pasos, Continue deshabilitado sin elección, 3 recomendaciones', async () => {
    const u = user()
    renderApp('/scent-finder')
    expect(screen.getByText(/step 1 \/ 5/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /continue/i })).toBeDisabled()
    for (let i = 0; i < 4; i++) {
      await u.click(screen.getAllByRole('radio')[0])
      await u.click(screen.getByRole('button', { name: /continue/i }))
    }
    await u.click(screen.getAllByRole('radio')[0])
    await u.click(screen.getByRole('button', { name: /see results/i }))
    expect(await screen.findByRole('heading', { name: /your signature/i })).toBeInTheDocument()
    expect(screen.getAllByRole('article')).toHaveLength(3)
  })

  it('AC-PRO-1/2/3: promociones con cuenta atrás y ADD TO BAG', async () => {
    const u = user()
    renderApp('/promotions')
    expect(screen.getByRole('heading', { name: /the private sale/i })).toBeInTheDocument()
    expect(document.querySelector('time')?.textContent).toMatch(/^\d{2}:\d{2}:\d{2}$/)
    await u.click(screen.getAllByRole('button', { name: /add to bag/i })[0])
    expect(screen.getByRole('link', { name: /bag, 1 items/i })).toBeInTheDocument()
  })

  it('AC-HOME-1/4: Home con hero y enlaces clave', () => {
    renderApp('/')
    expect(screen.getByRole('heading', { level: 1, name: /the art of scent/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /discover the collection/i })).toHaveAttribute('href', '/collection')
    expect(screen.getByRole('link', { name: /commence consultation/i })).toHaveAttribute('href', '/scent-finder')
  })
})
