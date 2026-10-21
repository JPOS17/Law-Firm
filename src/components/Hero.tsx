import { Link } from 'react-router'

type HeroProps = {
  title: string
  lead: string
  cta?: {
    label: string
    to: string
  }
  image?: string
}

export function Hero({ title, lead, cta, image }: HeroProps) {
  return (
    <section className="hero">
      {image && <img className="hero__image" src={image} alt="" fetchPriority="high" />}
      <div className="container hero__content">
        <h1 className="hero__title">{title}</h1>
        <p className="hero__lead">{lead}</p>
        {cta && (
          <Link className="hero__cta" to={cta.to}>
            {cta.label}
          </Link>
        )}
      </div>
    </section>
  )
}
