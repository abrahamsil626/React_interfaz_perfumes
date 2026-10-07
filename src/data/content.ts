import type { Boutique, FaqItem, LegalDoc, Review } from '@/types'

export const reviews: Review[] = [
  { id: 'r1', stars: 5, title: 'A triumph of architecture', quote: 'Obsidia Noir stays grounded yet mysterious, the mineral accord cutting sharply through the dark woods.', author: 'Vogue International', product: 'Obsidia Noir', verified: true },
  { id: 'r2', stars: 5, title: 'Quiet luxury', quote: 'The sheer weight of the smoked flacon prepares you for the gravity of the juice inside. Unapologetic quiet luxury in its rawest state.', author: 'Architectural Digest', product: 'Obsidia Noir', verified: true },
  { id: 'r3', stars: 5, title: 'Unmistakable', quote: 'Incredible sillage. Distinctive without being overpowering. An indelible signature for evening wear that lasts well beyond dawn.', author: 'M. V., Private Collector', product: 'Homme Noir Extrait', verified: true },
  { id: 'r4', stars: 5, title: 'Cold and magnificent', quote: 'Céleste Monolith smells like standing in a mountain pass at first light. Nothing else I own comes close.', author: 'A. L., Paris', product: 'Céleste Monolith', verified: true },
  { id: 'r5', stars: 4, title: 'Superb, demanding', quote: 'Not an easy scent, and that is the point. It rewards patience. The dry-down on skin is extraordinary.', author: 'K. T., Tokyo', product: 'Monolith Brut', verified: true },
  { id: 'r6', stars: 5, title: 'Worth the wait', quote: 'The packaging, the certificate, the discovery vials. Every detail is considered. The juice lives up to it.', author: 'S. R., New York', product: 'Aethel Noir', verified: true },
  { id: 'r7', stars: 4, title: 'Elegant and serious', quote: 'A grown-up leather. Slightly more intense than I expected, but it settles into something beautiful.', author: 'D. P., Milan', product: 'Obsidienne Pur', verified: false },
  { id: 'r8', stars: 5, title: 'My new signature', quote: 'The Paligoon Noir is incense without the church. Smoky, floral, deeply nocturnal.', author: 'E. B., Geneva', product: 'The Paligoon Noir', verified: true },
]

export const boutiques: Boutique[] = [
  { city: 'Paris', address: '24 Place Vendôme, 75001 Paris', hours: 'MON–SAT 10:00–19:00', phone: '+33 1 42 60 00 00' },
  { city: 'Milan', address: 'Via Montenapoleone 12, 20121 Milano', hours: 'MON–SAT 10:00–19:30', phone: '+39 02 7600 0000' },
  { city: 'New York', address: '720 Madison Avenue, New York, NY 10065', hours: 'MON–SAT 11:00–19:00', phone: '+1 212 555 0100' },
  { city: 'Dubai', address: 'The Dubai Mall, Fashion Avenue, Dubai', hours: 'DAILY 10:00–23:00', phone: '+971 4 555 0100' },
]

export const faqs: FaqItem[] = [
  { id: 'f1', category: 'Shipping', question: 'How long does delivery take?', answer: 'Orders are dispatched within 24 hours and delivered in 24–48 hours by climate-controlled courier. Delivery is complimentary worldwide.' },
  { id: 'f2', category: 'Shipping', question: 'Do you ship internationally?', answer: 'Yes. We ship to over 60 countries. Duties and regional taxes are included in the price shown at checkout.' },
  { id: 'f3', category: 'Returns', question: 'Can I return a fragrance?', answer: 'Unopened flacons in their original sealed packaging may be returned within 30 days for a full refund.' },
  { id: 'f4', category: 'Returns', question: 'What if my order arrives damaged?', answer: 'Contact us within 48 hours with a photograph. We will send a replacement at no cost.' },
  { id: 'f5', category: 'Authenticity', question: 'How do I verify authenticity?', answer: 'Every flacon carries a numbered certificate of provenance sealed in wax, matched to a batch record held in our atelier.' },
  { id: 'f6', category: 'Authenticity', question: 'Are your fragrances sold elsewhere?', answer: 'Menti Parfum is sold exclusively through this site and our four boutiques.' },
  { id: 'f7', category: 'Payment', question: 'Which payment methods are accepted?', answer: 'Visa, Mastercard, American Express, PayPal, Apple Pay and Google Pay. All payments are encrypted end to end.' },
  { id: 'f8', category: 'Payment', question: 'Do you offer a promotional code?', answer: 'New clients receive MENTI10 for 10% off their first order. Enter it in your bag before checkout.' },
  { id: 'f9', category: 'Care', question: 'How should I store my fragrance?', answer: 'Keep it away from light and heat, ideally in its box at a stable 12–15 °C. Stored well, a flacon matures gracefully for years.' },
]

export const legalDocs: LegalDoc[] = [
  {
    slug: 'terms',
    label: 'Terms of Service',
    updated: '2026-01-15',
    sections: [
      { title: 'Acceptance of terms', body: 'By accessing Menti Parfum you agree to these terms. If you do not agree, please do not use the site.' },
      { title: 'Orders and pricing', body: 'All prices are shown in US dollars and include applicable duties. We reserve the right to refuse or cancel any order at our discretion.' },
      { title: 'Limited editions', body: 'Numbered editions are allocated per client. Allocations are held in your bag for twenty-four minutes.' },
      { title: 'Intellectual property', body: 'All imagery, text and formulations are the property of Menti Parfum and may not be reproduced without written consent.' },
    ],
  },
  {
    slug: 'privacy',
    label: 'Privacy Policy',
    updated: '2026-01-15',
    sections: [
      { title: 'Information we collect', body: 'We collect the information you provide when creating an account or placing an order: name, email, delivery address and payment details.' },
      { title: 'How we use it', body: 'Your data is used to fulfil orders, provide support and, with your consent, to send private releases. We never sell personal data.' },
      { title: 'Payment security', body: 'Payment details are processed by certified providers and are never stored on our servers.' },
      { title: 'Your rights', body: 'You may access, correct or delete your data at any time by contacting our concierge.' },
    ],
  },
  {
    slug: 'returns',
    label: 'Returns Policy',
    updated: '2026-01-15',
    sections: [
      { title: 'Eligibility', body: 'Unopened flacons in original sealed packaging may be returned within 30 days of delivery.' },
      { title: 'Process', body: 'Contact our concierge to receive a prepaid, insured return label. Refunds are issued to the original payment method within 5 business days of receipt.' },
      { title: 'Exceptions', body: 'Opened fragrances, discovery vials and personalised items cannot be returned unless faulty.' },
    ],
  },
]

export const faqCategories = ['Shipping', 'Returns', 'Authenticity', 'Payment', 'Care'] as const

export const collections = [
  { name: 'Obsidian', line: 'Smoked birch, basalt and cold metal.', image: '/images/products/obsidian-cuts.jpg' },
  { name: 'Nocturne', line: 'Night-blooming jasmine under incense.', image: '/images/products/faceted-noir.jpg' },
  { name: 'Ambre', line: 'Volcanic amber and aged vetiver.', image: '/images/products/smoked-square.jpg' },
  { name: 'Vétiver', line: 'Dry roots, cold stone and leather.', image: '/images/products/smoked-cylinder.jpg' },
]
