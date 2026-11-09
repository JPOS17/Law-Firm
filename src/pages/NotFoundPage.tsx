import { notFoundPage } from '@/content/pages/notFound'
import { Link } from 'react-router'
import { Seo } from '@/components/Seo'

export function NotFoundPage() {
  const page = notFoundPage

  return (
    <>
      <Seo title={page.title} noindex />
      <section className="container section">
        <h1>{page.title}</h1>
        <p>{page.text}</p>
        <Link to="/">{page.back}</Link>
      </section>
    </>
  )
}
