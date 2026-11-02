import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Pillars } from '@/components/Pillars'

const items = ['Primero', 'Segundo', 'Tercero']

describe('Pillars', () => {
  // Each pillar is a short name in a list, in the order given.
  it('lists every pillar by name, in order', () => {
    render(<Pillars items={items} summary="Resumen de todos" />)

    const names = screen.getAllByRole('listitem').map((item) => item.textContent)
    expect(names).toEqual(items)
  })

  // One paragraph explains all the pillars together, instead of one description each.
  it('shows a single summary paragraph for all the pillars', () => {
    render(<Pillars items={items} summary="Resumen de todos" />)

    expect(screen.getByText('Resumen de todos')).toBeVisible()
    expect(screen.getAllByRole('paragraph')).toHaveLength(1)
  })
})
