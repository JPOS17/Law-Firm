import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Hero } from '@/components/Hero'
import { MemoryRouter } from 'react-router'
import type { ReactElement } from 'react'

function renderHero(ui: ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>)
}

const props = {
  title: 'title',
  lead: 'lead',
  cta: { label: 'action', to: '/test' },
}

describe('Hero', () => {
  // The title prop should render as the page's top-level heading (<h1>).
  it('renders the title as a level-one heading', () => {
    renderHero(<Hero {...props} />)

    expect(screen.getByRole('heading', { level: 1, name: 'title' })).toBeInTheDocument()
  })

  // When a cta is passed, it should render as a link with the given label and address.
  it('renders the call to action as a link to the given address', () => {
    renderHero(<Hero {...props} />)

    expect(screen.getByRole('link', { name: 'action' })).toHaveAttribute('href', '/test')
  })

  // The button is optional: with no cta prop, the hero should contain no link at all.
  it('renders no call to action when none is provided', () => {
    renderHero(<Hero title={props.title} lead={props.lead} />)

    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })

  // The small line above the title is optional too.
  it('shows the eyebrow only when one is provided', () => {
    const { rerender } = renderHero(<Hero {...props} />)
    expect(screen.queryByText('eyebrow')).not.toBeInTheDocument()

    rerender(
      <MemoryRouter>
        <Hero {...props} eyebrow="eyebrow" />
      </MemoryRouter>,
    )
    expect(screen.getByText('eyebrow')).toBeVisible()
  })

  // Inner pages use the short banner. The home page asks for the tall one.
  it('uses the compact banner unless the large size is requested', () => {
    const { container, rerender } = renderHero(<Hero {...props} />)
    expect(container.querySelector('.hero')).not.toHaveClass('hero--large')

    rerender(
      <MemoryRouter>
        <Hero {...props} size="large" />
      </MemoryRouter>,
    )
    expect(container.querySelector('.hero')).toHaveClass('hero--large')
  })

  // When an image is passed, it should render as a decorative <img> (empty alt),
  // so screen readers skip it and only read the text on top.
  it('renders a decorative background image when one is provided', () => {
    const { container } = renderHero(<Hero {...props} image="/test.jpg" />)

    const image = container.querySelector('img')
    expect(image).toHaveAttribute('src', '/test.jpg')
    expect(image).toHaveAttribute('alt', '')
  })

  // The image is optional: with no image prop, no <img> should be rendered.
  it('renders no image when none is provided', () => {
    const { container } = renderHero(<Hero {...props} />)

    expect(container.querySelector('img')).not.toBeInTheDocument()
  })
})
