import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { attorneys } from '@/content/attorneys'
import { services } from '@/content/services'
import { values } from '@/content/values'
import { renderAt } from '../renderAt'

describe('HomePage', () => {
  // Every value from content/values.ts should appear as a card.
  it('shows every firm value', async () => {
    renderAt('/')

    for (const value of values) {
      expect(await screen.findByRole('heading', { level: 3, name: value.title })).toBeVisible()
    }
  })

  // The home page only previews the first three services, and links to the full list.
  it('previews the first three services and links to the services page', async () => {
    renderAt('/')

    for (const service of services.slice(0, 3)) {
      expect(await screen.findByRole('heading', { level: 3, name: service.title })).toBeVisible()
    }
    for (const service of services.slice(3)) {
      expect(screen.queryByRole('heading', { name: service.title })).not.toBeInTheDocument()
    }
    expect(screen.getByRole('link', { name: 'Ver todos los servicios' })).toHaveAttribute(
      'href',
      '/servicios',
    )
  })

  // The home page only previews the first three attorneys, and links to the full team.
  it('previews the first three attorneys and links to the team page', async () => {
    renderAt('/')

    for (const attorney of attorneys.slice(0, 3)) {
      expect(await screen.findByRole('heading', { level: 3, name: attorney.name })).toBeVisible()
    }
    for (const attorney of attorneys.slice(3)) {
      expect(screen.queryByRole('heading', { name: attorney.name })).not.toBeInTheDocument()
    }
    expect(screen.getByRole('link', { name: 'Conozca a todo el equipo' })).toHaveAttribute(
      'href',
      '/equipo',
    )
  })

  // The page ends with a call to action that leads to the contact page.
  it('ends with a call to action that leads to the contact page', async () => {
    renderAt('/')

    expect(await screen.findByRole('link', { name: 'Contáctenos' })).toHaveAttribute(
      'href',
      '/contacto',
    )
  })
})
