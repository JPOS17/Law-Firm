import { termsPage } from '@/content/pages/terms'
import { site } from '@/content/site'

export function TermsPage() {
  const page = termsPage

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
