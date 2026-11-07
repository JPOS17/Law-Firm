import { Link } from 'react-router'
import { Hero } from '@/components/Hero'
import officeImage from '@/assets/office.webp'
import { posts } from '@/content/posts'
import { site } from '@/content/site'
import { formatDate } from '@/lib/format'

export function PublicationsPage() {
  return (
    <>
      <title>{`Publicaciones | ${site.name}`}</title>
      <Hero
        title="Publicaciones"
        // TODO: placeholder text, replace with real copy
        lead="Texto de marcador de posición para una breve descripción de las publicaciones."
        image={officeImage}
      />
      <section className="container section">
        <ul className="post-list">
          {posts.map((post) => (
            <li key={post.slug} className="post-card">
              <h2 className="post-card__title">
                <Link to={`/publicaciones/${post.slug}`} className="post-card__link">
                  {post.title}
                </Link>
              </h2>
              <time className="post-card__date" dateTime={post.date}>
                {formatDate(post.date)}
              </time>
              <p className="post-card__excerpt">{post.excerpt}</p>
              {/* A visual cue only: the title link already says where this goes */}
              <span className="post-card__more" aria-hidden="true">
                Leer artículo
              </span>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
