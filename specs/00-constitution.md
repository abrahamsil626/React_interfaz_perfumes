# 00 · Constitución del proyecto

## Objetivo
Interfaz e-commerce de perfumería de lujo **Menti Parfum**, implementada fielmente a partir de:
- Sistema de diseño: `design-refs/design-md/bugatti/DESIGN.md` (voltagent/awesome-design-md).
- Mockups de referencia: `mockups/01…18-*.png` (generados con Google Stitch).

## Stack
React 19 · TypeScript (strict) · Vite · React Router · Tailwind CSS v4 · Vitest + Testing Library.
Fuentes self-hosted vía `@fontsource` (sustitutas libres documentadas en el DESIGN.md).

## Principios no negociables
1. **Fidelidad**: layout y contenido siguen los mockups; los tokens siguen el DESIGN.md. Si ambos discrepan, **gana el DESIGN.md** (p. ej. lienzo `#000000`, sin color de acento salvo `#c3d9f3`).
2. **Sin divergencias**: no se añaden componentes, colores ni radios fuera de la spec 01.
3. **Tipado estricto**: sin `any`; datos del dominio tipados en `src/types`.
4. **Una fuente de verdad**: tokens en `src/styles/index.css`; datos en `src/data`; estado en `src/context`.
5. **Idioma**: toda la interfaz visible (textos, etiquetas, mensajes, `aria-label`, fechas) está en **español**. Se conservan en su idioma original los nombres propios (marca, nombres de perfumes) y los términos de perfumería (`Extrait de Parfum`, `Eau de Parfum`).
6. **Accesibilidad mínima**: HTML semántico, `aria-label` en botones de icono, foco visible, objetivos táctiles ≥ 44px.
7. **Verificable**: `npm run typecheck`, `npm test` y `npm run build` deben pasar antes de dar algo por hecho.

## Estructura
```
specs/                 Especificaciones (este directorio)
design-refs/           Referencia externa (DESIGN.md) — no se versiona
mockups/               PNG de referencia
public/images/         Fotografía de producto
src/
  styles/              Tokens y estilos globales
  types/               Tipos del dominio
  data/                Productos, tiendas, FAQ, textos legales
  context/             Carrito, favoritos, sesión
  components/
    ui/                Primitivas (Button, Input, Checkbox…)
    layout/            Header, Footer, Layout
    product/           ProductCard, etc.
  pages/               Una por ruta
  test/                Setup y pruebas transversales
```

## Fuera de alcance
Backend, pagos reales y autenticación real: el login con Google, el pago y los pedidos son **simulados** en cliente (estado + `localStorage`).
