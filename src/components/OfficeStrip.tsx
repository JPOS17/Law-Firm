import { site } from '@/content/site'

// Practical details right under the hero, so a visitor never has to hunt for them
export function OfficeStrip() {
  return (
    <section className="office-strip" aria-label="Datos del despacho">
      <dl className="container office-strip__list">
        <div>
          <dt>Oficina</dt>
          <dd>
            {site.address.street}, {site.address.area}
          </dd>
        </div>
        <div>
          <dt>Horario</dt>
          <dd>{site.hours}</dd>
        </div>
        <div>
          <dt>Teléfono</dt>
          <dd>
            <a href={site.phone.href}>{site.phone.label}</a>
          </dd>
        </div>
      </dl>
    </section>
  )
}
