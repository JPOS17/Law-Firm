import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { DetailList } from '@/components/DetailList'

const items = [
  { id: 'primero', title: 'Primero', description: 'Descripción uno' },
  { title: 'Segundo', description: 'Descripción dos' },
]

describe('DetailList', () => {
  // Each item is one list entry with its title as an <h3> and its description.
  it('renders every item with a heading and a description', () => {
    render(<DetailList items={items} />)

    expect(screen.getAllByRole('listitem')).toHaveLength(items.length)
    for (const item of items) {
      expect(screen.getByRole('heading', { level: 3, name: item.title })).toBeVisible()
      expect(screen.getByText(item.description)).toBeVisible()
    }
  })

  // An optional id on the heading lets other pages link straight to that item.
  it('puts the optional id on the heading so it can be linked to', () => {
    render(<DetailList items={items} />)

    expect(screen.getByRole('heading', { name: 'Primero' })).toHaveAttribute('id', 'primero')
    expect(screen.getByRole('heading', { name: 'Segundo' })).not.toHaveAttribute('id')
  })
})
