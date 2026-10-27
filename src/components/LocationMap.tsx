import { site } from '@/content/site'

export function LocationMap() {
  return (
    <div className="location-map">
      <iframe
        className="location-map__frame"
        title="Mapa con la ubicación del despacho"
        src={site.map.embedUrl}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <a href={site.map.linkUrl} target="_blank" rel="noopener noreferrer">
        Ver en Google Maps
        <span className="visually-hidden"> (se abre en una pestaña nueva)</span>
      </a>
    </div>
  )
}
