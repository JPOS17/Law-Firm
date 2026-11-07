import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { links } from '@/content/links'
import { site } from '@/content/site'
import { renderAt } from '../renderAt'

describe('LinksPage', () => {
  // The page has its own heading and lists every external link.
  it('lists every external link', async () => {
    renderAt('/enlaces')

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Enlaces de interés' }),
    ).toBeVisible()
    for (const link of links) {
      expect(screen.getByRole('link', { name: new RegExp(link.title) })).toHaveAttribute(
        'href',
        link.url,
      )
    }
  })

  // Visitors reach the page from the footer.
  it('is linked from the footer', async () => {
    renderAt('/')

    const nav = await screen.findByRole('navigation', { name: 'Pie de página' })
    const item = site.footerNav.find((entry) => entry.to === '/enlaces')
    expect(item).toBeDefined()
    expect(nav).toHaveTextContent(item?.label ?? '')
  })
})
