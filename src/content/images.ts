import centroImage from '@/assets/centro-ags.webp'
import officeImage from '@/assets/office.webp'

// Hero photos in one place, so routes, pages and the preloader always agree on the file.
export const heroImages = {
  home: centroImage,
  inner: officeImage,
} as const
