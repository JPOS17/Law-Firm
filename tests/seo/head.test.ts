import { describe, expect, it } from 'vitest'
import indexHtml from '../../index.html?raw'
import robots from '../../public/robots.txt?raw'
import sitemap from '../../public/sitemap.xml?raw'
import { posts } from '@/content/posts'
import { site } from '@/content/site'

// These files can't read src/content/site.ts, so they repeat the domain and the texts.
// These tests fail if someone changes one place and forgets the others.

function tag(html: string, attribute: 'property' | 'name', key: string) {
  const pattern = new RegExp(
    `<meta\\s+${attribute}="${key}"\\s+content="([^"]*)"|<meta\\s+content="([^"]*)"\\s+${attribute}="${key}"`,
    's',
  )
  const match = pattern.exec(html)
  return match?.[1] ?? match?.[2]
}

describe('index.html (link preview)', () => {
  it('uses the site domain for the page address and the share image', () => {
    expect(tag(indexHtml, 'property', 'og:url')).toBe(`${site.url}/`)
    expect(tag(indexHtml, 'property', 'og:image')).toBe(`${site.url}${site.shareImage.path}`)
  })

  it('describes the share image with its real size and alternative text', () => {
    expect(tag(indexHtml, 'property', 'og:image:width')).toBe(String(site.shareImage.width))
    expect(tag(indexHtml, 'property', 'og:image:height')).toBe(String(site.shareImage.height))
    expect(tag(indexHtml, 'property', 'og:image:alt')).toBe(site.shareImage.alt)
  })

  it('shares the firm name, tagline and description from site.ts', () => {
    expect(tag(indexHtml, 'property', 'og:site_name')).toBe(site.name)
    expect(tag(indexHtml, 'property', 'og:title')).toBe(`${site.name} | ${site.tagline}`)
    expect(tag(indexHtml, 'property', 'og:description')).toBe(site.description)
  })

  it('asks for a large image card and the Mexican Spanish locale', () => {
    expect(tag(indexHtml, 'name', 'twitter:card')).toBe('summary_large_image')
    expect(tag(indexHtml, 'property', 'og:locale')).toBe('es_MX')
    expect(indexHtml).toContain('<html lang="es-MX">')
  })

  // Two descriptions in one page confuse search engines, so only src/components/Seo.tsx sets it.
  it('leaves the description and canonical address to each page', () => {
    expect(indexHtml).not.toContain('name="description"')
    expect(indexHtml).not.toContain('rel="canonical"')
  })

  // The .ico works in every browser and is what Google reads for the icon in search results.
  it('links the favicon in both formats', () => {
    expect(indexHtml).toContain('rel="icon" href="/favicon.ico" sizes="48x48"')
    expect(indexHtml).toContain('rel="icon" type="image/svg+xml" href="/favicon.svg" sizes="any"')
  })

  it('links the touch icon', () => {
    expect(indexHtml).toContain('rel="apple-touch-icon" href="/apple-touch-icon.png"')
  })
})

describe('robots.txt', () => {
  it('allows crawling and points to the sitemap on the site domain', () => {
    expect(robots).toContain('User-agent: *')
    expect(robots).toContain('Allow: /')
    expect(robots).toContain(`Sitemap: ${site.url}/sitemap.xml`)
  })
})

describe('sitemap.xml', () => {
  const listed = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1])

  // Every page a visitor can reach from the menus or the footer, the home page, and every article.
  it('lists exactly the real pages of the site, on the site domain', () => {
    const expected = [
      `${site.url}/`,
      ...site.nav.map((item) => `${site.url}${item.to}`),
      ...site.footerNav.map((item) => `${site.url}${item.to}`),
      ...posts.map((post) => `${site.url}/publicaciones/${post.slug}`),
    ]

    expect([...listed].sort()).toEqual([...new Set(expected)].sort())
  })

  it('lists each address only once', () => {
    expect(new Set(listed).size).toBe(listed.length)
  })

  it('gives every article the date it was published', () => {
    for (const post of posts) {
      expect(sitemap).toContain(
        `<loc>${site.url}/publicaciones/${post.slug}</loc>\n    <lastmod>${post.date}</lastmod>`,
      )
    }
  })
})
