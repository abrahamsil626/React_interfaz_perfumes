import type { Boutique, FaqItem, LegalDoc, Review } from '@/types'

export const reviews: Review[] = [
  { id: 'r1', stars: 5, title: 'Un triunfo de la arquitectura olfativa', quote: 'Obsidia Noir se mantiene firme y misterioso; el acorde mineral corta con precisión entre las maderas oscuras.', author: 'Vogue International', product: 'Obsidia Noir', verified: true },
  { id: 'r2', stars: 5, title: 'Lujo silencioso', quote: 'El peso del frasco ahumado te prepara para la gravedad del jugo. Lujo discreto en su estado más puro.', author: 'Architectural Digest', product: 'Obsidia Noir', verified: true },
  { id: 'r3', stars: 5, title: 'Inconfundible', quote: 'Una estela increíble. Distintivo sin ser abrumador. Una firma indeleble para la noche que dura mucho después del amanecer.', author: 'M. V., coleccionista privado', product: 'Homme Noir Extrait', verified: true },
  { id: 'r4', stars: 5, title: 'Frío y magnífico', quote: 'Céleste Monolith huele a estar en un paso de montaña a la primera luz. Nada de lo que tengo se le acerca.', author: 'A. L., París', product: 'Céleste Monolith', verified: true },
  { id: 'r5', stars: 4, title: 'Soberbio y exigente', quote: 'No es un aroma fácil, y ese es el punto. Premia la paciencia. El fondo sobre la piel es extraordinario.', author: 'K. T., Tokio', product: 'Monolith Brut', verified: true },
  { id: 'r6', stars: 5, title: 'Valió la espera', quote: 'El empaque, el certificado, los viales de descubrimiento. Cada detalle está cuidado. El jugo está a la altura.', author: 'S. R., Nueva York', product: 'Aethel Noir', verified: true },
  { id: 'r7', stars: 4, title: 'Elegante y serio', quote: 'Un cuero para adultos. Algo más intenso de lo que esperaba, pero se asienta en algo hermoso.', author: 'D. P., Milán', product: 'Obsidienne Pur', verified: false },
  { id: 'r8', stars: 5, title: 'Mi nueva firma', quote: 'The Paligoon Noir es incienso sin iglesia. Ahumado, floral, profundamente nocturno.', author: 'E. B., Ginebra', product: 'The Paligoon Noir', verified: true },
]

export const boutiques: Boutique[] = [
  { city: 'París', address: '24 Place Vendôme, 75001 París', hours: 'LUN–SÁB 10:00–19:00', phone: '+33 1 42 60 00 00' },
  { city: 'Milán', address: 'Via Montenapoleone 12, 20121 Milán', hours: 'LUN–SÁB 10:00–19:30', phone: '+39 02 7600 0000' },
  { city: 'Nueva York', address: '720 Madison Avenue, Nueva York, NY 10065', hours: 'LUN–SÁB 11:00–19:00', phone: '+1 212 555 0100' },
  { city: 'Dubái', address: 'The Dubai Mall, Fashion Avenue, Dubái', hours: 'TODOS LOS DÍAS 10:00–23:00', phone: '+971 4 555 0100' },
]

export const faqs: FaqItem[] = [
  { id: 'f1', category: 'Envíos', question: '¿Cuánto tarda la entrega?', answer: 'Los pedidos se despachan en 24 horas y se entregan en 24–48 horas mediante mensajería con clima controlado. El envío es gratuito a todo el mundo.' },
  { id: 'f2', category: 'Envíos', question: '¿Envían al extranjero?', answer: 'Sí. Enviamos a más de 60 países. Los aranceles e impuestos regionales están incluidos en el precio que ves al pagar.' },
  { id: 'f3', category: 'Devoluciones', question: '¿Puedo devolver una fragancia?', answer: 'Los frascos sin abrir, en su embalaje original sellado, pueden devolverse en un plazo de 30 días con reembolso completo.' },
  { id: 'f4', category: 'Devoluciones', question: '¿Qué pasa si mi pedido llega dañado?', answer: 'Contáctanos en un plazo de 48 horas con una fotografía. Te enviaremos un reemplazo sin costo.' },
  { id: 'f5', category: 'Autenticidad', question: '¿Cómo verifico la autenticidad?', answer: 'Cada frasco incluye un certificado de procedencia numerado y sellado con lacre, vinculado a un registro de lote que conserva nuestro atelier.' },
  { id: 'f6', category: 'Autenticidad', question: '¿Venden sus fragancias en otros lugares?', answer: 'Menti Parfum se vende exclusivamente en este sitio y en nuestras cuatro boutiques.' },
  { id: 'f7', category: 'Pago', question: '¿Qué métodos de pago aceptan?', answer: 'Visa, Mastercard, American Express, PayPal, Apple Pay y Google Pay. Todos los pagos se cifran de extremo a extremo.' },
  { id: 'f8', category: 'Pago', question: '¿Ofrecen algún código promocional?', answer: 'Los clientes nuevos reciben MENTI10 para un 10 % de descuento en su primer pedido. Introdúcelo en tu bolsa antes de pagar.' },
  { id: 'f9', category: 'Cuidado', question: '¿Cómo debo guardar mi fragancia?', answer: 'Mantenla lejos de la luz y el calor, idealmente en su caja a una temperatura estable de 12–15 °C. Bien conservado, un frasco madura con elegancia durante años.' },
]

