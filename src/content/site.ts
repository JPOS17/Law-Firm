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
