import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { FormField } from '@/components/FormField'

describe('FormField', () => {
  // The label must be connected to the input so clicking it, or a screen reader, finds the field.
  it('connects the label to the field and marks required fields', () => {
    render(<FormField label="Nombre" name="name" required />)

    const input = screen.getByLabelText(/^Nombre/)
    expect(input).toBeRequired()
    expect(input).not.toHaveAttribute('aria-invalid')
  })

  // An error should be flagged on the field and read out as its description.
  it('flags the field and describes it with the error message', () => {
    render(<FormField label="Nombre" name="name" error="Falta el nombre" />)

    const input = screen.getByLabelText('Nombre')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveAccessibleDescription('Falta el nombre')
  })

  // The same component renders a multi-line field when asked.
  it('renders a multi-line field when asked', () => {
    render(<FormField label="Mensaje" name="message" as="textarea" />)

    expect(screen.getByRole('textbox', { name: 'Mensaje' })).toBeInstanceOf(HTMLTextAreaElement)
  })
})
