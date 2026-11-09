import { Hero } from '@/components/Hero'
import { LinkList } from '@/components/LinkList'
import { Section } from '@/components/Section'
import { Seo } from '@/components/Seo'
import { heroImages } from '@/content/images'
import { links } from '@/content/links'
import { linksPage } from '@/content/pages/links'

export function LinksPage() {
  const page = linksPage

  return (
    <>
      <Seo title={page.seo.title} description={page.seo.description} />
      <Hero title={page.title} lead={page.lead} image={heroImages.inner} />
      <Section title={page.sites.title} intro={page.sites.intro}>
        <LinkList items={links} />
      </Section>
    </>
  )
}
