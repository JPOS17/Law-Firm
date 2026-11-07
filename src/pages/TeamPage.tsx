import { AttorneyGrid } from '@/components/AttorneyGrid'
import { CallToAction } from '@/components/CallToAction'
import { Hero } from '@/components/Hero'
import { Section } from '@/components/Section'
import officeImage from '@/assets/office.webp'
import { attorneys } from '@/content/attorneys'
import { teamPage } from '@/content/pages/team'
import { site } from '@/content/site'

export function TeamPage() {
  const page = teamPage

  return (
    <>
      <title>{`${page.title} | ${site.name}`}</title>
      <Hero title={page.title} lead={page.lead} image={officeImage} />
      <Section title={page.attorneys.title} intro={page.attorneys.intro}>
        <AttorneyGrid attorneys={attorneys} />
      </Section>
      <CallToAction {...page.callToAction} />
    </>
  )
}
