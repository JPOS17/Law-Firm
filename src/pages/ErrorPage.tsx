import { errorPage } from '@/content/pages/error'
import { Link } from 'react-router'
import { Seo } from '@/components/Seo'

export function ErrorPage() {
  const page = errorPage

  return (
    <>
      <Seo title={page.tabTitle} noindex />
      <main className="container section">
        <h1>{page.title}</h1>
        <p>{page.text}</p>
        <Link to="/">{page.back}</Link>
      </main>
    </>
  )
}
