import { Hero } from '@/components/Hero'
import officeImage from '@/assets/office.webp'
import { legalLinks } from '@/content/links'
import { site } from '@/content/site'

export function LinksPage() {
  return (
    <>
      <title>{`Enlaces de interés | ${site.name}`}</title>
      <Hero
        title="Enlaces de interés"
        lead="Texto de marcador de posición para una breve descripción de esta sección."
        image={officeImage}
      />
      <section className="container section">
        <ul className="link-list">
          {legalLinks.map((item) => (
            <li key={item.url}>
              <a
                className="link-list__link"
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.name}
                <span className="visually-hidden"> (se abre en una pestaña nueva)</span>
              </a>
              <p className="link-list__description">{item.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
