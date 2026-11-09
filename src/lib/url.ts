import { site } from '@/content/site'

// Turns a path like "/servicios" into the full address search engines expect
// ("https://domain/servicios"). The home page keeps its slash; other paths never end in one,
// so "/servicios/" and "/servicios" count as the same page.
export function absoluteUrl(path: string) {
  const clean = path === '/' ? '/' : path.replace(/\/+$/, '')
  return `${site.url}${clean}`
}
