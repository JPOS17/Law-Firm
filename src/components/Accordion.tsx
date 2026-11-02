import { useState } from 'react'
import { useLocation } from 'react-router'

type AccordionItem = {
  // Used for the anchor, so other pages can link straight to an item (and open it)
  id: string
  title: string
  description: string
}

type AccordionProps = {
  items: AccordionItem[]
}

function idFromHash(hash: string, items: AccordionItem[]) {
  const target = decodeURIComponent(hash.slice(1))
  return items.some((item) => item.id === target) ? target : null
}

export function Accordion({ items }: AccordionProps) {
  const { hash } = useLocation()
  const [openIds, setOpenIds] = useState<string[]>(() => {
    const fromHash = idFromHash(hash, items)
    return fromHash ? [fromHash] : []
  })
  const [lastHash, setLastHash] = useState(hash)

  // When the address changes to point at one of the items, open it.
  if (hash !== lastHash) {
    setLastHash(hash)
    const fromHash = idFromHash(hash, items)
    if (fromHash && !openIds.includes(fromHash)) {
      setOpenIds([...openIds, fromHash])
    }
  }

  function toggle(id: string) {
    setOpenIds(openIds.includes(id) ? openIds.filter((openId) => openId !== id) : [...openIds, id])
  }

  return (
    <ul className="accordion">
      {items.map((item) => {
        const open = openIds.includes(item.id)
        const panelId = `${item.id}-panel`

        return (
          <li
            key={item.id}
            className={open ? 'accordion__item accordion__item--open' : 'accordion__item'}
          >
            <h3 id={item.id} className="accordion__heading">
              <button
                type="button"
                className="accordion__trigger"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => {
                  toggle(item.id)
                }}
              >
                <span>{item.title}</span>
                <span className="accordion__icon" aria-hidden="true" />
              </button>
            </h3>
            {/* "inert" keeps the closed text out of the tab order and away from screen readers */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={item.id}
              className="accordion__panel"
              inert={!open}
            >
              <div className="accordion__panel-inner">
                <p>{item.description}</p>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
