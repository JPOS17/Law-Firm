import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ContactDetails } from '@/components/ContactDetails'
import { site } from '@/content/site'

describe('ContactDetails', () => {
  // The phone and email should be links that open the phone app and the mail app.
  it('links the phone number and the email address', () => {
    render(<ContactDetails />)

    expect(screen.getByRole('link', { name: site.phone.label })).toHaveAttribute(
      'href',
      site.phone.href,
    )
    expect(screen.getByRole('link', { name: site.email })).toHaveAttribute(
      'href',
      `mailto:${site.email}`,
    )
  })

  // The WhatsApp link should open the chat in a new tab, safely.
  it('links to WhatsApp in a new tab', () => {
    render(<ContactDetails />)

    const link = screen.getByRole('link', { name: /WhatsApp/ })
    expect(link).toHaveAttribute('href', site.whatsapp.href)
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'))
  })

  // The address and the office hours should be shown.
  it('shows the address and the office hours', () => {
    render(<ContactDetails />)

    expect(screen.getByText(site.address.street, { exact: false })).toBeVisible()
    expect(screen.getByText(site.hours)).toBeVisible()
  })
})
