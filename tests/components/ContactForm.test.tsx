import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { UserEvent } from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ContactForm } from '@/components/ContactForm'

const fetchMock = vi.fn<typeof fetch>()

function renderForm() {
  render(
    <MemoryRouter>
      <ContactForm />
    </MemoryRouter>,
  )
  return userEvent.setup()
}

async function fillValidForm(user: UserEvent) {
  await user.type(screen.getByLabelText(/^Nombre/), 'María Pérez')
  await user.type(screen.getByLabelText(/^Correo electrónico/), 'maria@example.com')
  await user.type(screen.getByLabelText(/^Mensaje/), 'Necesito una asesoría legal.')
  await user.click(screen.getByLabelText(/aviso de privacidad/))
}

describe('ContactForm', () => {
  beforeEach(() => {
    fetchMock.mockReset()
    vi.stubEnv('VITE_CONTACT_ENDPOINT', 'https://forms.test/contact')
    vi.stubGlobal('fetch', fetchMock)
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.unstubAllGlobals()
  })

  // Submitting an empty form should explain every problem and send nothing.
  it('explains every problem and sends nothing when the form is empty', async () => {
    const user = renderForm()

    await user.click(screen.getByRole('button', { name: 'Enviar mensaje' }))

    expect(screen.getByText('Escriba su nombre.')).toBeVisible()
    expect(screen.getByText('Escriba un correo electrónico válido.')).toBeVisible()
    expect(screen.getByText('Escriba un mensaje de al menos 10 caracteres.')).toBeVisible()
    expect(
      screen.getByText('Debe aceptar el aviso de privacidad para enviar el mensaje.'),
    ).toBeVisible()
    expect(fetchMock).not.toHaveBeenCalled()
  })

  // Keyboard and screen reader users should land on the first field that needs fixing.
  it('moves focus to the first field with a problem', async () => {
    const user = renderForm()

    await user.click(screen.getByRole('button', { name: 'Enviar mensaje' }))

    expect(screen.getByLabelText(/^Nombre/)).toHaveFocus()
  })

  // Each error message should be tied to its field so screen readers read it with the field.
  it('connects each error message to its field', async () => {
    const user = renderForm()

    await user.click(screen.getByRole('button', { name: 'Enviar mensaje' }))

    expect(screen.getByLabelText(/^Correo electrónico/)).toHaveAccessibleDescription(
      'Escriba un correo electrónico válido.',
    )
  })

  // A valid form should be sent, confirmed to the visitor, and cleared.
  it('sends a valid message, confirms it, and clears the form', async () => {
    fetchMock.mockResolvedValue(new Response(null, { status: 200 }))
    const user = renderForm()

    await fillValidForm(user)
    await user.click(screen.getByRole('button', { name: 'Enviar mensaje' }))

    expect(await screen.findByText(/Hemos recibido su mensaje/)).toBeVisible()
    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(screen.getByLabelText(/^Nombre/)).toHaveValue('')
  })

  // If sending fails, say so and keep what the visitor typed so they can try again.
  it('warns and keeps the typed text when sending fails', async () => {
    fetchMock.mockResolvedValue(new Response(null, { status: 500 }))
    const user = renderForm()

    await fillValidForm(user)
    await user.click(screen.getByRole('button', { name: 'Enviar mensaje' }))

    expect(await screen.findByText(/No pudimos enviar su mensaje/)).toBeVisible()
    expect(screen.getByLabelText(/^Nombre/)).toHaveValue('María Pérez')
  })

  // With no destination configured, the form must show the failure, not pretend it worked.
  it('warns when no destination is configured', async () => {
    vi.stubEnv('VITE_CONTACT_ENDPOINT', '')
    const user = renderForm()

    await fillValidForm(user)
    await user.click(screen.getByRole('button', { name: 'Enviar mensaje' }))

    expect(await screen.findByText(/No pudimos enviar su mensaje/)).toBeVisible()
  })

  // A bot that fills the hidden field gets a thank-you, but nothing is sent.
  it('sends nothing when the hidden field is filled in', async () => {
    fetchMock.mockResolvedValue(new Response(null, { status: 200 }))
    const user = renderForm()

    await fillValidForm(user)
    await user.type(screen.getByLabelText('Dejar en blanco'), 'spam')
    await user.click(screen.getByRole('button', { name: 'Enviar mensaje' }))

    expect(await screen.findByText(/Hemos recibido su mensaje/)).toBeVisible()
    expect(fetchMock).not.toHaveBeenCalled()
  })

  // The consent text links to the privacy notice and opens it in a new tab,
  // so the visitor doesn't lose what they typed.
  it('links to the privacy notice in a new tab', () => {
    renderForm()

    const link = screen.getByRole('link', { name: /aviso de privacidad/ })
    expect(link).toHaveAttribute('href', '/aviso-de-privacidad')
    expect(link).toHaveAttribute('target', '_blank')
  })
})
