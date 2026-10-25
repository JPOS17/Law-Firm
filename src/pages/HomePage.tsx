import { site } from '@/content/site'
import { Hero } from '@/components/Hero'
import courthouseImage from '@/assets/courthouse.jpg'

export function HomePage() {
  return (
    <>
      <title>{`Inicio | ${site.name}`}</title>
      <Hero
        title={site.name}
        lead={site.tagline}
        cta={{ label: 'Programar una consulta', to: '/contacto' }}
        image={courthouseImage}
      />
    </>
  )
}
