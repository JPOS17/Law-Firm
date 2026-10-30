import { Link } from 'react-router'

type CallToActionProps = {
  title: string
  text: string
  cta: {
    label: string
    to: string
  }
}

export function CallToAction({ title, text, cta }: CallToActionProps) {
  return (
    <section className="cta-band">
      <div className="container">
        <h2 className="cta-band__title">{title}</h2>
        <p className="cta-band__text">{text}</p>
        <Link className="button" to={cta.to}>
          {cta.label}
        </Link>
      </div>
    </section>
  )
}
