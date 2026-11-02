type PillarsProps = {
  items: string[]
  summary: string
}

export function Pillars({ items, summary }: PillarsProps) {
  return (
    <div className="pillars">
      <ul className="pillars__list">
        {items.map((item) => (
          <li key={item} className="pillars__item">
            {item}
          </li>
        ))}
      </ul>
      <p className="pillars__summary">{summary}</p>
    </div>
  )
}
