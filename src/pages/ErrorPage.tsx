import { errorPage } from '@/content/pages/error'
import { site } from '@/content/site'
import { Link } from 'react-router'

export function ErrorPage() {
  const page = errorPage

  return (
    <>
      <title>{`${page.tabTitle} | ${site.name}`}</title>
      <main className="container section">
        <h1>{page.title}</h1>
        <p>{page.text}</p>
        <Link to="/">{page.back}</Link>
      </main>
    </>
  )
}
