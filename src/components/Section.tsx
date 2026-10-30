import { useId } from 'react'
import type { ReactNode } from 'react'

type SectionProps = {
  title: string
  eyebrow?: string
  intro?: string
  tone?: 'default' | 'alt' | 'dark'
  children: ReactNode
}

export function Section({ title, eyebrow, intro, tone = 'default', children }: SectionProps) {
  const headingId = useId()
  const className = tone === 'default' ? 'section' : `section section--${tone}`

  return (
    <section className={className} aria-labelledby={headingId}>
      <div className="container">
        {eyebrow && (
          <p className={tone === 'dark' ? 'eyebrow eyebrow--on-dark' : 'eyebrow'}>{eyebrow}</p>
        )}
        <h2 id={headingId} className="section__title">
          {title}
        </h2>
        {intro && <p className="section__intro">{intro}</p>}
        <div className="section__content">{children}</div>
      </div>
    </section>
  )
}
