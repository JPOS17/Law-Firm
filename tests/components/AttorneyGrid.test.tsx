import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { AttorneyGrid } from '@/components/AttorneyGrid'

const attorney = {
  name: 'María Pérez',
  role: 'Socia',
  bio: 'Biografía de ejemplo',
}

describe('AttorneyGrid', () => {
  // Each attorney should show their name as an <h3>, plus their role and bio.
  it('shows the name, role, and bio of every attorney', () => {
    render(<AttorneyGrid attorneys={[attorney]} />)

    expect(screen.getByRole('heading', { level: 3, name: 'María Pérez' })).toBeVisible()
    expect(screen.getByText('Socia')).toBeVisible()
    expect(screen.getByText('Biografía de ejemplo')).toBeVisible()
  })

  // A photo is optional. When there is one, it needs a descriptive alt text.
  it('shows the photo with a descriptive alt text when there is one', () => {
    render(<AttorneyGrid attorneys={[{ ...attorney, photo: '/maria.jpg' }]} />)

    const photo = screen.getByRole('img', { name: 'Retrato de María Pérez' })
    expect(photo).toHaveAttribute('src', '/maria.jpg')
  })

  // Without a photo, no image is rendered: the initial placeholder is hidden from screen readers.
  it('shows no image when there is no photo', () => {
    render(<AttorneyGrid attorneys={[attorney]} />)

    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })
})
