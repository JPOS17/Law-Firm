import { ContactBand } from '@/components/ContactBand'
import { Hero } from '@/components/Hero'
import { IndexList } from '@/components/IndexList'
import { ProcessSteps } from '@/components/ProcessSteps'
import { Section } from '@/components/Section'
import courthouseImage from '@/assets/courthouse.webp'
import { home } from '@/content/home'
import { services } from '@/content/services'
import { site } from '@/content/site'

export function HomePage() {
  return (
    <>
      <title>{`Inicio | ${site.name}`}</title>
      <Hero
        size="large"
        eyebrow={home.hero.eyebrow}
        title={home.hero.title}
        lead={home.hero.lead}
        cta={home.hero.cta}
        image={courthouseImage}
      />
      <div className="container section intro">
        <p className="intro__text">{home.intro}</p>
      </div>
      <Section title={home.services.title} intro={home.services.intro} tone="alt">
        <IndexList
          items={services.map((service) => ({
            label: service.title,
            to: `/servicios#${service.slug}`,
          }))}
        />
      </Section>
      <Section title={home.process.title} intro={home.process.intro} tone="dark">
        <ProcessSteps steps={home.process.steps} />
      </Section>
      <ContactBand title={home.contact.title} text={home.contact.text} />
    </>
  )
}
