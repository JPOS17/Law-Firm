export type Attorney = {
  name: string
  role: string
  bio: string
  // Optional: professional license number (cédula profesional) and law school.
  // Each one is shown only when present.
  license?: string
  school?: string
  // Optional: without a photo, the card shows a placeholder with the initial.
  photo?: string
}

// Placeholder team. Replace it with the firm's real attorneys.
export const attorneys: Attorney[] = [
  {
    name: 'Abogado de ejemplo 1',
    role: 'Cargo de ejemplo',
    bio: 'Texto de marcador de posición para una breve biografía profesional.',
    license: '0000000',
    school: 'Universidad de ejemplo',
  },
  {
    name: 'Abogado de ejemplo 2',
    role: 'Cargo de ejemplo',
    bio: 'Texto de marcador de posición para una breve biografía profesional.',
    license: '0000000',
    school: 'Universidad de ejemplo',
  },
  {
    name: 'Abogado de ejemplo 3',
    role: 'Cargo de ejemplo',
    bio: 'Texto de marcador de posición para una breve biografía profesional.',
    license: '0000000',
    school: 'Universidad de ejemplo',
  },
  {
    name: 'Abogado de ejemplo 4',
    role: 'Cargo de ejemplo',
    bio: 'Texto de marcador de posición para una breve biografía profesional.',
    license: '0000000',
    school: 'Universidad de ejemplo',
  },
]
