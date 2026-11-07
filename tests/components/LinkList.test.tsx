import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { LinkList } from '@/components/LinkList'

const items = [
  { title: 'Sitio uno', url: 'https://example.com/uno', description: 'Descripción uno.' },
  { title: 'Sitio dos', url: 'https://example.com/dos', description: 'Descripción dos.' },
]

describe('LinkList', () => {
  // Every item is a link to its own address, with its description under it.
  it('shows a link and a description for every item', () => {
    render(<LinkList items={items} />)

    for (const item of items) {
      expect(screen.getByRole('link', { name: new RegExp(item.title) })).toHaveAttribute(
        'href',
        item.url,
      )
      expect(screen.getByText(item.description)).toBeVisible()
    }
    expect(screen.getAllByRole('listitem')).toHaveLength(items.length)
  })

  // These links leave the firm's site: they open in a new tab, safely, and say so
  // to screen reader users.
  it('opens every link in a new tab, safely, and announces it', () => {
    render(<LinkList items={items} />)

    for (const link of screen.getAllByRole('link')) {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'))
      expect(link).toHaveTextContent('se abre en una pestaña nueva')
    }
  })
})
