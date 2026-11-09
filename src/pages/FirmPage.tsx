import { CallToAction } from '@/components/CallToAction'
import { Hero } from '@/components/Hero'
import { Pillars } from '@/components/Pillars'
import { Section } from '@/components/Section'
import { Seo } from '@/components/Seo'
import officeImage from '@/assets/office.webp'
import { firmPage } from '@/content/pages/firm'
import { values } from '@/content/values'

export function FirmPage() {
  const page = firmPage

  return (
    <>
      <Seo title={page.seo.title} description={page.seo.description} />
      <Hero title={page.title} lead={page.lead} image={officeImage} />
      <Section title={page.about.title}>
        <div className="flow">
          {page.about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Section>
      <Section title={page.values.title} tone="dark" layout="stacked">
        <Pillars items={values.items} summary={values.summary} />
      </Section>
      <CallToAction {...page.callToAction} />
    </>
  )
}
