import { ContactBand } from '@/components/ContactBand'
import { Hero } from '@/components/Hero'
import { OfficeStrip } from '@/components/OfficeStrip'
import { IndexList } from '@/components/IndexList'
import { ProcessSteps } from '@/components/ProcessSteps'
import { Section } from '@/components/Section'
import { Seo } from '@/components/Seo'
import { homePage } from '@/content/pages/home'
import { services } from '@/content/services'

export function HomePage() {
  const page = homePage

  return (
    <>
      <Seo title={page.seo.title} description={page.seo.description} />
      <Hero
        size="large"
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        lead={page.hero.lead}
        cta={page.hero.cta}
        image="/centro-ags.webp"
      />
      <OfficeStrip />
      <div className="container section intro">
        <p className="intro__text">{page.intro}</p>
      </div>
      <Section title={page.services.title} intro={page.services.intro} tone="alt">
        <IndexList
          items={services.map((service) => ({
            label: service.title,
            to: `/servicios#${service.slug}`,
          }))}
        />
      </Section>
      <Section title={page.process.title} intro={page.process.intro} tone="dark">
        <ProcessSteps steps={page.process.steps} />
      </Section>
      <ContactBand title={page.contact.title} text={page.contact.text} />
    </>
  )
}
