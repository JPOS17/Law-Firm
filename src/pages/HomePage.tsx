import { site } from '@/content/site'
import { Hero } from '@/components/Hero'
import courthouseImage from '@/assets/courthouse.jpg'

export function HomePage() {
  return (
    <>
      <title>{`Inicio | ${site.name}`}</title>
      <Hero
        title="Despacho de Abogados"
        lead="Texto de marcador de posición para una breve descripción de lo que hace la firma."
        cta={{ label: 'Programar una consulta', to: '/contacto' }}
        image={courthouseImage}
      />
    </>
  )
}
