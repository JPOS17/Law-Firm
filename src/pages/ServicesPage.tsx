import { CallToAction } from '@/components/CallToAction'
import { DetailList } from '@/components/DetailList'
import { Hero } from '@/components/Hero'
import { Section } from '@/components/Section'
import officeImage from '@/assets/office.webp'
import { services } from '@/content/services'
import { site } from '@/content/site'

export function ServicesPage() {
  return (
    <>
      <title>{`Nuestros Servicios | ${site.name}`}</title>
      <Hero
        title="Nuestros Servicios"
        lead="Texto de marcador de posición para una breve descripción de lo que hace la firma."
        image={officeImage}
      />
      <Section
        title="Áreas de práctica"
        intro="Texto de marcador de posición para introducir las áreas de práctica del despacho."
      >
        <DetailList
          items={services.map((service) => ({
            id: service.slug,
            title: service.title,
            description: service.description,
          }))}
        />
      </Section>
      <CallToAction
        title="¿Tiene un asunto legal que atender?"
        text="Texto de marcador de posición para invitar al visitante a ponerse en contacto."
        cta={{ label: 'Contáctenos', to: '/contacto' }}
      />
    </>
  )
}
