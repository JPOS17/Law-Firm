import { Link } from 'react-router'

type HeroProps = {
  title: string
  lead: string
  eyebrow?: string
  cta?: {
    label: string
    to: string
  }
  image?: string
  // "large" is for the home page. Inner pages use the shorter "compact" banner.
  size?: 'large' | 'compact'
}

export function Hero({ title, lead, eyebrow, cta, image, size = 'compact' }: HeroProps) {
  return (
    <section className={size === 'large' ? 'hero hero--large' : 'hero'}>
      {image && <img className="hero__image" src={image} alt="" fetchPriority="high" />}
      <div className="container hero__content">
        {eyebrow && <p className="eyebrow eyebrow--on-dark">{eyebrow}</p>}
        <h1 className="hero__title">{title}</h1>
        <p className="hero__lead">{lead}</p>
        {cta && (
          <Link className="button button--on-dark hero__cta" to={cta.to}>
            {cta.label}
          </Link>
        )}
      </div>
    </section>
  )
}
