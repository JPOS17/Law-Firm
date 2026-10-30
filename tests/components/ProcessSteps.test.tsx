import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ProcessSteps } from '@/components/ProcessSteps'

const steps = [
  { title: 'Primero', description: 'Descripción uno' },
  { title: 'Segundo', description: 'Descripción dos' },
  { title: 'Tercero', description: 'Descripción tres' },
]

describe('ProcessSteps', () => {
  // The steps happen in order, so they must be a real ordered list, in the order given.
  it('renders the steps as an ordered list, in order', () => {
    render(<ProcessSteps steps={steps} />)

    const list = screen.getByRole('list')
    expect(list.tagName).toBe('OL')

    const titles = screen
      .getAllByRole('heading', { level: 3 })
      .map((heading) => heading.textContent)
    expect(titles).toEqual(['Primero', 'Segundo', 'Tercero'])
  })

  // Every step shows what happens in it.
  it('shows the description of every step', () => {
    render(<ProcessSteps steps={steps} />)

    for (const step of steps) {
      expect(screen.getByText(step.description)).toBeVisible()
    }
  })
})
