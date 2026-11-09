import { site } from '@/content/site'

// Text of the services page. The list of practice areas is in ../services.ts.
export const servicesPage = {
  title: 'Nuestros Servicios',
  // What search engines show for this page.
  // TODO(client): confirm this search-result text
  seo: {
    title: 'Áreas de práctica legal',
    description:
      'Áreas de práctica de Delgado Gutiérrez Abogados en Aguascalientes: asesoría y planeación estratégica legal para cada tipo de asunto.',
  },
  // TODO: placeholder text, replace with real copy
  lead: 'Texto de marcador de posición para una breve descripción de lo que hace la firma.',
  practiceAreas: {
    title: 'Áreas de práctica',
    // TODO: placeholder text, replace with real copy
    intro: 'Texto de marcador de posición para introducir las áreas de práctica del despacho.',
  },
  callToAction: {
    title: '¿Tiene un asunto legal que atender?',
    // TODO: placeholder text, replace with real copy
    text: 'Texto de marcador de posición para invitar al visitante a ponerse en contacto.',
    cta: site.contactCta,
  },
}
