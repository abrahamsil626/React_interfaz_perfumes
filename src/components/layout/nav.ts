export interface NavLink {
  label: string
  to: string
}

export const menuLinks: NavLink[] = [
  { label: 'The Collection', to: '/collection' },
  { label: 'Collections', to: '/collections' },
  { label: 'Scent Finder', to: '/scent-finder' },
  { label: 'Promotions', to: '/promotions' },
  { label: 'Reviews', to: '/reviews' },
  { label: 'The House', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Track Order', to: '/track-order' },
]

export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: 'Editions',
    links: [
      { label: 'Archive', to: '/collection' },
      { label: 'Collections', to: '/collections' },
      { label: 'Promotions', to: '/promotions' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Client Service', to: '/contact' },
      { label: 'Atelier Appointments', to: '/contact' },
      { label: 'Track Order', to: '/track-order' },
      { label: 'FAQ', to: '/faq' },
    ],
  },
  {
    title: 'Compliance',
    links: [
      { label: 'Terms of Service', to: '/legal/terms' },
      { label: 'Privacy Policy', to: '/legal/privacy' },
      { label: 'Returns Policy', to: '/legal/returns' },
    ],
  },
  {
    title: 'House',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Reviews', to: '/reviews' },
      { label: 'Scent Finder', to: '/scent-finder' },
    ],
  },
]
