# 04 · Páginas

Para cada página, el layout y la jerarquía salen del mockup indicado; los tokens, del DESIGN.md. **Todos los textos visibles están en español** (los mockups, generados con Stitch, están en inglés).

## Criterio transversal
- **AC-LANG-1** Ninguna página muestra textos de interfaz en inglés (comprobado por prueba automática). `lang="es"` en el documento.

| Página | Criterios de aceptación |
|---|---|
| **Home** (01) | AC-HOME-1 hero a sangre con titular `EL ARTE DEL AROMA` y botón `Descubrir la colección` → `/collection`. AC-HOME-2 3 colecciones (`Antologías olfativas`) enlazan a `/collections`. AC-HOME-3 fila de 4 productos con enlace a su ficha. AC-HOME-4 banda "Encuentra tu aroma" → `/scent-finder`. AC-HOME-5 filosofía, cita y boletín (campo + botón). |
| **Catálogo** (02) | AC-CAT-1 muestra los 9 productos. AC-CAT-2 filtrar por familia, nota, arquetipo e intensidad reduce la lista y actualiza `Mostrando N de 24 frascos`. AC-CAT-3 orden por precio ascendente/descendente. AC-CAT-4 `Restablecer filtros` restaura. AC-CAT-5 corazón alterna favorito. AC-CAT-6 tarjeta enlaza a `/product/:slug`. |
| **Detalle** (03) | AC-PDP-1 por `slug`; `slug` desconocido → 404. AC-PDP-2 pirámide olfativa (salida/corazón/fondo). AC-PDP-3 el selector de tamaño cambia el precio mostrado y el del botón. AC-PDP-4 `Añadir a la bolsa` añade la línea y actualiza el contador. AC-PDP-5 corazón alterna favorito. AC-PDP-6 opiniones y "También te puede gustar". |
| **Buscador** (04) | AC-QUIZ-1 5 pasos con progreso `Paso n / 5`. AC-QUIZ-2 `Continuar` deshabilitado sin elegir opción; `Atrás` vuelve. AC-QUIZ-3 al final muestra 3 recomendaciones según las respuestas. |
| **Colecciones** (05) | AC-COL-1 4 bandas (Obsidiana, Nocturno, Ámbar, Vetiver); `Descubrir` → `/collection`. |
| **Promociones** (06) | AC-PRO-1 hero `La venta privada` con cuenta atrás. AC-PRO-2 3 bloques (sets de regalo, kit de descubrimiento, fidelidad). AC-PRO-3 4 productos con precio habitual tachado y precio de oferta; `Añadir a la bolsa` funciona. |
| **Opiniones** (07) | AC-REV-1 promedio y distribución por estrellas. AC-REV-2 filtros `Todas`, `5 estrellas` reducen la lista. AC-REV-3 `Escribir una opinión` abre el formulario (validado) y añade la opinión a la lista. |
| **Bolsa** (08) | AC-BAG-1 líneas con cantidad ±, `Eliminar`, subtotal y total. AC-BAG-2 código promo (spec 03). AC-BAG-3 vacía → mensaje + enlace al catálogo. AC-BAG-4 `Continuar al pago` → `/checkout`. **AC-BAG-5 cantidad 0:** bajar la cantidad a 0 **no elimina** la línea (solo `Eliminar` lo hace); la línea muestra el aviso `Cantidad mínima: 1…` y `−` queda deshabilitado en 0. **AC-BAG-6** si hay líneas válidas y líneas en 0, se muestra el aviso `Los productos con cantidad 0 no se incluirán en tu pedido` y totales/pedido usan solo las válidas. **AC-BAG-7** si no hay ninguna línea con cantidad ≥ 1, se muestra el mensaje `No puedes continuar…` y `Continuar al pago` queda deshabilitado (no es un enlace). |
| **Checkout** (09) | AC-CHK-1 pasos 01 Envío (completado) · 02 Pago (activo) · 03 Confirmación. AC-CHK-2 métodos: tarjeta (expandible con campos), PayPal, Apple Pay, Google Pay; uno seleccionado a la vez. AC-CHK-3 `Realizar pedido` valida tarjeta (16 dígitos, titular, caducidad MM/AA, CVC 3–4) y, si es válida, crea el pedido y navega a confirmación. AC-CHK-4 el resumen muestra **solo líneas con cantidad ≥ 1**, con su total. |
| **Confirmación** (10) | AC-CNF-1 `Gracias`, número de pedido, entrega estimada, resumen (solo líneas válidas). AC-CNF-2 `Seguir pedido` → `/track-order`; `Seguir comprando` → `/collection`. |
| **Login** (11) | AC-LOG-1 pestañas `Iniciar sesión` / `Crear cuenta`. AC-LOG-2 correo y contraseña obligatorios; error visible si faltan. AC-LOG-3 `Continuar con Google` inicia sesión simulada y navega a `/account`. |
| **Perfil** (12) | AC-ACC-1 menú lateral (Pedidos, Direcciones, Métodos de pago, Favoritos, Fidelidad, Ajustes) cambia el panel. AC-ACC-2 tabla de pedidos, direcciones y métodos guardados. AC-ACC-3 `Cerrar sesión` cierra sesión y vuelve a Home. |
| **Favoritos** (13) | AC-FAVP-1 lista los favoritos con contador. AC-FAVP-2 `Añadir a la bolsa` y `Quitar` funcionan. AC-FAVP-3 estado vacío. |
| **Seguimiento** (14) | AC-TRK-1 línea de tiempo de 4 pasos con el paso actual (`Enviado`) resaltado. AC-TRK-2 transportista, nº de seguimiento, dirección y artículos. |
| **Contacto** (15) | AC-CON-1 formulario con validación (nombre, correo, mensaje) y mensaje de éxito. AC-CON-2 lista de 4 boutiques con dirección y horario. |
| **FAQ** (16) | AC-FAQ-1 chips de categoría filtran preguntas. AC-FAQ-2 acordeón: una abierta a la vez, `aria-expanded` correcto. |
| **Nosotros** (17) | AC-ABT-1 hero `La casa de Menti`, tres pilares, banda fotográfica, cronología y cita. |
| **Legales** (18) | AC-LEG-1 pestañas Términos / Privacidad / Devoluciones cambian el documento y la URL. AC-LEG-2 `:doc` inválido → 404. |
