import { Accordion } from '@/components/Accordion'
import { CallToAction } from '@/components/CallToAction'
import { Hero } from '@/components/Hero'
import { Section } from '@/components/Section'
import { Seo } from '@/components/Seo'
import officeImage from '@/assets/office.webp'
import { servicesPage } from '@/content/pages/services'
import { services } from '@/content/services'

export function ServicesPage() {
  const page = servicesPage

  return (
    <>
      <Seo title={page.seo.title} description={page.seo.description} />
      <Hero title={page.title} lead={page.lead} image={officeImage} />
      <Section title={page.practiceAreas.title} intro={page.practiceAreas.intro}>
        <Accordion
          items={services.map((service) => ({
            id: service.slug,
            title: service.title,
            description: service.description,
          }))}
        />
      </Section>
      <CallToAction {...page.callToAction} />
    </>
  )
}
