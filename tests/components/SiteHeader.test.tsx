import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { SiteHeader } from '@/components/SiteHeader'
import { site } from '@/content/site'

// Renders only the header, with a router that pretends the browser is at `path`.
function renderHeader(path = '/') {
  render(
    <MemoryRouter initialEntries={[path]}>
      <SiteHeader />
    </MemoryRouter>,
  )
}

describe('SiteHeader', () => {
  // Every entry in site.nav should appear in the navigation as a link
  // with the right label and address.
  it('renders a link for every navigation item', () => {
    renderHeader()

    const nav = screen.getByRole('navigation', { name: 'Principal' })
    for (const item of site.nav) {
      expect(within(nav).getByRole('link', { name: item.label })).toHaveAttribute('href', item.to)
    }
  })

  // The firm name acts as the link back to the home page.
  it('links the firm name to the home page', () => {
    renderHeader()

    expect(screen.getByRole('link', { name: site.name })).toHaveAttribute('href', '/')
  })

  // On /equipo, only the Equipo link should be marked as the current page.
  // "La Firma" is the control: a different page's link must NOT be marked.
  it('marks the current page', () => {
    renderHeader('/equipo')

    expect(screen.getByRole('link', { name: 'Equipo' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('link', { name: 'La Firma' })).not.toHaveAttribute('aria-current')
  })
})
