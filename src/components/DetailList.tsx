type DetailItem = {
  title: string
  description: string
  // Optional anchor, so other pages can link straight to this item
  id?: string
}

type DetailListProps = {
  items: DetailItem[]
}

export function DetailList({ items }: DetailListProps) {
  return (
    <ul className="detail-list">
      {items.map((item) => (
        <li key={item.title} className="detail-list__item">
          <h3 id={item.id} className="detail-list__title">
            {item.title}
          </h3>
          <p className="detail-list__description">{item.description}</p>
        </li>
      ))}
    </ul>
  )
}
