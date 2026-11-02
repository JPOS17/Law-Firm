import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { services } from '@/content/services'
import { renderAt } from '../renderAt'

describe('ServicesPage', () => {
  // Unlike the home page, this page lists every service, each as a heading.
  it('lists every service', async () => {
    renderAt('/servicios')

    expect(
      await screen.findByRole('heading', { level: 2, name: 'Áreas de práctica' }),
    ).toBeVisible()
    for (const service of services) {
      expect(screen.getByRole('heading', { level: 3, name: service.title })).toBeVisible()
    }
  })

  // Each area has an anchor, so the home page can link straight to it.
  it('gives every area an anchor that matches its slug', async () => {
    renderAt('/servicios')

    for (const service of services) {
      expect(await screen.findByRole('heading', { level: 3, name: service.title })).toHaveAttribute(
        'id',
        service.slug,
      )
    }
  })

  // Every area starts closed, and clicking its name opens its description.
  it('starts with every area closed and opens one when its name is clicked', async () => {
    renderAt('/servicios')
    const user = userEvent.setup({ delay: null })

    for (const service of services) {
      expect(await screen.findByRole('button', { name: service.title })).toHaveAttribute(
        'aria-expanded',
        'false',
      )
    }

    const first = services[0]
    const firstButton = screen.getByRole('button', { name: first?.title })
    await user.click(firstButton)
    expect(firstButton).toHaveAttribute('aria-expanded', 'true')
  })

  // Arriving from a link like /servicios#area-de-practica-3 opens that area.
  it('opens the area named in the address', async () => {
    const target = services[2]
    renderAt(`/servicios#${target?.slug}`)

    expect(await screen.findByRole('button', { name: target?.title })).toHaveAttribute(
      'aria-expanded',
      'true',
    )
  })

  // The page ends with a call to action that leads to the contact page.
  it('ends with a call to action that leads to the contact page', async () => {
    renderAt('/servicios')

    expect(await screen.findByRole('link', { name: 'Contáctenos' })).toHaveAttribute(
      'href',
      '/contacto',
    )
  })
})
