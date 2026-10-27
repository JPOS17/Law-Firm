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
  hours: 'Texto de marcador de posición para el horario de atención del despacho.',
  map: {
    linkUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressLine)}`,
    embedUrl: `https://www.google.com/maps?q=${encodeURIComponent(addressLine)}&output=embed`,
  },
  nav: [
    { label: 'La Firma', to: '/la-firma' },
    { label: 'Servicios', to: '/servicios' },
    { label: 'Equipo', to: '/equipo' },
    { label: 'Blog', to: '/blog' },
    { label: 'Contacto', to: '/contacto' },
  ] satisfies NavItem[],
  footerNav: [
    { label: 'Enlaces de interés', to: '/enlaces' },
    { label: 'Aviso de privacidad', to: '/aviso-de-privacidad' },
  ] satisfies NavItem[],
}
