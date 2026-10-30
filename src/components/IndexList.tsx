import { Link } from 'react-router'

type IndexItem = {
  label: string
  to: string
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
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}
