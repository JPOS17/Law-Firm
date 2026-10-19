import { Link } from 'react-router'

export function ErrorPage() {
  return (
    <main className="container section">
      <h1>Something went wrong</h1>
      <p>An unexpected error occurred. Please try again, or return to the home page.</p>
      <Link to="/">Back to home</Link>
    </main>
  )
}
