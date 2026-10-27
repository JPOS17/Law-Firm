export type ContactValues = {
  name: string
  email: string
  phone: string
  message: string
  consent: boolean
  // Hidden "honeypot" field: people never see it, but bots tend to fill it in.
  website: string
}

export type ContactErrors = Partial<
  Record<'name' | 'email' | 'phone' | 'message' | 'consent', string>
>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_PATTERN = /^[\d\s()+-]{8,20}$/

// The order of the keys matches the order of the fields on the page, so the first
// key is the first field with a problem.
export function validateContactForm(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {}

  if (values.name.trim().length < 2) {
    errors.name = 'Escriba su nombre.'
  }
  if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'Escriba un correo electrónico válido.'
  }
  if (values.phone.trim() !== '' && !PHONE_PATTERN.test(values.phone.trim())) {
    errors.phone = 'Escriba un teléfono válido, solo con números.'
  }
  if (values.message.trim().length < 10) {
    errors.message = 'Escriba un mensaje de al menos 10 caracteres.'
  }
  if (!values.consent) {
    errors.consent = 'Debe aceptar el aviso de privacidad para enviar el mensaje.'
  }

  return errors
}

// This is the ONLY place that knows where messages go. When the hosting and the form
// service are chosen, adjust the URL (VITE_CONTACT_ENDPOINT) and, if the service needs
// it, the headers or the shape of the body below.
export async function submitContactForm(values: ContactValues): Promise<void> {
  // A filled-in honeypot means a bot. Report success so it moves on, but send nothing.
  if (values.website !== '') {
    return
  }

  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT
  if (!endpoint) {
    throw new Error('VITE_CONTACT_ENDPOINT is not set')
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      message: values.message.trim(),
    }),
  })

  if (!response.ok) {
    throw new Error(`The contact form request failed with status ${response.status}`)
  }
}
