import { AttorneyGrid } from '@/components/AttorneyGrid'
import { CallToAction } from '@/components/CallToAction'
import { Hero } from '@/components/Hero'
import { Section } from '@/components/Section'
import { Seo } from '@/components/Seo'
import { heroImages } from '@/content/images'
import { attorneys } from '@/content/attorneys'
import { teamPage } from '@/content/pages/team'

export function TeamPage() {
  const page = teamPage

  return (
    <>
      <Seo title={page.seo.title} description={page.seo.description} />
      <Hero title={page.title} lead={page.lead} image={heroImages.inner} />
      <Section title={page.attorneys.title} intro={page.attorneys.intro}>
        <AttorneyGrid attorneys={attorneys} />
      </Section>
      <CallToAction {...page.callToAction} />
    </>
  )
}
