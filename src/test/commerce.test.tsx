import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { renderApp } from './utils'

const user = () => userEvent.setup()

async function addObsidiaToBag(u: ReturnType<typeof user>) {
  await u.click(screen.getByRole('button', { name: /add to bag/i }))
}

describe('spec 03/04 · carrito y favoritos', () => {
  it('AC-PDP-3/4: el tamaño cambia el precio y ADD TO BAG actualiza el contador', async () => {
    const u = user()
    renderApp('/product/obsidia-noir')
    expect(screen.getByRole('button', { name: /add to bag — \$ 580 usd/i })).toBeInTheDocument()
    await u.click(screen.getByRole('radio', { name: /30 ml/i }))
    expect(screen.getByRole('button', { name: /add to bag — \$ 450 usd/i })).toBeInTheDocument()
    await addObsidiaToBag(u)
    expect(screen.getByRole('link', { name: /bag, 1 items/i })).toBeInTheDocument()
  })

  it('AC-PDP-5 / AC-FAV-1: el corazón alterna favorito y /favorites lo lista', async () => {
    const u = user()
    renderApp('/product/obsidia-noir')
    await u.click(screen.getByRole('button', { name: /add to favorites/i }))
    expect(screen.getByRole('button', { name: /remove from favorites/i })).toHaveAttribute('aria-pressed', 'true')
    await u.click(screen.getByRole('link', { name: /favorites \(1\)/i }))
    expect(await screen.findByRole('heading', { name: /your favorites \(1\)/i })).toBeInTheDocument()
    await u.click(screen.getByRole('button', { name: /remove obsidia noir from favorites/i }))
    expect(screen.getByText(/no favorites yet/i)).toBeInTheDocument()
  })

  it('AC-CART-1/2/3: cantidad, quitar y totales', async () => {
    const u = user()
    renderApp('/product/obsidia-noir')
    await addObsidiaToBag(u)
    await addObsidiaToBag(u)
    await u.click(screen.getByRole('link', { name: /bag, 2 items/i }))
    expect(await screen.findByTestId('bag-total')).toHaveTextContent('$ 1,160 USD')
    await u.click(screen.getByRole('button', { name: /decrease quantity of obsidia noir/i }))
    expect(screen.getByTestId('bag-total')).toHaveTextContent('$ 580 USD')
    await u.click(screen.getByRole('button', { name: /remove obsidia noir/i }))
    expect(screen.getByText(/your bag is empty/i)).toBeInTheDocument()
  })

  it('AC-CART-4: código MENTI10 aplica 10 %; otro código da error', async () => {
    const u = user()
    renderApp('/product/obsidia-noir')
    await addObsidiaToBag(u)
    await u.click(screen.getByRole('link', { name: /bag, 1 items/i }))
    await u.type(await screen.findByLabelText(/access code/i), 'xxxx')
    await u.click(screen.getByRole('button', { name: /apply/i }))
    expect(screen.getByRole('alert')).toHaveTextContent(/invalid code/i)
    await u.clear(screen.getByLabelText(/access code/i))
    await u.type(screen.getByLabelText(/access code/i), 'menti10')
    await u.click(screen.getByRole('button', { name: /apply/i }))
    expect(screen.getByTestId('bag-total')).toHaveTextContent('$ 522 USD')
  })

  it('AC-CART-5: el carrito persiste en localStorage', async () => {
    const u = user()
    const first = renderApp('/product/obsidia-noir')
    await addObsidiaToBag(u)
    first.unmount()
    renderApp('/')
    expect(screen.getByRole('link', { name: /bag, 1 items/i })).toBeInTheDocument()
  })

  it('AC-ORD-3: /checkout con bolsa vacía redirige a /bag', () => {
    const { router } = renderApp('/checkout')
    expect(router.state.location.pathname).toBe('/bag')
  })

  it('AC-ORD-2: /order-confirmation sin pedido redirige a /bag', () => {
    const { router } = renderApp('/order-confirmation')
    expect(router.state.location.pathname).toBe('/bag')
  })
})

