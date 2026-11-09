import { waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { contactPage } from '@/content/pages/contact'
import { firmPage } from '@/content/pages/firm'
import { homePage } from '@/content/pages/home'
import { linksPage } from '@/content/pages/links'
import { privacyPage } from '@/content/pages/privacy'
import { publicationsPage } from '@/content/pages/publications'
import { servicesPage } from '@/content/pages/services'
import { teamPage } from '@/content/pages/team'
import { termsPage } from '@/content/pages/terms'
import { posts } from '@/content/posts'
import { site } from '@/content/site'
import { renderAt } from '../renderAt'

function metaContent(selector: string) {
  return document.head.querySelector(selector)?.getAttribute('content')
}

function canonicalHref() {
  return document.head.querySelector('link[rel="canonical"]')?.getAttribute('href')
}

const indexablePages = [
  ['/', homePage.seo],
  ['/la-firma', firmPage.seo],
  ['/servicios', servicesPage.seo],
  ['/equipo', teamPage.seo],
  ['/publicaciones', publicationsPage.seo],
  ['/contacto', contactPage.seo],
  ['/enlaces', linksPage.seo],
  ['/terminos-y-condiciones', termsPage.seo],
  ['/aviso-de-privacidad', privacyPage.seo],
] as const

describe('SEO in each page', () => {
  // Search engines show this text under the page title, so every page needs its own.
  it.each(indexablePages)('%s has its own description and canonical address', async (path, seo) => {
    renderAt(path)

    await waitFor(() => expect(metaContent('meta[name="description"]')).toBe(seo.description))
    expect(canonicalHref()).toBe(path === '/' ? `${site.url}/` : `${site.url}${path}`)
    expect(document.head.querySelector('meta[name="robots"]')).toBeNull()
  })

  // Descriptions beyond ~160 characters get cut off in search results, and very short ones
  // waste the space. Titles beyond ~60 characters get cut off too.
  it.each(indexablePages)('%s has a title and description of a good length', (_path, seo) => {
    expect(`${seo.title} | ${site.name}`.length).toBeLessThanOrEqual(65)
    expect(seo.description.length).toBeGreaterThanOrEqual(60)
    expect(seo.description.length).toBeLessThanOrEqual(160)
  })

  it('gives every page a different title and description', () => {
    const titles = indexablePages.map(([, seo]) => seo.title)
    const descriptions = indexablePages.map(([, seo]) => seo.description)

    expect(new Set(titles).size).toBe(titles.length)
    expect(new Set(descriptions).size).toBe(descriptions.length)
  })

  // The home page title leads with what people search for.
  it('names the city in the home page title', () => {
    expect(homePage.seo.title).toContain('Aguascalientes')
  })

  // An article uses its own excerpt as the description and its own address as canonical.
  it.each(posts)('uses the excerpt and address of the article $slug', async ({ slug, excerpt }) => {
    renderAt(`/publicaciones/${slug}`)

    await waitFor(() => expect(metaContent('meta[name="description"]')).toBe(excerpt))
    expect(canonicalHref()).toBe(`${site.url}/publicaciones/${slug}`)
  })

  // Pages that aren't real content must not appear in search results.
  it('keeps the not-found page out of search results', async () => {
    renderAt('/does-not-exist')

    await waitFor(() => expect(metaContent('meta[name="robots"]')).toBe('noindex'))
    expect(canonicalHref()).toBeUndefined()
  })

  it('keeps the not-found page for an unknown article out of search results', async () => {
    renderAt('/publicaciones/no-existe')

    await waitFor(() => expect(metaContent('meta[name="robots"]')).toBe('noindex'))
  })
})

describe('structured data', () => {
  // The business data for search engines must match what the site shows visitors.
  it('describes the firm as a local legal service', async () => {
    renderAt('/')

    await waitFor(() =>
      expect(document.querySelector('script[type="application/ld+json"]')).not.toBeNull(),
    )
    const script = document.querySelector('script[type="application/ld+json"]')
    const data = JSON.parse(script?.textContent ?? '{}') as Record<string, unknown>

    expect(data['@type']).toBe('LegalService')
    expect(data.name).toBe(site.name)
    expect(data.url).toBe(`${site.url}/`)
    expect(data.telephone).toBe('+524498040203')
    expect(data.email).toBe(site.email)
    expect(data.address).toMatchObject({
      '@type': 'PostalAddress',
      postalCode: site.address.postalCode,
      addressCountry: 'MX',
    })
    expect(data.areaServed).toEqual(site.areasServed.map((name) => ({ '@type': 'State', name })))
  })

  it('appears once, even after moving between pages', async () => {
    renderAt('/servicios')

    await waitFor(() =>
      expect(document.querySelectorAll('script[type="application/ld+json"]')).toHaveLength(1),
    )
  })
})
