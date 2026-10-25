import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { createMemoryRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import { describe, expect, it } from 'vitest'
import { routes } from '@/app/routes'
import { site } from '@/content/site'

// The heading shown by NotFoundPage. Update this if page title changes.
const NOT_FOUND_HEADING = 'Página no encontrada'

// Renders the whole app with the real routes, as if the browser were at `path`.
function renderAt(path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] })
  render(<RouterProvider router={router} />)
}

describe('routes', () => {
  // Runs once per item in site.nav. Every link in the header must lead to a real
  // page (not the not-found page), and that page must have exactly one <h1>.
  it.each(site.nav)('has a real page for the "$label" nav link', async ({ to }) => {
    renderAt(to)

    const heading = await screen.findByRole('heading', { level: 1 })
    expect(heading).not.toHaveTextContent(NOT_FOUND_HEADING)
  })

  // An address with no matching route should fall through to the catch-all route.
  it('renders the not-found page for unknown paths', async () => {
    renderAt('/does-not-exist')

    expect(await screen.findByRole('heading', { level: 1, name: NOT_FOUND_HEADING })).toBeVisible()
  })

  // The root path ("/") should show the home page.
  it('renders the home page at the root path', async () => {
    renderAt('/')

    expect(await screen.findByRole('heading', { level: 1, name: site.name })).toBeVisible()
  })

  // The "/la-firma" route should show the firm page with its own heading.
  it('renders the firm page at /la-firma', async () => {
    renderAt('/la-firma')

    expect(await screen.findByRole('heading', { level: 1, name: 'Nuestra Firma' })).toBeVisible()
  })

  // The "/equipo" route should show the team page with its own heading.
  it('renders the team page at /equipo', async () => {
    renderAt('/equipo')

    expect(await screen.findByRole('heading', { level: 1, name: 'Nuestro Equipo' })).toBeVisible()
  })

  // The "/contacto" route should show the contact page with its own heading.
  it('renders the contact page at /contacto', async () => {
    renderAt('/contacto')

    expect(await screen.findByRole('heading', { level: 1, name: 'Contáctenos' })).toBeVisible()
  })

  // The "/servicios" route should show the services page with its own heading.
  it('renders the services page at /servicios', async () => {
    renderAt('/servicios')

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Nuestros Servicios' }),
    ).toBeVisible()
  })

  // Clicking the home page button should actually land on the contact page.
  // This catches a wrong address, like "/contact" instead of "/contacto".
  it('sends the home page call to action to the contact page', async () => {
    renderAt('/')

    fireEvent.click(await screen.findByRole('link', { name: 'Programar una consulta' }))

    expect(await screen.findByRole('heading', { level: 1, name: 'Contáctenos' })).toBeVisible()
  })

  // Each page sets its own browser tab title ("<page> | <firm name>").
  it.each([
    ['/', 'Inicio'],
    ['/la-firma', 'Nuestra Firma'],
    ['/servicios', 'Nuestros Servicios'],
    ['/equipo', 'Nuestro Equipo'],
    ['/contacto', 'Contáctenos'],
    ['/does-not-exist', 'Página no encontrada'],
  ])('sets the tab title at %s', async (path, pageTitle) => {
    renderAt(path)

    await waitFor(() => expect(document.title).toBe(`${pageTitle} | ${site.name}`))
  })
})
