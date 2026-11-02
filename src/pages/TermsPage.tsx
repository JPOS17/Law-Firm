import { site } from '@/content/site'

export function TermsPage() {
  return (
    <>
      <title>{`Términos y condiciones | ${site.name}`}</title>
      <section className="container section flow">
        <h1>Términos y condiciones</h1>
        <p>
          Texto de marcador de posición: el texto del aviso de privacidad será proporcionado por el
          despacho.
        </p>
      </section>
    </>
  )
}
