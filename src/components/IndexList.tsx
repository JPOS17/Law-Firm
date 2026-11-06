import { Link } from 'react-router'

type IndexItem = {
  label: string
  to: string
  description?: string
}

type IndexListProps = {
  items: IndexItem[]
}

export function IndexList({ items }: IndexListProps) {
  return (
    <ul className="index-list">
      {items.map((item) => (
        <li key={item.to}>
          <Link className="index-list__link" to={item.to}>
            <span className="index-list__label">{item.label}</span>
            {item.description && (
              <span className="index-list__description">{item.description}</span>
            )}
            <svg
              className="index-list__icon"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M5 12h14m-6-6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </Link>
        </li>
      ))}
    </ul>
  )
}
