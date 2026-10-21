import { site } from '@/content/site'
import { Hero } from '@/components/Hero'
import courthouseImage from '@/assets/courthouse.jpg'

export function TeamPage() {
  return (
    <>
      <title>{`Nuestro Equipo | ${site.name}`}</title>
      <Hero
        title="Nuestro Equipo"
        lead="Texto de marcador de posición para una breve descripción de lo que hace la firma."
        image={courthouseImage}
      />
    </>
  )
}
