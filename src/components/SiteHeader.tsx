import { useEffect, useId, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { site } from '@/content/site'

export function SiteHeader() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [lastPath, setLastPath] = useState(pathname)
  const menuId = useId()
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Close the menu whenever the visitor lands on another page, including with the
  // browser's back and forward buttons.
  if (lastPath !== pathname) {
    setLastPath(pathname)
    setOpen(false)
  }

  // While the menu is open, the Escape key closes it and puts the focus back on the button.
  useEffect(() => {
    if (!open) {
      return
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link to="/" className="site-header__brand">
          {site.name}
        </Link>
        <button
          ref={buttonRef}
          type="button"
          className="site-header__toggle"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => {
            setOpen(!open)
          }}
        >
          <svg
            className="site-header__toggle-icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M3 6h18M3 12h18M3 18h18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          Menú
        </button>
        <nav
          id={menuId}
          className={open ? 'site-header__nav site-header__nav--open' : 'site-header__nav'}
          aria-label="Principal"
        >
          <ul className="site-header__list">
            {site.nav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className="site-header__link"
                  onClick={() => {
                    setOpen(false)
                  }}
                >
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
