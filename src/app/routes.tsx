import type { RouteObject } from 'react-router'
import { RootLayout } from '@/app/RootLayout'

import { ErrorPage } from '@/pages/ErrorPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

import { HomePage } from '@/pages/HomePage'
import { ServicesPage } from '@/pages/ServicesPage'
import { ContactPage } from '@/pages/ContactPage'
import { TeamPage } from '@/pages/TeamPage'
import { FirmPage } from '@/pages/FirmPage'

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
      { path: 'contacto', element: <ContactPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]
