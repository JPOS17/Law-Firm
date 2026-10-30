import { Link } from 'react-router'
import { WhatsAppLink } from '@/components/WhatsAppLink'
import { site } from '@/content/site'

type ContactBandProps = {
  title: string
  text: string
}

export function ContactBand({ title, text }: ContactBandProps) {
  return (
    <section className="contact-band">
      <div className="container contact-band__inner">
        <div>
          <h2 className="contact-band__title">{title}</h2>
          <p className="contact-band__text">{text}</p>
        </div>
        <ul className="contact-band__actions">
          <li>
            <a className="contact-band__phone" href={site.phone.href}>
              <span className="eyebrow">Llámenos</span>
              <span className="contact-band__number">{site.phone.label}</span>
            </a>
          </li>
          <li>
            <WhatsAppLink />
          </li>
          <li>
            <Link to="/contacto">Enviar un mensaje</Link>
          </li>
        </ul>
      </div>
    </section>
  )
}
