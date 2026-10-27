import { site } from '@/content/site'

export function WhatsAppLink() {
  return (
    <a
      className="whatsapp-link"
      href={site.whatsapp.href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {/* A simple chat-bubble icon. Swap in WhatsApp's official logo file when the brand assets are at hand. */}
      <svg className="whatsapp-link__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M4 3h16a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H9l-5 4v-4H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
      </svg>
      Escríbanos por WhatsApp
      <span className="visually-hidden"> (se abre en una pestaña nueva)</span>
    </a>
  )
}
