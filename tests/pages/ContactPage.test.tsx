import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderAt } from '../renderAt'

describe('ContactPage', () => {
  // The page offers the form, the contact details, and the map.
  it('shows the form, the contact details, and the map', async () => {
    renderAt('/contacto')

    expect(
      await screen.findByRole('heading', { level: 2, name: 'Envíenos un mensaje' }),
    ).toBeVisible()
    expect(screen.getByRole('form', { name: 'Formulario de contacto' })).toBeVisible()
    expect(screen.getByRole('heading', { level: 3, name: 'Datos de contacto' })).toBeVisible()
    expect(screen.getByTitle('Mapa con la ubicación del despacho')).toBeInTheDocument()
  })

  // The map is part of the same section as the details, not a section of its own.
  it('keeps the map in the same section as the form and the details', async () => {
    renderAt('/contacto')

    const section = await screen.findByRole('region', { name: 'Envíenos un mensaje' })
    expect(section).toContainElement(screen.getByTitle('Mapa con la ubicación del despacho'))
    expect(screen.queryByRole('heading', { level: 2, name: 'Cómo llegar' })).not.toBeInTheDocument()
  })
})
