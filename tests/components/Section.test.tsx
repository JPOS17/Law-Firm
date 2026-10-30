import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Section } from '@/components/Section'

describe('Section', () => {
  // The title should be an <h2> that names the section, so screen reader users
  // can find it as a labelled region.
  it('renders its title as a heading that labels the section', () => {
    render(
      <Section title="Mi sección">
        <p>contenido</p>
      </Section>,
    )

    expect(screen.getByRole('heading', { level: 2, name: 'Mi sección' })).toBeVisible()
    expect(screen.getByRole('region', { name: 'Mi sección' })).toHaveTextContent('contenido')
  })

  // The intro paragraph is optional: it shows only when one is passed.
  it('shows the intro only when one is provided', () => {
    const { rerender } = render(
      <Section title="Mi sección">
        <p>contenido</p>
      </Section>,
    )
    expect(screen.queryByText('Texto de introducción')).not.toBeInTheDocument()

    rerender(
      <Section title="Mi sección" intro="Texto de introducción">
        <p>contenido</p>
      </Section>,
    )
    expect(screen.getByText('Texto de introducción')).toBeVisible()
  })

  // The small line above the title is optional too.
  it('shows the eyebrow only when one is provided', () => {
    const { rerender } = render(
      <Section title="Mi sección">
        <p>contenido</p>
      </Section>,
    )
    expect(screen.queryByText('Antetítulo')).not.toBeInTheDocument()

    rerender(
      <Section title="Mi sección" eyebrow="Antetítulo">
        <p>contenido</p>
      </Section>,
    )
    expect(screen.getByText('Antetítulo')).toBeVisible()
  })

  // Each tone adds the modifier class that the stylesheet uses for the background.
  it.each(['alt', 'dark'] as const)('adds the %s modifier class only for that tone', (tone) => {
    const { rerender } = render(
      <Section title="Mi sección">
        <p>contenido</p>
      </Section>,
    )
    expect(screen.getByRole('region')).not.toHaveClass(`section--${tone}`)

    rerender(
      <Section title="Mi sección" tone={tone}>
        <p>contenido</p>
      </Section>,
    )
    expect(screen.getByRole('region')).toHaveClass(`section--${tone}`)
  })
})
