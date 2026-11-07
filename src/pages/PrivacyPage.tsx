import { privacyPage } from '@/content/pages/privacy'
import { site } from '@/content/site'

export function PrivacyPage() {
  const page = privacyPage

  return (
    <>
      <title>{`${page.title} | ${site.name}`}</title>
      <section className="container section flow">
        <h1>{page.title}</h1>
        {page.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>
    </>
  )
}
