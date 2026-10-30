import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { IndexList } from '@/components/IndexList'

const items = [
  { label: 'Primero', to: '/pagina#primero' },
  { label: 'Segundo', to: '/pagina#segundo' },
]

describe('IndexList', () => {
  // Each name should be a link to its own address, and nothing else is shown.
  it('renders every name as a link to its address', () => {
    render(
      <MemoryRouter>
        <IndexList items={items} />
      </MemoryRouter>,
    )

    expect(screen.getAllByRole('listitem')).toHaveLength(items.length)
    for (const item of items) {
      expect(screen.getByRole('link', { name: item.label })).toHaveAttribute('href', item.to)
    }
  })
})
