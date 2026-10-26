export type Post = {
  slug: string
  title: string
  // ISO date (YYYY-MM-DD)
  date: string
  excerpt: string
  // One string per paragraph
  body: string[]
}

// Keep the newest post first: the blog page shows them in this order.
export const posts: Post[] = [
  {
    slug: 'articulo-de-ejemplo-uno',
    title: 'Título de ejemplo del primer artículo',
    date: '2026-03-10',
    excerpt: 'Texto de marcador de posición para un resumen breve del primer artículo.',
    body: [
      'Texto de marcador de posición para el primer párrafo del artículo. Aquí se presentará el tema y su importancia.',
      'Texto de marcador de posición para el segundo párrafo del artículo. Aquí se desarrollarán los puntos principales.',
      'Texto de marcador de posición para el último párrafo del artículo. Aquí se ofrecerán las conclusiones.',
    ],
  },
  {
    slug: 'articulo-de-ejemplo-dos',
    title: 'Título de ejemplo del segundo artículo',
    date: '2026-02-14',
    excerpt: 'Texto de marcador de posición para un resumen breve del segundo artículo.',
    body: [
      'Texto de marcador de posición para el primer párrafo del segundo artículo.',
      'Texto de marcador de posición para el segundo párrafo del segundo artículo.',
    ],
  },
  {
    slug: 'articulo-de-ejemplo-tres',
    title: 'Título de ejemplo del tercer artículo',
    date: '2026-01-20',
    excerpt: 'Texto de marcador de posición para un resumen breve del tercer artículo.',
    body: [
      'Texto de marcador de posición para el primer párrafo del tercer artículo.',
      'Texto de marcador de posición para el segundo párrafo del tercer artículo.',
    ],
  },
]
