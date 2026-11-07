export type ExternalLink = {
  title: string
  url: string
  description: string
}

// Placeholder links. Replace them with the sites the client wants to recommend.
// Each url must be unique and start with https://.
export const links: ExternalLink[] = [
  // TODO(client): placeholder link, replace with a real site of legal interest
  {
    title: 'Sitio de interés jurídico de ejemplo 1',
    url: 'https://example.com/enlace-1',
    description:
      'Texto de marcador de posición para explicar brevemente qué encontrará el visitante en este sitio.',
  },
  // TODO(client): placeholder link, replace with a real site of legal interest
  {
    title: 'Sitio de interés jurídico de ejemplo 2',
    url: 'https://example.com/enlace-2',
    description:
      'Texto de marcador de posición para explicar brevemente qué encontrará el visitante en este sitio.',
  },
  // TODO(client): placeholder link, replace with a real site of legal interest
  {
    title: 'Sitio de interés jurídico de ejemplo 3',
    url: 'https://example.com/enlace-3',
    description:
      'Texto de marcador de posición para explicar brevemente qué encontrará el visitante en este sitio.',
  },
  // TODO(client): placeholder link, replace with a real site of legal interest
  {
    title: 'Sitio de interés jurídico de ejemplo 4',
    url: 'https://example.com/enlace-4',
    description:
      'Texto de marcador de posición para explicar brevemente qué encontrará el visitante en este sitio.',
  },
]