export const legalDocs: LegalDoc[] = [
  {
    slug: 'terms',
    label: 'Términos del servicio',
    updated: '15 de enero de 2026',
    sections: [
      { title: 'Aceptación de los términos', body: 'Al acceder a Menti Parfum aceptas estos términos. Si no estás de acuerdo, no utilices el sitio.' },
      { title: 'Pedidos y precios', body: 'Todos los precios se muestran en dólares estadounidenses e incluyen los aranceles aplicables. Nos reservamos el derecho de rechazar o cancelar cualquier pedido a nuestra discreción.' },
      { title: 'Ediciones limitadas', body: 'Las ediciones numeradas se asignan por cliente. Las asignaciones se reservan en tu bolsa durante veinticuatro minutos.' },
      { title: 'Propiedad intelectual', body: 'Todas las imágenes, textos y formulaciones son propiedad de Menti Parfum y no pueden reproducirse sin consentimiento escrito.' },
    ],
  },
  {
    slug: 'privacy',
    label: 'Política de privacidad',
    updated: '15 de enero de 2026',
    sections: [
      { title: 'Información que recopilamos', body: 'Recopilamos la información que proporcionas al crear una cuenta o hacer un pedido: nombre, correo electrónico, dirección de entrega y datos de pago.' },
      { title: 'Cómo la usamos', body: 'Tus datos se utilizan para gestionar pedidos, ofrecer soporte y, con tu consentimiento, enviarte lanzamientos privados. Nunca vendemos datos personales.' },
      { title: 'Seguridad de los pagos', body: 'Los datos de pago son procesados por proveedores certificados y nunca se almacenan en nuestros servidores.' },
      { title: 'Tus derechos', body: 'Puedes acceder, corregir o eliminar tus datos en cualquier momento contactando a nuestro servicio de conserjería.' },
    ],
  },
  {
    slug: 'returns',
    label: 'Política de devoluciones',
    updated: '15 de enero de 2026',
    sections: [
      { title: 'Elegibilidad', body: 'Los frascos sin abrir, en su embalaje original sellado, pueden devolverse en un plazo de 30 días desde la entrega.' },
      { title: 'Proceso', body: 'Contacta a nuestro servicio de conserjería para recibir una etiqueta de devolución prepagada y asegurada. Los reembolsos se emiten al método de pago original en un plazo de 5 días hábiles desde la recepción.' },
      { title: 'Excepciones', body: 'Las fragancias abiertas, los viales de descubrimiento y los artículos personalizados no pueden devolverse salvo que sean defectuosos.' },
    ],
  },
]

export const faqCategories = ['Envíos', 'Devoluciones', 'Autenticidad', 'Pago', 'Cuidado'] as const

export const collections = [
  { name: 'Obsidiana', line: 'Abedul ahumado, basalto y metal frío.', image: '/images/products/obsidian-cuts.jpg' },
  { name: 'Nocturno', line: 'Jazmín de floración nocturna bajo incienso.', image: '/images/products/faceted-noir.jpg' },
  { name: 'Ámbar', line: 'Ámbar volcánico y vetiver añejo.', image: '/images/products/smoked-square.jpg' },
  { name: 'Vetiver', line: 'Raíces secas, piedra fría y cuero.', image: '/images/products/smoked-cylinder.jpg' },
]
