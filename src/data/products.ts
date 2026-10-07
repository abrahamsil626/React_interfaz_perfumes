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
    tagline: 'Volcanic amber & smoked birch',
    family: 'Smoked Woods',
    archetype: 'Genderless / Monolith',
    keyNotes: ['Obsidian', 'Birch Tar', 'Incense'],
    concentration: 'Extrait // 50 ml',
    intensity: 'Extrait de Parfum',
    sizes: sizes(580),
    notes: {
      top: 'Cold Metallic Aldehydes, Crushed Black Pepper, Bergamot Peel',
      heart: 'Nocturnal Sambac Jasmine, Smoked Birch Tar, Dried Iris Root',
      base: 'Volcanic Basalt Mineral Accord, Madagascan Bourbon Vanilla, Dark Cedarwood',
    },
    description:
      'Sculpted in cold darkness and matured across twenty-four lunar cycles in subterranean vaults, Obsidia Noir pairs raw mineral basalt, nocturnal Grasse sambac jasmine and smoked birch tar into a singular architectural aura.',
    image: img('obsidian-cuts.jpg'),
    limited: true,
  },
  {
    slug: 'aethel-essence',
    name: 'Aethel Essence',
    tagline: 'Cold metallic & bourbon vanilla',
    family: 'Cold Mineral',
    archetype: 'Dark Masculine',
    keyNotes: ['Bourbon', 'Iris Root'],
    concentration: 'Eau de Parfum // 50 ml',
    intensity: 'Eau de Parfum',
    sizes: sizes(420),
    notes: {
      top: 'Frozen Pink Pepper, Steel Accord, Lemon Zest',
      heart: 'Orris Butter, Cold Violet Leaf, Smoked Iris',
      base: 'Bourbon Vanilla, Amber Resin, White Musk',
    },
    description:
      'A study in contrast: the sharpness of cold metal softened by slow-aged bourbon vanilla. Bottled in Grasse in numbered batches.',
    image: img('matte-gold.jpg'),
  },
  {
    slug: 'aethel-noir',
    name: 'Aethel Noir',
    tagline: 'Heavy smoked cedarwood',
    family: 'Smoked Woods',
    archetype: 'Dark Masculine',
    keyNotes: ['Incense', 'Birch Tar'],
    concentration: 'Parfum // 100 ml',
    intensity: 'Pure Parfum',
    sizes: sizes(460),
    notes: {
      top: 'Smoked Iris, Black Tea, Cardamom',
      heart: 'Damp Schist Stone, Orris Root, Cypress',
      base: 'Heavy Cedarwood, Labdanum, Dark Musk',
    },
    description:
      'Smoked iris over damp schist stone, grounded by heavy cedarwood. A scent that takes up silence rather than space.',
    image: img('crystal-silver.jpg'),
  },
  {
    slug: 'monolith-brut',
    name: 'Monolith Brut',
    tagline: 'Raw mineral resin',
    family: 'Volcanic Amber',
    archetype: 'Genderless / Monolith',
    keyNotes: ['Obsidian', 'Bourbon'],
    concentration: 'Extrait // 75 ml',
    intensity: 'Extrait de Parfum',
    sizes: sizes(680),
    notes: {
      top: 'Raw Resin, Pink Salt, Black Pepper',
      heart: 'Burnt Amber, Mineral Accord, Saffron',
      base: 'Volcanic Ash, Tonka, Oud Smoke',
    },
    description:
      'A numbered edition built around raw mineral resin and volcanic ash. Dense, slow and unmistakable.',
    image: img('hero-obsidian.jpg'),
    limited: true,
  },
  {
    slug: 'celeste-monolith',
    name: 'Céleste Monolith',
    tagline: 'Cold ozonic & white cedar',
    family: 'Cold Mineral',
    archetype: 'Ethereal Nocturne',
    keyNotes: ['Iris Root', 'Incense'],
    concentration: 'Extrait // 50 ml',
    intensity: 'Pure Parfum',
    sizes: sizes(520),
    notes: {
      top: 'Ozonic Accord, Glacial Mint, Bergamot',
      heart: 'Iris Pallida, White Cedar, Water Lily',
      base: 'Blonde Woods, Ambrette, Clear Musk',
    },
    description:
      'Cold ozone and white cedar held inside a column of blue crystal. The coolest note of the house.',
    image: img('obsidian-cylinder.jpg'),
  },
  {
    slug: 'homme-noir-extrait',
    name: 'Homme Noir Extrait',
    tagline: 'Aged vetiver & dark amber',
    family: 'Dark Leather',
    archetype: 'Dark Masculine',
    keyNotes: ['Birch Tar', 'Bourbon'],
    concentration: 'Extrait // 50 ml',
    intensity: 'Extrait de Parfum',
    sizes: sizes(560),
    notes: {
      top: 'Black Pepper, Bergamot, Juniper',
      heart: 'Aged Vetiver, Leather Accord, Geranium',
      base: 'Dark Amber, Patchouli, Monolith Resin',
    },
    description:
      'Aged vetiver and dark amber behind a hand-cut monolith cap. The house signature for evenings.',
    image: img('smoked-square.jpg'),
  },
  {
    slug: 'the-paligoon-noir',
    name: 'The Paligoon Noir',
    tagline: 'Black labdanum & incense',
    family: 'Nocturnal Floral',
    archetype: 'Ethereal Nocturne',
    keyNotes: ['Incense', 'Iris Root'],
    concentration: 'Eau de Parfum // 100 ml',
    intensity: 'Eau de Parfum',
    sizes: sizes(490),
    notes: {
      top: 'Saffron, Pink Pepper, Cold Mint',
      heart: 'Black Labdanum, Night Jasmine, Iris',
      base: 'Frankincense, Pitch Texture, Cashmeran',
    },
    description:
      'Black labdanum and incense in a pitch-textured flacon. Ritual and restraint.',
    image: img('faceted-noir.jpg'),
  },
  {
    slug: 'obsidienne-pur',
    name: 'Obsidienne Pur',
    tagline: 'Tectonic basalt & leather',
    family: 'Dark Leather',
    archetype: 'Genderless / Monolith',
    keyNotes: ['Obsidian', 'Birch Tar'],
    concentration: 'Extrait // 100 ml',
    intensity: 'Pure Parfum',
    sizes: sizes(620),
    notes: {
      top: 'Cracked Pepper, Elemi, Cold Metal',
      heart: 'Tectonic Basalt, Suede, Cistus',
      base: 'Leather, Volcanic Stone, Oakmoss',
    },
    description:
      'Tectonic basalt over leather, closed with a volcanic stone cap. Quiet and immense.',
    image: img('smoked-cylinder.jpg'),
  },
  {
    slug: 'obsidia-ii-extrait',
    name: 'Obsidia II Extrait',
    tagline: 'Nocturnal sambac & jasmine',
    family: 'Nocturnal Floral',
    archetype: 'Ethereal Nocturne',
    keyNotes: ['Obsidian', 'Iris Root'],
    concentration: 'Extrait // 50 ml',
    intensity: 'Extrait de Parfum',
    sizes: sizes(650),
    notes: {
      top: 'Night Sambac, Aldehydes, Pepper',
      heart: 'Jasmine Absolute, Iris, Smoked Rose',
      base: 'Crystalline Musk, Sandalwood, Vanilla',
    },
    description:
      'The second chapter of the Obsidian series: sambac and jasmine cut like a crystalline prism.',
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
