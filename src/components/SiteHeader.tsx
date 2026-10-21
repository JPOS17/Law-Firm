import { Link, NavLink } from 'react-router'
import { site } from '@/content/site'

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link to="/" className="site-header__brand">
          {site.name}
        </Link>
        <nav aria-label="Principal">
          <ul className="site-header__list">
            {site.nav.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className="site-header__link">
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
