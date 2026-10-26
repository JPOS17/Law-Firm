import { site } from '@/content/site'

export function PrivacyPage() {
  return (
    <>
      <title>{`Aviso de privacidad | ${site.name}`}</title>
      <section className="container section flow">
        <h1>Aviso de privacidad</h1>
        <p>
          Texto de marcador de posición: el texto del aviso de privacidad será proporcionado por el
          despacho.
        </p>
      </section>
    </>
  )
}
