import { Hero } from '@/components/Hero'
import { LinkList } from '@/components/LinkList'
import { Section } from '@/components/Section'
import officeImage from '@/assets/office.webp'
import { links } from '@/content/links'
import { site } from '@/content/site'

export function LinksPage() {
  return (
    <>
      <title>{`Enlaces de interés | ${site.name}`}</title>
      <Hero
        title="Enlaces de interés"
        // TODO: placeholder text, replace with real copy
        lead="Texto de marcador de posición para una breve descripción de los enlaces recomendados."
        image={officeImage}
      />
      <Section
        title="Sitios recomendados"
        // TODO: placeholder text, replace with real copy
        intro="Texto de marcador de posición para introducir los sitios de interés jurídico."
      >
        <LinkList items={links} />
      </Section>
    </>
  )
}
