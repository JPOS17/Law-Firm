import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { attorneys } from '@/content/attorneys'
import { renderAt } from '../renderAt'

describe('TeamPage', () => {
  // Unlike the home page preview, this page lists every attorney.
  it('lists every attorney', async () => {
    renderAt('/equipo')

    expect(
      await screen.findByRole('heading', { level: 2, name: 'Nuestros abogados' }),
    ).toBeVisible()
    for (const attorney of attorneys) {
      expect(screen.getByRole('heading', { level: 3, name: attorney.name })).toBeVisible()
    }
  })

  // The page ends with a call to action that leads to the contact page.
  it('ends with a call to action that leads to the contact page', async () => {
    renderAt('/equipo')

    expect(await screen.findByRole('link', { name: 'Contáctenos' })).toHaveAttribute(
      'href',
      '/contacto',
    )
  })
})
