import { site } from '@/content/site'

// Text of the home page. The practice area names come from services.ts.
export const homePage = {
  // What search engines show for this page (the page heading is hero.title).
  // The title leads with what people type into Google; the firm's name is added after it.
  // TODO(client): confirm this search-result text
  seo: {
    title: 'Abogados en Aguascalientes',
    description: site.description,
  },
  hero: {
    eyebrow: 'Abogados en Aguascalientes',
    // TODO(client): confirm the headline
    title: 'Asesoría legal con estrategia y compromiso',
    // TODO(client): confirm the subheading below the headline
    lead: 'Planeación estratégica, comunicación clara y seguimiento puntual de cada asunto.',
    cta: site.contactCta,
  },
  // TODO(client): confirm who the firm serves (people, companies, or both)
  intro:
    'Somos un despacho de abogados con sede en Aguascalientes, dedicado a la asesoría y la planeación estratégica legal. Atendemos asuntos en Aguascalientes, Guanajuato y Jalisco. Acompañamos a nuestros clientes con experiencia, transparencia y comunicación constante, y damos seguimiento puntual a cada asunto.',
  // TODO(client): confirm the wording of the practice areas section
  services: {
    title: 'Áreas de práctica',
    intro: 'Elija un área para conocer cómo podemos ayudarle.',
  },
  // TODO(client): confirm the section title and intro (the steps have their own note below)
  process: {
    title: 'Cómo trabajamos',
    intro: 'Un camino claro, desde la primera conversación hasta la conclusión del asunto.',
    // TODO(client): confirm the steps and their wording
    steps: [
      {
        title: 'Consulta inicial',
        description:
          'Escuchamos su situación, resolvemos sus dudas y definimos juntos el alcance del asunto.',
      },
      {
        title: 'Estrategia',
        description:
          'Analizamos las opciones legales y le proponemos un plan claro, con información clara sobre alcance, tiempos y honorarios.',
      },
      {
        title: 'Ejecución',
        description:
          'Llevamos a cabo el plan con eficacia y celeridad, cuidando cada detalle del proceso.',
      },
      {
        title: 'Seguimiento',
        description:
          'Le mantenemos informado de cada avance y damos seguimiento puntual hasta concluir el asunto.',
      },
    ],
  },
  // TODO(client): confirm the wording of the closing contact section
  contact: {
    title: '¿Desea conocer cómo podemos ayudarle?',
    text: 'Llámenos o escríbanos por WhatsApp y le atenderemos con gusto.',
  },
}