describe('spec 04 · flujo de compra completo', () => {
  it('producto → bolsa → checkout (validación) → confirmación → seguimiento', async () => {
    const u = user()
    const { router } = renderApp('/product/obsidia-noir')
    await addObsidiaToBag(u)
    await u.click(screen.getByRole('link', { name: /bag, 1 items/i }))
    await u.click(await screen.findByRole('link', { name: /proceed to checkout/i }))
    expect(router.state.location.pathname).toBe('/checkout')

    // AC-CHK-3: tarjeta vacía → errores y no avanza
    await u.click(screen.getByRole('button', { name: /place order/i }))
    expect(screen.getAllByRole('alert').length).toBeGreaterThanOrEqual(4)
    expect(router.state.location.pathname).toBe('/checkout')

    // AC-CHK-2: otro método no exige tarjeta
    await u.type(screen.getByLabelText(/card number/i), '4112 0000 0000 8892')
    await u.type(screen.getByLabelText(/cardholder name/i), 'Marcel Van Den Berg')
    await u.type(screen.getByLabelText(/expiry date/i), '09 / 99')
    await u.type(screen.getByLabelText(/cvc/i), '123')
    await u.click(screen.getByRole('button', { name: /place order/i }))

    expect(router.state.location.pathname).toBe('/order-confirmation')
    expect(await screen.findByRole('heading', { name: /thank you/i })).toBeInTheDocument()
    expect(screen.getByText(/MP-\d{7}/)).toBeInTheDocument()
    // AC-ORD-1: la bolsa queda vacía
    expect(screen.getByRole('link', { name: /bag, 0 items/i })).toBeInTheDocument()

    await u.click(within(screen.getByRole('main')).getByRole('link', { name: /track order/i }))
    expect(await screen.findByRole('heading', { name: /track your order/i })).toBeInTheDocument()
    expect(screen.getByRole('listitem', { current: 'step' })).toHaveTextContent(/shipped/i)
  })

  it('AC-CHK-2: PayPal permite pagar sin datos de tarjeta', async () => {
    const u = user()
    const { router } = renderApp('/product/aethel-noir')
    await addObsidiaToBag(u)
    await u.click(screen.getByRole('link', { name: /bag, 1 items/i }))
    await u.click(await screen.findByRole('link', { name: /proceed to checkout/i }))
    await u.click(screen.getByRole('radio', { name: /paypal/i }))
    await u.click(screen.getByRole('button', { name: /place order/i }))
    expect(router.state.location.pathname).toBe('/order-confirmation')
  })
})

describe('spec 04 · catálogo', () => {
  it('AC-CAT-1/2/4: 9 productos; filtrar y resetear', async () => {
    const u = user()
    renderApp('/collection')
    expect(screen.getByText(/showing 9 of 24 flacons/i)).toBeInTheDocument()
    await u.click(screen.getByRole('checkbox', { name: /smoked woods/i }))
    expect(screen.getByText(/showing 2 of 24 flacons/i)).toBeInTheDocument()
    await u.click(screen.getByRole('button', { name: /reset all filters/i }))
    expect(screen.getByText(/showing 9 of 24 flacons/i)).toBeInTheDocument()
  })

  it('AC-CAT-3: orden por precio ascendente', async () => {
    const u = user()
    renderApp('/collection')
    await u.selectOptions(screen.getByLabelText(/sort by/i), 'price-asc')
    const first = within(screen.getAllByRole('listitem')[0]).getByRole('heading', { level: 3 })
    expect(first).toHaveTextContent(/aethel essence/i) // el más barato (420)
  })

  it('AC-CAT-5: corazón del catálogo alterna favorito', async () => {
    const u = user()
    renderApp('/collection')
    await u.click(screen.getByRole('button', { name: /add obsidia noir to favorites/i }))
    expect(screen.getByRole('link', { name: /favorites \(1\)/i })).toBeInTheDocument()
  })
})
