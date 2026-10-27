import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderAt } from '../renderAt'

describe('ContactPage', () => {
  // The page should offer the form, the contact details, and the map.
  it('shows the form, the contact details, and the map', async () => {
    renderAt('/contacto')

    expect(
      await screen.findByRole('heading', { level: 2, name: 'Envíenos un mensaje' }),
    ).toBeVisible()
    expect(screen.getByRole('form', { name: 'Formulario de contacto' })).toBeVisible()
    expect(screen.getByRole('heading', { level: 3, name: 'Datos de contacto' })).toBeVisible()
    expect(screen.getByRole('heading', { level: 2, name: 'Cómo llegar' })).toBeVisible()
    expect(screen.getByTitle('Mapa con la ubicación del despacho')).toBeInTheDocument()
  })
})
