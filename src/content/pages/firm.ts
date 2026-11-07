import { site } from '@/content/site'

// Text of the firm page. The values themselves are in values.ts.
export const firmPage = {
  title: 'Nuestra Firma',
  // TODO: placeholder text, replace with real copy
  lead: 'Texto de marcador de posición para una breve descripción de lo que hace la firma.',
  about: {
    title: 'Quiénes somos',
    paragraphs: [
      // TODO: placeholder text, replace with real copy
      'Texto de marcador de posición para el primer párrafo sobre la historia y la trayectoria del despacho.',
      // TODO: placeholder text, replace with real copy
      'Texto de marcador de posición para el segundo párrafo sobre la forma de trabajar del despacho.',
    ],
  },
  values: { title: 'Nuestros valores' },
  callToAction: {
    title: '¿Desea conocernos mejor?',
    // TODO: placeholder text, replace with real copy
    text: 'Texto de marcador de posición para invitar al visitante a ponerse en contacto.',
    cta: site.contactCta,
  },
}
