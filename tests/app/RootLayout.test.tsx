import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { RootLayout } from '@/app/RootLayout'

function renderLayout() {
  render(
    <MemoryRouter>
      <RootLayout />
    </MemoryRouter>,
  )
}

describe('RootLayout', () => {
  // Every page should have a header, a main area, and a footer, so screen reader
  // users can jump between them.
  it('renders the header, main, and footer landmarks', () => {
    renderLayout()

    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  // The skip link must point at the id of <main>, or it would jump nowhere.
  it('has a skip link that points at the main content', () => {
    renderLayout()

    const main = screen.getByRole('main')
    const skipLink = screen.getByRole('link', { name: 'Saltar al contenido' })

    expect(skipLink).toHaveAttribute('href', `#${main.id}`)
  })
})
