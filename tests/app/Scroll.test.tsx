import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { home } from '@/content/home'
import { renderAt } from '../renderAt'

describe('scrolling between pages', () => {
  // A new page should start at the top, not at the scroll position of the previous one.
  it('scrolls to the top when the visitor goes to another page', async () => {
    const scrollTo = vi.spyOn(window, 'scrollTo')
    renderAt('/')
    const user = userEvent.setup()
    await screen.findByRole('heading', { level: 1, name: home.hero.title })
    scrollTo.mockClear()

    await user.click(screen.getByRole('link', { name: 'Equipo' }))
    await screen.findByRole('heading', { level: 1, name: 'Nuestro Equipo' })

    expect(scrollTo).toHaveBeenCalledWith(0, 0)
  })
})
