# 03 · Estado de comercio

## Dominio (`src/types`)
`Product { slug, name, family, concentration, sizes[{ml, price}], notes{top,heart,base}, description, image, tagline, intensity, longevity, limited? }`

## Catálogo (`src/data/products.ts`)
9 productos, los del mockup 02: Obsidia Noir, Aethel Essence, Aethel Noir, Monolith Brut, Céleste Monolith, Homme Noir Extrait, The Paligoon Noir, Obsidienne Pur, Obsidia II Extrait. Precios entre 360 y 680 USD.

## Carrito (`CartContext`)
- **AC-CART-1** `add(slug, ml)` suma 1 unidad; repetir el mismo `slug+ml` incrementa la cantidad.
- **AC-CART-2** `setQty` con valor ≤ 0 elimina la línea; `remove` elimina la línea.
- **AC-CART-3** `subtotal` = Σ precio × cantidad; envío siempre gratuito (complimentary); `total` = subtotal − descuento.
- **AC-CART-4** Código promocional `MENTI10` aplica 10 % de descuento; otro código muestra error.
- **AC-CART-5** Persistencia en `localStorage` (`menti.cart`); si el almacenamiento falla, la app funciona en memoria.
- **AC-CART-6** `clear()` vacía la bolsa (se llama al confirmar el pedido).

## Favoritos (`FavoritesContext`)
- **AC-FAV-1** `toggle(slug)` añade/quita; `has(slug)` indica el estado; el corazón de las tarjetas lo refleja.
- **AC-FAV-2** Persistencia en `localStorage` (`menti.favorites`).

## Sesión (`AuthContext`) — simulada
- **AC-AUTH-1** `signIn(email)` y `signInWithGoogle()` crean un usuario ficticio; `signOut()` lo elimina.
- **AC-AUTH-2** `/account` sin sesión redirige a `/login`.
- **AC-AUTH-3** Persistencia en `localStorage` (`menti.user`).

## Pedido (`OrderContext` dentro de CartContext)
- **AC-ORD-1** `placeOrder()` guarda el último pedido (número, líneas, total, fecha estimada) y vacía la bolsa.
- **AC-ORD-2** `/order-confirmation` sin pedido redirige a `/bag`.
- **AC-ORD-3** `/checkout` con bolsa vacía redirige a `/bag`.
