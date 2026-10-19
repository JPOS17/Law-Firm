type HeroProps = {
  title: string
  lead: string
  ctaLabel: string
  ctaHref: string
}

export function Hero({ title, lead, ctaLabel, ctaHref }: HeroProps) {
  return (
    <section className="hero">
      <div className="container">
        <h1 className="hero__title">{title}</h1>
        <p className="hero__lead">{lead}</p>
        <a className="hero__cta" href={ctaHref}>
          {ctaLabel}
        </a>
      </div>
    </section>
  )
}
