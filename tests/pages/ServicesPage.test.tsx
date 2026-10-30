import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { services } from '@/content/services'
import { renderAt } from '../renderAt'

describe('ServicesPage', () => {
  // Unlike the home page preview, this page lists every service.
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

  // The page ends with a call to action that leads to the contact page.
  it('ends with a call to action that leads to the contact page', async () => {
    renderAt('/servicios')

    expect(await screen.findByRole('link', { name: 'Contáctenos' })).toHaveAttribute(
      'href',
      '/contacto',
    )
  })
})
