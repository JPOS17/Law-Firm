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
          {address.street}
          <br />
          {address.area}
          <br />
          {address.postalCode} {address.city}
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
