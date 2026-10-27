import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { CallToAction } from '@/components/CallToAction'

describe('CallToAction', () => {
  // The band should show its message and a link to the given page.
  it('shows the title, the text, and a link to the given address', () => {
    render(
      <MemoryRouter>
        <CallToAction
          title="Título"
          text="Texto del mensaje"
          cta={{ label: 'Acción', to: '/destino' }}
        />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { level: 2, name: 'Título' })).toBeVisible()
    expect(screen.getByText('Texto del mensaje')).toBeVisible()
    expect(screen.getByRole('link', { name: 'Acción' })).toHaveAttribute('href', '/destino')
  })
})
