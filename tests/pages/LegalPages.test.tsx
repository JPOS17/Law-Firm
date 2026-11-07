import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderAt } from '../renderAt'

describe('legal pages', () => {
  // The footer links to both pages, so each address must show a real page, not "not found".
  it.each([
    ['/terminos-y-condiciones', 'Términos y condiciones'],
    ['/aviso-de-privacidad', 'Aviso de privacidad'],
  ])('shows %s with its own heading', async (path, heading) => {
    renderAt(path)

    expect(await screen.findByRole('heading', { level: 1, name: heading })).toBeVisible()
  })
})
