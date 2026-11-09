// Remembers every image already requested, so each file is only fetched and decoded once.
const cache = new Map<string, Promise<void>>()

// If an image takes longer than this, navigation continues without it rather than hanging.
const TIMEOUT_MS = 4000

/**
 * Downloads and decodes an image ahead of time, so it paints the moment it is rendered.
 * Always resolves (never rejects): a missing image must never block navigation.
 */
export function preloadImage(src: string): Promise<void> {
  const cached = cache.get(src)
  if (cached) return cached

  const promise = new Promise<void>((resolve) => {
    const image = new Image()
    const timer = window.setTimeout(resolve, TIMEOUT_MS)
    const finish = () => {
      window.clearTimeout(timer)
      resolve()
    }

    image.onload = () => {
      // decode() makes sure the pixels are ready, not just downloaded
      image.decode().then(finish, finish)
    }
    image.onerror = finish
    image.src = src
  })

  cache.set(src, promise)
  return promise
}

// Warms the cache when the browser is idle, without competing with the page the visitor is on.
export function preloadImageWhenIdle(src: string): void {
  const run = () => void preloadImage(src)

  // Safari doesn't have requestIdleCallback, hence the check
  if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(run)
  } else {
    window.setTimeout(run, 200)
  }
}
