import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SiteFooter } from '@/components/SiteFooter'
import { site } from '@/content/site'

describe('SiteFooter', () => {
  // The footer should identify the firm and show where it is located.
  it('shows the firm name, tagline, and address', () => {
    render(<SiteFooter />)

    const footer = screen.getByRole('contentinfo')
    expect(footer).toHaveTextContent(site.name)
    expect(footer).toHaveTextContent(site.tagline)
    expect(footer).toHaveTextContent(site.address.street)
    expect(footer).toHaveTextContent(site.address.postalCode)
  })

  // The copyright line should carry the current year.
  it('shows the current year in the copyright notice', () => {
    render(<SiteFooter />)

    expect(screen.getByRole('contentinfo')).toHaveTextContent(`© ${site.year}`)
  })
})
