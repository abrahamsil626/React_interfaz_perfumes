export interface NavLink {
  label: string
  to: string
}

export const menuLinks: NavLink[] = [
  { label: 'La colección', to: '/collection' },
  { label: 'Colecciones', to: '/collections' },
  { label: 'Buscador de fragancia', to: '/scent-finder' },
  { label: 'Promociones', to: '/promotions' },
  { label: 'Opiniones', to: '/reviews' },
  { label: 'La casa', to: '/about' },
  { label: 'Contacto', to: '/contact' },
  { label: 'Preguntas frecuentes', to: '/faq' },
  { label: 'Seguimiento de pedido', to: '/track-order' },
]

export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: 'Ediciones',
    links: [
      { label: 'Archivo', to: '/collection' },
      { label: 'Colecciones', to: '/collections' },
      { label: 'Promociones', to: '/promotions' },
    ],
  },
  {
    title: 'Servicio',
    links: [
      { label: 'Atención al cliente', to: '/contact' },
      { label: 'Citas en el atelier', to: '/contact' },
      { label: 'Seguimiento de pedido', to: '/track-order' },
      { label: 'Preguntas frecuentes', to: '/faq' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Términos del servicio', to: '/legal/terms' },
      { label: 'Política de privacidad', to: '/legal/privacy' },
      { label: 'Política de devoluciones', to: '/legal/returns' },
    ],
  },
  {
    title: 'La casa',
    links: [
      { label: 'Nosotros', to: '/about' },
      { label: 'Opiniones', to: '/reviews' },
      { label: 'Buscador de fragancia', to: '/scent-finder' },
    ],
  },
]
