# 01 · Sistema de diseño (Bugatti)

Fuente: `design-refs/design-md/bugatti/DESIGN.md`. Tokens implementados en `src/styles/index.css`.

## Tokens
| Token | Valor | Uso |
|---|---|---|
| `canvas` | `#000000` | Fondo de toda página. Sin modo claro |
| `surface-soft` | `#0d0d0d` | Filas de datos |
| `surface-card` | `#141414` | Tarjetas, paneles (como máximo) |
| `surface-elevated` | `#1f1f1f` | Tarjetas anidadas |
| `hairline` | `#262626` | Divisores 1px |
| `hairline-strong` | `#3a3a3a` | Subrayado de inputs |
| `ink` | `#ffffff` | Titulares y texto principal |
| `body` | `#cccccc` | Texto corrido |
| `muted` | `#999999` | Metadatos |
| `muted-soft` | `#666666` | Legales |
| `link` | `#c3d9f3` | **Único** color cromático; solo enlaces y marcadores |
| `success` | `#5fa657` | Solo estados de confirmación de pedido |

## Tipografía (peso 400 siempre)
| Familia | Sustituta | Uso |
|---|---|---|
| Display | Barlow Condensed | Titulares en MAYÚSCULAS, tracking 2–6px |
| Text | EB Garamond | Cuerpo en frase normal |
| Mono | JetBrains Mono | Botones, navegación, etiquetas, precios; MAYÚSCULAS, tracking 2–2.5px |

## Reglas
- **AC-DS-1** Lienzo `#000000`; ningún fondo de página distinto.
- **AC-DS-2** Ningún `font-weight` > 400.
- **AC-DS-3** Radios: `0` en tarjetas, fotos e inputs; `9999px` solo en botones y botones-icono.
- **AC-DS-4** Botón primario: fondo transparente, borde 1px blanco, píldora, mono 14px, tracking 2.5px, alto 44px.
- **AC-DS-5** Inputs: sin borde salvo línea inferior `hairline-strong`; foco → línea blanca.
- **AC-DS-6** Sin sombras ni degradados decorativos.
- **AC-DS-7** Sin colores de acento fuera de `link` (el punto verde de los mockups se descarta).
- **AC-DS-8** Separación entre secciones: 120px (`section`).
- **AC-DS-9** Contenido máximo 1280px centrado; bandas fotográficas a sangre.

## Componentes (`src/components/ui`)
`Button` (variantes `outline`, `text`, `icon`) · `Input` · `Select` · `Checkbox` · `Radio` · `Chip` · `SectionHeading` · `Eyebrow` · `Rule`.
