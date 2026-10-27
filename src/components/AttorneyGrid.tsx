import type { Attorney } from '@/content/attorneys'

type AttorneyGridProps = {
  attorneys: Attorney[]
}

export function AttorneyGrid({ attorneys }: AttorneyGridProps) {
  return (
    <ul className="attorney-grid">
      {attorneys.map((attorney) => (
        <li key={attorney.name}>
          {attorney.photo ? (
            <img
              className="attorney__photo"
              src={attorney.photo}
              alt={`Retrato de ${attorney.name}`}
              loading="lazy"
            />
          ) : (
            <div className="attorney__photo attorney__photo--placeholder" aria-hidden="true">
              {attorney.name.charAt(0)}
            </div>
          )}
          <h3 className="attorney__name">{attorney.name}</h3>
          <p className="attorney__role">{attorney.role}</p>
          <p className="attorney__bio">{attorney.bio}</p>
        </li>
      ))}
    </ul>
  )
}
