import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Hero } from '@/components/Hero'

const props = {
  title: 'Your Firm Name',
  lead: 'A short statement about the firm.',
  ctaLabel: 'Schedule a consultation',
  ctaHref: '#test',
}

describe('Hero', () => {
  it('renders the title as a level-one heading', () => {
    render(<Hero {...props} />)

    expect(screen.getByRole('heading', { level: 1, name: 'Your Firm Name' })).toBeInTheDocument()
  })

  it('renders the call to action as a link to the given address', () => {
    render(<Hero {...props} />)

    expect(screen.getByRole('link', { name: 'Schedule a consultation' })).toHaveAttribute(
      'href',
      '#contact',
    )
  })
})
