import { site } from '@/content/site'

// Text of the team page. The list of attorneys is in ../attorneys.ts.
export const teamPage = {
  title: 'Nuestro Equipo',
  // What search engines show for this page.
  // TODO(client): confirm this search-result text
  seo: {
    title: 'Nuestro equipo de abogados',
    description:
      'Conozca al equipo de abogados de Delgado Gutiérrez Abogados, un despacho con sede en Aguascalientes.',
  },
  // TODO: placeholder text, replace with real copy
  lead: 'Texto de marcador de posición para una breve descripción de lo que hace la firma.',
  attorneys: {
    title: 'Nuestros abogados',
    // TODO: placeholder text, replace with real copy
    intro: 'Texto de marcador de posición para introducir al equipo de abogados.',
  },
  callToAction: {
    title: '¿Desea hablar con nosotros?',
    // TODO: placeholder text, replace with real copy
    text: 'Texto de marcador de posición para invitar al visitante a ponerse en contacto.',
    cta: site.contactCta,
  },
}
