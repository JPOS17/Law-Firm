import { describe, expect, it } from 'vitest'
import { posts } from '@/content/posts'
import { services } from '@/content/services'

// Pages build their links from these slugs (/servicios#slug, /blog/slug),
// so two entries with the same slug would silently point to the same place.
describe('content', () => {
  it('gives every service its own slug', () => {
    const slugs = services.map((service) => service.slug)

    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('gives every blog post its own slug', () => {
    const slugs = posts.map((post) => post.slug)

    expect(new Set(slugs).size).toBe(slugs.length)
  })

  // posts.ts asks for the newest post first, because the blog page shows them in that order.
  it('keeps the blog posts sorted from newest to oldest', () => {
    const dates = posts.map((post) => post.date)

    expect(dates).toEqual([...dates].sort().reverse())
  })
})
