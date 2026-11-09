import { Outlet, ScrollRestoration } from 'react-router'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { StructuredData } from '@/components/StructuredData'

export function RootLayout() {
  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <SiteHeader />
      <main id="contenido">
        <Outlet />
      </main>
      <SiteFooter />
      <StructuredData />
      <ScrollRestoration />
    </>
  )
}
