import { site } from '@/content/site'
import { Hero } from '@/components/Hero'
import officeImage from '@/assets/office.webp'

export function ContactPage() {
  return (
    <>
      <title>{`Contáctenos | ${site.name}`}</title>
      <Hero
        title="Contáctenos"
        lead="Texto de marcador de posición para una breve descripción de lo que hace la firma."
        image={officeImage}
      />
    </>
  )
}
