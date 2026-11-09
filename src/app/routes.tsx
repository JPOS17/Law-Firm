import type { RouteObject } from 'react-router'
import { RootLayout } from '@/app/RootLayout'
import { heroImages } from '@/content/images'
import { preloadImage } from '@/lib/preloadImage'

import { ErrorPage } from '@/pages/ErrorPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

import { HomePage } from '@/pages/HomePage'
import { ServicesPage } from '@/pages/ServicesPage'
import { ContactPage } from '@/pages/ContactPage'
import { TeamPage } from '@/pages/TeamPage'
import { FirmPage } from '@/pages/FirmPage'
import { PublicationsPage } from '@/pages/PublicationsPage'
import { PublicationPage } from '@/pages/PublicationPage'
import { LinksPage } from '@/pages/LinksPage'
import { TermsPage } from '@/pages/TermsPage'
import { PrivacyPage } from '@/pages/PrivacyPage'

// React Router waits for a route's loader before showing the page, so the photo is
// downloaded and decoded first and appears together with the text, not a moment after.
const loadHomeImage = async () => {
  await preloadImage(heroImages.home)
  return null
}
const loadInnerImage = async () => {
  await preloadImage(heroImages.inner)
  return null
}

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    // Shown while the first page's loader runs on a hard refresh
    HydrateFallback: () => null,
    children: [
      { index: true, element: <HomePage />, loader: loadHomeImage },
      { path: 'la-firma', element: <FirmPage />, loader: loadInnerImage },
      { path: 'servicios', element: <ServicesPage />, loader: loadInnerImage },
      { path: 'equipo', element: <TeamPage />, loader: loadInnerImage },
      { path: 'publicaciones', element: <PublicationsPage />, loader: loadInnerImage },
      { path: 'publicaciones/:slug', element: <PublicationPage /> },
      { path: 'contacto', element: <ContactPage />, loader: loadInnerImage },
      { path: 'enlaces', element: <LinksPage />, loader: loadInnerImage },
      { path: 'terminos-y-condiciones', element: <TermsPage /> },
      { path: 'aviso-de-privacidad', element: <PrivacyPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]
