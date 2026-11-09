import { useEffect } from 'react'
import { Outlet, ScrollRestoration } from 'react-router'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { StructuredData } from '@/components/StructuredData'
import { heroImages } from '@/content/images'
import { preloadImageWhenIdle } from '@/lib/preloadImage'

export function RootLayout() {
  // Fetch the inner-page photo in the background so later navigations find it cached
  useEffect(() => {
    preloadImageWhenIdle(heroImages.inner)
  }, [])

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
