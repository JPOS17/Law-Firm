import { Hero } from '@/components/Hero'
import { LinkList } from '@/components/LinkList'
import { Section } from '@/components/Section'
import officeImage from '@/assets/office.webp'
import { links } from '@/content/links'
import { linksPage } from '@/content/pages/links'
import { site } from '@/content/site'

export function LinksPage() {
  const page = linksPage

  return (
    <>
      <title>{`${page.title} | ${site.name}`}</title>
      <Hero title={page.title} lead={page.lead} image={officeImage} />
      <Section title={page.sites.title} intro={page.sites.intro}>
        <LinkList items={links} />
      </Section>
    </>
  )
}
