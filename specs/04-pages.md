# 04 · Páginas

Para cada página, el layout y la jerarquía salen del mockup indicado; los tokens, del DESIGN.md.

| Página | Criterios de aceptación |
|---|---|
| **Home** (01) | AC-HOME-1 hero a sangre con titular `THE ART OF SCENT` y botón → `/collection`. AC-HOME-2 3 colecciones (`OLFACTORY ANTHOLOGIES`) enlazan a `/collections`. AC-HOME-3 fila de 4 productos con enlace a su ficha. AC-HOME-4 banda "Find your signature scent" → `/scent-finder`. AC-HOME-5 filosofía, cita y newsletter (campo + botón). |
| **Catálogo** (02) | AC-CAT-1 muestra los 9 productos. AC-CAT-2 filtrar por familia, nota, arquetipo e intensidad reduce la lista y actualiza `SHOWING N OF 24`. AC-CAT-3 orden por precio ascendente/descendente. AC-CAT-4 `RESET ALL FILTERS` restaura. AC-CAT-5 corazón alterna favorito. AC-CAT-6 tarjeta enlaza a `/product/:slug`. |
| **Detalle** (03) | AC-PDP-1 por `slug`; `slug` desconocido → 404. AC-PDP-2 pirámide olfativa (top/heart/base). AC-PDP-3 selector de tamaño cambia el precio mostrado y el del botón. AC-PDP-4 `ADD TO BAG` añade la línea y actualiza el contador. AC-PDP-5 corazón alterna favorito. AC-PDP-6 reseñas y "You may also like". |
| **Buscador** (04) | AC-QUIZ-1 5 pasos con progreso `STEP n / 5`. AC-QUIZ-2 `CONTINUE` deshabilitado sin elegir opción; `BACK` vuelve. AC-QUIZ-3 al final muestra 3 recomendaciones según respuestas. |
| **Colecciones** (05) | AC-COL-1 4 bandas (Obsidian, Nocturne, Ambre, Vétiver); `DISCOVER` → `/collection`. |
| **Promociones** (06) | AC-PRO-1 hero `THE PRIVATE SALE` con cuenta atrás. AC-PRO-2 3 bloques (Gift sets, Discovery kit, Loyalty). AC-PRO-3 4 productos con precio tachado y precio promocional; `ADD TO BAG` funciona. |
| **Opiniones** (07) | AC-REV-1 promedio, distribución por estrellas. AC-REV-2 filtros `ALL`, `5 STARS` reducen la lista. AC-REV-3 `WRITE A REVIEW` abre formulario y añade la opinión a la lista. |
| **Carrito** (08) | AC-BAG-1 líneas con cantidad ±, quitar, subtotal y total. AC-BAG-2 código promo (spec 03). AC-BAG-3 vacío → mensaje + enlace al catálogo. AC-BAG-4 `PROCEED TO CHECKOUT` → `/checkout`. |
| **Checkout** (09) | AC-CHK-1 pasos 01 Shipping (completado) · 02 Payment (activo) · 03 Confirmation. AC-CHK-2 métodos: tarjeta (expandible con campos), PayPal, Apple Pay, Google Pay; uno seleccionado a la vez. AC-CHK-3 `PLACE ORDER` valida tarjeta (16 dígitos, nombre, caducidad MM/AA, CVC 3–4) y, si es válida, crea el pedido y navega a confirmación. AC-CHK-4 resumen con líneas y total. |
| **Confirmación** (10) | AC-CNF-1 `THANK YOU`, número de pedido, entrega estimada, resumen. AC-CNF-2 `TRACK ORDER` → `/track-order`; `CONTINUE SHOPPING` → `/collection`. |
| **Login** (11) | AC-LOG-1 pestañas `SIGN IN` / `CREATE ACCOUNT`. AC-LOG-2 email y contraseña obligatorios; error visible si faltan. AC-LOG-3 `CONTINUE WITH GOOGLE` inicia sesión simulada y navega a `/account`. |
| **Perfil** (12) | AC-ACC-1 menú lateral (Orders, Addresses, Payment methods, Favorites, Loyalty, Settings) cambia el panel. AC-ACC-2 tabla de pedidos, direcciones y métodos guardados. AC-ACC-3 `SIGN OUT` cierra sesión y vuelve a Home. |
| **Favoritos** (13) | AC-FAVP-1 lista los favoritos con contador. AC-FAVP-2 `ADD TO BAG` y `REMOVE` funcionan. AC-FAVP-3 estado vacío. |
| **Seguimiento** (14) | AC-TRK-1 línea de tiempo de 4 pasos con el paso actual resaltado. AC-TRK-2 transportista, nº de seguimiento, dirección y artículos. |
| **Contacto** (15) | AC-CON-1 formulario con validación (nombre, email, mensaje) y mensaje de éxito. AC-CON-2 lista de 4 boutiques con dirección y horario. |
| **FAQ** (16) | AC-FAQ-1 chips de categoría filtran preguntas. AC-FAQ-2 acordeón: una abierta a la vez, `aria-expanded` correcto. |
| **Nosotros** (17) | AC-ABT-1 hero `THE HOUSE OF MENTI`, tres pilares, banda fotográfica, línea de tiempo y cita. |
| **Legales** (18) | AC-LEG-1 pestañas Terms / Privacy / Returns cambian el documento y la URL. AC-LEG-2 `:doc` inválido → 404. |
