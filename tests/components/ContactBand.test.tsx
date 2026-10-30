import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { ContactBand } from '@/components/ContactBand'
import { site } from '@/content/site'

function renderBand() {
  render(
    <MemoryRouter>
      <ContactBand title="Título" text="Texto del mensaje" />
    </MemoryRouter>,
  )
}

describe('ContactBand', () => {
  // The band shows its message.
  it('shows the title and the text', () => {
    renderBand()

    expect(screen.getByRole('heading', { level: 2, name: 'Título' })).toBeVisible()
    expect(screen.getByText('Texto del mensaje')).toBeVisible()
  })

  // The visitor can call straight from here, without going to the contact page first.
  it('offers the phone number as a call link', () => {
    renderBand()

    expect(screen.getByRole('link', { name: new RegExp(site.phone.label) })).toHaveAttribute(
      'href',
      site.phone.href,
    )
  })

  // The visitor can open WhatsApp straight from here, in a new tab.
  it('offers WhatsApp in a new tab', () => {
    renderBand()

    const link = screen.getByRole('link', { name: /WhatsApp/ })
    expect(link).toHaveAttribute('href', site.whatsapp.href)
    expect(link).toHaveAttribute('target', '_blank')
  })

  // The contact page stays available for people who prefer to write a message.
  it('still links to the contact page', () => {
    renderBand()

    expect(screen.getByRole('link', { name: 'Enviar un mensaje' })).toHaveAttribute(
      'href',
      '/contacto',
    )
  })
})
