import { useLocation } from 'react-router'
import { site } from '@/content/site'
import { absoluteUrl } from '@/lib/url'

type SeoProps = {
  // The page's own name. The firm's name is added after it: "<title> | <firm name>".
  title: string
  // The summary search engines show under the title. Aim for 70 to 155 characters.
  description?: string
  // Keeps the page out of search results (error and not-found pages). Such pages get no
  // canonical address either.
  noindex?: boolean
}

// Sets everything search engines read from a page's <head>. React moves these tags into the
// <head> by itself. The tags that must exist before any JavaScript runs (the share preview for
// WhatsApp and social networks) are in index.html instead.
export function Seo({ title, description, noindex = false }: SeoProps) {
  const { pathname } = useLocation()

  return (
    <>
      <title>{`${title} | ${site.name}`}</title>
      {description && <meta name="description" content={description} />}
      {noindex ? (
        <meta name="robots" content="noindex" />
      ) : (
        <link rel="canonical" href={absoluteUrl(pathname)} />
      )}
    </>
  )
}
