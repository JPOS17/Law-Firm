import { CallToAction } from '@/components/CallToAction'
import { Hero } from '@/components/Hero'
import { Pillars } from '@/components/Pillars'
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
        // TODO: placeholder text, replace with real copy
        lead="Texto de marcador de posición para una breve descripción de lo que hace la firma."
        image={officeImage}
      />
      <Section title="Quiénes somos">
        <div className="flow">
          {/* TODO: placeholder text, replace with real copy */}
          <p>
            Texto de marcador de posición para el primer párrafo sobre la historia y la trayectoria
            del despacho.
          </p>
          {/* TODO: placeholder text, replace with real copy */}
          <p>
            Texto de marcador de posición para el segundo párrafo sobre la forma de trabajar del
            despacho.
          </p>
        </div>
      </Section>
      <Section title="Nuestros valores" tone="dark" layout="stacked">
        <Pillars items={values.items} summary={values.summary} />
      </Section>
      <CallToAction
        title="¿Desea conocernos mejor?"
        // TODO: placeholder text, replace with real copy
        text="Texto de marcador de posición para invitar al visitante a ponerse en contacto."
        cta={{ label: 'Contáctenos', to: '/contacto' }}
      />
    </>
  )
}
