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
    await u.click(screen.getByRole('button', { name: /entrar al archivo/i }))
    expect(screen.getAllByRole('alert')).toHaveLength(2)
    expect(router.state.location.pathname).toBe('/login')
  })

  it('AC-LOG-1: pestañas SIGN IN / CREATE ACCOUNT', async () => {
    const u = user()
    renderApp('/login')
    await u.click(screen.getByRole('tab', { name: /crear cuenta/i }))
    expect(screen.getByRole('button', { name: /^crear cuenta$/i })).toBeInTheDocument()
  })

  it('AC-LOG-3 / AC-ACC-*: Google inicia sesión, perfil y cierre de sesión', async () => {
    const u = user()
    const { router } = renderApp('/login')
    await u.click(screen.getByRole('button', { name: /continuar con google/i }))
    expect(router.state.location.pathname).toBe('/account')
    expect(await screen.findByText(/te damos la bienvenida de nuevo, marcel/i)).toBeInTheDocument()
    await u.click(screen.getByRole('button', { name: /^direcciones$/i }))
    expect(screen.getByRole('region', { name: /direcciones/i })).toBeInTheDocument()
    await u.click(screen.getByRole('button', { name: /métodos de pago/i }))
    expect(screen.getByRole('region', { name: /métodos de pago/i })).toBeInTheDocument()
    await u.click(screen.getByRole('button', { name: /cerrar sesión/i }))
    expect(router.state.location.pathname).toBe('/')
    expect(screen.getByRole('link', { name: /iniciar sesión/i })).toBeInTheDocument()
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
    expect(screen.getByText(/cuánto tarda la entrega/i)).toBeInTheDocument()
    await u.click(screen.getByRole('button', { name: /^devoluciones$/i }))
    expect(screen.queryByText(/cuánto tarda la entrega/i)).toBeNull()
    expect(screen.getByText(/puedo devolver una fragancia/i)).toBeInTheDocument()
  })

  it('AC-CON-1/2: validación del formulario, éxito y 4 boutiques', async () => {
    const u = user()
    renderApp('/contact')
    for (const city of ['París', 'Milán', 'Nueva York', 'Dubái']) {
      expect(screen.getByRole('heading', { name: city })).toBeInTheDocument()
    }
    await u.click(screen.getByRole('button', { name: /enviar mensaje/i }))
    expect(screen.getAllByRole('alert')).toHaveLength(3)
    await u.type(screen.getByLabelText(/^nombre/i), 'Ana')
    await u.type(screen.getByLabelText(/^correo electrónico/i), 'ana@example.com')
    await u.type(screen.getByLabelText(/^mensaje/i), 'Hola, necesito ayuda')
    await u.click(screen.getByRole('button', { name: /enviar mensaje/i }))
    expect(screen.getByRole('status')).toHaveTextContent(/gracias, ana/i)
  })

  it('AC-LEG-1: pestañas legales cambian de documento y URL', async () => {
    const u = user()
    const { router } = renderApp('/legal/privacy')
    expect(screen.getByRole('heading', { level: 1, name: /política de privacidad/i })).toBeInTheDocument()
    const nav = screen.getByRole('navigation', { name: /documentos legales/i })
    await u.click(within(nav).getByRole('link', { name: /términos del servicio/i }))
    expect(router.state.location.pathname).toBe('/legal/terms')
    expect(await screen.findByRole('heading', { level: 1, name: /términos del servicio/i })).toBeInTheDocument()
  })

  it('AC-REV-2/3: filtro 5 estrellas y nueva opinión', async () => {
    const u = user()
    renderApp('/reviews')
    const total = screen.getAllByRole('listitem').length
    await u.click(screen.getByRole('button', { name: /5 estrellas/i }))
    expect(screen.getAllByRole('listitem').length).toBeLessThan(total)
    await u.click(screen.getByRole('button', { name: /^todas$/i }))
    await u.click(screen.getByRole('button', { name: /escribir una opinión/i }))
    await u.click(screen.getByRole('button', { name: /publicar opinión/i }))
    expect(screen.getByRole('alert')).toBeInTheDocument()
    await u.type(screen.getByLabelText(/^título/i), 'Excelente')
    await u.type(screen.getByLabelText(/tu nombre/i), 'Luis')
    await u.type(screen.getByLabelText(/tu opinión/i), 'Un perfume magnífico')
    await u.click(screen.getByRole('button', { name: /publicar opinión/i }))
    expect(screen.getByText(/un perfume magnífico/i)).toBeInTheDocument()
  })

  it('AC-QUIZ-1/2/3: 5 pasos, Continuar deshabilitado sin elección, 3 recomendaciones', async () => {
    const u = user()
    renderApp('/scent-finder')
    expect(screen.getByText(/paso 1 \/ 5/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /continuar/i })).toBeDisabled()
    for (let i = 0; i < 4; i++) {
      await u.click(screen.getAllByRole('radio')[0])
      await u.click(screen.getByRole('button', { name: /continuar/i }))
    }
    await u.click(screen.getAllByRole('radio')[0])
    await u.click(screen.getByRole('button', { name: /ver resultados/i }))
    expect(await screen.findByRole('heading', { name: /tu firma/i })).toBeInTheDocument()
    expect(screen.getAllByRole('article')).toHaveLength(3)
  })

  it('AC-PRO-1/2/3: promociones con cuenta atrás y ADD TO BAG', async () => {
    const u = user()
    renderApp('/promotions')
    expect(screen.getByRole('heading', { name: /la venta privada/i })).toBeInTheDocument()
    expect(document.querySelector('time')?.textContent).toMatch(/^\d{2}:\d{2}:\d{2}$/)
    await u.click(screen.getAllByRole('button', { name: /añadir a la bolsa/i })[0])
    expect(screen.getByRole('link', { name: /bolsa, 1 artículo$/i })).toBeInTheDocument()
  })

  it('AC-HOME-1/4: Home con hero y enlaces clave', () => {
    renderApp('/')
    expect(screen.getByRole('heading', { level: 1, name: /el arte del aroma/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /descubrir la colección/i })).toHaveAttribute('href', '/collection')
    expect(screen.getByRole('link', { name: /comenzar consulta/i })).toHaveAttribute('href', '/scent-finder')
  })
})
