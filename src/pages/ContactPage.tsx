import { ContactDetails } from '@/components/ContactDetails'
import { ContactForm } from '@/components/ContactForm'
import { Hero } from '@/components/Hero'
import { LocationMap } from '@/components/LocationMap'
import { Section } from '@/components/Section'
import officeImage from '@/assets/office.webp'
import { site } from '@/content/site'

export function ContactPage() {
  return (
    <>
      <title>{`Contáctenos | ${site.name}`}</title>
      <Hero
        title="Contáctenos"
        // TODO: placeholder text, replace with real copy
        lead="Texto de marcador de posición para una breve descripción de lo que hace la firma."
        image={officeImage}
      />
      <Section
        title="Envíenos un mensaje"
        // TODO: placeholder text, replace with real copy
        intro="Texto de marcador de posición para invitar al visitante a escribir al despacho."
      >
        <div className="contact-layout">
          <ContactForm />
          <div className="contact-aside">
            <ContactDetails />
            <LocationMap />
          </div>
        </div>
      </Section>
    </>
  )
}
