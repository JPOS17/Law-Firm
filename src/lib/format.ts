// UTC keeps a date-only value like "2026-01-15" from shifting to the previous day
// in time zones behind UTC (such as Mexico).
const dateFormatter = new Intl.DateTimeFormat('es-MX', {
  dateStyle: 'long',
  timeZone: 'UTC',
})

export function formatDate(isoDate: string) {
  return dateFormatter.format(new Date(isoDate))
}
