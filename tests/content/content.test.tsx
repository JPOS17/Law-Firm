import { describe, expect, it } from 'vitest'
import { links } from '@/content/links'
import { posts } from '@/content/posts'
import { services } from '@/content/services'

// Pages build their links from these slugs (/servicios#slug, /publicaciones/slug),
// so two entries with the same slug would silently point to the same place.
describe('content', () => {
  it('gives every service its own slug', () => {
    const slugs = services.map((service) => service.slug)

    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('gives every publication its own slug', () => {
    const slugs = posts.map((post) => post.slug)

    expect(new Set(slugs).size).toBe(slugs.length)
  })

  // Each link is used as the list key, so two entries with the same address would clash.
  // Links to other sites must also be secure (https).
  it('gives every external link its own secure address', () => {
    const urls = links.map((link) => link.url)

    expect(new Set(urls).size).toBe(urls.length)
    for (const url of urls) {
      expect(url).toMatch(/^https:\/\//)
    }
  })

  // posts.ts asks for the newest post first, because the publications page shows them in that order.
  it('keeps the publications sorted from newest to oldest', () => {
    const dates = posts.map((post) => post.date)

    expect(dates).toEqual([...dates].sort().reverse())
  })
})
