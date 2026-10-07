# 03 · Estado de comercio

## Dominio (`src/types`)
`Product { slug, name, tagline, family, archetype, keyNotes[], concentration, intensity, sizes[{ml, price}], notes{top,heart,base}, description, image, limited? }`

## Catálogo (`src/data/products.ts`)
9 productos, los del mockup 02: Obsidia Noir, Aethel Essence, Aethel Noir, Monolith Brut, Céleste Monolith, Homme Noir Extrait, The Paligoon Noir, Obsidienne Pur, Obsidia II Extrait. Precios entre 360 y 680 USD.

## Carrito (`CartContext`)
- **AC-CART-1** `add(slug, ml)` suma 1 unidad; repetir el mismo `slug+ml` incrementa la cantidad.
- **AC-CART-2** `setQty` acepta cantidades ≥ 0 y **nunca elimina** la línea (valores negativos se llevan a 0). **Solo `remove` elimina una línea.**
- **AC-CART-3** `validLines` = líneas con cantidad ≥ 1. `subtotal`, `discount` y `total` se calculan únicamente con `validLines`; el envío siempre es gratuito.
- **AC-CART-4** Código promocional `MENTI10` aplica 10 % de descuento; otro código muestra error.
- **AC-CART-5** Persistencia en `localStorage` (`menti.cart`); si el almacenamiento falla, la app funciona en memoria.
- **AC-CART-6** `clear()` vacía la bolsa.
- **AC-CART-7** `hasEmptyLines` indica que hay líneas con cantidad 0; `canCheckout` es `true` solo si existe al menos una línea válida.

## Favoritos (`FavoritesContext`)
- **AC-FAV-1** `toggle(slug)` añade/quita; `has(slug)` indica el estado; el corazón de las tarjetas lo refleja.
- **AC-FAV-2** Persistencia en `localStorage` (`menti.favorites`).

## Sesión (`AuthContext`) — simulada
- **AC-AUTH-1** `signIn(email)` y `signInWithGoogle()` crean un usuario ficticio; `signOut()` lo elimina.
- **AC-AUTH-2** `/account` sin sesión redirige a `/login`.
- **AC-AUTH-3** Persistencia en `localStorage` (`menti.user`).

## Pedido (dentro de `CartContext`)
- **AC-ORD-1** `placeOrder()` guarda el último pedido usando **solo `validLines`**, y vacía la bolsa. Si no hay líneas válidas devuelve `null` y no crea pedido.
- **AC-ORD-2** `/order-confirmation` sin pedido redirige a `/bag`.
- **AC-ORD-3** `/checkout` sin líneas válidas (bolsa vacía o solo líneas en 0) redirige a `/bag`, también por URL directa.
