import { site } from '@/content/site'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <p>
          © {site.year} {site.name}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
