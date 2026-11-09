import { ContactDetails } from '@/components/ContactDetails'
import { ContactForm } from '@/components/ContactForm'
import { Hero } from '@/components/Hero'
import { LocationMap } from '@/components/LocationMap'
import { Section } from '@/components/Section'
import { Seo } from '@/components/Seo'
import officeImage from '@/assets/office.webp'
import { contactPage } from '@/content/pages/contact'

export function ContactPage() {
  const page = contactPage

  return (
    <>
      <Seo title={page.seo.title} description={page.seo.description} />
      <Hero title={page.title} lead={page.lead} image={officeImage} />
      <Section title={page.form.title} intro={page.form.intro}>
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
