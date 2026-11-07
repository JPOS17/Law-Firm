import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { homePage } from '@/content/pages/home'
import { services } from '@/content/services'
import { site } from '@/content/site'
import { renderAt } from '../renderAt'

describe('HomePage', () => {
  // The hero has the headline and one clear action: getting in touch.
  it('has a headline and a single call to action in the hero', async () => {
    renderAt('/')

    expect(
      await screen.findByRole('heading', { level: 1, name: homePage.hero.title }),
    ).toBeVisible()
    expect(screen.getByRole('link', { name: homePage.hero.cta.label })).toHaveAttribute(
      'href',
      homePage.hero.cta.to,
    )
  })

  // The short statement about the firm sits right after the hero.
  it('shows the short introduction to the firm', async () => {
    renderAt('/')

    expect(await screen.findByText(homePage.intro)).toBeVisible()
  })

  // The intro says where the office is and which states the firm works in.
  it('names the office city and every state the firm serves', async () => {
    renderAt('/')

    const intro = await screen.findByText(homePage.intro)
    expect(intro).toHaveTextContent('con sede en Aguascalientes')
    expect(intro).toHaveTextContent('Guanajuato')
    expect(intro).toHaveTextContent('Jalisco')
  })

  // The home page lists the names of the areas of practice only. The detail
  // (descriptions) lives on the services page, so it is not repeated here.
  it('lists every area of practice by name, without descriptions', async () => {
    renderAt('/')

    for (const service of services) {
      const link = await screen.findByRole('link', { name: service.title })
      expect(link).toHaveAttribute('href', `/servicios#${service.slug}`)
    }
    expect(screen.queryByText(services[0]?.description ?? '')).not.toBeInTheDocument()
  })

  // Choosing an area leads to that area on the services page.
  it('takes the visitor to the matching area on the services page', async () => {
    const scrollIntoView = vi.spyOn(Element.prototype, 'scrollIntoView')
    renderAt('/')
    const user = userEvent.setup({ delay: null })

    const first = services[0]
    expect(first).toBeDefined()
    await user.click(await screen.findByRole('link', { name: first?.title ?? '' }))

    const heading = await screen.findByRole('heading', { level: 3, name: first?.title })
    expect(heading).toHaveAttribute('id', first?.slug)
    expect(screen.getByRole('button', { name: first?.title })).toHaveAttribute(
      'aria-expanded',
      'true',
    )
    await waitFor(() => expect(scrollIntoView).toHaveBeenCalled())
  })

  // "Cómo trabajamos" shows each step, in order.
  it('shows the steps of how the firm works, in order', async () => {
    renderAt('/')

    expect(
      await screen.findByRole('heading', { level: 2, name: homePage.process.title }),
    ).toBeVisible()
    const titles = screen
      .getAllByRole('heading', { level: 3 })
      .map((heading) => heading.textContent)
      .filter((title) => homePage.process.steps.some((step) => step.title === title))
    expect(titles).toEqual(homePage.process.steps.map((step) => step.title))
  })

  // The page closes with direct ways to reach the firm, not only a link to the contact page.
  it('closes with the phone number and WhatsApp', async () => {
    renderAt('/')

    expect(
      await screen.findByRole('heading', { level: 2, name: homePage.contact.title }),
    ).toBeVisible()
    const phone = screen.getAllByRole('link', { name: new RegExp(site.phone.label) })
    expect(phone.some((link) => link.getAttribute('href') === site.phone.href)).toBe(true)
    const whatsapp = screen.getAllByRole('link', { name: /WhatsApp/ })
    expect(whatsapp.some((link) => link.getAttribute('href') === site.whatsapp.href)).toBe(true)
  })

  // Values belong to the firm page only, so the home page must not repeat them.
  it('does not repeat the firm values', async () => {
    renderAt('/')

    await screen.findByRole('heading', { level: 1, name: homePage.hero.title })
    expect(screen.queryByRole('heading', { name: 'Nuestros valores' })).not.toBeInTheDocument()
  })
})
