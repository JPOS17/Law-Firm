import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { LocationMap } from '@/components/LocationMap'
import { site } from '@/content/site'

describe('LocationMap', () => {
  // The embedded map needs a title so screen reader users know what the frame is.
  it('embeds the map with a descriptive title', () => {
    render(<LocationMap />)

    const frame = screen.getByTitle('Mapa con la ubicación del despacho')
    expect(frame).toHaveAttribute('src', site.map.embedUrl)
  })

  // A plain link to the same place works when the embed doesn't load.
  it('offers a link to open the place in Google Maps', () => {
    render(<LocationMap />)

    const link = screen.getByRole('link', { name: /Ver en Google Maps/ })
    expect(link).toHaveAttribute('href', site.map.linkUrl)
    expect(link).toHaveAttribute('target', '_blank')
  })
})
