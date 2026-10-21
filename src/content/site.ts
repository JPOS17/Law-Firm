type NavItem = {
  label: string
  to: string
}

export const site = {
  name: 'Nombre del Despacho',
  year: new Date().getFullYear(),
  nav: [
    { label: 'La Firma', to: '/la-firma' },
    { label: 'Servicios', to: '/servicios' },
    { label: 'Equipo', to: '/equipo' },
    { label: 'Contacto', to: '/contacto' },
  ] satisfies NavItem[],
}
