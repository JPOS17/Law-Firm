import { useId } from 'react'

type FormFieldProps = {
  label: string
  name: string
  type?: 'text' | 'email' | 'tel'
  as?: 'input' | 'textarea'
  required?: boolean
  autoComplete?: string
  error?: string
}

export function FormField({
  label,
  name,
  type = 'text',
  as = 'input',
  required = false,
  autoComplete,
  error,
}: FormFieldProps) {
  const id = useId()
  const errorId = `${id}-error`
  const controlProps = {
    id,
    name,
    required,
    autoComplete,
    className: 'form-field__control',
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? errorId : undefined,
  }

  return (
    <div className="form-field">
      <label className="form-field__label" htmlFor={id}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      {as === 'textarea' ? (
        <textarea {...controlProps} rows={6} />
      ) : (
        <input {...controlProps} type={type} />
      )}
      {error && (
        <p id={errorId} className="form-field__error">
          {error}
        </p>
      )}
    </div>
  )
}
