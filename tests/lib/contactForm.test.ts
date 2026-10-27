import { afterEach, describe, expect, it, vi } from 'vitest'
import { submitContactForm, validateContactForm } from '@/lib/contactForm'
import type { ContactValues } from '@/lib/contactForm'

const valid: ContactValues = {
  name: 'María Pérez',
  email: 'maria@example.com',
  phone: '449 123 4567',
  message: 'Necesito una asesoría legal.',
  consent: true,
  website: '',
}

describe('validateContactForm', () => {
  // A complete form should produce no errors.
  it('accepts a complete, valid form', () => {
    expect(validateContactForm(valid)).toEqual({})
  })

  // The phone number is optional, so leaving it empty is fine.
  it('accepts an empty phone number', () => {
    expect(validateContactForm({ ...valid, phone: '' })).toEqual({})
  })

  // Each rule should flag exactly its own field and nothing else.
  const cases: [string, Partial<ContactValues>][] = [
    ['name', { name: '  ' }],
    ['email', { email: 'no-es-un-correo' }],
    ['phone', { phone: 'abc' }],
    ['message', { message: 'corto' }],
    ['consent', { consent: false }],
  ]
  it.each(cases)('flags only the %s field when it is invalid', (field, change) => {
    const errors = validateContactForm({ ...valid, ...change })

    expect(Object.keys(errors)).toEqual([field])
  })

  // The form moves focus to the first key, so the order must match the page.
  it('lists problems in the same order as the fields on the page', () => {
    const errors = validateContactForm({
      ...valid,
      name: '',
      email: '',
      message: '',
      consent: false,
    })

    expect(Object.keys(errors)).toEqual(['name', 'email', 'message', 'consent'])
  })
})

describe('submitContactForm', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
    vi.unstubAllGlobals()
  })

  // The message should be sent as JSON to the configured address, with the text trimmed
  // and without the consent flag or the hidden field.
  it('posts the message as JSON to the configured address', async () => {
    vi.stubEnv('VITE_CONTACT_ENDPOINT', 'https://forms.test/contact')
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(new Response(null, { status: 200 }))
    vi.stubGlobal('fetch', fetchMock)

    await submitContactForm({ ...valid, name: '  María Pérez  ' })

    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(fetchMock).toHaveBeenCalledWith(
      'https://forms.test/contact',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          name: 'María Pérez',
          email: valid.email,
          phone: valid.phone,
          message: valid.message,
        }),
      }),
    )
  })

  // A filled-in hidden field means a bot: report success but send nothing.
  it('sends nothing when the hidden field is filled in', async () => {
    vi.stubEnv('VITE_CONTACT_ENDPOINT', 'https://forms.test/contact')
    const fetchMock = vi.fn<typeof fetch>()
    vi.stubGlobal('fetch', fetchMock)

    await submitContactForm({ ...valid, website: 'spam' })

    expect(fetchMock).not.toHaveBeenCalled()
  })

  // Without a destination there is nowhere to send the message, so it must fail loudly.
  it('fails when no address is configured', async () => {
    vi.stubEnv('VITE_CONTACT_ENDPOINT', '')

    await expect(submitContactForm(valid)).rejects.toThrow('VITE_CONTACT_ENDPOINT')
  })

  // If the service answers with an error, the form must not pretend it worked.
  it('fails when the service answers with an error', async () => {
    vi.stubEnv('VITE_CONTACT_ENDPOINT', 'https://forms.test/contact')
    vi.stubGlobal(
      'fetch',
      vi.fn<typeof fetch>().mockResolvedValue(new Response(null, { status: 500 })),
    )

    await expect(submitContactForm(valid)).rejects.toThrow('500')
  })
})
