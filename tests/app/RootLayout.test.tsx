import { render, screen } from '@testing-library/react'
import { createMemoryRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import { describe, expect, it } from 'vitest'
import { RootLayout } from '@/app/RootLayout'

// The layout restores the scroll position, which only works inside a "data router",
// so it is rendered with the same kind of router the real app uses.
function renderLayout() {
  const router = createMemoryRouter([{ path: '/', element: <RootLayout /> }])
  render(<RouterProvider router={router} />)
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
