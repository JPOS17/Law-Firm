import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { posts } from '@/content/posts'
import { renderAt } from '../renderAt'

describe('PublicationsPage', () => {
  // Each post shows a "read article" cue so it is clear the row can be opened.
  // The cue is only visual: the row must still have exactly one link (the title),
  // so screen reader users don't hear the same link twice.
  it('shows a read-article cue on every post, without adding a second link', async () => {
    renderAt('/publicaciones')

    const main = await screen.findByRole('main')
    const rows = within(main).getAllByRole('listitem')
    expect(rows).toHaveLength(posts.length)

    for (const row of rows) {
      expect(row).toHaveTextContent('Leer artículo')
      expect(within(row).getAllByRole('link')).toHaveLength(1)
    }
  })
})
