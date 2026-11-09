type NavItem = {
  label: string
  to: string
}

const address = {
  street: 'Sierra Fría 427',
  area: 'Bosques del Prado Norte',
  city: 'Aguascalientes, Ags.',
  postalCode: '20127',
}

const addressLine = `${address.street}, ${address.area}, ${address.postalCode} ${address.city}`

export const site = {
  name: 'Delgado Gutiérrez Abogados',
  tagline: 'Asesoría y planeación estratégica legal',
  // TODO(client): confirm the final domain. No trailing slash. If it changes, also update
  // index.html and public/robots.txt and public/sitemap.xml (tests/seo fails until they match).
  url: 'https://delgadoabogados.com.mx',
  // The default summary, used by search engines and when the link is shared.
  description:
    'Despacho de abogados en Aguascalientes: asesoría y planeación estratégica legal. Atendemos asuntos en Aguascalientes, Guanajuato y Jalisco.',
  // States where the firm takes cases (from the client's questionnaire).
  areasServed: ['Aguascalientes', 'Guanajuato', 'Jalisco'],
  // The picture shown when a link is shared (WhatsApp, Facebook, LinkedIn...).
  // TODO(client): replace public/og-image.png with the real logo artwork (1200x630 px).
  shareImage: {
    path: '/og-image.png',
    width: 1200,
    height: 630,
    alt: 'Delgado Gutiérrez Abogados: asesoría y planeación estratégica legal',
  },
  year: new Date().getFullYear(),
  address,
  phone: { label: '449 804 0203', href: 'tel:+524498040203' },
  email: 'jjdg@delgadoabogados.com.mx',
  whatsapp: { href: 'https://wa.me/524498040203' },
  // TODO(client): confirm the real office hours
  hours: 'Lunes a viernes, de 9:00 a 17:00 h',
  map: {
    linkUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressLine)}`,
    embedUrl: `https://www.google.com/maps?q=${encodeURIComponent(addressLine)}&output=embed`,
  },
  // The action every page ends with
  contactCta: { label: 'Contáctenos', to: '/contacto' },
  nav: [
    { label: 'La Firma', to: '/la-firma' },
    { label: 'Servicios', to: '/servicios' },
    { label: 'Equipo', to: '/equipo' },
    { label: 'Publicaciones', to: '/publicaciones' },
    { label: 'Contacto', to: '/contacto' },
  ] satisfies NavItem[],
  footerNav: [
    { label: 'Enlaces de interés', to: '/enlaces' },
    { label: 'Términos y condiciones', to: '/terminos-y-condiciones' },
    { label: 'Aviso de privacidad', to: '/aviso-de-privacidad' },
  ] satisfies NavItem[],
}
