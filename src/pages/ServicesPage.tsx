import { site } from '@/content/site'
import { Hero } from '@/components/Hero'
import courthouseImage from '@/assets/courthouse.jpg'

export function ServicesPage() {
  return (
    <>
      <title>{`Nuestros Servicios | ${site.name}`}</title>
      <Hero
        title="Nuestros Servicios"
        lead="Texto de marcador de posición para una breve descripción de lo que hace la firma."
        image={courthouseImage}
      />
    </>
  )
}
