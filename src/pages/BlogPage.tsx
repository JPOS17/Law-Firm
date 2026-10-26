import { Link } from 'react-router'
import { Hero } from '@/components/Hero'
import courthouseImage from '@/assets/courthouse.jpg'
import { posts } from '@/content/posts'
import { site } from '@/content/site'
import { formatDate } from '@/lib/format'

export function BlogPage() {
  return (
    <>
      <title>{`Blog | ${site.name}`}</title>
      <Hero
        title="Blog"
        lead="Texto de marcador de posición para una breve descripción del blog."
        image={courthouseImage}
      />
      <section className="container section">
        <ul className="post-list">
          {posts.map((post) => (
            <li key={post.slug} className="post-card">
              <h2 className="post-card__title">
                <Link to={`/blog/${post.slug}`} className="post-card__link">
                  {post.title}
                </Link>
              </h2>
              <time className="post-card__date" dateTime={post.date}>
                {formatDate(post.date)}
              </time>
              <p className="post-card__excerpt">{post.excerpt}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
