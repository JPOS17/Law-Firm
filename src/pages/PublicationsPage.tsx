import { Link } from 'react-router'
import { Hero } from '@/components/Hero'
import officeImage from '@/assets/office.webp'
import { publicationsPage } from '@/content/pages/publications'
import { posts } from '@/content/posts'
import { site } from '@/content/site'
import { formatDate } from '@/lib/format'

export function PublicationsPage() {
  const page = publicationsPage

  return (
    <>
      <title>{`${page.title} | ${site.name}`}</title>
      <Hero title={page.title} lead={page.lead} image={officeImage} />
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
                {page.readMore}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
