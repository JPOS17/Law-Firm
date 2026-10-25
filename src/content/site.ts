type NavItem = {
  label: string
  to: string
}

export const site = {
  name: 'Delgado Gutiérrez Abogados',
  tagline: 'Asesoría y planeación estratégica legal',
  year: new Date().getFullYear(),
  address: {
    street: 'Sierra Fría 427',
    area: 'Bosques del Prado Norte',
    city: 'Aguascalientes, Ags.',
    postalCode: '20127',
  },
  nav: [
    { label: 'La Firma', to: '/la-firma' },
    { label: 'Servicios', to: '/servicios' },
    { label: 'Equipo', to: '/equipo' },
    { label: 'Contacto', to: '/contacto' },
  ] satisfies NavItem[],
}
