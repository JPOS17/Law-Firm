import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

// jsdom doesn't implement scrolling and prints a "not implemented" error whenever a page
// asks for it. Stand-ins keep the test output quiet and let tests check the calls.
window.scrollTo = vi.fn()
Element.prototype.scrollIntoView = vi.fn()

// Unmounts everything rendered by one test before the next starts,
// so tests can't affect each other.
afterEach(() => {
  cleanup()
})
