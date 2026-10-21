import { site } from '@/content/site'
import { Link } from 'react-router'

export function NotFoundPage() {
  return (
    <>
      <title>{`Página no encontrada | ${site.name}`}</title>
      <section className="container section">
        <h1>Página no encontrada</h1>
        <p>La página que busca no existe o ha sido movida.</p>
        <Link to="/">Volver al inicio</Link>
      </section>
    </>
  )
}
