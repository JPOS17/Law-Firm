import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { values } from '@/content/values'
import { renderAt } from '../renderAt'

describe('FirmPage', () => {
  // The firm page has an "about" section and shows every value from content/values.ts.
  it('shows the about section and every firm value', async () => {
    renderAt('/la-firma')

    expect(await screen.findByRole('heading', { level: 2, name: 'Quiénes somos' })).toBeVisible()
    for (const value of values) {
      expect(screen.getByRole('heading', { level: 3, name: value.title })).toBeVisible()
    }
  })
})
