import { site } from '@/content/site'
import { Hero } from '@/components/Hero'
import courthouseImage from '@/assets/courthouse.jpg'

export function FirmPage() {
  return (
    <>
      <title>{`Nuestra Firma | ${site.name}`}</title>
      <Hero
        title="Nuestra Firma"
        lead="Texto de marcador de posición para una breve descripción de lo que hace la firma."
        image={courthouseImage}
      />
    </>
  )
}
