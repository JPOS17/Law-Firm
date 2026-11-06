import { Accordion } from '@/components/Accordion'
import { CallToAction } from '@/components/CallToAction'
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
        // TODO: placeholder text, replace with real copy
        lead="Texto de marcador de posición para una breve descripción de lo que hace la firma."
        image={officeImage}
      />
      <Section
        title="Áreas de práctica"
        // TODO: placeholder text, replace with real copy
        intro="Texto de marcador de posición para introducir las áreas de práctica del despacho."
      >
        <Accordion
          items={services.map((service) => ({
            id: service.slug,
            title: service.title,
            description: service.description,
          }))}
        />
      </Section>
      <CallToAction
        title="¿Tiene un asunto legal que atender?"
        // TODO: placeholder text, replace with real copy
        text="Texto de marcador de posición para invitar al visitante a ponerse en contacto."
        cta={{ label: 'Contáctenos', to: '/contacto' }}
      />
    </>
  )
}
