import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { SiteFooter } from '@/components/SiteFooter'
import { site } from '@/content/site'

// Renders only the footer. It contains links, so it needs a router around it.
function renderFooter() {
  render(
    <MemoryRouter>
      <SiteFooter />
    </MemoryRouter>,
  )
}

describe('SiteFooter', () => {
  // The footer should identify the firm and show where it is located.
  it('shows the firm name, tagline, and address', () => {
    renderFooter()

    const footer = screen.getByRole('contentinfo')
    expect(footer).toHaveTextContent(site.name)
    expect(footer).toHaveTextContent(site.tagline)
    expect(footer).toHaveTextContent(site.address.street)
    expect(footer).toHaveTextContent(site.address.postalCode)
  })

  // Every entry in site.footerNav should appear as a link with the right label and address.
  it('links to every footer page', () => {
    renderFooter()

    const nav = screen.getByRole('navigation', { name: 'Pie de página' })
    for (const item of site.footerNav) {
      expect(within(nav).getByRole('link', { name: item.label })).toHaveAttribute('href', item.to)
    }
  })

  // The copyright line should carry the current year.
  it('shows the current year in the copyright notice', () => {
    renderFooter()

    expect(screen.getByRole('contentinfo')).toHaveTextContent(`© ${site.year}`)
  })
})
