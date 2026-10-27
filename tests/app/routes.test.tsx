import { fireEvent, screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { legalLinks } from '@/content/links'
import { posts } from '@/content/posts'
import { site } from '@/content/site'
import { renderAt } from '../renderAt'

// The heading shown by NotFoundPage. Update this if page title changes.
const NOT_FOUND_HEADING = 'Página no encontrada'

describe('routes', () => {
  // Runs once per item in site.nav. Every link in the header must lead to a real
  // page (not the not-found page), and that page must have exactly one <h1>.
  it.each(site.nav)('has a real page for the "$label" nav link', async ({ to }) => {
    renderAt(to)

    const heading = await screen.findByRole('heading', { level: 1 })
    expect(heading).not.toHaveTextContent(NOT_FOUND_HEADING)
  })

  // Same check for the links in the footer.
  it.each(site.footerNav)('has a real page for the "$label" footer link', async ({ to }) => {
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
    ['/blog', 'Blog'],
    ['/contacto', 'Contáctenos'],
    ['/enlaces', 'Enlaces de interés'],
    ['/aviso-de-privacidad', 'Aviso de privacidad'],
    ['/does-not-exist', 'Página no encontrada'],
  ])('sets the tab title at %s', async (path, pageTitle) => {
    renderAt(path)

    await waitFor(() => expect(document.title).toBe(`${pageTitle} | ${site.name}`))
  })
})

describe('blog routes', () => {
  // The blog list should show every post as a link to that post's own address.
  it('lists every post with a link to its page', async () => {
    renderAt('/blog')

    for (const post of posts) {
      const link = await screen.findByRole('link', { name: post.title })
      expect(link).toHaveAttribute('href', `/blog/${post.slug}`)
    }
  })

  // Each post address should show that post's article, and use its title for the tab.
  it.each(posts)('shows the article at /blog/$slug', async ({ slug, title }) => {
    renderAt(`/blog/${slug}`)

    expect(await screen.findByRole('heading', { level: 1, name: title })).toBeVisible()
    await waitFor(() => expect(document.title).toBe(`${title} | ${site.name}`))
  })

  // A post address that doesn't exist should show the not-found page, not a broken article.
  it('shows the not-found page for an unknown article', async () => {
    renderAt('/blog/no-existe')

    expect(await screen.findByRole('heading', { level: 1, name: NOT_FOUND_HEADING })).toBeVisible()
  })
})

describe('links of interest route', () => {
  // Every external link should point to its site and open in a new tab safely.
  // The link's accessible name also includes a hidden "opens in a new tab" note,
  // so match on the start of the name.
  it('lists every external link and opens it in a new tab', async () => {
    renderAt('/enlaces')

    for (const item of legalLinks) {
      const link = await screen.findByRole('link', {
        name: (accessibleName) => accessibleName.startsWith(item.name),
      })
      expect(link).toHaveAttribute('href', item.url)
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'))
    }
  })
})
