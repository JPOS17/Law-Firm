import { act, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, MemoryRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import { describe, expect, it } from 'vitest'
import { SiteHeader } from '@/components/SiteHeader'
import { site } from '@/content/site'

// Renders only the header, with a router that pretends the browser is at `path`.
function renderHeader(path = '/') {
  render(
    <MemoryRouter initialEntries={[path]}>
      <SiteHeader />
    </MemoryRouter>,
  )
  return userEvent.setup()
}

function menuButton() {
  return screen.getByRole('button', { name: 'Menú' })
}

describe('SiteHeader', () => {
  // Every entry in site.nav should appear in the navigation as a link
  // with the right label and address.
  it('renders a link for every navigation item', () => {
    renderHeader()

    const nav = screen.getByRole('navigation', { name: 'Principal' })
    for (const item of site.nav) {
      expect(within(nav).getByRole('link', { name: item.label })).toHaveAttribute('href', item.to)
    }
  })

  // The firm name acts as the link back to the home page.
  it('links the firm name to the home page', () => {
    renderHeader()

    expect(screen.getByRole('link', { name: site.name })).toHaveAttribute('href', '/')
  })

  // On /equipo, only the Equipo link should be marked as the current page.
  // "La Firma" is the control: a different page's link must NOT be marked.
  it('marks the current page', () => {
    renderHeader('/equipo')

    expect(screen.getByRole('link', { name: 'Equipo' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('link', { name: 'La Firma' })).not.toHaveAttribute('aria-current')
  })
})

describe('SiteHeader mobile menu', () => {
  // The menu starts closed. The button tells screen readers which element it controls
  // and whether that element is currently expanded.
  it('starts closed, with a button that controls the navigation', () => {
    renderHeader()

    const nav = screen.getByRole('navigation', { name: 'Principal' })
    expect(menuButton()).toHaveAttribute('aria-expanded', 'false')
    expect(menuButton()).toHaveAttribute('aria-controls', nav.id)
    expect(nav).not.toHaveClass('site-header__nav--open')
  })

  // The button opens the menu and closes it again.
  it('opens and closes with the button', async () => {
    const user = renderHeader()

    await user.click(menuButton())
    expect(menuButton()).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('navigation', { name: 'Principal' })).toHaveClass(
      'site-header__nav--open',
    )

    await user.click(menuButton())
    expect(menuButton()).toHaveAttribute('aria-expanded', 'false')
  })

  // Choosing a link closes the menu, even when it is the link for the page you are already on.
  it('closes when a link is chosen', async () => {
    const user = renderHeader('/equipo')

    await user.click(menuButton())
    await user.click(screen.getByRole('link', { name: 'Equipo' }))

    expect(menuButton()).toHaveAttribute('aria-expanded', 'false')
  })

  // Escape closes the menu and puts the keyboard focus back on the button.
  it('closes with the Escape key and returns focus to the button', async () => {
    const user = renderHeader()

    await user.click(menuButton())
    await user.tab()
    expect(screen.getByRole('link', { name: 'La Firma' })).toHaveFocus()

    await user.keyboard('{Escape}')

    expect(menuButton()).toHaveAttribute('aria-expanded', 'false')
    expect(menuButton()).toHaveFocus()
  })

  // Going to another page by any means (such as the browser's back button) closes the menu,
  // and coming back to the old page must not reopen it.
  it('closes when the page changes and stays closed when coming back', async () => {
    const router = createMemoryRouter([{ path: '*', element: <SiteHeader /> }], {
      initialEntries: ['/'],
    })
    render(<RouterProvider router={router} />)
    const user = userEvent.setup()

    await user.click(menuButton())
    expect(menuButton()).toHaveAttribute('aria-expanded', 'true')

    await act(async () => {
      await router.navigate('/equipo')
    })
    expect(menuButton()).toHaveAttribute('aria-expanded', 'false')

    await act(async () => {
      await router.navigate(-1)
    })
    expect(menuButton()).toHaveAttribute('aria-expanded', 'false')
  })
})
