import type { RouteObject } from 'react-router'
import { RootLayout } from '@/app/RootLayout'

import { ErrorPage } from '@/pages/ErrorPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

import { HomePage } from '@/pages/HomePage'
import { ServicesPage } from '@/pages/ServicesPage'
import { ContactPage } from '@/pages/ContactPage'
import { TeamPage } from '@/pages/TeamPage'
import { FirmPage } from '@/pages/FirmPage'
import { BlogPage } from '@/pages/BlogPage'
import { BlogPostPage } from '@/pages/BlogPostPage'
import { LinksPage } from '@/pages/LinksPage'
import { PrivacyPage } from '@/pages/PrivacyPage'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'la-firma', element: <FirmPage /> },
      { path: 'servicios', element: <ServicesPage /> },
      { path: 'equipo', element: <TeamPage /> },
      { path: 'blog', element: <BlogPage /> },
      { path: 'blog/:slug', element: <BlogPostPage /> },
      { path: 'contacto', element: <ContactPage /> },
      { path: 'enlaces', element: <LinksPage /> },
      { path: 'aviso-de-privacidad', element: <PrivacyPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]
