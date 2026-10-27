import { Link } from 'react-router'
import { AttorneyGrid } from '@/components/AttorneyGrid'
import { CallToAction } from '@/components/CallToAction'
import { CardGrid } from '@/components/CardGrid'
import { Hero } from '@/components/Hero'
import { Section } from '@/components/Section'
import courthouseImage from '@/assets/courthouse.webp'
import { attorneys } from '@/content/attorneys'
import { services } from '@/content/services'
import { site } from '@/content/site'
import { values } from '@/content/values'

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
      <Section
        title="Nuestros valores"
        intro="Texto de marcador de posición para introducir los valores que distinguen al despacho."
      >
        <CardGrid items={values} />
      </Section>
      <Section
        title="Servicios"
        tone="alt"
        intro="Texto de marcador de posición para introducir las áreas de práctica del despacho."
      >
        <CardGrid items={services.slice(0, 3)} />
        <Link className="section__more" to="/servicios">
          Ver todos los servicios
        </Link>
      </Section>
      <Section
        title="Nuestro equipo"
        intro="Texto de marcador de posición para introducir al equipo de abogados."
      >
        <AttorneyGrid attorneys={attorneys.slice(0, 3)} />
        <Link className="section__more" to="/equipo">
          Conozca a todo el equipo
        </Link>
      </Section>
      <CallToAction
        title="¿Desea conocer cómo podemos ayudarle?"
        text="Texto de marcador de posición para invitar al visitante a ponerse en contacto."
        cta={{ label: 'Contáctenos', to: '/contacto' }}
      />
    </>
  )
}
