import { notFoundPage } from '@/content/pages/notFound'
import { site } from '@/content/site'
import { Link } from 'react-router'

export function NotFoundPage() {
  const page = notFoundPage

  return (
    <>
      <title>{`${page.title} | ${site.name}`}</title>
      <section className="container section">
        <h1>{page.title}</h1>
        <p>{page.text}</p>
        <Link to="/">{page.back}</Link>
      </section>
    </>
  )
}
