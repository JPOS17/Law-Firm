import { site } from '@/content/site'

// Tells search engines, in a format they read directly, that this is a law firm, where it is,
// and where it works. This is what lets Google show the firm in local results and in the
// business panel. It must always match the Google Business Profile exactly.
const data = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  '@id': `${site.url}/#despacho`,
  name: site.name,
  description: site.description,
  url: `${site.url}/`,
  image: `${site.url}${site.shareImage.path}`,
  // TODO(client): add "logo" when the real logo arrives, and "openingHoursSpecification"
  // once the office hours are confirmed. Also add "sameAs" with the Google Business Profile
  // and social network addresses.
  telephone: site.phone.href.replace('tel:', ''),
  email: site.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: `${site.address.street}, ${site.address.area}`,
    addressLocality: 'Aguascalientes',
    addressRegion: 'Aguascalientes',
    postalCode: site.address.postalCode,
    addressCountry: 'MX',
  },
  areaServed: site.areasServed.map((name) => ({ '@type': 'State', name })),
}

export function StructuredData() {
  // "<" is escaped so the text can never close the script tag early.
  const json = JSON.stringify(data).replace(/</g, '\\u003c')

  return <script type="application/ld+json">{json}</script>
}
