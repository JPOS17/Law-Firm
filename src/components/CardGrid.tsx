type CardItem = {
  title: string
  description: string
}

type CardGridProps = {
  items: CardItem[]
}

export function CardGrid({ items }: CardGridProps) {
  return (
    <ul className="card-grid">
      {items.map((item) => (
        <li key={item.title} className="card">
          <h3 className="card__title">{item.title}</h3>
          <p className="card__description">{item.description}</p>
        </li>
      ))}
    </ul>
  )
}
