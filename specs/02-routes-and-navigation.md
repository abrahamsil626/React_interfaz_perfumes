# 02 · Rutas y navegación

## Mapa de rutas (18 pantallas)
| # | Ruta | Página | Mockup |
|---|---|---|---|
| 01 | `/` | Home | 01-home |
| 02 | `/collection` | Catálogo con filtros | 02-catalogo |
| 03 | `/product/:slug` | Detalle de producto | 03-detalle-producto |
| 04 | `/scent-finder` | Buscador de fragancia (quiz) | 04-buscador-fragancia |
| 05 | `/collections` | Colecciones | 05-colecciones |
| 06 | `/promotions` | Promociones | 06-promociones |
| 07 | `/reviews` | Opiniones | 07-opiniones |
| 08 | `/bag` | Carrito | 08-carrito |
| 09 | `/checkout` | Checkout (pago) | 09-checkout |
| 10 | `/order-confirmation` | Confirmación | 10-confirmacion-pedido |
| 11 | `/login` | Login y registro (Google) | 11-login-registro |
| 12 | `/account` | Perfil | 12-perfil |
| 13 | `/favorites` | Favoritos | 13-favoritos |
| 14 | `/track-order` | Seguimiento | 14-seguimiento-pedido |
| 15 | `/contact` | Contacto y boutiques | 15-contacto |
| 16 | `/faq` | FAQ | 16-faq |
| 17 | `/about` | Nosotros | 17-nosotros |
| 18 | `/legal/:doc` (`terms`, `privacy`, `returns`) | Legales | 18-legales |

## Layout
- **AC-NAV-1** Todas las páginas comparten `Layout` con `Header` y `Footer`, **excepto** `/checkout` y `/login`, que usan cabecera mínima (flecha de regreso + wordmark), como en los mockups.
- **AC-NAV-2** `Header`: izquierda `MENU` (abre panel con enlaces a todas las secciones), centro wordmark `MENTI PARFUM`, derecha iconos Buscar, Favoritos, Cuenta y Bolsa con contador.
- **AC-NAV-3** El contador de la bolsa refleja la cantidad total de unidades; el icono de favoritos enlaza a `/favorites`; cuenta enlaza a `/account` (o `/login` si no hay sesión).
- **AC-NAV-4** `Footer` con 4 columnas de enlaces reales (Archive → `/collection`, Client Service → `/contact`, FAQ, Legal, Atelier → `/contact`, etc.) y wordmark centrado.
- **AC-NAV-5** Ruta desconocida → página 404 mínima con enlace a Home.
- **AC-NAV-6** Al cambiar de ruta se hace scroll al inicio.
- **AC-NAV-7** Todos los enlaces internos apuntan a una ruta existente (verificado por prueba).
