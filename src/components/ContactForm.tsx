import { useId, useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router'
import { FormField } from '@/components/FormField'
import { submitContactForm, validateContactForm } from '@/lib/contactForm'
import type { ContactErrors } from '@/lib/contactForm'

type Status = 'idle' | 'sending' | 'sent' | 'error'

// Form values can be text or files. This form only has text fields.
function getText(data: FormData, name: string) {
  const value = data.get(name)
  return typeof value === 'string' ? value : ''
}

export function ContactForm() {
  const [errors, setErrors] = useState<ContactErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const consentId = useId()
  const consentErrorId = `${consentId}-error`

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const values = {
      name: getText(data, 'name'),
      email: getText(data, 'email'),
      phone: getText(data, 'phone'),
      message: getText(data, 'message'),
      consent: data.get('consent') === 'on',
      website: getText(data, 'website'),
    }

    const found = validateContactForm(values)
    setErrors(found)
    setStatus('idle')

    const firstInvalid = Object.keys(found)[0]
    if (firstInvalid) {
      const field = form.elements.namedItem(firstInvalid)
      if (field instanceof HTMLElement) {
        field.focus()
      }
      return
    }

    setStatus('sending')
    try {
      await submitContactForm(values)
      form.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <form
      className="form"
      aria-label="Formulario de contacto"
      noValidate
      onSubmit={(event) => {
        void handleSubmit(event)
      }}
    >
      <p className="form__note">Los campos marcados con * son obligatorios.</p>

      <FormField label="Nombre" name="name" autoComplete="name" required error={errors.name} />
      <FormField
        label="Correo electrónico"
        name="email"
        type="email"
        autoComplete="email"
        required
        error={errors.email}
      />
      <FormField
        label="Teléfono (opcional)"
        name="phone"
        type="tel"
        autoComplete="tel"
        error={errors.phone}
      />
      <FormField label="Mensaje" name="message" as="textarea" required error={errors.message} />

      <div className="form-field">
        <div className="form-check">
          <input
            className="form-check__box"
            id={consentId}
            name="consent"
            type="checkbox"
            required
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? consentErrorId : undefined}
          />
          <label htmlFor={consentId}>
            He leído y acepto el{' '}
            <Link to="/aviso-de-privacidad" target="_blank" rel="noopener noreferrer">
              aviso de privacidad
              <span className="visually-hidden"> (se abre en una pestaña nueva)</span>
            </Link>
            . <span aria-hidden="true">*</span>
          </label>
        </div>
        {errors.consent && (
          <p id={consentErrorId} className="form-field__error">
            {errors.consent}
          </p>
        )}
      </div>

      {/* Honeypot: hidden from people and screen readers, but bots tend to fill it in. */}
      <div className="visually-hidden" aria-hidden="true">
        <label>
          Dejar en blanco
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <button className="form__submit" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Enviando…' : 'Enviar mensaje'}
      </button>

      <div role="status">
        {status === 'sent' && (
          <p className="form-message form-message--success">
            Gracias. Hemos recibido su mensaje y nos pondremos en contacto con usted.
          </p>
        )}
      </div>
      <div role="alert">
        {status === 'error' && (
          <p className="form-message form-message--error">
            No pudimos enviar su mensaje. Inténtelo de nuevo o escríbanos por WhatsApp.
          </p>
        )}
      </div>
    </form>
  )
}
