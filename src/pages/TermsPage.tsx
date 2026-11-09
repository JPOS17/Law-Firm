import { termsPage } from '@/content/pages/terms'
import { Seo } from '@/components/Seo'

export function TermsPage() {
  const page = termsPage

  return (
    <>
      <Seo title={page.seo.title} description={page.seo.description} />
      <section className="container section flow">
        <h1>{page.title}</h1>
        {page.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>
    </>
  )
}
