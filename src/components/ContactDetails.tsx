import { WhatsAppLink } from '@/components/WhatsAppLink'
import { site } from '@/content/site'

export function ContactDetails() {
  const { address } = site

  return (
    <div className="contact-details">
      <h3 className="contact-details__title">Datos de contacto</h3>
      <dl className="contact-details__list">
        <div>
          <dt className="contact-details__term">Dirección</dt>
          <dd className="contact-details__value">
            {address.street}
            <br />
            {address.area}
            <br />
            {address.postalCode} {address.city}
          </dd>
        </div>
        <div>
          <dt className="contact-details__term">Teléfono</dt>
          <dd className="contact-details__value">
            <a href={site.phone.href}>{site.phone.label}</a>
          </dd>
        </div>
        <div>
          <dt className="contact-details__term">Correo electrónico</dt>
          <dd className="contact-details__value">
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </dd>
        </div>
        <div>
          <dt className="contact-details__term">WhatsApp</dt>
          <dd className="contact-details__value">
            <WhatsAppLink />
          </dd>
        </div>
        <div>
          <dt className="contact-details__term">Horario</dt>
          <dd className="contact-details__value">{site.hours}</dd>
        </div>
      </dl>
    </div>
  )
}
