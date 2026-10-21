import { render, screen, waitFor } from '@testing-library/react'
import { createMemoryRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { routes } from '@/app/routes'
import { site } from '@/content/site'

// These must match the text in src/pages/ErrorPage.tsx. Update them if you change that page.
const ERROR_HEADING = 'Ocurrió un error inesperado'
const BACK_LINK = 'Volver al inicio'

// Replaces the real HomePage with one that always crashes, for this file only.
// This simulates a rendering error using the real routes.
vi.mock('@/pages/HomePage', () => ({
  HomePage: () => {
    throw new Error('boom')
  },
}))

describe('route error handling', () => {
  // React prints a long red error when a component crashes. Silence it so a
  // passing test doesn't fill the terminal with scary-looking logs.
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  // When a page crashes while rendering, the error page should replace it,
  // show a heading, offer a link back to the home page, and set its own tab title.
  it('shows the error page when a page crashes while rendering', async () => {
    const router = createMemoryRouter(routes, { initialEntries: ['/'] })
    render(<RouterProvider router={router} />)

    expect(await screen.findByRole('heading', { level: 1, name: ERROR_HEADING })).toBeVisible()
    expect(screen.getByRole('link', { name: BACK_LINK })).toHaveAttribute('href', '/')
    await waitFor(() => expect(document.title).toBe(`Error | ${site.name}`))
  })
})
