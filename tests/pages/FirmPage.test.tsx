import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { values } from '@/content/values'
import { renderAt } from '../renderAt'

describe('FirmPage', () => {
  // The firm page has an "about" section.
  it('shows the about section', async () => {
    renderAt('/la-firma')

    expect(await screen.findByRole('heading', { level: 2, name: 'Quiénes somos' })).toBeVisible()
  })

  // The values appear as short pillar names, followed by one paragraph that explains them all.
  it('shows every value as a pillar, with one summary paragraph', async () => {
    renderAt('/la-firma')

    expect(await screen.findByRole('heading', { level: 2, name: 'Nuestros valores' })).toBeVisible()
    const region = screen.getByRole('region', { name: 'Nuestros valores' })
    const names = within(region)
      .getAllByRole('listitem')
      .map((item) => item.textContent)
    expect(names).toEqual(values.items)
    expect(within(region).getByText(values.summary)).toBeVisible()
  })

  // Each value does not get its own heading or description any more.
  it('does not give each value its own heading', async () => {
    renderAt('/la-firma')

    await screen.findByRole('heading', { level: 2, name: 'Nuestros valores' })
    for (const item of values.items) {
      expect(screen.queryByRole('heading', { name: item })).not.toBeInTheDocument()
    }
  })
})
