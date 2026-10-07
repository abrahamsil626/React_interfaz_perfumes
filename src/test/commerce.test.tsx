import { act, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { renderApp } from './utils'

const user = () => userEvent.setup()

async function addToBag(u: ReturnType<typeof user>) {
  await u.click(screen.getByRole('button', { name: /añadir a la bolsa/i }))
}

async function openBag(u: ReturnType<typeof user>, items: string) {
  await u.click(screen.getByRole('link', { name: new RegExp(`bolsa, ${items}`, 'i') }))
}

describe('spec 03/04 · carrito y favoritos', () => {
  it('AC-PDP-3/4: el tamaño cambia el precio y AÑADIR actualiza el contador', async () => {
    const u = user()
    renderApp('/product/obsidia-noir')
    expect(screen.getByRole('button', { name: /añadir a la bolsa — \$ 580 usd/i })).toBeInTheDocument()
    await u.click(screen.getByRole('radio', { name: /30 ml/i }))
    expect(screen.getByRole('button', { name: /añadir a la bolsa — \$ 450 usd/i })).toBeInTheDocument()
    await addToBag(u)
    expect(screen.getByRole('link', { name: /bolsa, 1 artículo$/i })).toBeInTheDocument()
  })

  it('AC-PDP-5 / AC-FAV-1: el corazón alterna favorito y /favorites lo lista', async () => {
    const u = user()
    renderApp('/product/obsidia-noir')
    await u.click(screen.getByRole('button', { name: /añadir a favoritos/i }))
    expect(screen.getByRole('button', { name: /quitar de favoritos/i })).toHaveAttribute('aria-pressed', 'true')
    await u.click(screen.getByRole('link', { name: /favoritos \(1\)/i }))
    expect(await screen.findByRole('heading', { name: /tus favoritos \(1\)/i })).toBeInTheDocument()
    await u.click(screen.getByRole('button', { name: /quitar obsidia noir de favoritos/i }))
    expect(screen.getByText(/aún no tienes favoritos/i)).toBeInTheDocument()
  })

  it('AC-CART-1/3: cantidad y totales', async () => {
    const u = user()
    renderApp('/product/obsidia-noir')
    await addToBag(u)
    await addToBag(u)
    await openBag(u, '2 artículos')
    expect(await screen.findByTestId('bag-total')).toHaveTextContent('$ 1,160 USD')
    await u.click(screen.getByRole('button', { name: /disminuir la cantidad de obsidia noir/i }))
    expect(screen.getByTestId('bag-total')).toHaveTextContent('$ 580 USD')
  })

  it('AC-CART-4: código MENTI10 aplica 10 %; otro código da error', async () => {
    const u = user()
    renderApp('/product/obsidia-noir')
    await addToBag(u)
    await openBag(u, '1 artículo')
    await u.type(await screen.findByLabelText(/código de acceso/i), 'xxxx')
    await u.click(screen.getByRole('button', { name: /aplicar/i }))
    expect(screen.getByRole('alert')).toHaveTextContent(/código no válido/i)
    await u.clear(screen.getByLabelText(/código de acceso/i))
    await u.type(screen.getByLabelText(/código de acceso/i), 'menti10')
    await u.click(screen.getByRole('button', { name: /aplicar/i }))
    expect(screen.getByTestId('bag-total')).toHaveTextContent('$ 522 USD')
  })

  it('AC-CART-5: el carrito persiste en localStorage', async () => {
    const u = user()
    const first = renderApp('/product/obsidia-noir')
    await addToBag(u)
    first.unmount()
    renderApp('/')
    expect(screen.getByRole('link', { name: /bolsa, 1 artículo$/i })).toBeInTheDocument()
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

describe('spec 03 · cantidad 0 en la bolsa (AC-CART-2/3/7, AC-BAG-5, AC-ORD-1/3)', () => {
  it('bajar a 0 NO elimina la línea; solo ELIMINAR la quita', async () => {
    const u = user()
    renderApp('/product/obsidia-noir')
    await addToBag(u)
    await openBag(u, '1 artículo')
    await u.click(await screen.findByRole('button', { name: /disminuir la cantidad de obsidia noir/i }))

    // la línea sigue ahí con cantidad 0 y su aviso
    expect(screen.getByLabelText('Cantidad 0')).toBeInTheDocument()
    expect(screen.getByText(/cantidad mínima: 1/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /disminuir la cantidad de obsidia noir/i })).toBeDisabled()

    await u.click(screen.getByRole('button', { name: /eliminar obsidia noir/i }))
    expect(screen.getByText(/tu bolsa está vacía/i)).toBeInTheDocument()
  })

  it('1.2 · un solo producto con cantidad 0: mensaje, pago bloqueado y /checkout redirige', async () => {
    const u = user()
    const { router } = renderApp('/product/obsidia-noir')
    await addToBag(u)
    await openBag(u, '1 artículo')
    await u.click(await screen.findByRole('button', { name: /disminuir la cantidad de obsidia noir/i }))

    expect(screen.getByText(/no puedes continuar/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /continuar al pago/i })).toBeDisabled()
    expect(screen.queryByRole('link', { name: /continuar al pago/i })).toBeNull()
    expect(screen.getByTestId('bag-total')).toHaveTextContent('$ 0 USD')

    // acceso directo por URL
    await act(async () => {
      await router.navigate('/checkout')
    })
    expect(router.state.location.pathname).toBe('/bag')
  })

  it('1.1 · varios productos: el de cantidad 0 muestra aviso y se excluye del pedido', async () => {
    const u = user()
    const { router } = renderApp('/product/obsidia-noir')
    await addToBag(u) // Obsidia Noir 100 ml → 580
    await act(async () => {
      await router.navigate('/product/aethel-noir')
    })
    await addToBag(u) // Aethel Noir 100 ml → 460
    await openBag(u, '2 artículos')

    await u.click(await screen.findByRole('button', { name: /disminuir la cantidad de aethel noir/i }))

    expect(screen.getByText(/los productos con cantidad 0 no se incluirán/i)).toBeInTheDocument()
    expect(screen.getByText(/cantidad mínima: 1/i)).toBeInTheDocument()
    expect(screen.getByTestId('bag-total')).toHaveTextContent('$ 580 USD') // solo Obsidia Noir
    expect(screen.getByRole('link', { name: /continuar al pago/i })).toBeInTheDocument()

    await u.click(screen.getByRole('link', { name: /continuar al pago/i }))
    const summary = await screen.findByRole('complementary', { name: /resumen del pedido/i })
    expect(within(summary).getByText('Obsidia Noir')).toBeInTheDocument()
    expect(within(summary).queryByText('Aethel Noir')).toBeNull()

    await u.click(screen.getByRole('radio', { name: /paypal/i }))
    await u.click(screen.getByRole('button', { name: /realizar pedido/i }))
    expect(router.state.location.pathname).toBe('/order-confirmation')
    const main = screen.getByRole('main')
    expect(within(main).getByText(/obsidia noir/i)).toBeInTheDocument()
    expect(within(main).queryByText(/aethel noir/i)).toBeNull()
  })

  it('subir de nuevo la cantidad desde 0 reactiva el pago', async () => {
    const u = user()
    renderApp('/product/obsidia-noir')
    await addToBag(u)
    await openBag(u, '1 artículo')
    await u.click(await screen.findByRole('button', { name: /disminuir la cantidad de obsidia noir/i }))
    expect(screen.getByRole('button', { name: /continuar al pago/i })).toBeDisabled()
    await u.click(screen.getByRole('button', { name: /aumentar la cantidad de obsidia noir/i }))
    expect(screen.getByRole('link', { name: /continuar al pago/i })).toBeInTheDocument()
    expect(screen.queryByText(/no puedes continuar/i)).toBeNull()
  })
})

describe('spec 04 · flujo de compra completo', () => {
  it('producto → bolsa → checkout (validación) → confirmación → seguimiento', async () => {
    const u = user()
    const { router } = renderApp('/product/obsidia-noir')
    await addToBag(u)
    await openBag(u, '1 artículo')
    await u.click(await screen.findByRole('link', { name: /continuar al pago/i }))
    expect(router.state.location.pathname).toBe('/checkout')

    // AC-CHK-3: tarjeta vacía → errores y no avanza
    await u.click(screen.getByRole('button', { name: /realizar pedido/i }))
    expect(screen.getAllByRole('alert').length).toBeGreaterThanOrEqual(4)
    expect(router.state.location.pathname).toBe('/checkout')

    await u.type(screen.getByLabelText(/número de tarjeta/i), '4112 0000 0000 8892')
    await u.type(screen.getByLabelText(/titular de la tarjeta/i), 'Marcel Van Den Berg')
    await u.type(screen.getByLabelText(/fecha de caducidad/i), '09 / 99')
    await u.type(screen.getByLabelText(/cvc/i), '123')
    await u.click(screen.getByRole('button', { name: /realizar pedido/i }))

    expect(router.state.location.pathname).toBe('/order-confirmation')
    expect(await screen.findByRole('heading', { name: /gracias/i })).toBeInTheDocument()
    expect(screen.getByText(/MP-\d{7}/)).toBeInTheDocument()
    // AC-ORD-1: la bolsa queda vacía
    expect(screen.getByRole('link', { name: /bolsa, 0 artículos/i })).toBeInTheDocument()

    await u.click(within(screen.getByRole('main')).getByRole('link', { name: /seguir pedido/i }))
    expect(await screen.findByRole('heading', { name: /sigue tu pedido/i })).toBeInTheDocument()
    expect(screen.getByRole('listitem', { current: 'step' })).toHaveTextContent(/enviado/i)
  })

  it('AC-CHK-2: PayPal permite pagar sin datos de tarjeta', async () => {
    const u = user()
    const { router } = renderApp('/product/aethel-noir')
    await addToBag(u)
    await openBag(u, '1 artículo')
    await u.click(await screen.findByRole('link', { name: /continuar al pago/i }))
    await u.click(screen.getByRole('radio', { name: /paypal/i }))
    await u.click(screen.getByRole('button', { name: /realizar pedido/i }))
    expect(router.state.location.pathname).toBe('/order-confirmation')
  })
})

describe('spec 04 · catálogo', () => {
  it('AC-CAT-1/2/4: 9 productos; filtrar y restablecer', async () => {
    const u = user()
    renderApp('/collection')
    expect(screen.getByText(/mostrando 9 de 24 frascos/i)).toBeInTheDocument()
    await u.click(screen.getByRole('checkbox', { name: /maderas ahumadas/i }))
    expect(screen.getByText(/mostrando 2 de 24 frascos/i)).toBeInTheDocument()
    await u.click(screen.getByRole('button', { name: /restablecer filtros/i }))
    expect(screen.getByText(/mostrando 9 de 24 frascos/i)).toBeInTheDocument()
  })

  it('AC-CAT-3: orden por precio ascendente', async () => {
    const u = user()
    renderApp('/collection')
    await u.selectOptions(screen.getByLabelText(/ordenar por/i), 'price-asc')
    const first = within(screen.getAllByRole('listitem')[0]).getByRole('heading', { level: 3 })
    expect(first).toHaveTextContent(/aethel essence/i) // el más barato (420)
  })

  it('AC-CAT-5: corazón del catálogo alterna favorito', async () => {
    const u = user()
    renderApp('/collection')
    await u.click(screen.getByRole('button', { name: /añadir obsidia noir a favoritos/i }))
    expect(screen.getByRole('link', { name: /favoritos \(1\)/i })).toBeInTheDocument()
  })
})
