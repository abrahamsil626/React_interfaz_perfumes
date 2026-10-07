# Menti Parfum

Interfaz e-commerce de **perfumería de lujo** en React + TypeScript, con una estética austera inspirada en el sistema de diseño de Bugatti: lienzo negro puro, titulares en mayúsculas con mucho espaciado, botones de contorno transparente y fotografía como protagonista.

![Home](docs/mockups/01-home.jpg)

## Cómo se hizo

1. **Mockups con Google Stitch.** Las 18 pantallas se diseñaron primero como imágenes usando el **MCP de Stitch de Google** conectado a Claude Code, partiendo de un design system generado a partir del `DESIGN.md` de Bugatti ([voltagent/awesome-design-md](https://github.com/voltagent/awesome-design-md)).
2. **Especificación.** Cada pantalla tiene criterios de aceptación en [`specs/`](specs/) (Spec-Driven Development).
3. **Implementación** en React siguiendo esas specs y los mockups, con pruebas automáticas por cada criterio.

> Las fotografías de producto fueron generadas con IA dentro de Stitch y son solo ilustrativas.

## Mockups

Los mockups están en inglés (tal como los generó Stitch); la aplicación implementada está en español. Las imágenes completas (2560 px de ancho) están en [`mockups/`](mockups/). Vista previa:

| | | |
|---|---|---|
| ![Catálogo](docs/mockups/02-catalogo.jpg) **Catálogo** | ![Detalle](docs/mockups/03-detalle-producto.jpg) **Detalle de producto** | ![Buscador](docs/mockups/04-buscador-fragancia.jpg) **Buscador de fragancia** |
| ![Colecciones](docs/mockups/05-colecciones.jpg) **Colecciones** | ![Promociones](docs/mockups/06-promociones.jpg) **Promociones** | ![Opiniones](docs/mockups/07-opiniones.jpg) **Opiniones** |
| ![Carrito](docs/mockups/08-carrito.jpg) **Carrito** | ![Checkout](docs/mockups/09-checkout.jpg) **Checkout** | ![Confirmación](docs/mockups/10-confirmacion-pedido.jpg) **Confirmación** |
| ![Login](docs/mockups/11-login-registro.jpg) **Login y registro** | ![Perfil](docs/mockups/12-perfil.jpg) **Perfil** | ![Favoritos](docs/mockups/13-favoritos.jpg) **Favoritos** |
| ![Seguimiento](docs/mockups/14-seguimiento-pedido.jpg) **Seguimiento** | ![Contacto](docs/mockups/15-contacto.jpg) **Contacto** | ![FAQ](docs/mockups/16-faq.jpg) **FAQ** |
| ![Nosotros](docs/mockups/17-nosotros.jpg) **Nosotros** | ![Legales](docs/mockups/18-legales.jpg) **Legales** | |

## Funcionalidad

- Interfaz íntegramente **en español**.
- Catálogo con filtros (familia, notas, arquetipo, intensidad) y orden por precio.
- Ficha de producto con pirámide olfativa, tamaños y reseñas.
- Buscador de fragancia (quiz de 5 pasos) con recomendaciones.
- Carrito con validación de cantidades (una línea en 0 se conserva con aviso y no se paga; solo `Eliminar` la quita), código promocional (`MENTI10`), checkout con validación de tarjeta y confirmación de pedido.
- Favoritos, login/registro con "Continuar con Google", perfil y seguimiento de pedido.
- Contacto con boutiques, FAQ, nosotros y documentos legales.

> Backend, pagos y autenticación son **simulados** en el cliente (estado + `localStorage`).

## Stack

React 19 · TypeScript (strict) · Vite · React Router · Tailwind CSS v4 · Vitest + Testing Library.

## Empezar

```bash
npm install
npm run dev        # http://localhost:5173
```

| Script | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Typecheck + build de producción |
| `npm run typecheck` | Solo TypeScript |
| `npm test` | Pruebas (criterios de aceptación de las specs) |

## Estructura

```
specs/        Especificaciones y plan (spec-driven)
mockups/      Mockups de Stitch (PNG completos)
docs/         Vistas previas para este README
public/       Fotografía de producto
src/
  components/ ui · layout · product
  context/    carrito, favoritos, sesión
  data/       productos y contenido
  pages/      una página por ruta
  test/       pruebas
```

## Sistema de diseño

Tokens y reglas en [`specs/01-design-system.md`](specs/01-design-system.md); una prueba automática ([`design-system.test.ts`](src/test/design-system.test.ts)) verifica que el código no se salga de ellos (sin negritas, sin sombras, sin colores fuera de los tokens, radios solo `0` o píldora).
