import { site } from '@/content/site'
import { Link } from 'react-router'

export function ErrorPage() {
  return (
    <>
      <title>{`Error | ${site.name}`}</title>
      <main className="container section">
        <h1>Ocurrió un error inesperado</h1>
        <p>Por favor, inténtelo de nuevo, o regrese a la página de inicio.</p>
        <Link to="/">Volver al inicio</Link>
      </main>
    </>
  )
}
