import type { ExternalLink } from '@/content/links'

type LinkListProps = {
  items: ExternalLink[]
}

export function LinkList({ items }: LinkListProps) {
  return (
    <ul className="link-list">
      {items.map((item) => (
        <li key={item.url}>
          <a className="link-list__link" href={item.url} target="_blank" rel="noopener noreferrer">
            {item.title}
            <span className="visually-hidden"> (se abre en una pestaña nueva)</span>
          </a>
          <p className="link-list__description">{item.description}</p>
        </li>
      ))}
    </ul>
  )
}
