import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, MemoryRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import { describe, expect, it } from 'vitest'
import { Accordion } from '@/components/Accordion'

const items = [
  { id: 'uno', title: 'Primero', description: 'Descripción uno' },
  { id: 'dos', title: 'Segundo', description: 'Descripción dos' },
  { id: 'tres', title: 'Tercero', description: 'Descripción tres' },
]

// Renders the list with a router that pretends the browser is at `path`.
function renderAccordion(path = '/') {
  render(
    <MemoryRouter initialEntries={[path]}>
      <Accordion items={items} />
    </MemoryRouter>,
  )
  return userEvent.setup({ delay: null })
}

function button(name: string) {
  return screen.getByRole('button', { name })
}

describe('Accordion', () => {
  // Each item is a heading that holds a button, and everything starts closed.
  it('shows every item as a heading with a button, all closed at first', () => {
    renderAccordion()

    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(items.length)
    for (const item of items) {
      expect(button(item.title)).toHaveAttribute('aria-expanded', 'false')
      expect(document.getElementById(`${item.id}-panel`)).toHaveAttribute('inert')
    }
  })

  // Clicking a name opens its description, and clicking again closes it.
  it('opens an item when its button is clicked and closes it on a second click', async () => {
    const user = renderAccordion()

    await user.click(button('Primero'))
    expect(button('Primero')).toHaveAttribute('aria-expanded', 'true')
    expect(document.getElementById('uno-panel')).not.toHaveAttribute('inert')

    await user.click(button('Primero'))
    expect(button('Primero')).toHaveAttribute('aria-expanded', 'false')
    expect(document.getElementById('uno-panel')).toHaveAttribute('inert')
  })

  // Opening one item doesn't close the others.
  it('opens and closes items independently', async () => {
    const user = renderAccordion()

    await user.click(button('Primero'))
    await user.click(button('Tercero'))
    expect(button('Primero')).toHaveAttribute('aria-expanded', 'true')
    expect(button('Segundo')).toHaveAttribute('aria-expanded', 'false')
    expect(button('Tercero')).toHaveAttribute('aria-expanded', 'true')

    await user.click(button('Primero'))
    expect(button('Primero')).toHaveAttribute('aria-expanded', 'false')
    expect(button('Tercero')).toHaveAttribute('aria-expanded', 'true')
  })

  // Screen readers need to know which panel a button controls, and what the panel is called.
  it('connects each button to its panel and names the panel after the item', () => {
    renderAccordion()

    for (const item of items) {
      const panel = document.getElementById(`${item.id}-panel`)
      expect(button(item.title)).toHaveAttribute('aria-controls', `${item.id}-panel`)
      expect(panel).toHaveAttribute('role', 'region')
      expect(panel).toHaveAttribute('aria-labelledby', item.id)
    }
  })

  // Enter and Space both work, so keyboard users can open and close items.
  it('works from the keyboard', async () => {
    const user = renderAccordion()

    await user.tab()
    expect(button('Primero')).toHaveFocus()

    await user.keyboard('{Enter}')
    expect(button('Primero')).toHaveAttribute('aria-expanded', 'true')

    await user.keyboard(' ')
    expect(button('Primero')).toHaveAttribute('aria-expanded', 'false')
  })

  // A link that points at an item (such as /servicios#dos) lands with that item already open.
  it('opens the item named in the address', () => {
    renderAccordion('/#dos')

    expect(button('Primero')).toHaveAttribute('aria-expanded', 'false')
    expect(button('Segundo')).toHaveAttribute('aria-expanded', 'true')
    expect(button('Tercero')).toHaveAttribute('aria-expanded', 'false')
  })

  // An address that matches nothing changes nothing.
  it('ignores an address that matches no item', () => {
    renderAccordion('/#no-existe')

    for (const item of items) {
      expect(button(item.title)).toHaveAttribute('aria-expanded', 'false')
    }
  })

  // Following a link to another item while already on the page opens that item too.
  it('opens an item when the address changes to point at it', async () => {
    const router = createMemoryRouter([{ path: '*', element: <Accordion items={items} /> }], {
      initialEntries: ['/'],
    })
    render(<RouterProvider router={router} />)

    await act(async () => {
      await router.navigate('/#tres')
    })
    expect(button('Tercero')).toHaveAttribute('aria-expanded', 'true')
    expect(button('Primero')).toHaveAttribute('aria-expanded', 'false')

    await act(async () => {
      await router.navigate('/#uno')
    })
    expect(button('Primero')).toHaveAttribute('aria-expanded', 'true')
    expect(button('Tercero')).toHaveAttribute('aria-expanded', 'true')
  })
})
