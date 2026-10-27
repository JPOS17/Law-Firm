import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CardGrid } from '@/components/CardGrid'

const items = [
  { title: 'Primero', description: 'Descripción uno' },
  { title: 'Segundo', description: 'Descripción dos' },
]

describe('CardGrid', () => {
  // Each item should become one list entry with its title as an <h3> and its description.
  it('renders every item as a card with a heading and a description', () => {
    render(<CardGrid items={items} />)

    expect(screen.getAllByRole('listitem')).toHaveLength(items.length)
    for (const item of items) {
      expect(screen.getByRole('heading', { level: 3, name: item.title })).toBeVisible()
      expect(screen.getByText(item.description)).toBeVisible()
    }
  })
})
