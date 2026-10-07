import type { Product } from '@/types'

const img = (file: string) => `/images/products/${file}`

const sizes = (base: number) => [
  { ml: 30, price: base - 130 },
  { ml: 50, price: base - 60 },
  { ml: 100, price: base },
]

export const products: Product[] = [
  {
    slug: 'obsidia-noir',
    name: 'Obsidia Noir',
    tagline: 'Ámbar volcánico y abedul ahumado',
    family: 'Maderas ahumadas',
    archetype: 'Unisex / Monolito',
    keyNotes: ['Obsidiana', 'Alquitrán de abedul', 'Incienso'],
    concentration: 'Extrait // 50 ml',
    intensity: 'Extrait de Parfum',
    sizes: sizes(580),
    notes: {
      top: 'Aldehídos metálicos fríos, pimienta negra triturada, piel de bergamota',
      heart: 'Jazmín sambac nocturno, alquitrán de abedul ahumado, raíz de iris seca',
      base: 'Acorde mineral de basalto volcánico, vainilla bourbon de Madagascar, cedro oscuro',
    },
    description:
      'Esculpido en la oscuridad fría y madurado durante veinticuatro ciclos lunares en bóvedas subterráneas, Obsidia Noir une basalto mineral en bruto, jazmín sambac nocturno de Grasse y alquitrán de abedul ahumado en una única aura arquitectónica.',
    image: img('obsidian-cuts.jpg'),
    limited: true,
  },
  {
    slug: 'aethel-essence',
    name: 'Aethel Essence',
    tagline: 'Metal frío y vainilla bourbon',
    family: 'Mineral frío',
    archetype: 'Masculino oscuro',
    keyNotes: ['Bourbon', 'Raíz de iris'],
    concentration: 'Eau de Parfum // 50 ml',
    intensity: 'Eau de Parfum',
    sizes: sizes(420),
    notes: {
      top: 'Pimienta rosa helada, acorde de acero, ralladura de limón',
      heart: 'Manteca de orris, hoja de violeta fría, iris ahumado',
      base: 'Vainilla bourbon, resina de ámbar, almizcle blanco',
    },
    description:
      'Un estudio de contraste: la agudeza del metal frío suavizada por vainilla bourbon de añejamiento lento. Embotellado en Grasse en lotes numerados.',
    image: img('matte-gold.jpg'),
  },
  {
    slug: 'aethel-noir',
    name: 'Aethel Noir',
    tagline: 'Cedro pesado y ahumado',
    family: 'Maderas ahumadas',
    archetype: 'Masculino oscuro',
    keyNotes: ['Incienso', 'Alquitrán de abedul'],
    concentration: 'Parfum // 100 ml',
    intensity: 'Pure Parfum',
    sizes: sizes(460),
    notes: {
      top: 'Iris ahumado, té negro, cardamomo',
      heart: 'Piedra de esquisto húmeda, raíz de orris, ciprés',
      base: 'Cedro pesado, labdanum, almizcle oscuro',
    },
    description:
      'Iris ahumado sobre piedra de esquisto húmeda, anclado por un cedro pesado. Un aroma que ocupa el silencio en lugar del espacio.',
    image: img('crystal-silver.jpg'),
  },
  {
    slug: 'monolith-brut',
    name: 'Monolith Brut',
    tagline: 'Resina mineral en bruto',
    family: 'Ámbar volcánico',
    archetype: 'Unisex / Monolito',
    keyNotes: ['Obsidiana', 'Bourbon'],
    concentration: 'Extrait // 75 ml',
    intensity: 'Extrait de Parfum',
    sizes: sizes(680),
    notes: {
      top: 'Resina cruda, sal rosa, pimienta negra',
      heart: 'Ámbar quemado, acorde mineral, azafrán',
      base: 'Ceniza volcánica, haba tonka, humo de oud',
    },
    description:
      'Una edición numerada construida en torno a resina mineral en bruto y ceniza volcánica. Densa, lenta e inconfundible.',
    image: img('hero-obsidian.jpg'),
    limited: true,
  },
  {
    slug: 'celeste-monolith',
    name: 'Céleste Monolith',
    tagline: 'Ozono frío y cedro blanco',
    family: 'Mineral frío',
    archetype: 'Nocturno etéreo',
    keyNotes: ['Raíz de iris', 'Incienso'],
    concentration: 'Extrait // 50 ml',
    intensity: 'Pure Parfum',
    sizes: sizes(520),
    notes: {
      top: 'Acorde ozónico, menta glacial, bergamota',
      heart: 'Iris pallida, cedro blanco, lirio de agua',
      base: 'Maderas rubias, ambrette, almizcle claro',
    },
    description:
      'Ozono frío y cedro blanco encerrados en una columna de cristal azul. La nota más fría de la casa.',
    image: img('obsidian-cylinder.jpg'),
  },
  {
    slug: 'homme-noir-extrait',
    name: 'Homme Noir Extrait',
    tagline: 'Vetiver añejo y ámbar oscuro',
    family: 'Cuero oscuro',
    archetype: 'Masculino oscuro',
    keyNotes: ['Alquitrán de abedul', 'Bourbon'],
    concentration: 'Extrait // 50 ml',
    intensity: 'Extrait de Parfum',
    sizes: sizes(560),
    notes: {
      top: 'Pimienta negra, bergamota, enebro',
      heart: 'Vetiver añejo, acorde de cuero, geranio',
      base: 'Ámbar oscuro, pachulí, resina monolítica',
    },
    description:
      'Vetiver añejo y ámbar oscuro tras una tapa monolítica tallada a mano. La firma de la casa para las noches.',
    image: img('smoked-square.jpg'),
  },
  {
    slug: 'the-paligoon-noir',
    name: 'The Paligoon Noir',
    tagline: 'Labdanum negro e incienso',
    family: 'Floral nocturno',
    archetype: 'Nocturno etéreo',
    keyNotes: ['Incienso', 'Raíz de iris'],
    concentration: 'Eau de Parfum // 100 ml',
    intensity: 'Eau de Parfum',
    sizes: sizes(490),
    notes: {
      top: 'Azafrán, pimienta rosa, menta fría',
      heart: 'Labdanum negro, jazmín de noche, iris',
      base: 'Incienso, textura de brea, cashmeran',
    },
    description:
      'Labdanum negro e incienso en un frasco de textura de brea. Ritual y contención.',
    image: img('faceted-noir.jpg'),
  },
  {
    slug: 'obsidienne-pur',
    name: 'Obsidienne Pur',
    tagline: 'Basalto tectónico y cuero',
    family: 'Cuero oscuro',
    archetype: 'Unisex / Monolito',
    keyNotes: ['Obsidiana', 'Alquitrán de abedul'],
    concentration: 'Extrait // 100 ml',
    intensity: 'Pure Parfum',
    sizes: sizes(620),
    notes: {
      top: 'Pimienta quebrada, elemí, metal frío',
      heart: 'Basalto tectónico, ante, cisto',
      base: 'Cuero, piedra volcánica, musgo de roble',
    },
    description:
      'Basalto tectónico sobre cuero, cerrado con una tapa de piedra volcánica. Silencioso e inmenso.',
    image: img('smoked-cylinder.jpg'),
  },
  {
    slug: 'obsidia-ii-extrait',
    name: 'Obsidia II Extrait',
    tagline: 'Sambac nocturno y jazmín',
    family: 'Floral nocturno',
    archetype: 'Nocturno etéreo',
    keyNotes: ['Obsidiana', 'Raíz de iris'],
    concentration: 'Extrait // 50 ml',
    intensity: 'Extrait de Parfum',
    sizes: sizes(650),
    notes: {
      top: 'Sambac nocturno, aldehídos, pimienta',
      heart: 'Absoluto de jazmín, iris, rosa ahumada',
      base: 'Almizcle cristalino, sándalo, vainilla',
    },
    description:
      'El segundo capítulo de la serie Obsidiana: sambac y jazmín tallados como un prisma cristalino.',
    image: img('obsidian-cuts.jpg'),
  },
]

export const getProduct = (slug: string) => products.find((p) => p.slug === slug)

export const priceOf = (p: Product, ml: number) =>
  p.sizes.find((s) => s.ml === ml)?.price ?? p.sizes[p.sizes.length - 1].price

export const families = [...new Set(products.map((p) => p.family))]
export const archetypes = [...new Set(products.map((p) => p.archetype))]
export const keyNotes = [...new Set(products.flatMap((p) => p.keyNotes))]
export const intensities: Product['intensity'][] = [
  'Extrait de Parfum',
  'Pure Parfum',
  'Eau de Parfum',
]

export const money = (n: number) =>
  `$ ${n.toLocaleString('en-US')} USD`
