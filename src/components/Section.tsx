import { useId } from 'react'
import type { ReactNode } from 'react'

type SectionProps = {
  title: string
  eyebrow?: string
  intro?: string
  tone?: 'default' | 'alt' | 'dark'
  // "stacked" puts the title above the content instead of in the left margin
  layout?: 'margin' | 'stacked'
  children: ReactNode
}

export function Section({
  title,
  eyebrow,
  intro,
  tone = 'default',
  layout = 'margin',
  children,
}: SectionProps) {
  const headingId = useId()
  const className = [
    'section',
    tone !== 'default' && `section--${tone}`,
    layout === 'stacked' && 'section--stacked',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <section className={className} aria-labelledby={headingId}>
      <div className="container section__grid">
        <header className="section__head">
          {eyebrow && (
            <p className={tone === 'dark' ? 'eyebrow eyebrow--on-dark' : 'eyebrow'}>{eyebrow}</p>
          )}
          <h2 id={headingId} className="section__title">
            {title}
          </h2>
          {intro && <p className="section__intro">{intro}</p>}
        </header>
        <div className="section__content">{children}</div>
      </div>
    </section>
  )
}
