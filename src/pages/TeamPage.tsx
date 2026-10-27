import { AttorneyGrid } from '@/components/AttorneyGrid'
import { CallToAction } from '@/components/CallToAction'
import { Hero } from '@/components/Hero'
import { Section } from '@/components/Section'
import officeImage from '@/assets/office.webp'
import { attorneys } from '@/content/attorneys'
import { site } from '@/content/site'

export function TeamPage() {
  return (
    <>
      <title>{`Nuestro Equipo | ${site.name}`}</title>
      <Hero
        title="Nuestro Equipo"
        lead="Texto de marcador de posición para una breve descripción de lo que hace la firma."
        image={officeImage}
      />
      <Section
        title="Nuestros abogados"
        intro="Texto de marcador de posición para introducir al equipo de abogados."
      >
        <AttorneyGrid attorneys={attorneys} />
      </Section>
      <CallToAction
        title="¿Desea hablar con nosotros?"
        text="Texto de marcador de posición para invitar al visitante a ponerse en contacto."
        cta={{ label: 'Contáctenos', to: '/contacto' }}
      />
    </>
  )
}
