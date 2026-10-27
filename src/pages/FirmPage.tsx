import { CallToAction } from '@/components/CallToAction'
import { CardGrid } from '@/components/CardGrid'
import { Hero } from '@/components/Hero'
import { Section } from '@/components/Section'
import officeImage from '@/assets/office.webp'
import { site } from '@/content/site'
import { values } from '@/content/values'

export function FirmPage() {
  return (
    <>
      <title>{`Nuestra Firma | ${site.name}`}</title>
      <Hero
        title="Nuestra Firma"
        lead="Texto de marcador de posición para una breve descripción de lo que hace la firma."
        image={officeImage}
      />
      <Section title="Quiénes somos">
        <div className="flow">
          <p>
            Texto de marcador de posición para el primer párrafo sobre la historia y la trayectoria
            del despacho.
          </p>
          <p>
            Texto de marcador de posición para el segundo párrafo sobre la forma de trabajar del
            despacho.
          </p>
        </div>
      </Section>
      <Section
        title="Nuestros valores"
        tone="alt"
        intro="Texto de marcador de posición para introducir los valores que distinguen al despacho."
      >
        <CardGrid items={values} />
      </Section>
      <CallToAction
        title="¿Desea conocernos mejor?"
        text="Texto de marcador de posición para invitar al visitante a ponerse en contacto."
        cta={{ label: 'Contáctenos', to: '/contacto' }}
      />
    </>
  )
}
