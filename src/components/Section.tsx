import { useId } from 'react'
import type { ReactNode } from 'react'

type SectionProps = {
  title: string
  intro?: string
  tone?: 'default' | 'alt'
  children: ReactNode
}

export function Section({ title, intro, tone = 'default', children }: SectionProps) {
  const headingId = useId()

  return (
    <section
      className={tone === 'alt' ? 'section section--alt' : 'section'}
      aria-labelledby={headingId}
    >
      <div className="container">
        <h2 id={headingId} className="section__title">
          {title}
        </h2>
        {intro && <p className="section__intro">{intro}</p>}
        <div className="section__content">{children}</div>
      </div>
    </section>
  )
}
