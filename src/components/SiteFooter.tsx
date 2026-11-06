import { Link } from 'react-router'
import { site } from '@/content/site'

export function SiteFooter() {
  const { address } = site

  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div>
          <p className="site-footer__name">{site.name}</p>
          <p>{site.tagline}</p>
        </div>
        <address className="site-footer__address">
          <a
            className="site-footer__link"
            href={site.map.linkUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {address.street}
            <br />
            {address.area}
            <br />
            {address.postalCode} {address.city}
            <span className="visually-hidden"> (abre Google Maps en una pestaña nueva)</span>
          </a>
        </address>
        <nav aria-label="Pie de página">
          <ul className="site-footer__list">
            {site.footerNav.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="site-footer__link">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="container site-footer__legal">
        <p>
          © {site.year} {site.name}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
