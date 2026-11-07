import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { OfficeStrip } from '@/components/OfficeStrip'
import { site } from '@/content/site'

describe('OfficeStrip', () => {
  // The strip under the home hero gives the practical details: where, when and how to call.
  it('shows the address, the opening hours and the phone number', () => {
    render(<OfficeStrip />)

    const strip = screen.getByRole('region', { name: 'Datos del despacho' })
    expect(strip).toHaveTextContent(site.address.street)
    expect(strip).toHaveTextContent(site.address.area)
    expect(strip).toHaveTextContent(site.hours)
  })

  // The phone number should be a link that starts a call on a phone.
  it('links the phone number so it can be called', () => {
    render(<OfficeStrip />)

    expect(screen.getByRole('link', { name: site.phone.label })).toHaveAttribute(
      'href',
      site.phone.href,
    )
  })
})
