import { describe, expect, it } from 'vitest'
import { formatDate } from '@/lib/format'

describe('formatDate', () => {
  // A date-only value should print in long Spanish form without shifting to another day.
  it('formats an ISO date in long Spanish form', () => {
    expect(formatDate('2026-01-15')).toBe('15 de enero de 2026')
  })
})
